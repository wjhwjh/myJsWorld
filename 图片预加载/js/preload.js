/**
 * Created by Administrator on 2017/6/14.
 * 这个插件作用是为了页面中根据图片的加载来执行一些动作
 * 1.例如根据图片的加载个数设置加载进度；
 * 2.图片未完全加载时出现提示，或者图片加载完全才显示在页面上
 */
(function ($) {
    //面向对象初始化数据
    function PreLoad(imgs, options) {
        //对imgs传过来图片的路径参数进行判断，如果是字符串则说明是一张图，否则是一组图
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);
        //console.log(this.imgs);
        //console.log(this.opts);

        this._unoredered(this.imgs);
    }

    //自定义默认的变量
    PreLoad.DEFAULTS = {
        // order:'unordered',//默认的参数
        each: null, //每一张图片加载完毕后执行
        all: null   //所有图片加载完毕后执行
    };
    //面向对象初始化方法
    //_unoredered继承PreLoad方法的原型，所以_unoredered可以使用PreLoad的属性，参数，方法
    PreLoad.prototype._unoredered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        //console.log(imgs);

        $.each(imgs, function (i, src) {
            //
            //console.log(src);

            //判断图片的url是否存在
            if (typeof src != 'string') return;

            var imgObj = new Image();
            //console.log(imgObj);
            //图片数组绑定load和error事件
            $(imgObj).on('load error', function () {
                opts.each && opts.each(count); //加载每一张时执行的方法
                if (count >= len - 1) {
                    opts.all && opts.all(); //所有的图片都加载完执行的方法
                }
                count++;
            });
            imgObj.src = src;
        })
    }

    //jQuery插件的扩展
    $.extend({
        preload: function (imgs, opts) {
            new PreLoad(imgs, opts);
        }
    });


})(jQuery);