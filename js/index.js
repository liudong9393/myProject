// 闭包实现页面的动态样式
(function($) {
    $(document).ready(function() {
        // 轮播图
        new Swiper('.img-container', {
            loop: true,
            autoplay: 1500,
            pagination: '.swiper-pagination',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            preventClicks: true,
            uniqueNavElements: true
        });
        // 将变量声明在这个对象中，避免变量污染
        var init = {
            eve: function() { // 获取事件函数
                e.currentTarget || e.target
            },
            //控制楼梯出现的函数
            stair_appear: function() {
                var top = $(window).scrollTop();
                if (parseInt(top) >= 600) { //判断页面高度
                    $(".stair_nav_left").animate({
                        opacity: '1'
                    }, 30);
                } else if (parseInt(top) < 600) {
                    $(".stair_nav_left").animate({
                        opacity: '0'
                    }, 30);
                }
            },
            // 导航栏点击动画效果函数
            nav_bottom_animation: function() {
                // 通过添加类来实现动画样式
                $('#oli,.active').attr("class", " ");
                $(this).attr("class", "active");
            },
            timer: null, //对下面函数计数
            //购物车出现函数
            fade_in_cart: function() { //实现淡入函数
                clearTimeout(init.timer);
                //这里触发hover事件
                var commodity_information_index = $(this).attr("index"); //获取当前这个标签节点
                var shopping_cart_index = $(this).find(".shopping_cart[data-href]").attr("data-href");
                init.timer = setTimeout(function() {//实现当事件在执行时间内不触发这个事件
                    if (commodity_information_index == shopping_cart_index) {//判断标签标记的字符串
                        $(".shopping_cart").eq(parseInt(shopping_cart_index)).animate({
                            bottom: '0'
                        }, 300);
                    }
                    return false;
                }, 200);
            },
            //购物车消失函数
            fade_out_cart: function() { //淡出函数
                clearTimeout(init.timer);
                $(".shopping_cart").animate({
                    bottom: '-40px'
                }, 300);
            },
            //实现左侧导航栏的运动状态
            nav_buffer_move: function() {
                var strHref = $(this).attr("href").substring(1); //获取标签的href，并截取#后的字符串
                var targetTitle = parseInt($("a[name=" + strHref + "]").offset().top); //目标点
                var clickPoint = parseInt($(this).offset().top); //点击点
                var timeAchieve = Math.abs((clickPoint - targetTitle) / 2.5); //计算滑动时间，取绝对值，
                $('html, body').animate({
                    scrollTop: targetTitle - 30
                }, timeAchieve);
                return false;
            },
            //交互文件的函数，形参：数据地址，提交类型，执行时间，数据类型，缓冲，要提交的数据
            //Url,Type，为必填TimeOut,DataType,Cache,DataType,为非必填Success为主函数
            ajaxFile:function(Url,Type,Success,TimeOut,DataType,Data){
                     $.ajax({
                    url: Url,
                    type: Type,
                    dataType: DataType,
                    timeout: TimeOut,
                    data: Data,
                    success: function(resultData) {
                        Success(resultData);
                    },
                    error:function() {
                        alert("文件加载有问题!!!");
                    }
                });
            },
            //获取登录片段页面
            resultData:function(resultData){
                $(".obtainPage").html(resultData);
            },
            strAddress:"segment/login_and_registered/login_and_registered.js",
            clickAddPage:function(){
                init.ajaxFile("segment/login_and_registered/login.html","get",
                    init.resultData,100,'','');
                init.className.obtainPage.css({
                    height: "100%",
                    width: "100%"
                });
                init.className.Html.append('<script src ="'+init.strAddress+'" ></script>');
            },

            //要获取的DOM元素，
            className:{
                Window:$(window),
                Document:$(document),
                Html:$("html"),
                pleaseLogin:$(".please_login"),//页面顶部登录入口
                commodity_information:$(".commodity_information"),//商品
                nav_bottom_nav:$(".nav_bottom_nav"),//Nav中的导航
                nav_left:$("a.nav_left"),//固定在页面左侧的楼梯导航
                obtainPage:$(".obtainPage"),//获取页面标签
                stair_nav_right:$(".stair_nav_right")//获取右边导航标签
            }
        };
        // 导航栏点击事件
        init.className.nav_bottom_nav.on("click", '#oli', init.nav_bottom_animation);
        // 实现加入购物车的淡入淡出
        init.className.commodity_information.mouseenter(init.fade_in_cart)
            .mouseleave(init.fade_out_cart);
        // 左侧楼梯导航效果
        init.className.Document.on("scroll", init.stair_appear); //执行楼梯出现的函数
        init.stair_appear(); //执行楼梯出现的函数
        //实现缓冲运动
        init.className.nav_left.on("click", init.nav_buffer_move);
        //ajax获取外部登录页面
        init.className.stair_nav_right.on("click","li",init.clickAddPage);
        init.className.pleaseLogin.on("click",init.clickAddPage);


        $.ajax({
            url:"service/LocalCRUD/src/default/Form",
            type:"get",
             dataType:"json",
            success:function(resultData){
            console.log(resultData);
            }
        });












    });
}(window.jQuery));