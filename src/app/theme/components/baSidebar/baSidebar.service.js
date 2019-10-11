(function() {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .provider('baSidebarService', baSidebarServiceProvider);

  /** @ngInject */
  function baSidebarServiceProvider() {
    var staticMenuItems = [];

    this.addStaticItem = function() {
      staticMenuItems.push.apply(staticMenuItems, arguments);
    };

    /** @ngInject */
    this.$get = function($state, layoutSizes,HttpService) {
      return new _factory();

      function _factory() {
        var isMenuCollapsed = shouldMenuBeCollapsed();

        this.getAllMenuItems= function(){
        	var states = defineMenuItemStates();
        	return states;
        }
        
        this.getMenuItems = function(states) {
        	
          /*
           * 获取anjularjs工程的module的路由数据 
           * var states = defineMenuItemStates();*/
          var menuItems = states.filter(function(item) {
            return item.level == 0;
          });

          menuItems.forEach(function(item) {
            var children = states.filter(function(child) {
              return child.level == 1 && child.name.indexOf(item.name) === 0;
            });
            item.subMenu = children.length ? children : null;
            
            //-------三级目录--------
            if(item.subMenu){
            	item.subMenu.forEach(function(item2){
            		var thirdChildren = states.filter(function(child) {
                        return child.level == 2 && child.name.indexOf(item2.name) === 0;
                    });
            		item2.subMenu = thirdChildren.length ? thirdChildren : null;
            	});
            }
            //---------------------
          });
          return menuItems.concat(staticMenuItems);
        };

        this.shouldMenuBeCollapsed = shouldMenuBeCollapsed;
        this.canSidebarBeHidden = canSidebarBeHidden;

        this.setMenuCollapsed = function(isCollapsed) {
          isMenuCollapsed = isCollapsed;
        };

        this.isMenuCollapsed = function() {
          return isMenuCollapsed;
        };

        this.toggleMenuCollapsed = function() {
          isMenuCollapsed = !isMenuCollapsed;
        };

        this.getAllStateRefsRecursive = function(item) {
          var result = [];
          _iterateSubItems(item);
          return result;

          function _iterateSubItems(currentItem) {
            currentItem.subMenu && currentItem.subMenu.forEach(function(subItem) {
              subItem.stateRef && result.push(subItem.stateRef);
              _iterateSubItems(subItem);
            });
          }
        };

        /*获取anjularjs工程的module的路由数据*/
        function defineMenuItemStates() {
          return $state.get()
              .filter(function(s) {
                return s.sidebarMeta;
              })
              .map(function(s) {
                var meta = s.sidebarMeta;
                return {
                  name: s.name,
                  title: s.title,
                  level: (s.name.match(/\./g) || []).length,
                  order: meta.order,
                  icon: meta.icon,
                  stateRef: s.name,
                  permissionOnly: s.name || '',
                  permissionExcept: meta.permissionExcept  || []
                };
              })
              .sort(function(a, b) {
                return (a.level - b.level) * 100 + a.order - b.order;
              });
        }

        function shouldMenuBeCollapsed() {
          return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
        }

        function canSidebarBeHidden() {
          return window.innerWidth <= layoutSizes.resWidthHideSidebar;
        }

      }

    };

  }
})();
