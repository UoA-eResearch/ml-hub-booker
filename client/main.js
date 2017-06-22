import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import '../imports/routes/routes';


angular.module('ml-hub-booking', [
    angularMeteor, ngMaterial, 'ml-hub-booking.routes'
])

.config(function ($mdThemingProvider, $mdIconProvider) {
    'ngInject';

    // $mdThemingProvider.theme('default')
    //     .primaryPalette('green')
    //     .accentPalette('purple');

    const iconPath = '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
        .iconSet('social',
            iconPath + 'svg-sprite-social.svg')
        .iconSet('file',
            iconPath + 'svg-sprite-file.svg')
        .iconSet('maps',
            iconPath + 'svg-sprite-maps.svg')
        .iconSet('action',
            iconPath + 'svg-sprite-action.svg')
        .iconSet('communication',
            iconPath + 'svg-sprite-communication.svg')
        .iconSet('content',
            iconPath + 'svg-sprite-content.svg')
        .iconSet('toggle',
            iconPath + 'svg-sprite-toggle.svg')
        .iconSet('navigation',
            iconPath + 'svg-sprite-navigation.svg')
        .iconSet('image',
            iconPath + 'svg-sprite-image.svg');

});

function onReady() {
    angular.bootstrap(document, ['ml-hub-booking'], {strictDi: true});
}


angular.element(document).ready(onReady);
