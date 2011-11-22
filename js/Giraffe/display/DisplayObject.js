/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-10
 * Time: 下午9:59
 * Dream: to be a Giraffe ~
 */
(function(){
    var DisplayObject = g.lib.createClass(function(config){
        this._img= config.img;
        this._width = config.width;
        this._height = config.height;
        this._left = config.left || 0;
        this._top = config.top || 0;
        this._position = config.position || new g.geom.Point(0, 0);
        this._nextPosition = this._position;
        this._relative = !!config.relative;
        this._rotation = config.rotation || 0;
        this._debug = !!config.debug;

        //支持嵌套
        this._children = [];
    }).extend({
                init: function(stage){},
                draw: function(){},
                initChildren: function(){
                    var me = this;
                    this._childrenInit = function(){
                        for(var i = 0, len = me._children.length; i < len; i++){
                            var child = me._children[i];

                            //如果是相对定位
                            if(child.getRelative()){
                                var position = child.getPosition();
                                var parentPosition = me.getPosition();
                                var rePosition = position.plus(parentPosition);
                                child.setPosition(rePosition);
                            }
                            child.init(me._stage);
                        }
                    };

                    //父sprite准备好的时候初始化自己的孩子
                    this.addEventListener(g.events.ON_READY, this._childrenInit);
                },
                add: function(sprite){
                    this._children.push(sprite);
                },
                getRelative: function(){
                    return this._relative;
                },
                getPosition: function(){
                    return this._position;
                },
                setPosition: function(position){
                    this._position = position;
                },
                setRotation: function(rotation){
                    this._rotation = rotation;
                },
                getRotation: function(){
                    return this._rotation;
                },
                getWidth: function(){
                    return this._width;
                },
                getHeight: function(){
                    return this._height;
                },
                update: function(config){
                    var me = this;
                    g.lib.extendAttr(this, config);
                },
                dispose: function(){
                    this._stage.removeEventListener(g.events.ON_FRAME, this.onFrame);
                }
            });
    g.namespace("Giraffe.display.DisplayObject", DisplayObject);
})();
