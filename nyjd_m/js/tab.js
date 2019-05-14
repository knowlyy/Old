$(window).scroll(function(){
	var topScr=$(window).scrollTop();
	if (topScr> 0) {
		$(".nav-bar").addClass("fixed");
	}else{
		$(".nav-bar").removeClass("fixed");
	}
})
$(document).ready(function(){

	function tab(id) {
		$(id +" .tab-hd span:first").addClass("current");
		$(id +" .tab-bd-con:gt(0)").hide();
		$(id +" .tab-hd span").click(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
			$(this).addClass("current").siblings(id +" .tab-hd span").removeClass("current");
			$(id +" .tab-bd-con:eq("+$(this).index()+")").show().siblings(id +" .tab-bd-con").hide().addClass("current");
		});
		$("#layout-t").on("click", function(e){
			$(id +" .tab-bd").show();
		
			// $(document).on("click", function(){
			// 	$(id +" .tab-bd").hide();
			// });
		
			e.stopPropagation();
		});
		$(id +" .tab-bd-con").on("click", function(e){
			e.stopPropagation();
		});
	}
	tab("#layout-t");
	tab("#layout-t1");
	tab("#layout-t2");
});




(function (doc, win) {
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		if(clientWidth>=640){
			docEl.style.fontSize = '100px';
		}else{
			docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
		}
		};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(document).ready(function(){
	$('.drawer').drawer();
});
