/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-11
 * Time: 下午7:15
 * Dream: to be a Giraffe ~
 */
(function() {
    var ResourceLoader = g.lib.createClass(
            function() {
                this._queue = [];
                this._result = {};
            }).extend({
                load: function(urlQueue, callBack){
                    var me = this;
                    this._queue = this._queue.concat(urlQueue);
                    this.addEventListener(g.events.ResourceLoader.ONE_LOADED, function(){
                        if(this._queue.length > 0){
                            this._request();
                        }
                        else {
                            callBack.call(this, this._result);
                        }
                    });
                    this._request();
                },
                _request: function(){
                    var me = this;
                    var item = this._queue.pop();
                    var src = item.src;
                    var id = item.id;
                    var img = new Image();
                    img.onload = function(){
                        me._result[id] = this;
                        me.dispatchEvent(g.events.ResourceLoader.ONE_LOADED);
                    };
                    img.src = src;
                },
                getImageDataById: function(id){
                    return this._result[id] || null;
                }
            });

    g.namespace("Giraffe.system.ResourceLoader", ResourceLoader);
})();
