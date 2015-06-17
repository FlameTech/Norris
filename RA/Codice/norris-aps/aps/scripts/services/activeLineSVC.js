'use strict';

angular.module("services")
  .factory("activeLineSVC", [ function() {
    return {
      splitLines: function(inData) {
        var outData = {};
        outData.maps = [];
        outData.tables = [];
        for(var graph in inData){
          if(inData[graph].type == "MapChart")
            outData.maps.push(inData[graph]);
          else if(inData[graph].type == "Table")
            outData.tables.push(inData[graph]);
        };
        return outData;
      }
    }
}]);