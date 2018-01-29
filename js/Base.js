var Base = {
	//全屏设置
	setFullscreen : function(isFullscreen){
		if(isFullscreen!=null)
			plus.navigator.setFullscreen(isFullscreen);
	},
	
	/**
	 * 用户信息校验 JSON format
	 * @param 	{string} userinfo - The information of user with JSON. 
	 * @return 	{boolean} 	return If userinfo is passed, return a boolean
	 **/
	userInfoVerification : function ( loginInfo , callback, fail) {
		callback = callback || $.noop,
		fail = fail || $.noop;
		var q = {
			"imei" : loginInfo.imei,
			"accountname" : loginInfo.account,
			"iccard" : loginInfo.iccard
		};
		app.register(q, function(d){
			if(d.result=="1"){
				mui.toast(d.msg);
				mui("#loginButton").button('reset');
				return fail();
			}else if(d.result =="0"){
				console.log(d.result);
				console.log("-->Identity verification");
				console.log(loginInfo.account + "\t" + loginInfo.password);
				return callback();
			}
		}, function(e){
			console.log(e.message);
			return fail();
		});
	}
}
