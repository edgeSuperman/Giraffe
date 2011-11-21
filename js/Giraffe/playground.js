/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-9-2
 * Time: 下午5:17
 * To change this template use File | Settings | File Templates.
 */
var playground = baidu.lang.createSingle({
   init: function(){
       var me = this;
       this._row = 10;
       this._col = 5;
       this._sunCount = 0;
       this.roads = [];
       this.objects = [];
       this.clear();
       stage.addEventListener(EVENTS.ON_ENTER_FRAME, function(e, totalFrame){
           me.checkCollsion(e, totalFrame);
       });
       stage.addEventListener(EVENTS.ON_CLICK, function(e, point){
          me.checkClick(point);
       });
   },
    setInSunshine: function(size){
        this._sunCount += size;
        this.dispatchEvent(EVENTS.ON_SUNSHINE_CHANGED, this._sunCount + "");
    },
    getSunshine: function(){
        return this._sunCount;
    },
    getObjectById: function(id){
       for(var i = 0, len = this.objects.length; i < len; i++){
           var o = this.objects[i];
           if(o.id == id) {
               return o;
           }
       }
       return null;
    },
    add: function(m){
      this.objects.push(m);
    },
    draw: function(){
        var me = this;
        if(this._ready){
            stage.getContext().drawImage(this._img, 0, 0);
        }
        else {
             this._img = new Image();
             this._img.onload = function(){
                 me._ready = true;
                 me.draw();
             };
             this._img.src = IMGS.BACKGROUND;
        }
    },
    clear: function(){
       this.roads = new Array();
       for(var i = 0; i < this._col; i++){
           var rowArray = [];
           for(var j = 0; j < this._row; j++){
               rowArray.push(new Array());
           }
           this.roads.push(rowArray);
       }
    },
    getRoad: function(x, y){
        var xIndex = Math.floor( ( x - BASE_LEFT ) / SECTION_WIDTH);
        var yIndex = Math.floor( ( y - BASE_TOP ) / SECTION_HEIGHT);
        return {
            xIndex: xIndex,
            yIndex: yIndex
        };
    },

    //mack一下 然后这个元素就在碰撞检测范围内了
    mark: function(movieClip){
        var me = this;
        function mark(){
            var steps = me.getStep(this);
            var leftStep = steps.left;
            var rightStep = steps.right;
            me.push(leftStep.xIndex, leftStep.yIndex, this.id);
            me.push(rightStep.xIndex, rightStep.yIndex, this.id);
        }
        mark.call(movieClip);
    },

    //获得movieClip占据的左侧和右侧位置
    getStep: function(movieClip){
        var me = this;
        function getStep(){
            var y = this.y + this._spriteOffsetY;
            var leftStep = me.getRoad(this.x + this._spriteOffsetX, y);
            var rightStep = me.getRoad(this.x  + this._width - this._spriteOffsetX - this._spriteOffsetBack, y);
            return {
                left: leftStep,
                right: rightStep
            };
        }
        return getStep.call(movieClip);
    },
    getPlaceHolders : function(xIndex, yIndex){
        return this.roads[yIndex][xIndex];
    },
    push: function(xIndex, yIndex, obj){
        if(xIndex >= this._row || yIndex >= this._col || !obj){
            return;
        }
        var step = this.roads[yIndex][xIndex];
        if(!step) return;
        if(step.indexOf(obj) === -1){
            step.push(obj);
        }
    },
    checkCollsion: function(e, totalFrame){
        for(var i = 0; i < this._col; i++){
           var rowArray = [];
           for(var j = 0; j < this._row; j++){
               rowArray = rowArray.concat(this.roads[i][j]);
           }
           for(var z = 0, len = rowArray.length; z < len; z++){
                for(var n = 0; n < z ; n++){
                    if(n == z || rowArray[n] == rowArray [z]) continue;
                    var m1 = this.getObjectById(rowArray[n]);
                    var m2 = this.getObjectById(rowArray[z]);
                    var collide = checkCollision(m1, m2);
                    if(collide){
                        m1.dispatchEvent(EVENTS.ON_COLLIDE, {
                            collider: m2
                        }, totalFrame);
                        m2.dispatchEvent(EVENTS.ON_COLLIDE, {
                            collider: m1
                        }, totalFrame);
                    }
                }
           }
       }
    },
    checkClick: function(point){
        for(var i = 0, len = this.objects.length; i < len; i++){
            var obj = this.objects[i];
            var x = obj.x + obj._spriteOffsetX;
            var y = obj.y + obj._spriteOffsetY;
            if(point.x > x && point.x < x + obj.width && point.y > y && point.y < y + obj.height){
                obj.dispatchEvent(EVENTS.ON_CLICK);
            }
        }
    }
});
