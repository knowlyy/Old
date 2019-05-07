$(document).ready(function(){
$("#layout-t .tab-hd span:first").addClass("current");
$("#layout-t .tab-bd-con:gt(0)").hide();
$("#layout-t .tab-hd span").click(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t .tab-hd span").removeClass("current");
	$("#layout-t .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t .tab-bd-con").hide().addClass("current");
});
$("#layout-t").on("click", function(e){
    $("#layout-t .tab-bd").show();

    $(document).one("click", function(){
        $("#layout-t .tab-bd").hide();
    });

    e.stopPropagation();
});
$("#layout-t .tab-bd-con").on("click", function(e){
    e.stopPropagation();
});




$("#layout-t1 .tab-hd span:first").addClass("current");
$("#layout-t1 .tab-bd-con:gt(0)").hide();
$("#layout-t1 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t1 .tab-hd span").removeClass("current");
	$("#layout-t1 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t1 .tab-bd-con").hide().addClass("current");
});

$("#layout-t2 .tab-hd span:first").addClass("current");
$("#layout-t2 .tab-bd-con:gt(0)").hide();
$("#layout-t2 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t2 .tab-hd span").removeClass("current");
	$("#layout-t2 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t2 .tab-bd-con").hide().addClass("current");
});

$("#layout-t3 .tab-hd span:first").addClass("current");
$("#layout-t3 .tab-bd-con:gt(0)").hide();
$("#layout-t3 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t3 .tab-hd span").removeClass("current");
	$("#layout-t3 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t3 .tab-bd-con").hide().addClass("current");
});

$("#layout-t4 .tab-hd span:first").addClass("current");
$("#layout-t4 .tab-bd-con:gt(0)").hide();
$("#layout-t4 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t4 .tab-hd span").removeClass("current");
	$("#layout-t4 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t4 .tab-bd-con").hide().addClass("current");
});

$("#layout-t5 .tab-hd span:first").addClass("current");
$("#layout-t5 .tab-bd-con:gt(0)").hide();
$("#layout-t5 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t5 .tab-hd span").removeClass("current");
	$("#layout-t5 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t5 .tab-bd-con").hide().addClass("current");
});

$("#layout-t6 .tab-hd span:first").addClass("current");
$("#layout-t6 .tab-bd-con:gt(0)").hide();
$("#layout-t6 .tab-hd span").mouseover(function(){//mouseover 改为 click 将变成点击后才显示，mouseover是滑过就显示
	$(this).addClass("current").siblings("#layout-t6 .tab-hd span").removeClass("current");
	$("#layout-t6 .tab-bd-con:eq("+$(this).index()+")").show().siblings("#layout-t6 .tab-bd-con").hide().addClass("current");
});
});

