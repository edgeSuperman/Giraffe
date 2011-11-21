/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-6
 * Time: 上午12:09
 * Dream: to be a Giraffe ~
 */
(function(){
    var supportTouch = "ontouchend" in document;
    var events = {
        ON_CLICK: "click",
        ON_TOUCH_START : supportTouch ? "touchstart" : "mousedown",
        ON_TOUCH_END : supportTouch ? "touchend" : "mouseup",
        ON_TOUCH_MOVE : supportTouch ? "touchmove" : "mousemove",
        ON_ENTER_FRAME : "onEnterFrame",
        ON_AFTER_FRAME : "onAfterFrame",
        ON_FRAME: "onFrame",
        ON_READY: "onReady",
        ON_BEFORE_DRAW: "onBeforeDraw",
        ResourceLoader: {
            ONE_LOADED: "oneloaded"
        },
        ON_COLLIDE: "onCollide",
        ON_COLLIDE_SLEEP: "onCollideSleep",
        ON_AFTER_CHECK_COLLIDE: "onAfterCheckCollide",
        ON_KEY_PRESS: "onKeyPress",
        ON_CALCULATE_NEXT_POSITION: "onCalculateNextPosition"
    };
    g.namespace("Giraffe.events", events);
})();
