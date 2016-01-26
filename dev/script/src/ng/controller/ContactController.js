angular.module("LMApp").controller("ContactController", ["$scope", "$sce", "STRINGS", function($scope, $sce, STRINGS){
	for (var str in STRINGS.CONTACT.BODY) {
		if(typeof STRINGS.CONTACT.BODY[str] === "string"){
			STRINGS.CONTACT.BODY[str] = $sce.trustAsHtml(STRINGS.CONTACT.BODY[str]);
		}
	}
	$scope.STRINGS = STRINGS.CONTACT;
}]);