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
	userInfoVerification : function ( loginInfo ) {
		console.log("-->Identity verification");
		console.log(loginInfo.account + "\t" + loginInfo.password);
		return true;
	}
}
