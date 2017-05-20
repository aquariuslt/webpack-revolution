/* Created by Aquariuslt on 5/20/17.*/

authMenuConfig.$inject = ['navMenuService'];
function authMenuConfig(navMenuService) {
  navMenuService.addMenu({
    state: 'login',
    displayName: 'Login'
  });

  navMenuService.addMenu({
    state: 'register',
    displayName: 'Register'
  })
}

module.exports = authMenuConfig;