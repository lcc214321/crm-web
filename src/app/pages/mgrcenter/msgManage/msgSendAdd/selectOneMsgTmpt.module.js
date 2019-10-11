(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
          controller: 'selectOneMsgTmptCtrl',
        });
  }
// templateUrl: 'app/pages/profile/profile.html',  controller: 'ProfilePageCtrl',
})();
