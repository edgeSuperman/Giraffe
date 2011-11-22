/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-12
 * Time: 下午5:09
 * Dream: to be a Giraffe ~
 */
(function() {
	var World = g.lib.createClass(
	function(config) {
		this._gravity = config.gravity || new g.geom.Vector(0, 0);
		if (config.stage instanceof g.display.Stage) {
			this._stage = config.stage;
		}
		else {
			this._stage = new g.display.Stage(config.stage.canvas);
		}
		this._guid = 0;
		this._objects = {};
		this._objectsQueue = [];
		this._collisionQueue = new Array();
	}).extend({
		init: function() {
			var me = this;
			this._stage.addEventListener(g.events.ON_AFTER_FRAME, function() {
				me.dispatchEvent(g.events.ON_AFTER_FRAME);
				me.clearCollisionQueue();
				me.checkCollision();
				me.dispatchEvent(g.events.ON_AFTER_CHECK_COLLIDE, {
					collisionQueue: me._collisionQueue
				});
			});
			this.addEventListener(g.events.ON_AFTER_CHECK_COLLIDE, function(e) {
				var collisionQueue = e.collisionQueue;
				for (var i = 0, len = collisionQueue.length; i < len; i++) {
					var collisionPair = collisionQueue[i];

					var first = collisionPair[0];
					var second = collisionPair[1];

					var m1, m2, v1, v2, vx1, vx2, vy1, vy2;
					if (first.getSleep() && second.getSleep()) {
						continue;
					}

					m1 = first.getSize();
					v1 = first.getVelocity();
					m2 = second.getSize();
					v2 = second.getVelocity();
					var MAX_VALUE = 100000000;
					if (first.getSleep()) {
						m1 = MAX_VALUE;
						v1 = new g.geom.Vector(0, 0);
					}
					if (second.getSleep()) {
						m2 = MAX_VALUE;
						v2 = new g.geom.Vector(0, 0);
					}

					vx1 = ((m1 - m2) * v1.x + 2 * m2 * v2.x) / (m1 + m2);
					vy1 = ((m1 - m2) * v1.y + 2 * m2 * v2.y) / (m1 + m2);
					vx2 = ((m2 - m1) * v2.x + 2 * m1 * v1.x) / (m1 + m2);
					vy2 = ((m2 - m1) * v2.y + 2 * m1 * v1.y) / (m1 + m2);

					var vCollision1 = new g.geom.Vector(vx1, vy1);
					var vCollision2 = new g.geom.Vector(vx2, vy2);

					//重置速度与修正
					var fix = function(active, sleep, v) {
						var collideDirection = g.geom.Collision.checkDirection(active, sleep);
						var sleepFriction = sleep.getFriction();
						var frictionEffect = function(v, friction, direction) {
							if (v[direction] === 0) {
								return;
							}
							if (v[direction] > 0) {
								v[direction] -= friction[direction];
								if (v[direction] < 0) {
									v[direction] = 0;
								}
							}
							else {
								v[direction] += friction[direction];
								if (v[direction] > 0) {
									v[direction] = 0;
								}
							}
						};
						//水平
						if (collideDirection == g.geom.Collision.TOP || collideDirection == g.geom.Collision.BOTTOM) {
							if (active.getVelocity().y * (sleep.getPosition().getY() - active.getPosition().getY()) < 0) {
								return;
							}
							v.x = - 1 * v.x;
							frictionEffect(v, sleepFriction, 'x');
						}
						//竖直
						else if (collideDirection == g.geom.Collision.LEFT || collideDirection == g.geom.Collision.RIGHT) {
							if (active.getVelocity().x * (sleep.getPosition().getX() - active.getPosition().getX()) < 0) {
								return;
							}
							v.y = - 1 * v.y;
							frictionEffect(v, sleepFriction, 'y');
						}
						active.dispatchEvent(g.events.ON_COLLIDE_SLEEP, {
							direction: collideDirection,
							velocity: v
						});

						active.setNextVelocity(v);
						active.setVelocity(v);

						//重新定下次的位置
						var nextPosition = active.calculateNextPosition();
						active.setNextPosition(nextPosition);
					};

					if (first.getSleep()) {
						fix(second, first, vCollision2);
					}
					else if (second.getSleep()) {
						fix(first, second, vCollision1);
					}
					else {
						first.setVelocity(vCollision1);
						second.setVelocity(vCollision2);
					}
				}
			});
			this._stage.init();
		},
		add: function(gameObject) {
			var id = this._guid;
			this._guid++;
			gameObject.setId(id);
			this._stage.add(gameObject.getUI());
			this._objects[id] = gameObject;
			this._objectsQueue.push(gameObject);
			gameObject.setAcceleration(this._gravity);
		},
		checkCollision: function() {
			for (var i = 0, len = this._objectsQueue.length; i < len; i++) {
				for (var j = i + 1, jlen = this._objectsQueue.length; j < jlen; j++) {
					var iObject = this._objectsQueue[i];
					var jObject = this._objectsQueue[j];
					var isCollide = g.geom.Collision.checkGameObjectCollision(iObject, jObject);
					if (isCollide) {
						this._collisionQueue.push([jObject, iObject]);
						iObject.dispatchEvent(g.events.ON_COLLIDE, {
							collider: jObject
						});
						jObject.dispatchEvent(g.events.ON_COLLIDE, {
							collider: iObject
						});
						var iDirection = g.geom.Collision.checkDirection(iObject, jObject);
						var jDirection = g.geom.Collision.checkDirection(jObject, iObject);
						iObject.pushCollisionTo({direction: iDirection, collider: jObject});
						jObject.pushCollisionTo({direction: jDirection, collider: iObject});
					}
				}
			}
		},
		getCollisionQueue: function() {
			return this._collisionQueue;
		},
		clearCollisionQueue: function() {
			this._collisionQueue = [];

			for (var i = 0, len = this._objectsQueue.length; i < len; i++) {
				var gameObject = this._objectsQueue[i];
				gameObject.clearCollisionTo();
			}
		}
	});

	//TODO namespace
	g.namespace("Giraffe.game.World", World);
})();

