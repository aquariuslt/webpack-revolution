/** Created by CUIJA on 05-19-2017.*/

var angular = require('angular');

var core = require('../core');

var authRoutes = require('./routes/auth.routes');

var authMenuConfig = require('./configs/menu.config');

const moduleName = 'auth';

angular.module(moduleName, [
  core
])
  .config(authRoutes)
  .run(authMenuConfig)
;


module.exports = moduleName;
