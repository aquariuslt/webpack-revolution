/** Created by CUIJA on 05-19-2017.*/


function navMenuService() {

  var svc = this;

  svc.menus = [
    {
      state: 'home',
      displayName: 'Home'
    },
    {
      state: 'about',
      displayName: 'About'
    }
  ];




  function addMenu(menu) {
    svc.menus.push(menu);
  }

  function getMenus() {
    return svc.menus;
  }

  return {
    getMenus: getMenus,
    addMenu: addMenu
  }
}


module.exports = navMenuService;