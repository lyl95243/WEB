/**
 * Created by dell on 2017/5/4.
 */
$(function () {
    var h = $(window).height() - 63;
    $(".contentt,.content,.content_one_wrap li").css({height: h})
    $(window).resize(function () {
        var h = $(window).height() - 63;
        $(".contentt,.content,.content_one_wrap li").css({height: h})
    })
     var gunl=0,index=0;
     // 进入每屏执行的动画
    function animat(){
        if(index==1||gunl==1){
            $(".content_twoTop ul li:nth-child(1),.content_twoTop ul li:nth-child(2)").addClass("animated bounceInLeft")
            $(".content_twoTop ul li:nth-child(3)").addClass("animated bounceInDown")
            $(".content_twoTop ul li:nth-child(4),.content_twoTop ul li:nth-child(5)").addClass("animated bounceInRight")
            $(".content_twoBottom").addClass("animated bounceInUp")
        }else{
            $(".content_twoTop ul li:nth-child(1),.content_twoTop ul li:nth-child(2)").removeClass("animated bounceInLeft")
            $(".content_twoTop ul li:nth-child(3)").removeClass("animated bounceInDown")
            $(".content_twoTop ul li:nth-child(4),.content_twoTop ul li:nth-child(5)").removeClass("animated bounceInRight")
            $(".content_twoBottom").removeClass("animated bounceInUp")
        }
    }
    // 导航开始
    $(".nav ul li").click(function () {
        index = $(this).index()
        gunl=index;
        $(this).addClass("active").siblings().removeClass("active")
        $(".sanjiao").animate({left: index * 180 + 80}, 400)
        $(".content_wrap").animate({top: -index * h}, 800)
        animat()
    })
    // 导航结束
    // 鼠标滚轮
    var scr = true;
    function scroll(event) {
        var e = event || window.event;
        if (e.wheelDelta && scr) {
            if (e.wheelDelta > 0) {  //Chrome 上滚滚轮
                scr = false
                gunl--;
                if (gunl <= 0) {
                   gunl=0
                }
                animat()
                $(".nav ul li").eq(gunl).addClass("active").siblings().removeClass("active")
                $(".sanjiao").animate({left: gunl * 180 + 80}, 400)
                $(".content_wrap").animate({top: -gunl * h}, 800, function () {
                    scr = true
                })
            } else if (e.wheelDelta < 0) {
                scr = false
                gunl++;
                if (gunl >= 4) {
                    gunl = 4
                }
                animat()
                $(".nav ul li").eq(gunl).addClass("active").siblings().removeClass("active")
                $(".sanjiao").animate({left: gunl * 180+ 80}, 400)
                $(".content_wrap").animate({top: -gunl * h}, 800, function () {
                    scr = true
                })
            }
        } else if (e.detail && scr) {
            if (e.detail > 0) {  //ff 下滚滚轮
                scr = false
                gunl++;
                if (gunl >= 3) {
                    gunl = 3
                }
                animat()
                $(".nav ul li").eq(gunl).addClass("active").siblings().removeClass("active")
                $(".sanjiao").animate({left: gunl * 180+80}, 400)
                $(".content_wrap").animate({top: -gunl * h}, 800, function () {
                    scr = true
                })
            } else if (e.detail < 0) {
                scr = false
                gunl--;
                if (gunl <= 0) {
                    gunl = 0
                }
                animat()
                $(".nav ul li").eq(gunl).addClass("active").siblings().removeClass("active")
                $(".sanjiao").animate({left: gunl * 180 + 80}, 400)
                $(".content_wrap").animate({top: -gunl * h}, 800, function () {
                    scr = true
                })
            }
        }
    }
    function scrolWheel() {
        if (document.addEventListener) {
            document.addEventListener("DOMMouseScroll", scroll, false)
        };
        window.onmousewheel = document.onmousewheel = scroll;
    }
    scrolWheel()
    // 滚轮结束
    // 第一屏首页开始
    function next() {
        $(".content_one_wrap").animate({marginLeft:-100+'%'},500,function () {
            $(".content_one_wrap li:first-child").appendTo(".content_one_wrap")
            $(".content_one_wrap").animate({marginLeft:0},0)
        })
    }
    function prev() {
        $(".content_one_wrap li:last-child").prependTo(".content_one_wrap")
        $(".content_one_wrap").animate({marginLeft:-100+'%'},0,function () {
            $(".content_one_wrap").animate({marginLeft:0},500)
        })
    }
    var jieliu=true;
    $(".content_one .next").click(function () {
        if(jieliu){
            next()
            jieliu=false;
            setTimeout(function () {
                jieliu=true;
            },500)
        }
    })
    $(".content_one .prev").click(function () {
        if(jieliu){
            prev()
            jieliu=false;
            setTimeout(function () {
                jieliu=true;
            },500)
        }
    })
    var timer=setInterval(function () {
        next()
    },3000)
    $(".content_one").hover(function () {
        clearInterval(timer)
    },function () {
        timer=setInterval(function () {
            next()
        },3000)
    })
    // 第一屏结束
    // 第二屏公司概况开始
    $(".content_twoTop ul li").click(function () {
        var twoTopIndex=$(this).index();
        $(this).addClass("content_twoTopLi").siblings().removeClass("content_twoTopLi")
        $(".content_twoBottom ul li").eq(twoTopIndex).fadeIn().siblings().fadeOut()
    })
    // 第五屏联系我们开始
    // 百度地图
    var map = new BMap.Map("dituContent");    // 创建Map
    var point = new BMap.Point(116.306499,39.974784)
    map.centerAndZoom(point, 16);    ;  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);
//       map.enableContinuousZoom();    //地图拖拽，
    var opts = {
        width : 100,     // 信息窗口宽度
        height: 50,     // 信息窗口高度
        title : "安态科技" , // 信息窗口标题
        enableMessage:true,//设置允许信息窗发送短息
    }
    var infoWindow = new BMap.InfoWindow("北京市海淀区创而新大厦6-661", opts);  // 创建信息窗口对象
    marker.addEventListener("click", function(){
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
//    放到地图上禁止鼠标滚动事件
    function disabledMouseWheel() {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
    }
    function scrollFunc(evt) {
        return false;
    }
    $("#dituContent").hover(function () {
        console.log(1);
        disabledMouseWheel()
    }, function () {
        scrolWheel()
    })
})