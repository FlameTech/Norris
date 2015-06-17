'use strict';

angular.module("services")
  .factory("firstConnectSVC", ["$resource", "$location",   
    function($resource, $location) {
      var url = $location.absUrl();
      if(url.charAt(url.length-1) == "/")
        url = url +'raw';
      else
        url = url +'/raw';
      var res = url.replace("/aps", "/data");
      return $resource(res);
  }]);