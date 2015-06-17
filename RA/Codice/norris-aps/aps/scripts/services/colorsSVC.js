'use strict';

angular.module("services")
  .factory('colorsSVC', [function() {
    var componentToHex = function(component) {
      //To string!
      var hexComponent = component.toString(16);
      return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
    };
    return { rgbToHex: function(r, g, b) {
               return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); 
             }
           };
  }]);
      
    