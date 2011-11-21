/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-2
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */
(function() {
    var RequestAnimationFrame;
    if (window.webkitRequestAnimationFrame) {
        RequestAnimationFrame = function(cb) {
            var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        RequestAnimationFrame = function(cb) {
            var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        RequestAnimationFrame = function(cb) {
            setInterval(cb, 1000 / 60);
        }
    }
    //
    window.RequestAnimationFrame = RequestAnimationFrame;
})();

//window.onEachFrame(Game.run);