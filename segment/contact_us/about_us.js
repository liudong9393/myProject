/*  */
(function($){
    $(document).ready(function(){
        var init={
            timer:null
        };
        $(".container_left_nav_ul").on("click","li",function(){
            var href = $(this).attr("data-href");
            $(".container_right_content_ul>li").attr("class"," ");
            $("[data-index='"+href+"']").addClass("act");
        });
        $(".nav_loop").mouseenter(function(){
            clearTimeout(init.timer);

            init.timer = setTimeout(function() {
                $(".nav_bottom_left").animate({height:"350.4px"});
                return false;
            }, 300);
        }).mouseleave(function(){
            clearTimeout(init.timer);
            $(".nav_bottom_left").animate({height:"0"});
        })
    })
}(window.jQuery));























