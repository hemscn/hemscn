/*!
 @Name: Htl
 @Description：Htl工具类
 @Homepage: www.nvwas.com
 @Author: hemscn
 */
;
!function(win) {
	"use strict";
	var doc = document,
		modules = [{
			name: "jquery",
			url: '//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
			callback: function() {
				htl.jquery = htl.$ = jQuery;
			}
		}],
		Htl = function() {
			this.v = '0.0.1'; //版本号
		};
	//初始化完成执行
	Htl.prototype.use = function(callback) {
		var that = this,
			tempModules = Object.assign([], modules);
		//加载完毕
		function onScriptLoad(apps) {
			var head = doc.getElementsByTagName('head')[0],
				apps = typeof apps === 'string' ? [apps] : apps;
			//是否需要加载外部资源
			if (apps.length === 0) {
				return onCallback();
			}
			//回调
			function onCallback() {
				apps.length > 1 ? onScriptLoad(apps.slice(1)) : callback();
			}
			var item = apps[0];
			if (!htl[item.name]) {
				var node = doc.createElement('script');
				node.async = true;
				node.charset = 'utf-8';
				node.src = item.url;
				head.appendChild(node);
				if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
					!isOpera) {
					node.attachEvent('onreadystatechange', function(e) {
						item.callback != null ? item.callback():null;
						onCallback();
					});
				} else {
					node.addEventListener('load', function(e) {
						item.callback != null ? item.callback():null;
						onCallback();
					}, false);
				}


			}
			return that;


		}
		onScriptLoad(tempModules);
	}
	//获取Url参数
	Htl.prototype.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		};
	win.htl = new Htl();
}(window);