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
                templateUrl: 'app/pages/customer/custRelMnt/newCustRelation.html',
                controller: 'NewCustRelationCtrl',
            });
    }
// templateUrl: 'app/pages/profile/profile.html',  controller: 'ProfilePageCtrl',
})();
