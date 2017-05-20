/** Created by CUIJA on 05-19-2017.*/

var angular = require('angular');
var uirouter = require('@uirouter/angularjs');


var core = require('./core');
var auth = require('./auth');

module.exports = angular.module('ita-app', [
  'ui.router',

  // application modules
  core,
  auth
])

;