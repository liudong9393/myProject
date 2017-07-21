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
            alreadyLogin: 0,//是否已经登录
            eve: function() { // 获取事件函数
                e.currentTarget || e.target
            },
            //控制楼梯出现的函数
            stair_appear: function() {
                var top = $(window).scrollTop();
                if (parseInt(top) >= 600) { //判断页面高度
                    init.className.stairNavLeft.animate({
                        opacity: '1'
                    }, 30);
                    init.className.stairNavLeft.css({
                        "display":"block"
                    });
                } else if (parseInt(top) < 600) {
                    init.className.stairNavLeft.animate({
                        opacity: '0'
                    }, 30);
                    init.className.stairNavLeft.css({
                        "display":"none"
                    });
                }
            },
            timer: null, //对下面函数计数
            //购物车出现函数
            fade_in_cart: function() { //实现淡入函数
                clearTimeout(init.timer);
                //这里触发hover事件
                //var commodity_information_index = $(this).attr("index"); //获取当前这个标签节点
                var shopping_cart_index = $(this).find(".shopping_cart[data-href]")
                .attr("data-href");
                init.timer = setTimeout(function() {//实现当事件在执行时间内不触发这个事件
                    //if (commodity_information_index == shopping_cart_index) {//判断标签标记的字符串
                        $(".shopping_cart[data-href="+shopping_cart_index+"]").animate({
                            bottom: '0'
                        }, 300);
                    //}
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
            clickFavorite:function(){
                init.className.localLeft.animate({
                    width :"80%"
                },10);
                $.ajax({
                    url: "segment/favorite/favorite.html",
                    type: "get",
                    success: function(resultData) {
                        $(".favorite").html(resultData);
                    },
                    error:function() {
                        alert("文件加载有问题!!!");
                    }
                });

                init.className.stair_nav_right.animate({
                    width: "22%",
                    right:"1%"
                },50);

                init.className.Html.append('<script src ="segment/favorite/favorite.js" ></script>');
            },
            cancelFavorite:function(){
                $(".favorite").html("");
                init.className.localLeft.animate({
                    width :"0%"
                },10);
                $(".stair_nav_right").animate({
                    width: "50px",
                    right:"-0.5%"
                },100);
            },
            //要获取的DOM元素，
            className:{
                Window:$(window),
                Document:$(document),
                Html:$("html"),
                pleaseLogin:$(".please_login"),//页面顶部登录入口
                commodity_information:$(".commodity_information"),//商品
                nav_left:$("a.nav_left,.back_top > a"),//固定在页面左侧的楼梯导航
                stairNavLeft:$(".stair_nav_left"),//左侧导航
                obtainPage:$(".obtainPage"),//获取页面标签
                stair_nav_right:$(".stair_nav_right"),//获取右边导航标签
                favoriteClick:$(".favoriteClick"),//点击打开关注
                favorite:$(".favorite"),//获取关注
                myFavorite:$(".myFavorite"),//获取关注
                cancel:$(".cancel"),//  取消关注的“×”
                localLeft:$(".local_left")//关注页面片段左侧
            }
        };
        // 实现加入购物车的淡入淡出
        init.className.commodity_information.mouseenter(init.fade_in_cart)
            .mouseleave(init.fade_out_cart);
        // 左侧楼梯导航效果
        init.className.Document.on("scroll", init.stair_appear); //执行楼梯出现的函数
        init.stair_appear(); //执行楼梯出现的函数
        //实现缓冲运动
        init.className.nav_left.on("click", init.nav_buffer_move);
        //ajax获取外部登录页面
        if(init.alreadyLogin==0){
            init.className.stair_nav_right.on("click","li",init.clickAddPage);
            $(".stair_nav_right li a").attr("href","javascript:void(0);");
            //点击请登录获取登录页面
            init.className.pleaseLogin.on("click",init.clickAddPage);
            init.className.favoriteClick.on("click",init.clickFavorite);

            init.className.localLeft.on("click", init.cancelFavorite);
        }else if(init.alreadyLogin==1){
            $(".stair_nav_right li a").attr("href","segment/shopping_cart/shopping_cart.html");
            init.className.myFavorite.on("click",init.clickFavorite);

            init.className.favoriteClick.on("click",init.clickFavorite);
            init.className.localLeft.on("click", init.cancelFavorite);

        }

        var index = 0;
        //模糊查询
        $("#search").on("keyup",function(){
            if($("#search").val()==""){
                $(".search_result").css({"display":"none"});
            }else{
                $(".search_result").css({"display":"block"});
                $.ajax({
                    url: "",
                    type: "post",
                    dataType:"json",
                    data:{
                      "search": $(this).val()
                    },
                    success: function(resultData) {
                        $.each(resultData,function(index,data){
                            $("p").append(data.name);
                        })
                    },
                    error:function() {
                        alert("文件加载有问题!!!");
                    }
                })
            }
        }).on("blur",function(){//失去焦点
            $(".search_result").css({"display":"none"});

        }).on("keydown",function (event) {//上下键获取焦点
            var key = event.keyCode;
            var searchResult = $(".search_result>p");
            var search = $(".search_result");
            if(search.css("display")=="block"){
                var select = search.find("p:eq(" + index + ")");
                //颜色样式
                select.css("background", "#aaa").siblings().css("background", "");
                if (key == 38) { /*向上按钮*/
                    index--;
                    if (index < 0) {//到顶了，
                        index = parseInt(searchResult.length) - 1;
                    }
                    $("#search").val(select.text());/*搜索框内容*/
                } else if (key == 40) {/*向下按钮*/
                    index++;
                    if (index > parseInt(searchResult.length)-1) {//到底了
                        index = 0;
                    }
                    $("#search").val(select.text());
                }
            }
            if (key == 13) {/*回车搜索*/

            }
        });

        $(".search_result>p").on("click",function(){
            $("#search").val($(this).text());
        });


        init.className.Document.on("scroll",function(){
            var content = $(".content");
            var toTop = content.offset().top-$(window).scrollTop();
            var contentRight = $(".content_right");
            var innerTop = contentRight.offset().top-content.offset().top;
            var maxTop = content.height() - contentRight.height();
            console.log(contentRight.offset().top-content.offset().top);
            //console.log(maxTop-19);

            if(toTop<=10 && innerTop<maxTop-19){
                contentRight.css({
                    "position":"fixed",
                    "right": "11.66%",
                    "top": "10px",
                    "width" :"19.6%"
                })
            }else if(toTop>10) {
                contentRight.css({
                    "position":"relative",
                    "right": "0",
                    "top": "0",
                    "width" :"24.5%"
                })
            }
            else if(toTop<=10 && innerTop>maxTop-19) {
                contentRight.css({
                    "position": "absolute",
                    "right": "2%",
                    "top": "55%",
                    "width" :"24.5%"
                })
            }
        });

        $.ajax({
            url:"servletData/CityServlet",
            data:{},
            dataType:"json",
            type:"post",
            success:function(data){
                console.log(data);
            }
        })




    });
}(window.jQuery));