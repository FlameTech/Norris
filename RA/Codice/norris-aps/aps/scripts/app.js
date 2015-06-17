'use strict';

angular.module("services", [ "ngResource" ] );

angular.module("controllers", [ "services", "ngMap", "ui.bootstrap", "ui.select", "ngSanitize", "googlechart"] );

angular.module('ApsApp', [ "controllers", "services" ]);