var script = document.createElement("script");
script.type = "text/javascript";
script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(function() {
	$(document).ready(function() {
		$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		};

		function jiexi(obj) {
			var jiekou = document.getElementById("jiekou").value;
			var url = document.getElementById("url").value;
			if (obj != null) {
				if (obj.url == null) {
					return;
				} else {
					url = obj.url;
				}
			} else {
				url = document.getElementById("url").value;
			}

			document.getElementById("videoView").src = jiekou + url;
		}
		$("#doplayers").click(function() {
			jiexi();
		});
		$("#jiekou").on("change", function xuanzejiekou(v) {
			var url = document.getElementById("url").value;
			if (url == "") {
				alert('请输入视频网站网址！');
				return "";
			}
			jiexi();
		});

		function init() {
			var url = $.getUrlParam('url');
			jiexi({
				url: url
			});
		}
		init();
	});
}, 1000);
