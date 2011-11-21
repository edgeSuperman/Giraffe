/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-9-1
 * Time: 下午11:36
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var Stage = g.lib.createClass(function(canvas){
        this._totalFrame = 0;
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this.stageWidth = canvas.width;
        this.stageHeight = canvas.height;
    }).extend({
                init: function(){
                    var me = this;
                    var jCanvas = $(this._canvas);

                    jCanvas.bind(g.events.ON_TOUCH_MOVE, function(e){
                        var x = e.clientX;
                        var y = e.clientY;
                        me.dispatchEvent(g.events.ON_TOUCH_MOVE, {
                            x: x,
                            y: y
                        });
                    });

                    jCanvas.bind(g.events.ON_CLICK, function(e){
                        var x = e.offsetX || e.clientX;
                        var y = e.offsetY || e.clientY;
                        me.dispatchEvent(g.events.ON_CLICK, {
                            x: x,
                            y: y
                        });
                    });

                    jCanvas.bind(g.events.ON_TOUCH_START, function(e){
                        //TODO 只是简单写了一下，具体实现还需要实例

                        var x = e.offsetX || e.clientX;
                        var y = e.offsetY || e.clientY;
                        me.dispatchEvent(g.events.ON_TOUCH_START, {
                            x: x,
                            y: y
                        });
                    });

                    jCanvas.bind(g.events.ON_TOUCH_END, function(e){
                        //TODO 只是简单写了一下，具体实现还需要实例

                        var x = e.offsetX || e.clientX;
                        var y = e.offsetY || e.clientY;
                        me.dispatchEvent(g.events.ON_CLICK, {
                            x: x,
                            y: y
                        });
                    });

                    //程序的主循环
                    window.RequestAnimationFrame(function(){
                        console.log('newbegin');
                        me._run();
                    });
                    /*  setInterval(function(){
                     me._run();
                     }, 60);*/
                },
                _run: function(){
                    var me = this;
                    me.dispatchEvent(g.events.ON_ENTER_FRAME,{
                        totalFrame: me._totalFrame
                    });
                    me._totalFrame++;
                 //  me.clear();
                    me.dispatchEvent(g.events.ON_FRAME ,{
                        context: me._ctx,
                        totalFrame: me._totalFrame
                    });
                    me.dispatchEvent(g.events.ON_AFTER_FRAME);
                },
                clear: function(){
                    var me = this;
                    me._ctx.clearRect(0, 0, me.stageWidth, me.stageHeight);
                },
                add: function(displayObject){
                    displayObject.init(this);
                },
                getContext: function(){
                    return this._ctx;
                }
            });

    G.namespace("Giraffe.display.Stage", Stage);

})();
