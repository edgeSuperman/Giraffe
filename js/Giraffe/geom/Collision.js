/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-2
 * Time: 下午10:12
 * To change this template use File | Settings | File Templates.
 */
(function() {
	var Collision = {
		HORIZONTAL: 'Horizontal',
		LONGITUDINAL: 'Longitudinal',
		TOP: 'TOP',
		BOTTOM: 'BOTTOM',
		LEFT: 'LEFT',
		RIGHT: 'RIGHT',
		checkCollision: function hitRect(RectX, RectY, RectWidth, RectHeight, ObjX, ObjY, ObjWidth, ObjHeight) {
			if ((RectX + RectWidth > ObjX) && (RectX < ObjX + ObjWidth) && (RectY + RectHeight > ObjY) && (RectY < ObjY + ObjHeight)) {
				return true; //true表示两个矩形发生了碰撞
			}
			return false;
		},
		checkDisplayObjectCollision: function(m1, m2) {
			var pos1 = m1.getPosition();
			var pos2 = m2.getPosition();
			var isCollide = Collision.checkCollision(pos1.getX(), pos1.getY(), m1.getWidth(), m1.getHeight(), pos2.getX(), pos2.getY(), m2.getWidth(), m2.getHeight());
			return isCollide;
		},
		checkGameObjectCollision: function(g1, g2) {
			var m1 = g1.getUI();
			var m2 = g2.getUI();
			var pos1 = g1.getNextPosition();
			var pos2 = g2.getNextPosition();
			var v1 = g1.getVelocity();
			var v2 = g1.getVelocity();
			var sleep1 = g1.getSleep();
			var sleep2 = g2.getSleep();

			var isCollide = Collision.checkCollision(pos1.getX(), pos1.getY(), m1.getWidth(), m1.getHeight(), pos2.getX(), pos2.getY(), m2.getWidth(), m2.getHeight());
			return isCollide;
		},
		checkGameObjectCollisionNow: function(g1, g2) {
			var m1 = g1.getUI();
			var m2 = g2.getUI();
			var isCollide = Collision.checkDisplayObjectCollision(m1, m2);
			return isCollide;
		},
		_getCenter: function(gameObject) {
			var position = gameObject.getNextPosition();
			var displayObject = gameObject.getUI();
			var x = position.getX();
			var y = position.getY();
			var w = displayObject.getWidth();
			var h = displayObject.getHeight();
			return new g.geom.Point(x + w / 2, y + h / 2);
		},
		checkDirection: function(m1, m2) {
			var u1 = m1.getUI();
			var u2 = m2.getUI();
			var pos1 = m1.getNextPosition();
			var pos2 = m2.getNextPosition();
			var center1 = this._getCenter(m1);
			var center2 = this._getCenter(m2);
			var x1 = pos1.getX();
			var x2 = pos2.getX();
			var y1 = pos1.getY();
			var y2 = pos2.getY();
			var w1 = u1.getWidth();
			var h1 = u1.getHeight();
			var vertical = Math.abs(y1 + h1 - y2);
			var hov = Math.abs(x1 + w1 - x2);

			if (vertical > hov) {
				//return this.LONGITUDINAL
				if (center1.getX() > center2.getX()) {
					return this.LEFT;
				}
				else {
					return this.RIGHT;
				}
			}
			else {
				//return this.HORIZONTAL;
				if (center1.getY() > center2.getY()) {
					return this.TOP;
				}
				else {
					return this.BOTTOM;
				}
			}
		}
	};
	g.namespace("Giraffe.geom.Collision", Collision);
})();

