export function TMap() {
	return new Promise(function (resolve, reject) {
		window.init = function () {
			resolve(qq)//注意这里
		}
		var key = 'XBJBZ-HUKLX-IPJ4F-7QYMB-HZZUE-4XFX4'
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key="+key;
		script.onerror = reject;
		document.head.appendChild(script);
	})
}