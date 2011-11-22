/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-6
 * Time: 下午1:09
 * Dream: to be a Giraffe ~
 */
(function(){
    var Point = g.lib.createClass(function(x, y){
        this._x = x;
        this._y = y;
    }).extend({
                clone: function(){
                    return new Point(this._x, this._y);
                },
                getX: function(){
                    return this._x;
                },
                getY: function(){
                    return this._y;
                },
                setX: function(x){
                    this._x = x;
                },
                setY: function(y){
                    this._y = y;
                },
                plus: function(point){
                    return new Point(point.getX() + this.getX(), point.getY() + this.getY());
                },
                distanceTo: function(point){
                    return Math.sqrt(Math.pow(point.getX() - this.getX()) + Math.pow(point.getY() - this.getY()));
                },
                equal: function(point){
                    return (this.getX() == point.getX() ) && (this.getY() == point.getY());
                }
            });
    g.namespace("Giraffe.geom.Point", Point);
})();
