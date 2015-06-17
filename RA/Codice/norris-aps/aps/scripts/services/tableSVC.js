'use strict';

angular.module("services")
  .factory('tableSVC', [ "colorsSVC", function (colorsSVC) {
    return { 
            fillData: function (headers, inData, colors, border) {
                         var data = { cols: []
                                    , rows: []
                                    };
                         // Filling headers
                         for(var i=0; i<headers.length; i++){
                           var col = { "id": headers[i]
                                     , "label": headers[i]
                                     , "type": "number"
                                     , "p": {}
                                     };
                           data.cols.push(col);
                         }
                        // Filling Data
                         for(var i=0; i<inData.length; i++){
                            var row = { "c": [] };
                            for(var j=0; j<inData[i].length; j++) {
                              // Font color
                              var fontStyle = colorsSVC.rgbToHex(colors[i][j][1].red, colors[i][j][1].green, colors[i][j][1].blue);
                              // Background color
                              var bgStyle = colorsSVC.rgbToHex(colors[i][j][0].red, colors[i][j][0].green, colors[i][j][0].blue);
                              var style = "color:" + fontStyle + ";background-color:" + bgStyle + ";";
                              if(border) {
                                style = style + "border: 2px solid black;";
                              }
                              var element = { "v": inData[i][j]
                                            , "p": { "style": style }
                                            };
                              row.c.push(element);
                             }
                           data.rows.push(row);
                         }
                         return data;
             }
             , inPlaceUpd: function (inData, outData) {
                             // Set the correct data into the correct place
                             outData.rows[inData.row].c[inData.column].v = inData.data;
                             // Colorize
                             var style = "color:" + colorsSVC.rgbToHex(inData.colorFont.red, inData.colorFont.green, inData.colorFont.blue) + ";background-color:" + colorsSVC.rgbToHex(inData.colorCell.red, inData.colorCell.green, inData.colorCell.blue) + ";";
                             if(inData.border) {
                               style = style + "border: 2px solid black;";
                             }
                             outData.rows[inData.row].c[inData.column].p.style = style;
             }
             , streamUpd: function (inData, outData, limit) {
                            //Create new row, then colorize it, apply borders and push data into it
                            var row = { "c": []};
                            for(var j=0; j<inData.data.length; j++) {
                              var fontStyle = colorsSVC.rgbToHex(inData.colors[j][1].red, inData.colors[j][1].green, inData.colors[j][1].blue);
                              var bgStyle = colorsSVC.rgbToHex(inData.colors[j][0].red, inData.colors[j][0].green, inData.colors[j][0].blue);
                              var style = "color:" + fontStyle + ";background-color:" + bgStyle + ";";
                              if(inData.border) {
                                style = style + "border: 2px solid black;";
                              }
                              var element = { "v": inData.data[j]
                                            , "p": { "style": style }
                                            };
                              row.c.push(element);
                            }
                            if(inData.insertPosition == "bottom"){
                              if(outData.rows.length>=limit){
                                outData.rows.shift();
                              }
                              outData.rows.push(row);
                            }
                            else{
                              if(outData.rows.length>=limit){
                                outData.rows.pop();
                              }
                              outData.rows.unshift(row);
                            }
                          }
             }
    }]);