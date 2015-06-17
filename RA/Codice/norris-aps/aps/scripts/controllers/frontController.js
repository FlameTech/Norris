'use strict';

angular.module("controllers")
  .controller("frontController", [ "$scope", "firstConnectSVC", "socketsSVC", "activeLineSVC",
    function ($scope, firstConnectSVC, socketsSVC, activeLineSVC){
      firstConnectSVC.get (
        function success(data) {
          var _data = data;
          $scope.nspSock = _data.namespace;
          $scope.graphs = activeLineSVC.splitLines(_data.data.data);
        }, function error(err){
          console.log(err);
        });
    } 
]);
