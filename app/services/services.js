'use strict';

app.factory('listToString', function () {
	return function (list) {
		var string = "";
		if (list!=null) {
			var lastItemIndex = list.length -1;
			for (var i = 0 ; i < list.length; i++) {
				string += list[i]			
				if (i!=lastItemIndex) {
					string += ", ";
				}
			}			
		}
		return string;
	};
});

app.factory('timeAgo', function () {
	return function (creationTime) {
		creationTime = new Date(creationTime);
		var nowTime = Date.now();
		var diffInMin = (nowTime - creationTime)/1000/60;
		// var time =  Math.round(diffInMin);
		var timeString = "";
		if (diffInMin > 60) {
			var hour = Math.round(diffInMin/60);
			var minute = Math.round(diffInMin - (hour * 60));
			if (hour > 1) {
				timeString = hour + " hour ";
			} else {
				timeString = hour + " hours ";
			};
			if (minute > 1) {
				timeString += minute + " minutes";	
			} else if (minute == 1) {
				timeString += minute + " minute";
			}
		}
		if (timeString=="") {
			return "";
		}
		return timeString + " ago";
	};
});


app.factory('timeFormat', [function(){
	return function (utcTimeString){
		var date = new Moment(utcTimeString);
		return date;
	};
}]);

app.factory('patchUpdate',['$http', 'restCall', 'ngAuthSettings', function($http, restCall, ngAuthSettings){
	return function (value, op, path, api_path, jobId, taskId, successCallback, errorCallback) {
		var url = ngAuthSettings.apiServiceBaseUri + api_path + jobId + "/" + taskId;
		console.log(url);
		var data = [
			    {
			      value: value,
			      path: path,
			      op: op
			    }
			];
		console.log(data);
		restCall('PATCH', url, data, successCallback, errorCallback);
	};
}]);


app.factory('restCall', ['$http', function($http){
	return function (method, url, data, successCallback, errorCallback){				
		$http({
  			method: method,
  			url : url,
  			data: data  		
  		}).then(function success(response) {
  			successCallback(response);  			
  		}, function error(response) {
  			errorCallback(response);  		
  		});
	};
}]);


app.factory('UrlPath', [function(host){
	var assets = function (type, envelope, page, pageSize){
		var parameters =  "$filter=Type eq '"+type+"'" + "&envelope=" + envelope + "&page=" + page + "&pageSize=" + pageSize;		
		var assetListUrlpath = "/api/Account/odata?" + parameters;
		return assetListUrlpath;
	};
	return {
		assets : assets,
	}
}])

//app.factory('$exceptionHandler', function() {
//   return function(exception, cause) {
//     exception.message += ' (caused by "' + cause + '")';
//     console.log(exception.message);
//     // throw exception;
//   };
// });