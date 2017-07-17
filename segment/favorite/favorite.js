(function ($) {
	$(document).ready(function() {
		var init={
			timer:null,
		};
		$(".favorite_commodity").on("mouseenter",function () {
			clearTimeout(init.timer);
			var favorite_commodity_index = $(this).attr("data-href");
			var favorite_commodity_data = $(this).find("div[data]")
                .attr("data");
			init.timer = setTimeout(function () {
				if(favorite_commodity_index == favorite_commodity_data ){
					$(".favorite_commodity").eq(parseInt(favorite_commodity_data))
					.find(".commodity>span,.commodity>div")
					.animate({
					opacity: "1",
					},
					200 );
				}

			},200);
		}).on("mouseleave",function () {
			clearTimeout(init.timer);
			$(".commodity>span,.commodity>div").animate({
				opacity: "0",
				},
				200);
		})
	});
}(window.jQuery));