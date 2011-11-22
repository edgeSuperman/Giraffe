/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-9-1
 * Time: 下午11:12
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var Sprite = g.lib.createClass(function(config){
        //super(config);
    },{
                superClass:g.display.DisplayObject
            }).extend({
                init: function(stage){
                    var me = this;

                    //开始初始化
                    this._stage = stage;
                    
                    //初始化children
                    this.initChildren();

                    this.onFrame = function(e, ctx, totalFrame){
                        me.dispatchEvent(g.events.ON_BEFORE_DRAW);
                        me.draw();

                        me.dispatchEvent(g.events.ON_AFTER_DRAW);
                        me.dispatchEvent(g.events.ON_ENTER_FRAME, totalFrame);
                    };
                    
                    me._stage.addEventListener(g.events.ON_FRAME, me.onFrame);
                    me.dispatchEvent(g.events.ON_READY);
                },
                draw: function(){
                    var ctx = this._stage.getContext();
                    var me = this;
                    ctx.save();
                    ctx.translate(this._position.getX() + me._width / 2, this._position.getY() + me._height / 2);
                    ctx.rotate(this._rotation);
                    ctx.drawImage(me._img,
                            this._left, this._top,
                            this._width, this._height,
                            -1 * me._width / 2,
                            -1 * me._height /2,
                            this._width, this._height);
                    if(this._debug){
                        ctx.beginPath();
                        ctx = g.lib.extend(ctx, {
                            strokeStyle: "black"
                        });
                        ctx.rect(-1 * me._width / 2, -1 * me._height /2, this._width, this._height);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            });

    g.namespace("Giraffe.display.Sprite", Sprite);
})();
