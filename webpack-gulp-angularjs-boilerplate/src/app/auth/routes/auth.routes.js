/** Created by CUIJA on 05-19-2017.*/


module.exports = function ($stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      template: require('../layouts/login/login.html')
    })
    .state({
      name: 'register',
      url: '/register',
      template: require('../layouts/register/register.html')
    })
};