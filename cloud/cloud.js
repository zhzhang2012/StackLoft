// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:

module.exports = function() {
	AV.Cloud.define("hello", function(request, response) {
  		response.success("Hello world!");
	});	
}

