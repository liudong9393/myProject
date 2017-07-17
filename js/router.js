//主要是对页面的导航栏以及url中
// 配置页面路由，将其他页面引导主页面
(function($) {
    var init ={
        router : {
            index: 0
        },
        nav_bottom_animation: function() {
            // 通过添加类来实现动画样式
            $('.nav_bottom_nav>li,.active').attr("class", " ");
            $(this).attr("class", "active");
        },
        className: {
            nav_bottom_nav:$(".nav_bottom_nav")//Nav中的导航
        }

    } ;
    //onpopstate = function () {
    //    //可以获取 当前url
    //    var key = location.href.split('#')[1];
    //    $('section.current').removeClass('current');
    //    $('section').eq(init.router[key]).addClass('current');
    //};
    //路由第一个页面时首页
    if (!location.href.split('#')[1]) {
        history.replaceState(null, 'index', location.href + '#index')
    }
    $.ajax({
        url: 'segment/segmentPage/index.html',
        success: function (d) {
            $('section.current').removeClass('current');
            $('<section>', {class: 'current'}).html(d).appendTo('[linkPage]');
        }
    });
    $(function () {
        //想jquery添加方法，这个是寻找节点名的方法
        $.fn.getNodeName = function () {
            return this[0].nodeName.toLowerCase();
        };
        init.className.nav_bottom_nav.on("click", 'li', init.nav_bottom_animation);
        //事件委托，添加事件给那个父级
        $(".nav_bottom_nav").on('click', 'li', function (e) {

            //声明变量
            var oLi;
            var el = $(e.target);
            if (e.target.nodeName.toLowerCase() == 'li') {
                oLi = $(el);
            } else if (el.parent().getNodeName() == 'li') {//父级是li
                oLi = el.parent();
            }
            history.pushState(null, oLi[0].dataset.href, '#' + oLi[0].dataset.href);
            if (init.router[oLi[0].dataset.href] == undefined) {
                init.router[oLi[0].dataset.href] = Object.keys(init.router).length;
                //模板的地址
                var modelUrl = 'segment/segmentPage/' + oLi[0].dataset.href + '.html';
                $.ajax({
                    url: modelUrl,
                    success: function (d) {
                        $('section.current').removeClass('current');
                        $('<section>', {class: 'current'}).html(d)
                            .appendTo('[linkPage]');
                    }
                });
            } else {
                // 已经加载过页面, 重新显示对应页面
                $('section.current').removeClass('current');
                $('section').eq(init.router[oLi[0].dataset.href]).addClass('current');
            }

        });
    });
}(window.jQuery));