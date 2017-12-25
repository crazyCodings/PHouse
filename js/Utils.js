(function(Utils){
	/**
	 * 从后开始截取字符串、数字长度，不足前面补0
	 * @param {Object} num 
	 * @param {Object} length
	 */
	Utils.preFixInteger = function(num, length){
		return ( Array(length).join('0') + num ).slice(-length);
	}
	/**
	 * 获取当前时间
	 */
	Utils.getCurrentDate = function(format){
		if(format==null || format=="") format = "yyyyMMddhhmmss";
		return Utils.dateFormat(new Date(), format);
	},
	/**
	 * 时间格式化
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	 * @param {Object} fmt
	 */
	Utils.dateFormat = function(date, fmt){
	    var o = {
	        "M+": date.getMonth() + 1, //月份 
	        "d+": date.getDate(), //日 
	        "h+": date.getHours(), //小时 
	        "m+": date.getMinutes(), //分 
	        "s+": date.getSeconds(), //秒 
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	},
	
	/**
	 * 获取用户对象信息，调用后台接口时，验证身份信息
	 */
	Utils.getUser = function() {
		var state = app.getState();
		var User = 	{
			jcwdm: state.homeVillageCode,
			jcwmc: state.homeVillageName,
			jddm: state.streetCode,
			jdmc: state.streetName,
			latticepoint: state.latticePoint,
			pcsdm: state.policeStation,
			pcsmc: state.policeStationName,
			policeid: state.policeStationID,
			xgyid: state.identityId,
			xgyname: state.name,
			xgypid: state.IDCard,
			yhlx: state.personType,
			usertype: state.userType,
			sysimei: state.deviceImei
		}
		return User;
	},
	/**
	 * 检查文件是否存在
	 * @param {Object} path
	 */
	Utils.checkLocalFile = function(path) {
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			console.log("图片存在: " + path + " 存在");
			//如果文件存在,则直接设置本地图片
			//setImgFromLocal(imgId, relativePath);
		}, function(e) {
			console.log("图片不存在,从服务端获取" + relativePath);
			//如果文件不存在,联网下载图片
			//setImgFromNet(imgId, loadUrl, relativePath);
		});
	},
	/**
	 * base64图片数据保存，保存路径:/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/img
	 * @param {String} filaname
	 * @param {String} base64
	 * @return {String}｝图片src路径
	 */
	Utils.saveBase64AsPicture = function(filaname, base64) {
		var relativePath = "_doc/img/" + filaname;
		var bitmap = new plus.nativeObj.Bitmap();
		base64 = "data:image/jpg;base64," + base64;
		bitmap.loadBase64Data(base64, function() {
			console.log("加载Base64图片数据成功");
		}, function(e) {
			console.log('加载Base64图片数据失败：' + JSON.stringify(e));
		});
		bitmap.save(relativePath, {}, function(i) {
			var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
			console.log('保存图片成功\n路径：' + sd_path + "\n" + JSON.stringify(i));
			return sd_path;
		}, function(e) {
			console.log('保存图片失败：' + JSON.stringify(e));
			return "";
		});
	},
	/**
	 * 照片路径
	 * @param {Object} picName
	 */
	Utils.getPicturePath = function(picName) {
		var relativePath = "_doc/img/" + picName;
		return plus.io.convertLocalFileSystemURL(relativePath);
	}
	
})(window.Utils = {})
