//定义控制器,引入路由模块
var app = angular.module('cassieApp', ['ngRoute']);
//将$location挂载到全局作用域$rootScope
app.run(['$rootScope','$location',function($rootScope,$location){
	$rootScope.$location = $location;
	$rootScope.addAct = "/home";
	// 路由改变成功触发的事件
	$rootScope.$on('$routeChangeSuccess',function(event,current,previous){
		switch($location.path()){
			case '/home':
			$rootScope.addAct = "/home";
			break;
		case '/introduce':
			$rootScope.addAct = "/introduce";
			break;
		case '/skills':
			$rootScope.addAct = "/skills";
			break;
		case '/works':
			$rootScope.addAct = "/works";
			break;	
			}
	});
	//$routeChangeError 失败触发
}]);
// 配置路由
app.config(['$routeProvider',function($routeProvider){
	$routeProvider
        .when('/home', {
            templateUrl: 'homeview',
            controller  : 'homeCtrl'
        })
        .when('/introduce', {
        	templateUrl: 'introduceview',
        	controller  : 'introduceCtrl'
        })
        .when('/skills', {
        	templateUrl: 'skillsview',
        	controller  : 'skillsCtrl'
        })
        .when('/works', {
            templateUrl: 'worksview',
            controller  : 'worksCtrl'
        })
        .otherwise({
        	redirectTo:"/home"
        });
}]);
//主页控制器
app.controller('homeCtrl',['$scope','$timeout',function($scope,$timeout){
	$scope.message = '我是常德，能来到我这里的都是大美女大帅哥,哇哈哈~';
}]);
//简介页控制器
app.controller('introduceCtrl',['$scope','$interval',function($scope,$interval){
	$scope.message = '这是我建立的第一个网站，它搭建在GitHub的静态页面上。我喜欢将自己的内容留在网络上，以前用网易的博客自由行挺大的，只不过它关停了，一直没有找到合适的，突然有一次在B站上看到了，可以用GitHub搭建个人博客，我认为GitHub完全够用，因为我只用它来存一些简单的事'
	
	$scope.bigger=function(obj){
		console.log(obj)
		obj.style.left="0"
		$(this).transform('rotate(0)')
	}
	$scope.intros = [
		{
			src : "img/introduce01.png"
		},
		{
			src : "img/introduce02.png"
		},
		{
			src : "img/introduce03.png"
		},
	]
	
	$scope.imgs1 = [
		{
			src : "img/eat02.jpg",
			tag : '最爱的一抹绿'
		},
		{
			src : "img/eat03.jpg",
			tag : '和闺蜜的小情调'
		},
		{
			src : "img/eat04.jpg",
			tag : '偶尔喝喝咖啡'
		},
		{
			src : "img/eat05.jpg",
			tag : '从未抛弃过的肉肉'
		},
		{
			src : "img/eat01.jpg",
			tag : '冰点体验'
		},
		{
			src : "img/eat06.jpg",
			tag : '百喝不厌玉米浓汤'
		},
		{
			src : "img/eat07.jpg",
			tag : '不错的搭配'
		},
		{
			src : "img/eat08.jpg",
			tag : '传说中的网红面包店'
		}
	];

	$scope.imgs2 = [
		{
			src : "img/mini01.jpg"
		},
		{
			src : "img/mini04.jpg"
		},
		{
			src : "img/mini08.jpg"
		},
		{
			src : "img/mini05.jpg"
		},
		{
			src : "img/mini07.jpg"
		},
		{
			src : "img/mini06.jpg"
		},
		{
			src : "img/mini02.jpg"
		},
		{
			src : "img/mini03.jpg"
		},
	]
	
	$scope.places = [
		{
			src : "img/travel01.jpg",
			title : "净化心灵--西藏",
			pos : {
				'position' : "absolute",
				"top" : "51%",
				"left" : "4%",
				"transform" : "rotate(36deg)"
			}
		},
		{
			src : "img/travel-arrow01.png",
			pos : {
				'position' : "absolute",
				"top" : "46%",
				"left" : "8%",
				"width" : "20%",
				"transform" : "rotate(0deg)"
			}
		},
		{
			src : "img/travel02.jpg",
			title : "小资情调--厦门",
			pos : {
				'position' : "absolute",
				"top" : "73%",
				"left" : "18%",
				"transform" : "rotate(6deg)"
			}
		},
		{
			src : "img/travel-arrow02.png",
			pos : {
				'position' : "absolute",
				"top" : "61%",
				"left" : "20%",
				"width" : "12%",
			}
		},
		{
			src : "img/travel03.jpg",
			title : "吃货天堂--台湾",
			pos : {
				'position' : "absolute",
				"top" : "49%",
				"left" : "34%",
				"transform" : "rotate(4deg)"
			}
		},
		{
			src : "img/travel-arrow03.png",
			pos : {
				'position' : "absolute",
				"top" : "35%",
				"left" : "35%",
				"width" : "12%"
			}
		},
		{
			src : "img/travel04.jpg",
			title : "彩色国度--新加坡",
			pos : {
				'position' : "absolute",
				"top" : "77%",
				"left" : "49%",
				"transform" : "rotate(10deg)"
			}
		},
		{
			src : "img/travel-arrow04.png",
			pos : {
				'position' : "absolute",
				"top" : "65%",
				"left" : "49%",
				"width" : "20%"
			}
		},
		{
			src : "img/travel05.jpg",
			title : "洪崖洞--重庆",
			pos : {
				'position' : "absolute",
				"top" : "39%",
				"left" : "58%",
				"transform" : "rotate(21deg)"
			}
		},
		{
			src : "img/travel-arrow06.png",
			pos : {
				'position' : "absolute",
				"top" : "50%",
				"left" : "56%",
				"width" : "13%",
				"transform" : "rotate(6deg)"
			}
		},
		{
			src : "img/travel06.jpg",
			title : "九寨沟--四川",
			pos : {
				'position' : "absolute",
				"top" : "62%",
				"right" : "8%",
				"transform" : "rotate(-25deg)"
			}
		},
		{
			src : "img/travel-arrow07.png",
			pos : {
				'position' : "absolute",
				"top" : "52%",
				"right" : "11%",
				"width" : "10%",
				"transform" : "rotate(-10deg)"
			}
		}
	]
	
	
		

}]);
//技能页控制器
app.controller('skillsCtrl',['$scope',function($scope){
	$scope.title = "最近发布的个人随笔"
	$scope.bars = [
		{
			type : "progress-bar-info",
			value : 70,
			description : "Photoshop、Adobe illustrato图形处理工具",
			style : 'width:70%;'
		},
		{
			type : "",
			value : 80,
			description : "HTML+CSS网页布局与样式,熟悉HTML5+CSS3",
			style : 'width:80%;'
		},
		{
			type : "progress-bar-success",
			value : 60,
			description : "Bootstrap、amaze UI 及 Materialize 等框架",
			style : 'width:60%;'
		},
		{
			type : "progress-bar-danger",
			value : 80,
			description : "掌握 javascript 语言及 jQuery",
			style : 'width:70%;'
		},
		{
			type : "progress-bar-warning",
			value : 70,
			description : "熟悉 Git、SVN 版本控制工具，熟练使用 Hbuilder 等开发工具",
			style : 'width:60%;'
		}
	]
}]);
//作品页控制器
app.controller('worksCtrl',['$scope',function($scope){
	$scope.works = [
		{
			title : "IBuilder",
			src : 'img/works01.jpg',
			time : "2016/10/17-2016/10/20",
			type : "(团队项目、网站)一款全面的娱乐型网站",
			knowledge : "HTML5+CSS3+JS+jQuery+Fullpage",
			href : "http://FrankRoc.coding.me/Ibuilder-team-project"
		},
		{
			title : "IVIEW 爱唯友",
			src : 'img/works02.jpg',
			time : "2016/10/17-2016/10/20",
			type : "(个人项目、网站)亦学义行，让你的旅行更有意义",
			knowledge : "HTML5+CSS3+JS+jQuery",
			href : ""
		},
		{
			title : "约周末",
			src : 'img/works03.jpg',
			time : "2016/09/15-2016/09/19",
			type : "(个人项目、网站)不要宅，不要无聊，约周末让你的周末与众不同",
			knowledge : "HTML5+CSS3+JS+jQuery",
			href : "http://cassiesmile.coding.me/weekends/"
		},
//		{
//			title : "Cozy",
//			src : 'img/works04.jpg',
//			time : "2016/09/15-2016/09/19",
//			type : "(个人项目、网站)各种类型的周末放松活动，让你的周末更出彩",
//			knowledge : "HTML5+CSS3+JS+jQuery+bootstrap",
//			href : ""
//		},
//		{
//			title : "俊贰网络",
//			src : 'img/works05.jpg',
//			time : "2016/11/11-2016/11/13",
//			type : "(个人项目)不要宅，不要无聊，约周末让你的周末与众不同",
//			knowledge : "HTML5+CSS3+JS+jQuery+Amaze UI",
//			href : ""
//		},
		{
			title : "指南猫旅行",
			src : 'img/works06.jpg',
			time : "2016/09/15-2016/09/19",
			type : "(模仿、APP)定制专属你的旅行",
			knowledge : "HTML5+CSS3+JS+jQuery",
			href : "http://cassiesmile.coding.me/works/"
		}
	]
	
	$scope.bigImg = function(){
		
	}
}]);

