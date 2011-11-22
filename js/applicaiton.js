/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-6
 * Time: 下午5:12
 * Dream: to be a Giraffe ~
 */
var files = [

        "js/base/fix/onEnterFrame.js",

        "js/base/lib/jquery-1.6.4.js",
        "js/base/lib/baidu.lang.js",

        "js/base/adapter/adapter.js",

        "js/Giraffe/geom/Point.js",
        "js/Giraffe/geom/Vector.js",
        "js/Giraffe/geom/Collision.js",

        "js/Giraffe/events/Events.js",
        


        "js/Giraffe/system/ResourceLoader.js",
        "js/Giraffe/system/machine.js",
        "js/Giraffe/system/KeyBoard.js",

        "js/Giraffe/display/DisplayObject.js",
        "js/Giraffe/display/Stage.js",
        "js/Giraffe/display/MovieClip.js",
        "js/Giraffe/display/Sprite.js",
        "js/Giraffe/display/Text.js",
        "js/Giraffe/display/Rectangle.js",

        "js/Giraffe/game/GameObject.js",
        "js/Giraffe/game/World.js"
];

for(var i = 0; i< files.length; i++){
    var file = files[i];
    /*var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", file);
    document.getElementsByTagName("head")[0].appendChild(script);*/
    document.write("<script type='text/javascript' src='"+ file +"'></script>");
}
