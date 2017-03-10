/**
 * Created by Administrator on 2016/11/28.
 */
$(function(){
    // 轮播图部分
    function resize(){
        var isSmallScreen = $(window).width() < 768;
        $("#main_ad > .carousel-inner > .item ").each(function(i,item){
            var imgSrc = $(item).data(isSmallScreen ? 'img-xm' :'img-lg');
            $(item).css("backgroundImage","url("+imgSrc+")");

            //为了在小图时图片能够等比例缩小在小图时用img标签
            if(isSmallScreen){
                $(item).html("<img src='"+imgSrc+"'>");
            }else{
                $(item).empty();
            }
        })
    }
   $(window).on("resize" ,resize).trigger("resize");

    // 产品推荐

    //1.初始化tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //2控制导航栏标签页的容器宽度
    var $lis = $('.nav-wapper .nav').children();
    //console.log($lis);
    var width = 0;
    $lis.each(function(index , element){
        //console.log(element.clientWidth);
        width += element.clientWidth;
        //console.log(width);
    });
    // $.each($lis , function(index,element){
    //     console.log($(element).width());
    // })

    if(width > $(window).width()){
        $('.nav-wapper .nav').css('width',width).parent().css('overflow-x','scroll');
    }
    //3 新闻标题模块换标题
    $(".nav-pills a").on('click' , function(){
        var title = $(this).data('title');
        $('#news .new-title').text(title);
    })

    // 移动端轮播图滑动
    //获取轮播图的容器
    var $carousel = $(".carousel");
    var startX = 0;
    var endX = 0;
    var offset = 50;
    //为容器绑定touchstart事件,获得初始滑动的位置
    $carousel.on('touchstart' , function(e){
        startX = e.originalEvent.touches[0].clientX;
        console.log(e);
    });
    //为容器绑定touchmove事件，利用变量赋值覆盖来记录滑动最后位置的值；
    $carousel.on('touchmove' , function(e){
        endX = e.originalEvent.touches[0].clientX;
    });
    //为容器绑定touchend事件，来判断轮播图应该是显示上一张还是下一张；
    $carousel.on('touchend' , function (e) {
        var distance = Math.abs(startX - endX);
        if(distance >= offset){
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });
        
    
})

