import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-material-sidemenu/dest/angular-material-sidemenu.css';
import 'angular-material-sidemenu/dest/angular-material-sidemenu.js';
import template from './confirmation.html';
import './confirmation.css';
import {Bookings} from '../../../imports/collections/bookings';


class Confirmation {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        // $scope.viewModel(this);
        $reactive(this).attach($scope);
        this.bookingId = $stateParams.id;

        this.helpers({
            booking: () => {
                return Bookings.findOne({_id: this.getReactively('bookingId')});
            }
        });

        this.subscribe('booking', () => {
            return [
                this.getReactively('bookingId')
            ]
        });
    }

    formatTimes(times) {
        let text = '';

        if(times !== undefined)
        {
            let date = moment(this.booking.date).startOf('day');

            for(let i = 0; i < times.length; i++) {
                text += date.clone().hour(times[i]).format('LT');

                if(i < times.length - 1) {
                    text += ', '
                }
            }
        }

        return text;
    }

    formatDate(date) {
        if(date !== undefined)
            return moment(date).format('LL');

        return '';
    }
}

const name = 'confirmation';
export default angular.module(name, [
    angularMeteor
])
    .component(name, {
        template,
        controller: Confirmation
    });
