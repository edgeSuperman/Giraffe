/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-12
 * Time: 下午9:41
 * Dream: to be a Giraffe ~
 */
(function() {
	var GameObject = g.lib.createClass(
	function(config) {
		if (config.displayObject instanceof g.display.DisplayObject) {
			this._ui = config.displayObject;
		}
		else {
			var type = config.displayObject.type;
			delete config.displayObject.type;
			var clazz = g.display[type];
			this._ui = new clazz(config.displayObject);
		}
		this._sleep = !! config.sleep;
		this._size = config.size || 1;
		this._velocity = config.velocity || new g.geom.Vector(0, 0);

		//外重力
		this._acceleration = config.acceleration || new g.geom.Vector(0, 0);

		//摩擦力
		this._friction = config.friction || new g.geom.Vector(0, 0);

		this._position = config.position || this._ui.getPosition() || new g.geom.Point(0, 0);
		this._collisionDecrease = config.collisionDecrease || 0;
		this._collisionTo = new Array();
		this.init();
		//TODO constructor
	}).extend({
		//TODO: functions
		init: function() {
			var me = this;
			this._ui.setPosition(this._position);
			this.reset();
			this._ui.addEventListener(g.events.ON_BEFORE_DRAW, function() {
				if (!me._sleep) {

					var nextVelocity = me.calculateNextVelocity();

					var nextPosition = me.calculateNextPosition();

					me._ui.setPosition(me._nextPosition.clone());
					me.setVelocity(me._nextVelocity.Copy());

					me.setNextPosition(nextPosition);
					me.setNextVelocity(nextVelocity);
				}
			});
			this.addEventListener(g.events.ON_CALCULATE_NEXT_POSITION, function(e){

				//calculate the accelaration
				var acceleration = e.acceleration;
				var currentPosition = e.currentPosition;
				var collisionTo = this.getCollisionTo();
				for(var i = 0, len = collisionTo.length; i < len; i++){
					var collider = collisionTo[i];
					console.log(collider);
				}
				
			});
			this._initCollision();
		},
		pushCollisionTo: function(colliderInfo){
			this._collisionTo.push(colliderInfo);
		},
		getCollisionTo: function(){
			return this._collisionTo;
		},
		clearCollisionTo: function(){
			this._collisionTo = new Array();
		},
		_initCollision: function() {
			var onCollide = function(e) {
				var me = this;
				var collideDirection = e.direction;
				var velocity = e.velocity;
				var decreaseVelocity = function(v, attr, val) {
					if (Math.abs(velocity[attr]) < 4) {
						velocity[attr] = 0;
						me.reset(attr);
					}
					v[attr] *= val;
				};
				if (collideDirection == g.geom.Collision.HORIZONTAL) {
					decreaseVelocity(velocity, 'y', 1 / 2);
				}
				else {
					decreaseVelocity(velocity, 'x', 1 / 2);
				}
			};
			if (this._collisionDecrease) {
				this.addEventListener(g.events.ON_COLLIDE_SLEEP, onCollide);
			}
		},
		setAcceleration: function(acceleration) {
			this._acceleration = acceleration;
		},
		getFriction: function() {
			return this._friction;
		},
		setFriction: function(friction) {
			this._friction = friction;
		},
		reset: function(attr) {
			//艹
			attr = '_' + attr;
			if (!this._nextPosition) {
				this._nextPosition = this._ui.getPosition();
			}
			else {
				this._nextPosition[attr] = this._ui.getPosition()[attr];
			}

			this._nextVelocity = this.getVelocity();
		},
		getAcceleration: function() {
			return this._acceleration;
		},
		setId: function(id) {
			this._id = id;
		},
		getId: function() {
			return this._id;
		},
		getUI: function() {
			return this._ui;
		},
		getSleep: function() {
			return this._sleep;
		},
		setSleep: function(sleepOrNot) {
			this._sleep = sleepOrNot;
		},
		getVelocity: function() {
			return this._velocity;
		},
		setVelocity: function(velocity) {
			this._velocity = velocity;
		},
		getNextVelocity: function() {
			return this._nextVelocity;
		},
		setNextVelocity: function(velocity) {
			this._nextVelocity = velocity;
		},
		getNextPosition: function() {
			return this._nextPosition;
		},
		setNextPosition: function(v) {
			return this._nextPosition = v;
		},
		getPosition: function() {
			return this._ui.getPosition();
		},
		setPosition: function(pos) {
			return this._ui.setPosition(pos);
		},
		setSize: function(size) {
			this._size = size;
		},
		getSize: function(size) {
			return this._size;
		},
		calculateNextPosition: function() {
			var me = this;

			var t = g.system.Machine.TIMER;

			var position = me._nextPosition;

			//nextPosition's copy
			var pos = new g.geom.Vector(position.getX(), position.getY());

			var v = me._acceleration;

			var me_y = me._nextVelocity.Copy();
			if (me.dispatchEvent(g.events.ON_CALCULATE_NEXT_POSITION, {
				acceleration: v.Copy(),
				currentPosition: pos
			})) {
				pos.x += me_y.x * t + v.x * t * t / 2;
				pos.y += me_y.y * t + v.y * t * t / 2;
			}
			var nextPosition = new g.geom.Point(pos.x, pos.y);

			return nextPosition;
		},
		calculateNextVelocity: function() {
			var me = this;

			var t = g.system.Machine.TIMER;

			var v = me._acceleration;

			var me_y = me._nextVelocity.Copy();

			var nextX = me_y.x + v.x * t;
			var nextY = me_y.y + v.y * t;

			var nextVelocity = new g.geom.Vector(nextX, nextY);

			return nextVelocity;
		}
	});
	g.namespace("Giraffe.game.GameObject", GameObject);
})();

