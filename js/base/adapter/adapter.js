/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-5
 * Time: 下午11:31
 * Dream: to be a Giraffe ~
 */

var Giraffe, G, g;

(function(){

    //top namespace
    Giraffe = G = g = {};
    
    Giraffe.namespace = baidu.lang.module;
    Giraffe.namespace("Giraffe.lib", {
        createSingle: baidu.lang.createSingle,
        createClass: baidu.lang.createClass,
        extendAttr: function(source, target){
            for(var name in target){
                source['_' + name] = target[name];
            }
        },
        extend: function(source, target){
            for(var name in target){
                source[name] = target[name];
            }
            return source;
        }
    });
    Giraffe.extend = Giraffe.lib.extend;
    
})();