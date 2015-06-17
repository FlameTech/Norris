'use strict';

angular.module("services")
  .factory('socketsSVC', ["$rootScope", function ($scope) {
    var sockets = {idMap: 0, idTable:0, socketMap: null, sockeTable: null};
    return { openMap: function (id, namespace) {
              		      if(sockets.socketMap != null) {
              		        sockets.socketMap.disconnect();
              		      }
              		      sockets.idMap = id;
              		      sockets.socketMap = io.connect(namespace, {forceNew: true});
              		      sockets.socketMap.on('connect', function() {
              		        sockets.socketMap.emit('joinRoom', sockets.idMap); });
              		      return sockets.socketMap;
              		   }
           , openTable: function (id, namespace){
                        if(sockets.socketTable != null) {
                          sockets.socketTable.disconnect();
                        }
                        sockets.idTable = id;
                        sockets.socketTable = io.connect(namespace, {forceNew: true});
                        sockets.socketTable.on('connect', function() {
                         sockets.socketTable.emit('joinRoom', sockets.idTable); });
                        return sockets.socketTable;
                     }  		  
    }
  }]);