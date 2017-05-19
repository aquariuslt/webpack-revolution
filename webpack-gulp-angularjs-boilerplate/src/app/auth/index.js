/** Created by CUIJA on 05-19-2017.*/

var angular = require('angular');


var authRoutes = require('./routes/auth.routes');

const moduleName = 'auth';

angular.module(moduleName,[])
  .config(authRoutes)
;


module.exports = moduleName;
