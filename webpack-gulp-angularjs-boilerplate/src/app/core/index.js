/** Created by CUIJA on 05-19-2017.*/


var coreRoutes = require('./routes/core.routes');

const moduleName = 'core';

angular.module(moduleName, [])
  .config(coreRoutes)
;

module.exports = moduleName;