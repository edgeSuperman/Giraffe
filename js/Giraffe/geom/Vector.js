/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 11-11-12
 * Time: 下午5:51
 * Dream: to be a Giraffe ~
 */
(function() {
    var Vector = g.lib.createClass(
            function(x, y) {
                this.x = x;
                this.y = y;
            }).extend({
                SetZero: function() {
                    this.x = 0.0;
                    this.y = 0.0;
                },
                Set: function(x, y) {
                    this.x= x;
                    this.y= y;
                },
                SetV: function(v) {
                    this.x=v.x;
                    this.y=v.y;
                },
                Negative: function(){
                    return new Vector(-this.x, -this.y);
                },


                Copy: function(){
                    return new Vector(this.x,this.y);
                },

                Add: function(v)
                {
                    this.x += v.x;
                    this.y += v.y;
                },

                Subtract: function(v)
                {
                    this.x -= v.x;
                    this.y -= v.y;
                },

                Multiply: function(a)
                {
                    this.x *= a;
                    this.y *= a;
                },


                CrossVF: function(s)
                {
                    var tX = this.x;
                    this.x = s * this.y;
                    this.y = -s * tX;
                },

                CrossFV: function(s)
                {
                    var tX = this.x;
                    this.x = -s * this.y;
                    this.y = s * tX;
                },

                MinV: function(b)
                {
                    this.x = this.x < b.x ? this.x : b.x;
                    this.y = this.y < b.y ? this.y : b.y;
                },

                MaxV: function(b)
                {
                    this.x = this.x > b.x ? this.x : b.x;
                    this.y = this.y > b.y ? this.y : b.y;
                },

                Abs: function()
                {
                    this.x = Math.abs(this.x);
                    this.y = Math.abs(this.y);
                },

                Length: function()
                {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                },

                Normalize: function()
                {
                    var length = this.Length();
                    if (length < Number.MIN_VALUE)
                    {
                        return 0.0;
                    }
                    var invLength = 1.0 / length;
                    this.x *= invLength;
                    this.y *= invLength;

                    return length;
                }
            });

    g.namespace("Giraffe.geom.Vector", Vector);
})();
