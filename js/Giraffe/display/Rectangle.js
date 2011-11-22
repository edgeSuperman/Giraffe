/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-13
 * Time: 上午10:32
 * Dream: to be a Giraffe ~
 */
(function() {
    var Rectangle = g.lib.createClass(
            function(config) {
                this._recStyle = config.recStyle;
                //TODO constructor
            }, {superClass: g.display.Sprite }).extend({
                draw: function(){
                    var ctx = this._stage.getContext();
                    var me = this;
                    ctx.save();
                    ctx.translate(this._position.getX() + me._width / 2, this._position.getY() + me._height / 2);
                    ctx.rotate(this._rotation);
                    ctx.beginPath();
                    ctx = g.lib.extend(ctx, this._recStyle);
                    ctx.rect(-1 * me._width / 2, -1 * me._height /2, this._width, this._height);
                    ctx.stroke();
                    ctx.restore();
                }
            });
    
    g.namespace("Giraffe.display.Rectangle", Rectangle);
})();
