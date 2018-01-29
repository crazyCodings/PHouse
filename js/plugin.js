document.addEventListener( "plusready",  function()
{
    var _BARCODE = 'plugin',
		B = window.plus.bridge;
    var plugin =
    {
    	IDRecognitionFunction : function (Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback )
		{
			var success = typeof successCallback !== 'function' ? null : function(args)
			{
				successCallback(args);
			},
			fail = typeof errorCallback !== 'function' ? null : function(code)
			{
				errorCallback(code);
			};
			callbackID = B.callbackId(success, fail);

			return B.exec(_BARCODE, "PluginTestFunction", [callbackID, Argus1, Argus2, Argus3, Argus4]);
		},
		IDRecognitionFunctionArrayArgu : function (Argus, successCallback, errorCallback )
		{
			var success = typeof successCallback !== 'function' ? null : function(args)
			{
				successCallback(args);
			},
			fail = typeof errorCallback !== 'function' ? null : function(code)
			{
				errorCallback(code);
			};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "PluginTestFunctionArrayArgu", [callbackID, Argus]);
		},
        IDRecognitionFunctionSync : function (Argus1, Argus2, Argus3, Argus4)
        {
            return B.execSync(_BARCODE, "PluginTestFunctionSync", [Argus1, Argus2, Argus3, Argus4]);
        },
        IDRecognitionFunctionSyncArrayArgu : function (Argus)
        {
            return B.execSync(_BARCODE, "PluginTestFunctionSyncArrayArgu", [Argus]);
        }
    };
    window.plus.plugin = plugin;
}, true );