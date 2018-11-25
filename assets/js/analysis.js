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
					document.getElementById("url").value = obj.url;
				}
			} else {
				url = document.getElementById("url").value;
			}
			getUrlTitle({
				url: url,
				callback:function(obj){
					document.title=obj+" 女娲帮解析 有您更精彩!";
					$(".title-text").text(obj);
				}
			});

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
		function getUrlTitle(obj) {
			if (obj != null || obj.url != null) {
				$.ajax({
					url: "http://guide.nvwas.com/sigu/data/title.php",
					type: "POST",
					data: {
						titurl: obj.url
					},
					headers : {'contentType':'application/x-www-form-urlencoded'},
					success: function(data) {
						if(obj.callback!=null){
							obj.callback(data);
						}
					}
				});
			}
			return "";
		}
		init();
	});
}, 1000);
