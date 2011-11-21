/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-16
 * Time: 下午10:56
 * Dream: to be a Giraffe ~
 */
(function() {

    var KeyBoard = g.lib.createClass(
            function() {
                this._press;
                //TODO constructor
            }).extend({
                //TODO: functions

                init: function(){
                    var me = this;
                    $(document).keydown(function(e) {
                        this._press = e.keyCode;
                        me.dispatchEvent(g.events.ON_KEY_PRESS, {
                            keyCode: e.keyCode
                        });
                    });
                },
                isPress: function(key){
                    return this._key == key;
                }
            });

    //TODO namespace
    g.namespace("g.system.KeyBoard", KeyBoard);
})();
