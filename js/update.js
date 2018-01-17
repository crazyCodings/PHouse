/**
 * 判断应用升级模块，从url地址下载升级描述文件到本地local路径
 * yanyilin@dcloud.io
 * 
 * 升级文件为JSON格式数据，如下：
{
	"appid":"HelloH5",
    "iOS":{
    	"version":"iOS新版本号，如：1.0.0",
    	"note":"iOS新版本描述信息，多行使用\n分割",
    	"url":"Appstore路径，如：itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8"
    },
    "Android":{
    	"version":"Android新版本号，如：1.0.1",
    	"note":"Android新版本描述信息，多行使用\n分割",
    	"url":"apk文件下载地址，如：http://www.dcloud.io/helloh5p/HelloH5.apk"
    }
}
 *
 */
(function(w) {
	var server = "http://www.dcloud.io/helloh5/update.json", //获取升级描述文件服务器地址
		localDir = "update",
		localFile = "update.json", //本地保存升级描述目录和文件名
		keyUpdate = "updateCheck", //取消升级键名
		keyAbort = "updateAbort", //忽略版本键名
		checkInterval = 0, //升级检查间隔，单位为ms,7天为7*24*60*60*1000=604800000, 如果每次启动需要检查设置值为0
		dir = null;

	/**
	 * 准备升级操作
	 * 创建升级文件保存目录
	 */
	function initUpdate() {
		app.initInfo();
		// 在流应用模式下不需要检测升级操作
		if(navigator.userAgent.indexOf('StreamApp') >= 0) {
			return;
		}
		// 打开doc根目录
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
			fs.root.getDirectory(localDir, {
				create: true
			}, function(entry) {
				dir = entry;
				checkUpdate();
				Utils.updateDictAll();
			}, function(e) {
				console.log("准备升级操作，打开update目录失败：" + e.message);
			});
		}, function(e) {
			console.log("准备升级操作，打开doc目录失败：" + e.message);
		});
	}

	/**
	 * 检测程序升级
	 */
	function checkUpdate() {
		// 判断升级检测是否过期
		var lastcheck = plus.storage.getItem(keyUpdate);
		if(lastcheck) {
			var dc = parseInt(lastcheck);
			var dn = (new Date()).getTime();
			if(dn - dc < checkInterval) { // 未超过上次升级检测间隔，不需要进行升级检查
				return;
			}
			// 取消已过期，删除取消标记
			plus.storage.removeItem(keyUpdate);
		}
		// 读取本地升级文件
		dir.getFile(localFile, {
			create: false
		}, function(fentry) {
			console.log("读取本地升级文件");
			fentry.file(function(file) {
				var reader = new plus.io.FileReader();
				reader.onloadend = function(e) {
					fentry.remove();
					var data = null;
					try {
						data = JSON.parse(e.target.result);
					} catch(e) {
						console.log("读取本地升级文件，数据格式错误！");
						return;
					}
					checkUpdateData(data);
				}
				reader.readAsText(file);
			}, function(e) {
				console.log("读取本地升级文件，获取文件对象失败：" + e.message);
				fentry.remove();
			});
		}, function(e) {
			// 失败表示文件不存在，从服务器获取升级数据
			console.log("文件不存在，从服务器获取升级数据");
			getUpdateData();
		});
	}

	/**
	 * 检查升级数据
	 */
	var curVer = "0"; 
	function checkUpdateData(j) {
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
	        wgtVer=inf.version;
	        console.log("当前应用版本："+wgtVer);
	        //var curVer = plus.runtime.version,
	        curVer = wgtVer,
			inf = j[plus.os.name];
			if(inf) {
				var srvVer = inf.version;
				// 判断是否存在忽略版本号
				var vabort = plus.storage.getItem(keyAbort);
				if(vabort && srvVer == vabort) {
					// 忽略此版本
					return;
				}
				// 判断是否需要升级
				if(compareVersion(curVer, srvVer)) {
					// 提示用户是否升级
					plus.nativeUI.confirm(inf.note, function(i) {
						if(0 == i.index) {
							//plus.runtime.openURL(inf.url);
							downWgt(inf.url);
						} else if(1 == i.index) {
							plus.storage.setItem(keyAbort, srvVer);
							plus.storage.setItem(keyUpdate, (new Date()).getTime().toString());
						} else {
							plus.storage.setItem(keyUpdate, (new Date()).getTime().toString());
						}
					}, inf.title, ["立即更新", "跳过此版本", "取　　消"]);
				}
			}
	    });
	}
	
	function downWgt(wgtUrl){
	    var w=plus.nativeUI.showWaiting("　　 开始下载...　　 ");
		var options = {"method":"GET", "filename" : "_doc/update/"};
	    var dtask = plus.downloader.createDownload( wgtUrl, options);
	    dtask.start();
	    dtask.addEventListener( "statechanged", function(task,status){
            switch(task.state) {
                case 1: // 开始
                    w.setTitle("　　 开始下载...　　 ");
                break;
                case 2: // 已连接到服务器
                    w.setTitle("　　 开始下载...　　 ");
                break;
                case 3:
                    var a = task.downloadedSize/task.totalSize*100;
                    w.setTitle("　　 已下载"+parseInt(a)+"%　　 ");
                break;
                case 4: // 下载完成
                	if(status==200){
                		console.log("下载wgt成功："+task.filename);	
	            		installWgt(task.filename); // 安装wgt包
                	}
                    w.close();
                break;
            }
        });
	}
	
	// 更新应用资源
	function installWgt(path){
	    plus.nativeUI.showWaiting("安装wgt文件...");
	    plus.runtime.install(path,{},function(){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件成功！");
	        plus.nativeUI.alert("应用资源更新完成！",function(){
	            plus.runtime.restart();
	        });
	    },function(e){
	        plus.nativeUI.closeWaiting();
	        console.log("安装wgt文件失败["+e.code+"]："+e.message);
	        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
	    });
	}

	/**
	 * 从服务器获取升级数据
	 */
	function getUpdateData() {
		plus.nativeUI.showWaiting("检测更新...");
		app.queryVersion({
			"version": curVer
		}, function(d) {
			plus.nativeUI.closeWaiting();
			dir.getFile(localFile, {
				create: true
			}, function(fentry) {
				fentry.createWriter(function(writer) {
					writer.onerror = function() {
						console.log("获取升级数据，保存文件失败！");
					}
					var update_json = {
						"appid" : "",
						"iOS":{
					    	"version":"0.7.0",
					    	"title":"Hello H5+(0.7.0)版本更新",
					    	"note":"新增自动升级检测功能\n新增分享功能演示页面\n新增推送功能演示页面\n",
					    	"url":"itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8"
					   	},
						"Android" : {
							"version": d.version==undefined ? "9":d.version,
					    	"title": d.title==undefined ? ("版本更新【" + (d.version==undefined ? "9":d.version) + "】"):d.title,
					    	"note": d.note==undefined ? "您有新版本，请注意查收":d.note,
					    	"url": d.datas
						}
					};
					if(d.result=="1"){
						console.log("没有新版本！");
						return;
					}
					writer.write(JSON.stringify(update_json));
				}, function(e) {
					console.log("获取升级数据，创建写文件对象失败：" + e.message);
				});
			}, function(e) {
				console.log("获取升级数据，打开保存文件失败：" + e.message);
			});
		},function(e){
			mui.toast("获取升级数据，联网请求失败");
			plus.nativeUI.closeWaiting();
		});
	}

	/**
	 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
	 * @param {String} ov
	 * @param {String} nv
	 * @return {Boolean} 
	 */
	function compareVersion(ov, nv) {
		if(!ov || !nv || ov == "" || nv == "") {
			return false;
		}
		var b = false,
			ova = ov.split(".", 4),
			nva = nv.split(".", 4);
		for(var i = 0; i < ova.length && i < nva.length; i++) {
			var so = ova[i],
				no = parseInt(so),
				sn = nva[i],
				nn = parseInt(sn);
			if(nn > no || sn.length > so.length) {
				return true;
			} else if(nn < no) {
				return false;
			}
		}
		if(nva.length > ova.length && 0 == nv.indexOf(ov)) {
			return true;
		}
	}
	
	if(w.plus) {
		initUpdate();
	} else {
		document.addEventListener("plusready", initUpdate, false);
	}
	

})(window);