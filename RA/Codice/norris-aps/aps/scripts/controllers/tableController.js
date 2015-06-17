'use strict';

angular.module("controllers")
  .controller("tableController", [ "$scope", "socketsSVC", "tableSVC", "$window", 
    function($scope, socketsSVC, tableSVC, $window) {
      // Keep an eye on that!
      $scope.$watch (function() {return $scope.$parent.graphs.maps.selected;},
      function () {
        var activeLine;
        if($scope.$parent.graphs.maps.selected!= undefined){
          for(var table in $scope.$parent.graphs.tables){
            if($scope.$parent.graphs.tables[table].title == $scope.$parent.graphs.maps.selected.title)
              activeLine = $scope.$parent.graphs.tables[table];
          }
        }
        if(activeLine != undefined){
          // WebSocket opening
          var sockeTable = socketsSVC.openTable(activeLine.id, $scope.$parent.nspSock);
          // WebSocket reconnection message
          sockeTable.on("reconnect", function() {
            $window.location.reload();
          });
          
          var graphG = {};
          graphG.type = "Table";
      
          // Populating
          graphG.data = tableSVC.fillData(activeLine.headers,
              activeLine.data, activeLine.colors, activeLine.showBorder);
      
          // Setting options
          graphG.options = { page: "enable"
                           , allowHtml: true
                           , pageSize: activeLine.displayedLines
                           };
      
          graphG.formatters = { number : [] };
          
          for (var i = 0; i < activeLine.format.length; i++) {
            var formatPattern = "";
            // Sets the value symbol, if not null
            if (activeLine.format[i].valueType !== null) {
              if (activeLine.format[i].valueType === "euro") {
                formatPattern += "€";
              } else if (activeLine.format[i].valueType === "dollars") {
                formatPattern += "$";
              } else if (activeLine.format[i].valueType === "pounds") {
                formatPattern += "£";
              }
            }
            formatPattern += " #,##0.";
            // Sets the number of decimal digits
            for (var j = 0; j < activeLine.format[i].decimals; j++) {
              formatPattern += "0";
            }
            // Set the correct column formatter 
            graphG.formatters.number.push({
              columnNum : activeLine.format[i].column,
              pattern : formatPattern
            });
          }
      
          // Set table sorting
          if (activeLine.orderBy.column !== undefined) {
            graphG.options.sortColumn = activeLine.orderBy.column;
            if (activeLine.orderBy.order == "descending") {
              graphG.options.sortAscending = false;
            } else
              graphG.options.sortAscending = true; // Default ascending
          }
      
          $scope.Table = graphG;
      
          // Aaaand update it!
          sockeTable.on("update", function(info) {
            var data = JSON.parse(info);
            if (data.type == "inPlace")
              tableSVC.inPlaceUpd(data, graphG.data);
            else
              tableSVC.streamUpd(data, graphG.data, activeLine.rowsLimit);
          });
        }
      });
  }]);
