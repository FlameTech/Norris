'use strict';

angular.module("services")
  .factory('mapSVC', [ "colorsSVC", function(colorsSVC) {
    // Converts two coordinates to a GoogleLatLong
    var cnvLatLong = function (x) {
      return new google.maps.LatLng(x[0],x[1]);
    };
    var setPathMode = function (mode) {
      if(mode == "driving"){
        return google.maps.DirectionsTravelMode.DRIVING;
      }
      else if(mode == "walking"){
        return google.maps.DirectionsTravelMode.WALKING;
      }
      else if(mode == "transit"){
        return google.maps.DirectionsTravelMode.TRANSIT;
      }
      else if(mode == "bicycling"){
        return google.maps.DirectionsTravelMode.BICYCLING;
      }
    }
    // Sets the colors of the chart, from RGB data to Hex
    var setColors = function (colors) {
      var util = [];
      for(var i=0;i<colors.length;i++){
        var rgb = colors[i];
        var color = colorsSVC.rgbToHex(rgb.red, rgb.green, rgb.blue);
        util.push(color);
      }
      return util;
    }
    var createPolyline = function (pathLine, color, map) {
      return new google.maps.Polyline({ path: pathLine
                                      , strokeColor: color
                                      , strokeOpacity: 1.0
                                      , strokeWeight: 3
                                      , map: map
                                      , visible: true
                                      });
    };
    var createMarker = function (point, map) {
      var marker = new MarkerWithLabel({ position: new google.maps.LatLng(point.latitude, point.longitude) 
                                          , map: map
                                          , title: point.id.toString()
                                          , icon: { url: 'aps/res/markerBI_24.png'
                                                  , size: new google.maps.Size(24,24)
                                                  , anchor: new google.maps.Point(12,12)
                                                  }
                                          , zIndex: 1
                                          , labelContent: point.id < 100 ? (point.id < 10 ? "T0" + point.id.toString() : "T" + point.id.toString()) : point.id.toString() 
                                          , labelAnchor: new google.maps.Point(8, 7)
                                          , labelClass: "mrkLa"
                                          , labelZIndex: 2
                                          });
      return marker;
    }
    var buildPath = function(path, color, map, polylines, method) {
      var pathline = [];
      var service = new google.maps.DirectionsService();
      for(var i=0; i<path.length-1; i++) {
        service.route({ origin: cnvLatLong(path[i]) // Consumes a point from the path
                      , destination: cnvLatLong(path[i+1]) // Recursively calls itself for the next points
                      , travelMode: setPathMode(method)
                      }
          , function(result, status) { // Async Callback, gets the response from Google Maps Directions
            if(status == google.maps.DirectionsStatus.OK) {
              var path = result.routes[0].overview_path;
              var legs = result.routes[0].legs;
              for (var i=0;i<legs.length;i++) { // Parses the subroutes between two points
                var steps = legs[i].steps;
                for (var j=0;j<steps.length;j++) {
                  var nextSegment = steps[j].path;
                  for (var k=0;k<nextSegment.length;k++) { // Pushes the segment on the path
                    pathline.push(nextSegment[k]);
                  }
                }
              }
              // Generates the Polyline of the calculated path
              polylines.push(createPolyline(pathline,color,map));
              pathline = [];
            }
        });
      }
    };
    var resetMap = function (map, polylines, markers, id, position) {
      for(var line in polylines){
        polylines[line].setMap(null);
      }
      for(var marker in markers){
        markers[marker].setMap(null);
      }
    };
    
    return { createPolyline : createPolyline 
           , buildPath : buildPath
           , setColors : setColors
           , buildLegend : function (map, position, id) {
                             var legend = document.getElementById('mapLegend');
                             if (position == "top-right"){
                               if(map.controls[google.maps.ControlPosition.TOP_RIGHT].length > 0){ 
                                 map.controls[google.maps.ControlPosition.TOP_RIGHT].pop();
                               }
                               map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
                             }
                             if (position == "top-left"){
                               if(map.controls[google.maps.ControlPosition.TOP_LEFT].length > 0){ 
                                 map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
                               }
                               map.controls[google.maps.ControlPosition.TOP_LEFT].push(legend);
                             }
                             if (position == "bottom-right"){ 
                               if(map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].length > 0){ 
                                 map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].pop();
                               }
                               map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(legend);
                             }
                             if (position == "bottom-left"){
                               if(map.controls[google.maps.ControlPosition.BOTTOM_LEFT].length > 0){ 
                                 map.controls[google.maps.ControlPosition.BOTTOM_LEFT].pop();
                               }
                               map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(legend);
                             }
                           }
           , createMarker: createMarker
           , updateMovie : function (markers, newData, map) {
                             for(var marker in markers) {
                               var toBeRemoved = true; // It's always pending removal, except when it has to be updated!
                               for(var i=0;i<newData.newPoints.length && toBeRemoved == true;i++) {
                                 // Then update it!
                                 if(markers[marker].title == newData.newPoints[i].id.toString() || markers[marker].title == newData.newPoints[i].id){
                                   markers[marker].setPosition(new google.maps.LatLng(newData.newPoints[i].latitude, newData.newPoints[i].longitude));
                                   newData.newPoints.splice(i,1);
                                   toBeRemoved = false;
                                 }
                               }
                               if(toBeRemoved) {
                                 // I guess its time has come
                                 markers[marker].setMap();
                                 delete markers[marker];
                               }
                             }
                             // A new life is born!
                             for(var obj in newData.newPoints) {
                               markers[newData.newPoints[obj].id] = createMarker(newData.newPoints[obj], map);
                             }
                           }
           , resetMap: resetMap
           }
  }]);