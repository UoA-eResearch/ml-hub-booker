import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularUiRouter from 'angular-ui-router';
import booking from '../components/booking/booking';
import confirmation from '../components/confirmation/confirmation';


angular.module('ml-hub-booking.routes', [angularMeteor, 'ui.router',
    booking.name, confirmation.name])
    .config(function ($stateProvider, $urlRouterProvider) {
        'ngInject';

        $urlRouterProvider.otherwise("/booking");

        $stateProvider
            .state('confirmation', {
                url: "/confirmation/:id",
                views: {
                    'main-view': {
                        component: confirmation.name
                    }
                }
            })
            .state('booking', {
                url: "/booking",
                views: {
                    'main-view': {
                        component: booking.name
                    }
                }
            })
        });

