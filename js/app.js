/**
 * 前台业务逻辑实现
 * 
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {

		/**
		 * projectfilter 字段，兼容不同项目
		 */
		var serviceinfo = {
			app_ip: "172.26.172.8",
			app_port: "8888",
			path: "/ydjw/services/ydjwService",
			namespace: "http://webservice.xfgl.gaj.sh",
			projectfilter: "pdaFire",
			appid: "ssgaj.ydjw.78" //公安网路径 */
		};
		//服务器地址存储本地
		localStorage.setItem('$serviceinfo', JSON.stringify(serviceinfo));
		callback = callback || $.noop;
		loginInfo = loginInfo || {};

		var url = "http://" + serviceinfo.app_ip + ":" + serviceinfo.app_port + serviceinfo.path;
		var sendData = {
			jh: loginInfo.account,
			accountname: loginInfo.account,
			password: loginInfo.password,
			method: 'getPermissions'
		};
		var soapdata = soapxml(sendData);
		var timestamp = new Date();
		var milliseconds = timestamp.getMilliseconds();
		mui.ajax(url, {
			data: soapdata,
			dataType: 'xml',
			type: 'POST',
			catche: false,
			ifModified: true,
			timeout: 3000, 			//超时时间设置为3秒；
			headers: {
				'appId': serviceinfo.appid,
				'timestamp': milliseconds,
				'SoapAction': 'login',
				'Content-Type': 'text/xml'
			},
			success: function(data) {
				if(!data) {
					console.error('return data is ' + data + ', please checked!');
					mui.toast('哎呀，通讯异常了呢！');
					return;
				}
				console.log(data.childNodes[0].textContent);
				var jsonData = JSON.parse(data.childNodes[0].textContent);
				if(jsonData.jh == null) {
					mui.toast('用户名【' + sendData.jh + '】不存在');
					console.log('用户名【' + sendData.jh + '】不存在');
					return;
				}
				return owner.createState(jsonData, callback);
			},
			error: function(xhr, type, errorThrown) {
				console.error('type:' + type + '\t\terrorThrown:' + errorThrown);
				//异常处理；
				if(type == "abort") {
					mui.toast('服务器连接异常！');
				} else if(type == "timeout") {
					mui.toast('服务器连接超时！');
				}
				return callback(type);
			}
		});
	}

	/**
	 * 信息采集
	 * 向服务端提交信息
	 **/
	owner.collection = function(data, callback) {
		callback = callback || $.noop;
		var address = JSON.parse(localStorage.getItem('$serviceinfo'));
		var url = "http://" + address.app_ip + ":" + address.app_port + address.path;
		var userInfo = JSON.parse(localStorage.getItem('$state'));
		var sendData = {
			jh: userInfo.policeNo,
			xm: userInfo.account,
			pcsbm: userInfo.policeStation,
			accountname: userInfo.policeNo,
			zjhm: userInfo.identityNum,
			password: '',
			method: 'saveInfo',
			data: data
		};
		var soapdata = soapxml(sendData);
		mui.ajax(url, {
			data: soapdata,
			dataType: 'xml',
			type: 'post',
			timeout: 2000,
			headers: {
				'appId': address.appid,
				'Cache-Control': 'no-cache',
				'SoapAction': 'login',
				'Content-Type': 'text/xml'
			},
			success: function(data) {
				if(!data) {
					console.error('return data is ' + data + ', please checked!');
					mui.toast('哎呀，通讯异常了呢！');
					return;
				}
				var jsonData = JSON.parse(data.childNodes[0].textContent);
				return callback(jsonData);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log("queryInfo-->" + type);
				if(type == "abort") {
					mui.toast('服务器连接异常！');
				} else if(type == "timeout") {
					mui.toast('服务器连接超时！');
				}
			}
		});
	}

	/**
	 * 信息采集
	 * 向服务端提交信息
	 **/
	owner.saveInfoNoMsg = function(data, callback) {
		callback = callback || $.noop;
		var address = JSON.parse(localStorage.getItem('$serviceinfo'));
		var url = "http://" + address.app_ip + ":" + address.app_port + address.path;
		var userInfo = JSON.parse(localStorage.getItem('$state'));
		var sendData = {
			jh: userInfo.policeNo,
			xm: userInfo.account,
			pcsbm: userInfo.policeStation,
			accountname: userInfo.policeNo,
			zjhm: userInfo.identityNum,
			password: '',
			method: 'saveInfoNoMsg',
			data: data
		};
		var soapdata = soapxml(sendData);
		mui.ajax(url, {
			data: soapdata,
			dataType: 'xml',
			type: 'post',
			timeout: 2000,
			headers: {
				'appId': address.appid,
				'Cache-Control': 'no-cache',
				'SoapAction': 'login',
				'Content-Type': 'text/xml'
			},
			success: function(data) {
				if(!data) {
					console.error('return data is ' + data + ', please checked!');
					mui.toast('哎呀，通讯异常了呢！');
					return;
				}
				var jsonData = JSON.parse(data.childNodes[0].textContent);
				return callback(jsonData);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log("queryInfo-->" + type);
				if(type == "abort") {
					mui.toast('服务器连接异常！');
				} else if(type == "timeout") {
					mui.toast('服务器连接超时！');
				}
			}
		});
	}

	/**
	 * 默认为异步，当参数中指定同步参数时，方法为同步
	 * @param {Object} data	传入的参数
	 * @param {Object} method 后台提供的接口方法名称 , 注：区分大小写
	 * @param {Object} callback	前台调用后的回调函数
	 */
	owner.queryInfo = function(data, method, callback, asyn) {
		callback = callback || $.noop;
		var address = JSON.parse(localStorage.getItem('$serviceinfo'));
		var url = "http://" + address.app_ip + ":" + address.app_port + address.path;
		var userInfo = JSON.parse(localStorage.getItem('$state'));
		var sendData = {
			jh: userInfo.policeNo,
			xm: userInfo.account,
			pcsbm: userInfo.policeStation,
			accountname: userInfo.policeNo,
			zjhm: userInfo.identityNum,
			password: '',
			method: method,
			data: data
		};
		if(asyn == undefined) {
			asyn = true;
		} else {
			asyn = false;
		}
		var soapdata = soapxml(sendData);
		mui.ajax(url, {
			data: soapdata,
			dataType: 'xml',
			type: 'post',
			async: asyn,
			timeout: 2000,
			headers: {
				'appId': address.appid,
				'Cache-Control': 'no-cache',
				'SoapAction': 'login',
				'Content-Type': 'text/xml'
			},
			success: function(data) {
				if(!data) {
					console.error('return data is ' + data + ', please checked!');
					mui.toast('哎呀，通讯异常了呢！');
					return;
				}
				var jsonData = JSON.parse(data.childNodes[0].textContent);
				return callback(jsonData);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log("queryInfo-->" + type);
				if(type == "abort") {
					mui.toast('服务器连接异常！');
				} else if(type == "timeout") {
					mui.toast('服务器连接超时！');
				}
			}
		});
	}

	owner.createState = function(data, callback) {
		var state = owner.getState();
		state.account = data.pname;
		state.policeNo = data.jh;
		state.identityNum = data.zjhm;
		state.policeStation = data.pcsbm;
		state.policeStationName = data.policeStationName;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
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
	 * 封装数据为soap格式的xml文件
	 **/
	var soapxml = function(data) {
		var serviceinfo = JSON.parse(localStorage.getItem('$serviceinfo'));
		data.projectfilter = serviceinfo.projectfilter;
		var backdata =
			"<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:web='" + serviceinfo.namespace + "' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
			"<soap:Header />" +
			"<soap:Body>" +
			"<web:login>" +
			"<web:valueStr>" +
			JSON.stringify(data) +
			"</web:valueStr>" +
			"</web:login>" +
			"</soap:Body>" +
			"</soap:Envelope>";
		return backdata;
	};
}(mui, window.app = {}));