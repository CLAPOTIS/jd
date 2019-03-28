window.onload=function(){
	search();
	banner();
	downTime();
}
/*搜索*/
var search=function(){
	var search=document.querySelector(".jd_search_box");
	var banner=document.querySelector(".jd_banner");
	/*轮播图的高度*/
	var height=banner.offsetHeight;

	/*监听滚动事件*/
	window.onscroll=function(){
		/*当前页面滚动的距离*/
		var top=document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;/*谷歌：移动端浏览器内核与谷歌一致*/
		/*ie:document.documentElement.scrollTop*/
		/*谷歌:document.body.scrollTop（移动端与其一致）*/
		var opacity=0;
		if(top>height){
			opacity=0.85;			
		}else{			
			opacity=0.85*(top/height);
		}
		/*设置颜色*/
		search.style.background="rgba(216,80,92,"+opacity+")";
	}
}
/*轮播图*/
var banner=function(){
	 /*
	 1.无缝滚动&无缝滑动（定时器 过渡+位移）
	 2.点盒子对应改变（改变当前样式：now）
	 3.可以滑动（touch事件，监听触摸点坐标）
	 4.当滑动距离不够的时候，吸附作用（过渡+位移）
	 5.当滑动距离够了的时候，跳转上一张、下一张（判断方向，过渡+位移）
	 */
	
	//获取需要的dom元素
	var banner=document.querySelector(".jd_banner");
	//轮播图宽度
	var width=banner.offsetWidth;
	var imageBox=banner.querySelector("ul:first-child");//ul:first是jQuery封装的选择器
	var pointBox=banner.querySelector("ul:last-child");
	var points=pointBox.querySelectorAll("li");
	

	//提取几个公用方法
	var addTransition=function(){
		imageBox.style.transition="all 0.2s";
		imageBox.style.webkitTransition="all 0.2s";
	}
	var removeTransition=function(){
		imageBox.style.transition="none";
		imageBox.style.webkitTransition="none";
	}
	var setTranslateX=function(translateX){
		imageBox.style.transform="translateX("+translateX+"px)";
		imageBox.style.webkitTransform="translateX("+translateX+"px)";
	}


	//1.无缝滚动&无缝滑动（定时器 过渡+位移）
	var index=1;//默认索引
	var timer=setInterval(function(){		
		index++;
		//过渡
		addTransition();
		//位移
		setTranslateX(-index*width);
	},1000);
	//过渡结束事件&事件结束事件 
	//transitionend&animationend
	imageBox.addEventListener("transitionend",function(){
		//无缝滚动
		if(index>=9){
			index=1;
			//清除过渡
			removeTransition();
			//瞬间定位到第一张
			setTranslateX(-index*width);
		}
		//无缝滑动
		else if(index<=0){
			index=8;
			//清除过渡
			removeTransition();
			//瞬间定位到第八张
			setTranslateX(-index*width);
		}
		setPoint();
	});

	//2.点盒子对应改变（改变当前样式：now）
	var setPoint=function(){
		for(var i=0;i<points.length;i++){
			points[i].classList.remove("now");
		}
		points[index-1].classList.add("now");
	}
}
/*倒计时*/
var downTime=function(){
	/*1.模拟倒计时的时间：11个小时
	2.利用定时器，1秒1次*/
	var time=60*60*10;
	var skTime=document.querySelector(".sk_time");
	var spans=skTime.querySelectorAll("span");
	var timer=setInterval(function(){
		time--;
		//格式化时间
		var h=Math.floor(time/3600);
		var m=Math.floor(time%3600/60);
		var s=time%60;
		//设置时间
		spans[0].innerHTML=Math.floor(h/10);
		spans[1].innerHTML=h%10;
		spans[3].innerHTML=Math.floor(m/10);
		spans[4].innerHTML=m%10;
		spans[6].innerHTML=Math.floor(s/10);
		spans[7].innerHTML=s%10;
		if(time<=0){
			clearInterval(timer);
		}
	},1000);
}