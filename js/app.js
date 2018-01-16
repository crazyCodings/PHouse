/**
 * 
 **/
(function($, owner) {
	/**
	 * 登录、初始化信息
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} asyn
	 */
	owner.login = function(data , callback, asyn) {
		var serviceinfo = {
			//宝山地址
			app_ip: "101.230.193.58",
			app_port: "5112",
			path: "/rfcj_bs/services/rfcjService",
			namespace: "http://webService.bsfj.gaj.sh",
			projectfilter: "rfcj", // 兼容不同项目
			appid: "ssgaj.ydjw.78", //公安网路径 
			imei : plus.device.imei,
			key : "1a100d2c0dcb19c4430e7d73762b34c3",
			countyid : "13"
			//崇明地址
			/*app_ip: "10.244.12.152",
			app_port: "5113",
			path: "/rfcj/services/rfcjService",
			namespace: "http://webService.bsfj.gaj.sh",
			projectfilter: "rfcj", // 兼容不同项目
			appid: "ssgaj.ydjw.78", //公安网路径 
			imei : plus.device.imei,
			key : "1a100d2c0dcb19c4430e7d73762b34c3",
			countyid : "13"*/
		};
		var url = "http://" + serviceinfo.app_ip + ":" + serviceinfo.app_port + serviceinfo.path;
		serviceinfo.url = url;
		localStorage.setItem('$serviceinfo', JSON.stringify(serviceinfo));
		var userInfo = Utils.getUser();
		var SoapAction = "loginUser";
		var sendData = {
			"accountname": data.account,
			"password": data.password,
			"imei": serviceinfo.imei
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	}

	/**
	 * 查询房屋和人信息
	 * @param {Object} data	传入的参数
	 * @param {Object} callback 前台调用后的回调函数
	 * @param {Object} asyn	默认为异步，当参数中指定同步参数时，方法为同步
	 */
	owner.queryRhflFwryxx = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryRhflFwryxx";
		var sendData = {
			"fwid" : data.houseid,
			"lmdm" : data.roadcode,
			"lmmc" : data.roadname,
			"jzdz" : data.detailAddress,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	/**
	 * 人户分离注销、离开前查询请求 
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} asyn
	 */
	owner.cancelRhflReq = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "cancelRhflReq";
		var sendData = {
			"fwid" : data.houseid,
			"rid" : data.rid,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	/**
	 * 查询人户分离照片
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} asyn
	 */
	owner.queryRhflPhoto = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryRhflPhoto";
		var sendData = {
			"rid" : data.rid,
			"syrklbdm" : data.syrklbdm,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	/**
	 * 人户分离信息发送、接收查询
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} asyn
	 */
	owner.queryRhflMsgList = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryRhflMsgList";
		var sendData = {
			"RhflMsgQueryVo" : data,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	//来沪人员--房屋精确查询
	owner.queryHouseInfoListPrecise = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryHouseInfoListPrecise";
		var sendData = {
			"JzzHousePreciseQueryVo" : data.JzzHousePreciseQueryVo,
			"BaseOperator" : data.BaseOperator,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	//来沪人员--房屋模糊查询
	owner.queryHouseInfoListFuzzy = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryHouseInfoListFuzzy";
		var sendData = {
			"JzzHouseFuzzyQueryVo" : data.JzzHouseFuzzyQueryVo,
			"BaseOperator" : data.BaseOperator,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	//来沪人员--查询房屋内人信息
	owner.queryJzrByFwbm = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryJzrByFwbm";
		var sendData = {
			"BasePersonInHouseQueryVo" : data.BasePersonInHouseQueryVo,
			"BaseOperator" : data.BaseOperator,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	//来沪人员--查询个人信息
	owner.queryBasePersonInfo = function(data, callback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryBasePersonInfo";
		var sendData = {
			"BasePersonInfoQueryVo" : data.BasePersonInfoQueryVo,
			"BaseOperator" : data.BaseOperator,
			"ICLoginInfo" : userInfo
		};
		var success = callback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};
	
	//来沪人员--查询照片
	owner.queryPhotosByRegcode = function(data, callback, errCallback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryPhotosByRegcode";
		var sendData = {
			"JzzPhotoQueryVo" : data.JzzPhotoQueryVo,
			"BaseOperator" : data.BaseOperator,
			"ICLoginInfo" : userInfo
		};
		var success = callback, fail = errCallback;
		invokeBackEndInterface(SoapAction, sendData, success, fail, asyn);
	};
	
	//工作量统计
	owner.queryGzl = function(data, callback, errCallback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryGzl";
		var sendData = {
			"tjlb" : data.tjlb,
			"ICLoginInfo" : userInfo
		};
		var success = callback, fail = errCallback;
		invokeBackEndInterface(SoapAction, sendData, success, fail, asyn);
	};
	
	//通知通告
	owner.queryTztg = function(data, callback, errCallback, asyn) {
		var userInfo = Utils.getUser();
		var SoapAction = "queryTztg";
		var sendData = {
			"kssj" : (data.kssj==undefined||data.kssj=="")? "" : data.kssj,
			"jssj" : (data.jssj==undefined||data.jssj=="")? "" : data.jssj,
			"status" : (data.status==undefined||data.status=="")? "" : data.status,
			"ICLoginInfo" : userInfo
		};
		var success = callback, fail = errCallback;
		invokeBackEndInterface(SoapAction, sendData, success, fail, asyn);
	};
	
	/**
	 * 
	 * @param {Object} x 纬度
	 * @param {Object} y 经度
	 * @param {Object} bz 备注
	 * @param {Object} asyn 
	 */
	owner.sendGPS = function(x, y, bz, asyn){
		var SoapAction = "saveGps";
		var userInfo = Utils.getUser();
		var sendData = {
			"entity": {
				"userid" : userInfo.xgyid,
				"idcard" : userInfo.xgypid,
				"username" : userInfo.xgyname,
				"pcsbm" : userInfo.pcsdm,
				"jcwbm" : userInfo.jcwdm,
				"imei" : userInfo.sysimei,
				"rksj" : Utils.getCurrentDate(),
				"x" : x,
				"y" : y,
				"bz" : "gps"
			},
			"entityname" : "TAppGps",
			"ICLoginInfo" : userInfo
		};
		var success = function(data) {
			if(data.result == "0"){
				//Done nothing
			}else if( data.result == "1"){
				mui.toast(data.msg);
			}
		}
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};

	owner.queryVersion = function(data, callback, errCallback, asyn) {
		var SoapAction = "queryVersion";
		var sendData = {
			"version" : data.version
		};
		var success = function(data) {
			if(data.result == "0"){
				//Done nothing
			}else if( data.result == "1"){
				mui.toast(data.msg);
			}
		}
		var success = callback, fail = errCallback;
		invokeBackEndInterface(SoapAction, sendData, success, null, asyn);
	};

	owner.createState = function(data, callback) {
		var state = owner.getState();
		var localServiceInfo = JSON.parse(localStorage.getItem('$serviceinfo'));
		data = data.datas[0];
		state.userType = data.USERTYPE;
		state.personType = data.YHLX;
		state.account = data.XGYID;
		state.name = data.XGYNAME;
		state.identityId = data.XGYID; // 协管员id
		state.IDCard = data.XGYPID;
		state.policeStationID = data.POLICEID;
		state.policeStation = data.PCSDM;
		state.policeStationName = data.PCSMC;
		state.latticePoint = data.LATTICEPOINT; // 网点号
		state.streetCode = data.JDDM;
		state.streetName = data.JDMC;
		state.homeVillageCode = data.JCWDM;
		state.homeVillageName = data.JCWMC;
		state.token = "token123456789";
		state.deviceImei = plus.device.imei;
		state.key = localServiceInfo.key;
		state.countyid = localServiceInfo.countyid;
		owner.setState(state);
		return callback(data);
	};
	
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 统一调用后端接口
	 * @param {Object} soapAction 调用方法
	 * @param {Object} sendData 请求参数
	 * @param {Object} successCallback 成功回调函数
	 * @param {Object} failCallback 失败回调函数
	 * @param {Object} asyn
	 */
	var invokeBackEndInterface = function(soapAction, sendData, successCallback, failCallback, asyn) {
		console.log("-->soapaction:" + soapAction + "\n-->:" + JSON.stringify(sendData));
		var localServiceInfo = JSON.parse(localStorage.getItem('$serviceinfo'));
		var userInfo = Utils.getUser();
		var url = localServiceInfo.url;
		successCallback = successCallback || $.noop,
		failCallback = failCallback || $.noop;
		if(asyn == undefined) { asyn = true; } else { asyn = false; }
		var soapdata = soapxml(sendData, soapAction);
		mui.ajax(url, {
			data: soapdata,
			dataType: 'xml',
			type: 'post',
			async: asyn,
			timeout: 60000,
			headers: {
				'Cache-Control': 'no-cache',
				'SoapAction': soapAction,
				'Content-Type': 'text/xml'
			},
			success: function(data) {
				if(successInfo(soapAction, data)){
					var jsonData = JSON.parse(data.childNodes[0].textContent);
					jsonData.sendData = sendData;
					successCallback(jsonData);
				}
			},
			error: function( xhr, type, errorThrown) {
				if(failInfo(soapAction, xhr, type, errorThrown)){
					failCallback();
				};
			}
		});
	}

	/**
	 * 封装数据为soap格式的xml文件
	 **/
	var soapxml = function(data, method) {
		var serviceinfo = JSON.parse(localStorage.getItem('$serviceinfo'));
		data.projectfilter = serviceinfo.projectfilter;
		var backdata =
			"<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:web='" + serviceinfo.namespace + "' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
			"<soap:Header />" +
			"<soap:Body>" +
			"<web:" + method + ">" +
			"<web:valueStr>" +
			JSON.stringify(data) +
			"</web:valueStr>" +
			"</web:" + method + ">" +
			"</soap:Body>" +
			"</soap:Envelope>";
		return backdata;
	};
	
	var successInfo = function(soapaction, data) {
		if(!data) {
			console.error('success:<--soapaction: ' + soapaction + '\nreturn data is ' + data + ', please checked!');
			mui.toast('哎呀，通讯异常了呢！');
			return false;
		}
		var jsonData = JSON.parse(data.childNodes[0].textContent);
		console.log('success:<--soapaction: ' + soapaction + "\n<--jsonData:" + JSON.stringify(jsonData));
		return true;
	};
	var failInfo = function(soapaction, xhr, type, errorThrown) {
		console.error('fail:<--soapaction: ' + soapaction + '\ntype: ' + type + '\nxhr: ' + xhr + '\nerrorThrown: ' + errorThrown);
		if(type == "abort") {
			mui.toast('服务器连接异常！');
		} else if(type == "timeout") {
			mui.toast('服务器连接超时！');
		}
		return true;
	}
}(mui, window.app = {}));