var request = require('request');
var express = require('express');
var path = require('path');
var app = express();

var http = require('http').createServer(app);
var socket = require('socket.io').listen(http);
var nsp = socket.of('/norris');

var Norris = require('norris-rtbi')(nsp);
var page = new Norris.Page("APS Test", {columns:2});


var fs = require('fs');
var hashMap = require('hashmap');

var mappe = [];
var tabelle = [];

// lettura informazioni sulle linee
fs.readFile('percorsi.json', 'utf8', function (err,data) {
  if (err) {
    return console.log("Error: perocrsi.json not found");
  }
  var dati = JSON.parse(data);
  // creazione mappe
  for(var linea in dati){
    mappe[linea] = new Norris.MapChart("Linea "+linea, dati[linea].percorso, [], 45.417582, 11.846263, {zoom: 13, legend: true, pathMode: "transit", pathName: dati[linea].nome, colors: dati[linea].colori});
    tabelle[linea] = new Norris.Table("Linea "+linea, ["Id","Latitude","Longitude"],[],{displayedLines:10,rowsLimit:50});
    page.addGraph(tabelle[linea]);
    page.addGraph(mappe[linea]); 
  }

  
});
app.use('/data', Norris.PageRouter(page));
app.use('/aps', express.static(path.resolve(__dirname+('/aps'))));

// UPDATE
var url = 'http://www.apsholding.it/index.php/informazioni/dov-e-il-mezzo-pubblico-in-tempo-reale?option=com_mappeaps&view=posmezzi&format=raw';


var map10 = new hashMap();
setInterval( function() {
  var update10 = [];
  request.post({url:url, form: {l:10}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info10 = JSON.parse(body);
      info10.forEach(function(item,index){
        var updateJ10 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ10.latitude != 0 && updateJ10.longitude != 0){
          update10.push(updateJ10);
          var oldP10 = map10.get(item.IdMezzo);
          if(oldP10 !== undefined){
            if(oldP10[0] !== item.WGS84La && oldP10[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["10"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map10.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["10"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map10.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["10"].updateMovie(update10);
    }
  });
}, 5000);

var map11 = new hashMap();
setInterval( function() {
  var update11 = [];
  request.post({url:url, form: {l:11}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info11 = JSON.parse(body);
      info11.forEach(function(item,index){
        var updateJ11 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ11.latitude != 0 && updateJ11.longitude != 0){
          update11.push(updateJ11);
          var oldP11 = map11.get(item.IdMezzo);
          if(oldP11 !== undefined){
            if(oldP11[0] !== item.WGS84La && oldP11[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["11"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map11.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["11"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map11.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["11"].updateMovie(update11);
    }
  });
}, 5000);

var map12 = new hashMap();
setInterval( function() {
  var update12 = [];
  request.post({url:url, form: {l:12}},function(err,httpResponse,body){
    if(body !== undefined){
      var info12 = JSON.parse(body);
      info12.forEach(function(item,index){
        var updateJ12 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ12.latitude != 0 && updateJ12.longitude != 0){
          update12.push(updateJ12);
          var oldP12 = map12.get(item.IdMezzo);
          if(oldP12 !== undefined){
            if(oldP12[0] !== item.WGS84La && oldP12[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["12"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map12.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["12"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map12.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["12"].updateMovie(update12);
    }
  });
}, 5000);

var map13 = new hashMap();
setInterval( function() {
  var update13 = [];
  request.post({url:url, form: {l:13}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info13 = JSON.parse(body);
      info13.forEach(function(item,index){
        var updateJ13 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ13.latitude != 0 && updateJ13.longitude != 0){
          update13.push(updateJ13);
          var oldP13 = map10.get(item.IdMezzo);
          if(oldP13 !== undefined){
            if(oldP13[0] !== item.WGS84La && oldP13[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["13"].updateStream([item.IdMezzo,item.WGS84Fi,item.WGS84La]);
              map13.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["13"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map13.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["13"].updateMovie(update13);
    }
  });
}, 5000);

var map15 = new hashMap();
setInterval( function() {
  var update15 = [];
  request.post({url:url, form: {l:15}},function(err,httpResponse,body){
    if(body !== undefined){
      var info15 = JSON.parse(body);
      info15.forEach(function(item,index){
        var updateJ15 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ15.latitude != 0 && updateJ15.longitude != 0){
          update15.push(updateJ15);
          var oldP15 = map10.get(item.IdMezzo);
          if(oldP15 !== undefined){
            if(oldP15[0] !== item.WGS84La && oldP15[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["15"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map15.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["15"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map15.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["15"].updateMovie(update15);
    }
  });
}, 5000);

var map16 = new hashMap();
setInterval( function() {
  var update16 = [];
  request.post({url:url, form: {l:16}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info16 = JSON.parse(body);
      info16.forEach(function(item,index){
        var updateJ16 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ16.latitude != 0 && updateJ16.longitude != 0){
          update16.push(updateJ16);
          var oldP16 = map10.get(item.IdMezzo);
          if(oldP16 !== undefined){
            if(oldP16[0] !== item.WGS84La && oldP16[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["16"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map16.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["16"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map16.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["16"].updateMovie(update16);
    }
  });
}, 5000);

var map18 = new hashMap();
setInterval( function() {
  var update18 = [];
  request.post({url:url, form: {l:18}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info18 = JSON.parse(body);
      info18.forEach(function(item,index){
        var updateJ18 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ18.latitude != 0 && updateJ18.longitude != 0){
          update18.push(updateJ18);
          var oldP18 = map10.get(item.IdMezzo);
          if(oldP18 !== undefined){
            if(oldP18[0] !== item.WGS84La && oldP18[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["18"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map18.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["18"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map18.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["18"].updateMovie(update18);
    }
  });
}, 5000);

var map22 = new hashMap();
setInterval( function() {
  var update22 = [];
  request.post({url:url, form: {l:22}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info22 = JSON.parse(body);
      info22.forEach(function(item,index){
        var updateJ22 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ22.latitude != 0 && updateJ22.longitude != 0){
          update22.push(updateJ22);
          var oldP22 = map10.get(item.IdMezzo);
          if(oldP22 !== undefined){
            if(oldP22[0] !== item.WGS84La && oldP22[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["22"].updateStream([item.IdMezzo,item.WGS84F, item.WGS84La]);
              map22.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["22"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map22.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["22"].updateMovie(update22);
    }
  });
}, 5000);

var map24 = new hashMap();
setInterval( function() {
  var update24 = [];
  request.post({url:url, form: {l:24}}, function(err,httpResponse,body){
    if(body !== undefined){
      var info24 = JSON.parse(body);
      info24.forEach(function(item,index){
        var updateJ24 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJ24.latitude != 0 && updateJ24.longitude != 0){
          update24.push(updateJ24);
          var oldP24 = map10.get(item.IdMezzo);
          if(oldP24 !== undefined){
            if(oldP24[0] !== item.WGS84La && oldP24[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["24"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              map24.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["24"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            map24.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["24"].updateMovie(update24);
    }
  });
}, 5000);

var mapSIR1 = new hashMap();
setInterval( function() {
  var updateSIR1 = [];
  request.post({url:url, form: {l:"SIR1"}}, function(err,httpResponse,body){
    if(body !== undefined){
      var infoSIR1 = JSON.parse(body);
      infoSIR1.forEach(function(item,index){
        var updateJSIR1 = {
          id        : item.IdMezzo,
          latitude  : item.WGS84Fi,
          longitude : item.WGS84La          
        };
        if(updateJSIR1.latitude != 0 && updateJSIR1.longitude != 0){
          updateSIR1.push(updateJSIR1);
          var oldPSIR1 = map10.get(item.IdMezzo);
          if(oldPSIR1 !== undefined){
            if(oldPSIR1[0] !== item.WGS84La && oldPSIR1[1] !== item.WGS84La){// se la posizione è cambiata
              tabelle["SIR1"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
              mapSIR1.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
            }
          }
          else{
            tabelle["SIR1"].updateStream([item.IdMezzo,item.WGS84Fi, item.WGS84La]);
            mapSIR1.set(item.IdMezzo,[item.WGS84Fi,item.WGS84La]);
          }
        }
      });
      mappe["SIR1"].updateMovie(updateSIR1);
    }
  });
}, 5000);

http.listen(process.env.PORT || 3000);