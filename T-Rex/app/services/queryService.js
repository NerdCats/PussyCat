// This service is a piece of shit!
// need to refactor

app.factory('queryService', ['restCall', 'ngAuthSettings', queryService])

function queryService(restCall, ngAuthSettings){
	
	var getOdataQuery = function (searchParam) {
		searchUrl = ngAuthSettings.apiServiceBaseUri + "api/"+ searchParam.type +"/";
		var allreadyAParamIsThere = false;		
		if (searchParam.startDate != null || searchParam.endDate != null || searchParam.UserName != null || searchParam.jobState != null
			|| searchParam.orderby.property != null) {
			searchUrl += "odata?$filter=";
		} else {
			searchUrl += "?page="+ searchParam.page + 
						 "&pageSize="+ searchParam.pageSize +
						 "&envelope="+ searchParam.envelope;
		}
		
		if (searchParam.UserName != null && searchParam.UserName != "all") {
			var UserNameParam = "User/UserName eq '"+ searchParam.UserName +"'";
			console.log("how the hell you r coming here ??? Mr. " + searchParam.UserName)
			if (!allreadyAParamIsThere) {
				searchUrl +=  UserNameParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + UserNameParam;
			}
		}

		if (searchParam.CreateTime.startDate != null) {
			var startDateParam = "CreateTime gt datetime'"+ searchParam.CreateTime.startDate +"'";
			if (!allreadyAParamIsThere) {
				searchUrl +=  startDateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + startDateParam;
			}
		}

		if (searchParam.CreateTime.endDate != null) {
			var endDateParam = "CreateTime lt datetime'"+ searchParam.CreateTime.endDate +"'";
			if (!allreadyAParamIsThere) {
				searchUrl +=  endDateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + endDateParam;
			}
		}

		if (searchParam.CompletionTime.startDate != null) {
			var startDateParam = "CompletionTime gt datetime'"+ searchParam.CompletionTime.startDate +"'";
			if (!allreadyAParamIsThere) {
				searchUrl +=  startDateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + startDateParam;
			}
		}

		if (searchParam.CompletionTime.endDate != null) {
			var endDateParam = "CompletionTime lt datetime'"+ searchParam.CompletionTime.endDate +"'";
			if (!allreadyAParamIsThere) {
				searchUrl +=  endDateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + endDateParam;
			}
		}

		if (searchParam.jobState != null || searchParam.jobState  != undefined != searchParam.jobState  != 'all') {
			var jobStateParam = "State eq '"+ searchParam.jobState +"'";
			console.log(searchParam.jobState)
			if (!allreadyAParamIsThere) {
				searchUrl +=  jobStateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + jobStateParam;
			}
		}

		if (searchParam.userType != null) {
			var userTypeParam = "Type eq '"+ searchParam.userType +"'";
			console.log(searchParam.userType)
			if (!allreadyAParamIsThere) {
				searchUrl +=  userTypeParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + userTypeParam;
			}
		}

		if (searchParam._t != null) {
			var jobStateParam = "_t eq '"+ searchParam._t +"'";
			console.log(searchParam._t)
			if (!allreadyAParamIsThere) {
				searchUrl +=  jobStateParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += " and " + jobStateParam;
			}
		}

		if (searchParam.orderby.property != null) {
			var orderbyParam = "$orderby=" + searchParam.orderby.property;
			if (searchParam.orderby.orderbyCondition != null) {
				orderbyParam += " " + searchParam.orderby.orderbyCondition;
			} else {
				orderbyParam += " desc";
			}

			if (!allreadyAParamIsThere) {
				searchUrl += orderbyParam;
				allreadyAParamIsThere = true;
			} else {
				searchUrl += "&" + orderbyParam;
			}
		}

		searchUrl += "&page="+ searchParam.page + 
					 "&pageSize="+ searchParam.pageSize +
					 "&envelope="+ searchParam.envelope;
		console.log(searchUrl);
		return searchUrl;
	}

	return {
		getOdataQuery: getOdataQuery
	}
}