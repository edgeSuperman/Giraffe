/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-9-1
 * Time: 下午11:12
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var MovieClip = G.lib.createClass(function(config){
        this._currentFrame = 0;
        this._totalFrame = config.totalFrame;
                this._frameCount = 0;

    },{ superClass:g.display.DisplayObject }).extend({
                init: function(stage){
                    var me = this;

                    this._stage = stage;

                    this.initChildren();
                    this.onFrame = function(e, ctx, totalFrame){
                        me.dispatchEvent(g.events.ON_BEFORE_DRAW);
                        me.draw();
                        
                        me.dispatchEvent(g.events.ON_ENTER_FRAME, me._currentFrame, me._totalFrame);
                    };

                    stage.addEventListener(g.events.ON_FRAME, me.onFrame);
                    me.dispatchEvent(g.events.ON_READY);
                },
                draw: function(){
                    var me = this;
                    var ctx = this._stage.getContext();
                    var itemWidth = me._width / me._totalFrame;
                    this._frameCount++;
                    this._frameCount %= 5;
                    if(this._frameCount === 0){
                        me._currentFrame++;
                    }
                    me._currentFrame = me._currentFrame % me._totalFrame;
                    var left = me._currentFrame * itemWidth;
                    var top = 0;
                    ctx.save();
                    ctx.translate(this._position.getX() + itemWidth / 2 , this._position.getY() +  me._height / 2);
                    ctx.rotate(this._rotation);
                    ctx.drawImage(me._img,
                            left, top,
                            itemWidth, me._height,
                            -1 * itemWidth / 2,
                            -1 * me._height / 2,
                            itemWidth, me._height);
                     if(this._debug){
                        ctx.beginPath();
                        ctx = g.lib.extend(ctx, {
                            strokeStyle: "black"
                        });
                        ctx.rect(-1 * itemWidth / 2, -1 * me._height /2, itemWidth, this._height);
                        ctx.stroke();
                    }
                    ctx.restore();
                },
                getCurrentFrame: function(){
                    return this._currentFrame;
                },
                getTotalFrame: function(){
                    return this._totalFrame;
                },
                getWidth: function(){
                    return this._width / this._totalFrame;
                }
            });

    G.namespace("Giraffe.display.MovieClip", MovieClip);
})();
