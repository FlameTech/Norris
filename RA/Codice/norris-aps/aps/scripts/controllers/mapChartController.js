'use strict';

angular.module("controllers")
  .controller("mapChartController", [ "$scope", "socketsSVC", "mapSVC", "$window",
    function ($scope, socketsSVC, mapSVC, $window) {
      // Keep an eye on that!
      $scope.$watch (function() {return $scope.$parent.graphs.maps.selected;},
      function () {
        var activeLine = $scope.$parent.graphs.maps.selected;
        if(activeLine != undefined){    
          // WebSocket opening
          var socket = socketsSVC.openMap(activeLine.id, $scope.$parent.nspSock);
          // WebSocket reconnection message
          socket.on("reconnect", function() {
            $window.location.reload();
          });
          
          //set initial chart data
          $scope.title = activeLine.title;
          $scope.center = [activeLine.center.lat,activeLine.center.long];
          $scope.zoom = activeLine.zoom;
          // Reset markers and polylines
          mapSVC.resetMap($scope.map, $scope.polylines, $scope.markers);
          $scope.markers = [];
          $scope.polylines = [];
          $scope.colors = mapSVC.setColors(activeLine.colors);
          $scope.showLegend = activeLine.showLegend;
          $scope.legendItems = [];

          // Synchronously build legend array
          for (var i=0;i<activeLine.paths.length;i++){
            $scope.legendItems.push({ color: $scope.colors[i]
                             , name: activeLine.pathNames[i]
                             });
          }
          
          // Draw markers
          if(activeLine.points != undefined){
            for(var i=0;i<activeLine.points.length;i++){
              $scope.markers[activeLine.points[i].id] = mapSVC.createMarker(activeLine.points[i], $scope.map);
            }
          }
          
          // Draw the paths
          for(var i=0;i<activeLine.paths.length;i++){
            mapSVC.buildPath(activeLine.paths[i], $scope.colors[i], $scope.map, $scope.polylines, activeLine.pathMode);
          }
          
          // And even the legend!
          if($scope.showLegend == true){
            mapSVC.buildLegend($scope.map, activeLine.mapLegendPosition);
            $scope.legenda = true;
          }
          
          // Update it!
          socket.on("update", function(info) {
            var data = JSON.parse(info);
            if(data.type == "inPlace"){
              $scope.markers[data.id].setPosition(new google.maps.LatLng(data.latitude, data.longitude));
            }
            if(data.type == "movie"){
              mapSVC.updateMovie($scope.markers,data,$scope.map);
            }
          });
        }
      });
  }]);