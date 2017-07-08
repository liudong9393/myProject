/**
 * Created by ld on 2017/7/6.
 */
(function($){
    $(document).ready(function(){
        var init={
            //初始化setInterval和setTimeout
            timer:null,
            cancelInterval:null,
            count:1,


            className:{
                pic:$(".commodity_content_rotation_big .commodity_content_img"),
                commodityContentRotation:$(".commodity_content_rotation")
            },
            //导航栏全部分类的展开和闭合
            navStyle:function(){
                var href = $(this).attr("data-href");
                $(".container_right_content_ul>li").attr("class"," ");
                $("[data-index='"+href+"']").addClass("act");
            },
            //
            allCloseClassify:function(){
                clearTimeout(init.timer);
                $(".nav_bottom_left").animate({height:"0"});
            },
            allOpenClassify:function(){
                clearTimeout(init.timer);
                init.timer = setTimeout(function() {
                    $(".nav_bottom_left").animate({height:"350.4px"});
                    return false;
                }, 300);
            },
            rotation:function(){
                init.className.pic.removeClass("index");
                init.className.pic.eq(init.count).addClass("index");
                if(init.count > init.className.pic.length-2){
                    init.count=0;
                }else{
                    init.count++;
                }
            },
            cancelRotation:function(){
                clearInterval(init.cancelInterval);
            },
            smallRotation:function(){
                init.className.pic.removeClass("index");
                init.className.pic.eq($(this).attr("data-index")).addClass("index");
            }
        };
        $(".container_left_nav_ul").on("click","li",init.navStyle);
        $(".nav_loop").mouseenter(init.allOpenClassify).mouseleave(init.allCloseClassify);

        //init.rotation;
        init.cancelInterval = setInterval(function(){init.rotation()},3000);
        init.className.commodityContentRotation.on("mouseenter",init.cancelRotation).on("mouseleave",function(){
            init.cancelInterval = setInterval(function(){init.rotation},3000);
        });
        $(".commodity_content_rotation_small").on("mouseenter",".commodity_content_img",init.smallRotation);
    })
}(window.jQuery));


