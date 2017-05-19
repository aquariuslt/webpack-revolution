/** Created by CUIJA on 05-19-2017.*/


module.exports = function ($stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      template: ' <h3>Login Page</h3>'
    })
    .state({
      name: 'register',
      url: '/register',
      template: '<h3>Register Page</h3>'
    })
};