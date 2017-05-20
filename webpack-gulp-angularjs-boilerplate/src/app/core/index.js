/** Created by CUIJA on 05-19-2017.*/

var angular = require('angular');


var coreRoutes = require('./routes/core.routes');

var navMenuService = require('./services/menu.service');


var navbarController = require('./components/navbar/navbar.controller');
var navbarComponent = require('./components/navbar/navbar');

const moduleName = 'core';

angular.module(moduleName, [])
  .config(coreRoutes)
  .factory('navMenuService', navMenuService)


  .component('navbar', navbarComponent)
  .controller('navbarController', navbarController)
;

module.exports = moduleName;