(function(Utils){
	/**
	 * 从后开始截取字符串、数字长度，不足前面补0
	 * @param {Object} num 
	 * @param {Object} length
	 */
	Utils.preFixInteger = function(num, length){
		num = num==""? 0 : num;
		return ( Array(length).join('0') + num ).slice(-length);
	},
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
			sysimei: state.deviceImei,
			key : state.key,
			countyid : state.countyid
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
	},
	
	Utils.getBase64Image = function(img){
		var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL
	},
	
	Utils.updateDictAll = function(){
		var dict = [
			{ "dictName" : "d_lm", "dictDes" : "路名"},
			{ "dictName" : "d_jcw", "dictDes" : "居委会（居村委）"},
			{ "dictName" : "d_pcs_wrkb", "dictDes" : "接收地派出所"},
			{ "dictName" : "d_xb", "dictDes" : "性别"},
			{ "dictName" : "d_xzqh", "dictDes" : "籍贯"},
			{ "dictName" : "d_mz", "dictDes" : "民族"},
			{ "dictName" : "d_wybxx_rylb", "dictDes" : "人员类别"},
			{ "dictName" : "d_wybxx_xxly", "dictDes" : "信息来源"},
			{ "dictName" : "d_ssqx", "dictDes" : "所属区县"},
			{ "dictName" : "d_rk_flyy", "dictDes" : "居住原因"},
			{ "dictName" : "d_yfzgx", "dictDes" : "与房主关系"},
			{ "dictName" : "d_jzsy", "dictDes" : "居住事由"},
			{ "dictName" : "d_zxyy", "dictDes" : "注销原因"},
			{ "dictName" : "d_jd_sh", "dictDes" : "接收街道"},
			//来沪人员字典
			{ "dictName" : "d_lhry_lhsy", "dictDes" : "来沪事由"},
			{ "dictName" : "d_lhry_xzqh", "dictDes" : "行政区域（户籍所在）"},
			{ "dictName" : "d_lhry_mz", "dictDes" : "民族"},
			{ "dictName" : "d_lhry_jd", "dictDes" : "街道（乡镇）"},
			{ "dictName" : "d_lhry_lm", "dictDes" : "道路"},
			{ "dictName" : "d_lhry_jwh", "dictDes" : "居委会"},
			//抄告单
			{ "dictName" : "d_cgd_pcs", "dictDes" : "派出所"},
			{ "dictName" : "d_cgd_jd", "dictDes" : "抄告街镇"},
			{ "dictName" : "d_syrk_jcw", "dictDes" : "抄告居村委"},
			{ "dictName" : "d_cgd_shzal", "dictDes" : "社会治安类"},
			{ "dictName" : "d_cgd_aqscl", "dictDes" : "安全生产类"},
			{ "dictName" : "d_cgd_spwsl", "dictDes" : "食药品、卫生类"},
			{ "dictName" : "d_cgd_csgll", "dictDes" : "城市管理类"},
			{ "dictName" : "d_cgd_whjsl", "dictDes" : "文化、计生类"},
			{ "dictName" : "d_cgd_xfl", "dictDes" : "消防类"},
			//人户分离
			{ "dictName" : "d_pcs_rhfl", "dictDes" : "人户分离接收信息查询派出所字典"}
		];
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
			fs.root.getDirectory("dict", {
				create: true
			}, function(entry) {
				var dictname = "";
				for(var i in dict){
					dictname = dict[i].dictName;
					if(localStorage[dictname]==undefined){
						Utils.updateDict(dictname, entry);
					}
				}
			}, function(e) {
				console.log("字典更新，打开dict目录失败：" + e.message);
			});
		}, function(e) {
			console.log("字典更新，打开doc目录失败：" + e.message);
		});
		
	},
	Utils.updateDict = function(dictName, entry){
		var localFile = dictName + ".json";
		//打开本地文件成功，把本地文件内容读取到localStorage中，打开失败，向服务器查询
		var q = {
			"dictname" : dictName
		};
		app.queryDict(q, function(d){
			entry.getFile(localFile,{
				create : true
			}, function(fentry){
				fentry.createWriter(function(writer) {
					writer.onerror = function() {
						console.log("字典保存本地失败！");
					}
					writer.write(JSON.stringify(d.datas));
					localStorage.setItem(dictName, JSON.stringify(d.datas));
					console.log("字典【" + dictName + "保存成功】！");
				}, function(e) {
					console.log("保存字典，获取本地文件对象失败：" + e.message);
				});
			})
		},function(e){
			mui.toast("查询字典【" + dictName + "】失败！" );
			console.log(JSON.stringify(e));
		});
	},
	
	Utils.fileDict = function(dictName, filter){
		var dicts = JSON.parse(localStorage[dictName]);
		var returnList = {};
		for (var i in dicts) {
			console.log(dicts[i].dm + "\t" + dicts[i].mc + "\t" + dicts[i].py);
		}
		return returnList;
	},
	
	Utils.getValueByCodeDict = function(dictname, code){
		var dictStr = localStorage[dictname];
		if(dictStr==null){
			mui.toast("字典" +  dictname + "不存在");
			return "";
		}
		var dicts = JSON.parse(localStorage[dictname]);
		for(var i in dicts){
			if(dicts[i].dm == code){
				return dicts[i].mc;
			}
		}
		return "";
	},
	
	Utils.getCodeByValueDict = function(dictname, value){
		var dictStr = localStorage[dictname];
		if(dictStr==null){
			mui.toast("字典" +  dictname + "不存在");
			return "";
		}
		var dicts = JSON.parse(localStorage[dictname]);
		for(var i in dicts){
			if(dicts[i].mc == value){
				return dicts[i].dm;
			}
		}
		return "";
	},
	
	Utils.dicWewview = function (dictname, ws, floatw) {
    	ws = plus.webview.currentWebview();
        if(floatw) { // 避免快速多次点击创建多个窗口
            floatw.show("fade-in");
        } else {
            floatw = plus.webview.create("../common/dictionaryWebview.html", "dictionaryWebview", {
                background: "transparent",
                bounce : "all",
                height : "100%",
                scalable : false,
                scrollIndicator : "none",
                width : "50%",
                left : "25%"
            }, {
            	"pageSourceId": ws.id ,
            	"dictname" : dictname 
            });
			floatw.addEventListener("loading", function() {
            	plus.nativeUI.showWaiting();
			}, false);
            floatw.addEventListener("loaded", function() {
            	plus.nativeUI.closeWaiting();
				floatw.show('fade-in', 300);
			}, false);
            ws.setStyle({mask:'rgba(0,0,0,0.5)'});
            ws.addEventListener("maskClick", function(){
            	ws.setStyle({
					mask: "none"
				});
				if (!floatw) {
					floatw = plus.webview.getWebviewById("dictionaryWebview");
				}
				if (floatw) {
					floatw.close();
					floatw = null;
				}
            }, false);
        }
   },
	
	
	/**
	 * 兼容startswith
	 */
	Utils.startsWith = function() {
		if(typeof String.prototype.startsWith != 'function') {
			String.prototype.startsWith = function(prefix) {
				return this.slice(0, prefix.length) === prefix;
			};
		}
	}
	
})(window.Utils = {})
