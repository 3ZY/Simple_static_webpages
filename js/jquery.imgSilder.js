/**

 * 图片切换插件
 * Powered By Mr Zhou
 * QQ 627266138
 * E-mail 627266138qq.com
 * Date 2013-012-24
 * Dependence jquery-1.7.2.min.js
 **/

(function ($) {
  //调用方式 $('#silder').imgSilder({s_width:564, s_height:293, is_showTit:true, s_times:3000,css_link:'css/style.css'});  容器必须加入 id silder_list or class silder_list
  /*参考结构
	<div class="silder" id="silder">
		<ul class="silder_list" id="silder_list">
			<li>
				<img src="css/img/1.jpg" border="0" alt="刘淇同志参观北京市志愿者之家">
			</li>
			<li>
				<img src="css/img/2.jpg" border="0" alt="刘淇同志与志愿者合影">
			</li>
			<li>
				<img src="css/img/3.jpg" border="0" alt="刘淇同志到北京大学人民医院调研">
			</li>
			<li>
				<img src="css/img/4.jpg" border="0" alt="2013中国志愿服务国际交流大会在京举行">
			</li>                    
		</ul>
	</div>
  */
  $.fn.silderDefaults = { //默认参数
    s_width:500, //容器宽度
	s_height:500, //容器高度
	is_showTit:true, // 是否显示图片标题 false :不显示，true :显示
	s_times:3000, //设置滚动时间
	css_link:'css/style.css'
  };
  $.extendSilder = function (obj,opt) { //obj 元素对象，opt 参数对象
    var g = {  //公共方法， 外部可调用
      //初始化
		init: function () {
			var wh ={width:opt.s_width,height:opt.s_height};
			var pagesize=0; //页码
			var silderList = $('#silder_list',g.obj);
			var silderList_li = $('#silder_list li',g.obj);
			g.LoadCSS(opt.css_link); //样式文件导入
			g.obj.css(wh); silderList.css(wh); silderList_li.find('img').css(wh); //设置宽高属性
			var currHtml = ""; //加入播放页码 及文字描述
			if(opt.is_showTit){ //判断是否显示标题
				currHtml += "<div class='silder_desc' id='silder_desc'></div>";
			}
			img_size = silderList_li.size() ;//图片个数
			
			currHtml += "<ul class='silder_page' id='silder_page'>";//分页码代码注入
			for(var i=0; i < img_size; i++){
				currHtml += "<li>"+ parseInt((1 + i),10) +"</li>";
			}
			currHtml +="</ul>";
            silderList_li.eq(0).show().siblings().hide(); //初始化隐藏其他图片
			g.obj.append(currHtml);//注入分页码
			var silderPage = $('#silder_page',g.obj);
			var silderPage_li =$('#silder_page li',g.obj);
			silderPage_li.eq(0).addClass('current');

			if(opt.is_showTit){ //初始化图片描述
				$('#silder_desc').text(silderList_li.eq(0).find('img').attr('alt'));
			}
			silderPage_li.on('click',function(){
				pagesize = $(this).index();
				silderList_li.eq(pagesize).fadeIn(1000).siblings().fadeOut(100);
				$(this).addClass('current').siblings().removeClass('current');
				if(opt.is_showTit){
					$('#silder_desc').text(silderList_li.eq(pagesize).find('img').attr('alt'));
				}
			});
			
			var t;
			silderList.hover(function(){window.clearInterval(t); return;},function(){ t = window.setInterval(function(){
				if(pagesize < img_size && pagesize >= 0)
				{
					silderList_li.eq(pagesize).fadeIn(1000).siblings().fadeOut(100);
					silderPage_li.eq(pagesize).addClass('current').siblings().removeClass('current');
					if(opt.is_showTit){
						$('#silder_desc').text(silderList_li.eq(pagesize).find('img').attr('alt'));
					}
					pagesize++;
					if(pagesize >= img_size){
						pagesize = 0;
					}
				}
			},opt.s_times);}).trigger("mouseout"); //悬浮时 停止自动动画,trigger 起默认触发作用
			
		},
		  LoadCSS:function(url){ //新建css
			var s = document.createElement("LINK");
				s.rel = "stylesheet";
				s.type = "text/css";
				s.href = url;
				document.getElementsByTagName("HEAD")[0].appendChild(s);
		  }
    };
    g.obj = $(obj);
    g.init();
    return g;
  }
  $.fn.imgSilder = function (options) {
    if (this.length == 0) return; //判断对象是否存在
    this.each(function () {
      if (this.usedSilder) return;
      var opt = $.extend({}, $.fn.silderDefaults, options); //合并已赋值参数
      this.usedSilder = $.extendSilder(this, opt);
    });
  }
})(jQuery);