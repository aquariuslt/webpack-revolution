/** Created by CUIJA on 05-19-2017.*/

var angular = require('angular');
var uirouter = require('@uirouter/angularjs');


var core = require('./app/core');
var auth = require('./app/auth');

angular.module('ita-app', [
  'ui.router',

  // application modules
  core,
  auth
])

;