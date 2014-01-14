var map = new BMap.Map("map");                              // 创建Map实例
!function(){ //初始化地图模块相关代码
    map.enableScrollWheelZoom();                            // 启用滚轮放大缩小 map.enableContinuousZoom();                             // 启用地图惯性拖拽，默认禁用 map.enableInertialDragging();                           // 启用连续缩放效果，默认禁用。 map.addControl(new BMap.NavigationControl());           // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());                // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());          // 添加缩略地图控件
    map.addControl(new BMap.MapTypeControl());              // 添加地图类型控件
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("北京");                             //由于有3D图，需要设置城市哦
}();

/**
 * 一些常用的方法
 */
var Util = {
    /**
     * 根据类型的id获取相应的名称
     * @param Number typeid
     * @return String 名称
     */
    getLeaseNameByType: function(type) {
        var lease = {
            '1' : "整租",
            '2' : "单间出租",
            '3' : "单间出租(隔断)",
            '4' : "床位出租"
        }
        return lease[type];
    },
    /**
     * 设置Map容器的高度
     */
    setMapHeight: function() {
        var mapBoxHeight = $(window).height()  - $('#pageHeader').height() - $('#pageMiddle').height() - 38;
        $('#mapBox').css({height: mapBoxHeight + 'px'});
    },
    //跳转到小猪短租页时添加统计
	
   
}





    /**
     * 条件筛选模块相关代码 start
     * 条件筛选的数据
     */
    var filterData = [
        {
            "name"  : "区域",
            "value" : "location",
            "data"  : [
                {
                    "name"  : "朝阳",
                    "value" : "朝阳"
                },
                {
                    "name"  : "海淀",
                    "value" : "海淀"
                },
                {
                    "name"  : "东城",
                    "value" : "东城 "
                },
                {
                    "name"  : "西城",
                    "value" : "西城 "
                },
                {
                    "name"  : "崇文",
                    "value" : "崇文"
                },
                {
                    "name"  : "宣武",
                    "value" : "宣武"
                },
                {
                    "name"  : "丰台",
                    "value" : "丰台"
                },
                {
                    "name"  : "通州",
                    "value" : "通州"
                },
                {
                    "name"  : "石景山",
                    "value" : "石景山"
                },
                {
                    "name"  : "房山",
                    "value" : "房山"
                },
                {
                    "name"  : "昌平",
                    "value" : "昌平"
                },
                {
                    "name"  : "大兴",
                    "value" : "大兴"
                },
                {
                    "name"  : "顺义",
                    "value" : "顺义"
                },
                {
                    "name"  : "密云",
                    "value" : "密云"
                },
                {
                    "name"  : "怀柔",
                    "value" : "怀柔"
                },
                {
                    "name"  : "延庆",
                    "value" : "延庆"
                },
                {
                    "name"  : "平谷",
                    "value" : "平谷"
                },
                {
                    "name"  : "门头沟",
                    "value" : "门头沟"
                }
            ]
        },
        {
            "name"  : "租金",
            "value" : "dayprice",
            "data"  : [
                {
                    "name"  : "50元以下",
                    "value" : "0,50"
                },
                {
                    "name"  : "50-100元",
                    "value" : "50,100"
                },
                {
                    "name"  : "100-105元",
                    "value" : "100,150"
                },
                {
                    "name"  : "150-200元",
                    "value" : "150,200"
                },
                {
                    "name"  : "200-250元",
                    "value" : "200,250"
                },
                {
                    "name"  : "250-300元",
                    "value" : "250,300"
                },
                {
                    "name"  : "300元以上",
                    "value" : "300,10000"
                }
            ]
        },
        {
            "name"  : "类型",
            "value" : "leasetype",
            "data"  : [
                {
                    "name"  : "整套出租",
                    "value" : "1,1"
                },
                {
                    "name"  : "单间出租",
                    "value" : "2,2"
                },
                {
                    "name"  : "单间出租(隔断)",
                    "value" : "3,3"
                },
                {
                    "name"  : "床位出租",
                    "value" : "4,4"
                }
            ]
        }
    ]
/*
    for (var i in filterData) { //条件筛选的各个项
        var item = filterData[i],
            data = item.data,
           // dl = $('<dl id="' + item.value + '" class="dl-horizontal" value="' + item.value + '"><dt>' + item.name + '：</dt></dl>'),
		    dl = $('<dl id="' + item.value + '" class="dl-horizontal" value="' + item.value + '"><dt>' + item.name + '：</dt></dl>'),
            ul = $('<ul class="inline"></ul>');
        for(var j in data) { //各个项对应的各详细选项
            var subData = data[j];
            $('<li><a href="###" value = "' + subData.value + '">' + subData.name +'</a></li>').appendTo(ul);
        }
        ul.appendTo($('<dd></dd>')).appendTo(dl);chgMode
        dl.appendTo($('#filterBox'));
		
    }

	*/
	
    // 点击选择项的事件
    $('#filterBox li a').click(function(){
        var type = $(this).parents('dl').attr('value');
        $('#' + type + " li a").removeClass('activate');
        if (!$(this).hasClass('activate')) { //点击的不是当前的选项
            $(this).addClass('activate');
            $('#selectedValue div[type$=' + type + ']').remove(); //当前条件之前选择过的条件删除
            var item = $('<div class="span1" value="' + $(this).attr('value') + '" type="' + type + '"><span>' + $(this).html() + '</span></div>');
            //添加删除按钮
            var deleteBtn = $('<i class="icon-remove"></i>').click(function(){
                $(this).parent().remove();
                $('#' + type + " li a").removeClass('activate');
                keyword = $('#keyword').val();
                searchAction(keyword);
            });
            deleteBtn.appendTo(item); 
            item.appendTo('#selectedValue'); //添加当前的筛选条件
            keyword = $('#keyword').val();
            searchAction(keyword); 
        }
    });

    //条件筛选模块相关代码 end

    //检索模块相关代码
    var keyword     = "",   //检索关键词
        page        = 0,    //当前页码
        points      = [],   //存储检索出来的结果的坐标数组
        customLayer = null; //麻点图层
  //  customLayer=new BMap.CustomLayer(4392); //新建麻点图图层对象
  //  map.addTileLayer(customLayer); //将麻点图添加到地图当中
   // customLayer.addEventListener('hotspotclick', hotspotclickCallback); //给麻点图添加点击麻点回调函数

    /**
     * 麻点图点击麻点的回调函数
     * @param 麻点图点击事件返回的单条数据
     */
	
	 /*
    function hotspotclickCallback(e) {
        var customPoi = e.customPoi,
		    str = [];
		str.push("address = " + customPoi.address);
		str.push("phoneNumber = " + customPoi.phoneNumber);
        var content = '<p style="width:280px;margin:0;line-height:20px;">地址：' + customPoi.address + '</p>';
        //创建检索信息窗口对象
        var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title: customPoi.title,  //标题
            width: 290,              //宽度
            height: 40,              //高度
            enableAutoPan : true,    //自动平移
            enableSendToPhone: true, //是否显示发送到手机按钮
            searchTypes :[
                BMAPLIB_TAB_SEARCH,   //周边检索
                BMAPLIB_TAB_TO_HERE,  //到这里去
                BMAPLIB_TAB_FROM_HERE //从这里出发
            ]
        });
        var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
        searchInfoWindow.open(point); //打开信息窗口
    }
	*/

    //绑定检索按钮事件
    $('#searchBtn').bind('click', function(){
	   
        keyword = $('#keyword').val();
		
       searchAction(keyword);
    });
	   $('#searchBtnadd').bind('click', function(){
	   	 var city=document.getElementById("curCity").innerHTML;
     var   title = $('#title').val();
	 var   address = $('#address').val();
	 var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
myGeo.getPoint(address, function(point){


  
 	 $.post("addnewpoint.php", {title: title, address: address,ak:"4674a004717700fd5be7173f20142683",geotable_id:"47911",latitude:point.lat,longitude:point.lng,coord_type:"1"},
   function(data){
    if(data="0")
	alert("添加成功");
	else 
	alert("添加失败");
	
	
   });
		//post



  
  
  
  
  
}, city);
	 

		
		
      
    });


	
	
    /**
     * 进行检索操作
     * @param 关键词
     * @param 当前页码
     */

    function searchAction(keyword, page) {
	 var city=document.getElementById("curCity").innerHTML;
	  page = page || 0;
        var filter = []; //过滤条件
        $.each($('#selectedValue div'), function(i, item){ //将选中的筛选条件添加到过滤条件参数中
            var type = $(item).attr('type'),
                value = $(item).attr('value');
            if (type == "location") {
                keyword = value + " " + keyword;
            } else {
                filter.push(type + ':' + value);
            }
        });
		
		
		
		
		
	var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
myGeo.getPoint(keyword, function(point){

  if (1) {
  //alert(point.lng);
  var pointstring=point.lng+','+point.lat;
   g_point=point;
  
 
  //alert(pointstring);
       var url = "http://api.map.baidu.com/geosearch/v2/nearby?callback=?";
	 
	  
	   if(flag){
      $.getJSON(url, {
            'q'          : '', //检索关键字
            'page_index' : page,  //页码
            'filter'     : filter.join('|'),  //过滤条件
            'location'    : pointstring,  //北京的城市id
           // 'scope'      : '2',  //显示详细信息
            'geotable_id': 47911,
		    'page_size':50,
			'radius':9555,
            'ak'         : '4674a004717700fd5be7173f20142683'  //用户ak
        },function(e) {
			   
            renderList(e, page + 1);
            renderMap(e, page + 1);
        });
		
		
	
  }
else { 
        $.getJSON(url, {
            'q'          : '', //检索关键字
            'page_index' : page,  //页码
            'filter'     : filter.join('|'),  //过滤条件
            'location'    : pointstring,  //北京的城市id
           // 'scope'      : '2',  //显示详细信息
            'geotable_id': 48184,
		    'page_size':50,
			'radius':9555,
            'ak'         : '4674a004717700fd5be7173f20142683'  //用户ak
        },function(e) {
			   
            renderList(e, page + 1);
            renderMap(e, page + 1);
        });
  
  
  
  
  
  
  
 
  }
  
  
  
  
  }
}, city);

	
      
				 
	
 
    }

    //绑定展开/收起事件
    $('#toggleBtn').bind('click', function(){
        $('#filterBox').toggle('normal', function(){ 
            Util.setMapHeight();
        });
    });

    //办定列表/地图模式切换事件
    $('#chgMode').bind('click', function(){
	 //模式切换
	 
	 
	 
	 
	if(flag){
	
	
	
keyword = $('#keyword').val();

if(keyword==""){
keyword = document.getElementById("curCity").innerHTML;

}


	 var city=document.getElementById("curCity").innerHTML;
	  page = page || 0;
        var filter = []; //过滤条件
        $.each($('#selectedValue div'), function(i, item){ //将选中的筛选条件添加到过滤条件参数中
            var type = $(item).attr('type'),
                value = $(item).attr('value');
            if (type == "location") {
                keyword = value + " " + keyword;
            } else {
                filter.push(type + ':' + value);
            }
        });
		
		
		
		
		
	var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
myGeo.getPoint(keyword, function(point){

  if (1) {
  //alert(point.lng);
  var pointstring=point.lng+','+point.lat;
   g_point=point;
  
 
  //alert(pointstring);
       var url = "http://api.map.baidu.com/geosearch/v2/nearby?callback=?";
      $.getJSON(url, {
            'q'          : '', //检索关键字
            'page_index' : page,  //页码
            'filter'     : filter.join('|'),  //过滤条件
            'location'    : pointstring,  //北京的城市id
           // 'scope'      : '2',  //显示详细信息
            'geotable_id': 48184,//实时表
		    'page_size':50,
			'radius':9555,
            'ak'         : '4674a004717700fd5be7173f20142683'  //用户ak
        },function(e) {
			   
            renderList(e, page + 1);
            renderMap(e, page + 1);
        });
  
  
  
  
  
  
  }
}, city);

	
      flag=0;
				 
	}
	else{ 
	var city=document.getElementById("curCity").innerHTML;
		
keyword = $('#keyword').val();

if(keyword==""){
keyword = document.getElementById("curCity").innerHTML;

}
searchAction(keyword);
	
	
	flag=1;
	}
 

	/*
	
        $('#listBox').toggle('normal');
        $('#mapBox').toggle('normal', function(){
            if ($('#mapBox').is(":visible")) { //单显示地图时候，设置最佳视野
                map.setViewport(points);
            };
        });
		
		*/
		
    });

    /**
     * 渲染地图模式
     * @param result
     * @param page
     */
    function renderMap(res, page) {
	
        var content = res.contents;
        $('#mapList').html('');
        map.clearOverlays();
        points.length = 0;

        if (content.length == 0) {
            $('#mapList').append($('<p style="border-top:1px solid #DDDDDD;padding-top:10px;text-align:center;text-align:center;font-size:18px;" class="text-warning">抱歉，没有找到您想要的内涝信息，请重新查询</p>'));
            return;
        }
 
        $.each(content, function(i, item){
	
//var myIcon = new BMap.Icon("yanzhong.png", new BMap.Size(30,30));
// marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注

		if(item.hz_type!="0"){

            var point = new BMap.Point(item.location[0], item.location[1]),
			
			
                marker = new BMap.Marker(point);
			
				//创建小狐狸
//var pt = new BMap.Point(55, 39.909);
if(item.hz_type=="2"){
var myIcon = new BMap.Icon("yanzhong.png", new BMap.Size(30,30));
 marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注

}
 if(item.hz_type=="1")
{
var myIcon = new BMap.Icon("qingwei.png", new BMap.Size(30,30));
 marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注



}
if(item.hz_type=="3"){
var myIcon = new BMap.Icon("yanzhong.png", new BMap.Size(30,30));
 marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注

}



            points.push(point);
			
		
			
            var tr = $("<tr><td width='75%'>" + item.title + "发生内涝<br/>" + item.address + "</td><td width='25%'>" + "" + "<br/><span style='color:red;'>  </span></td></tr>").click(showInfo);
			
			
			
            $('#mapList').append(tr);
            marker.addEventListener('click', showInfo);
            function showInfo() {
                var content = "<img src='" + item.weibo_pic + "' style='width:111px;height:83px;float:left;margin-right:5px;'/>" +
                              "<p>描述：" + item.title + "发生内涝</p>" +
                              "<p>地址：" + item.address + "</p>" +
                              "<p>" +  ""+ "</p>";
                //创建检索信息窗口对象
                var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                    title  : item.title,       //标题
                    width  : 290,             //宽度
                    panel  : "panel",         //检索结果面板
                    enableAutoPan : true,     //自动平移
                    searchTypes   :[
                        BMAPLIB_TAB_SEARCH,   //周边检索
                        BMAPLIB_TAB_TO_HERE,  //到这里去
                        BMAPLIB_TAB_FROM_HERE //从这里出发
                    ]
                });
                searchInfoWindow.open(marker);
            };
            map.addOverlay(marker);
			
				}
        });
		
		
		
		
		
	


        /**
         * 分页
         */
        var pagecount = Math.ceil(res.total / 10);
        if (pagecount > 76) {
            pagecount = 76; //最大页数76页
        }
        function PageClick (pageclickednumber) {
            pageclickednumber = parseInt(pageclickednumber);
            $("#pager").pager({ pagenumber: pageclickednumber, pagecount: pagecount, showcount: 3, buttonClickCallback: PageClick });
            searchAction(keyword, pageclickednumber -1);
        }
        $("#mapPager").pager({ pagenumber: page, pagecount: pagecount, showcount:3, buttonClickCallback: PageClick });
      
       // map.setViewport(points);
		 map.centerAndZoom(g_point, 15);
		
    };

    /**
     * 渲染列表模式
     * @param result
     * @param page
     */
    function renderList(res, page) {
	
        var content = res.contents;
        $('#listBoby').html('');

        if (content.length == 0) {
            $('#listBoby').append($('<p style="border-top:1px solid #DDDDDD;padding-top:10px;text-align:center;text-align:center;font-size:18px;" class="text-warning">抱歉，没有找到您想要的短租信息，请重新查询</p>'));
            return;
        }

        $.each(content, function(i, item){
		      // alert(item.weibo_pic);
            $('#listBoby').append("<tr><td width='13%'><img src='" + item.weibo_pic + "' style='width:111px;height:83px;'/></td><td width='67%'>" + item.title + "<br/>地址：" + item.address + "<br/>类型：" + Util.getLeaseNameByType(item.leasetype) + "</td><td width='20%'>" + item.hz_type + " <span style='color:red;'>元/晚</span></td></tr>");;
        });

        /**
         * 分页
         */
        var pagecount = Math.ceil(res.total / 10);
        if (pagecount > 76) {
            pagecount = 76;
        }
        function PageClick (pageclickednumber) {
            pageclickednumber = parseInt(pageclickednumber);
            $("#pager").pager({ pagenumber: pageclickednumber, pagecount: pagecount, showcount:9, buttonClickCallback: PageClick });
            searchAction(keyword, pageclickednumber -1);
        }
        $("#pager").pager({ pagenumber: page, pagecount: pagecount, showcount:9, buttonClickCallback: PageClick });
    }

    searchAction(keyword);


$(document).ready(function(){
    Util.setMapHeight();
	searchAction("北京");
	flag=1;
});
