/* Created by Aquariuslt on 5/20/17.*/


navbarController.$inject = ['navMenuService'];
function navbarController(navMenuService) {
  var vm = this;

  vm.menus = navMenuService.getMenus();

}

module.exports = navbarController;