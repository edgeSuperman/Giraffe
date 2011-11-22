/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-9-1
 * Time: 下午11:12
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var Text = G.lib.createClass(function(config){
        this._text = config.text;
        this._position = config.position;
        this._fontConfig = config.fontConfig;

    }).extend({
                init: function(stage){
                    var me = this;

                    this._stage = stage;
                    
                    //开始初始化
                    this.onFrame = function(e, ctx, totalFrame){
                        me.draw();
                        me.dispatchEvent(g.events.ON_FRAME, totalFrame);
                    };
                    this._stage.addEventListener(g.events.ON_FRAME, me.onFrame);
                },
                draw: function(){
                    var me = this;
                    var ctx = this._stage.getContext();
                    g.lib.extend(ctx, this._fontConfig || {});
                    ctx.fillText(this._text, this._position.x, this._position.y);
                    ctx.save();
                },
                update: function(config){
                    g.lib.extend(this, config);
                },
                destroy: function(){
                    this._stage.removeEventListener(g.events.ON_FRAME, this.onFrame);
                }
            });

    G.namespace("Giraffe.display.Text", Text);
})();
