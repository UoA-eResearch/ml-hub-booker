import angular from 'angular';
import angularMeteor from 'angular-meteor';
import CryptoJS from 'crypto-js';
import template from './booking.html';
import './booking.css';


class BookingCtrl {

    constructor($scope, $state, $timeout, $q) {
        'ngInject';
        $scope.viewModel(this);

        this.$state = $state;
        this.$timeout = $timeout;
        this.$q = $q;

        this.allContacts = this.loadContacts();

        this.times = [];
        this.model = {
            date: '',
            times: [],
            type: '',
            users: []
        };

        this.errors = {
            'type': {}
        };

        $scope.$watch('$ctrl.model.date', (newValue, oldValue) => {
            if(newValue !== '') {
                this.times = this.loadTimes();
            }
        }, true);

        $scope.$watch('$ctrl.model.type', (newValue, oldValue) => {
            if(newValue !== '') {
                this.model.users = [];
            }
        }, true);

    }

    loadTimes() {
        let times = [];

        if(this.model.date !== '') {
            let date = moment();
            let today = moment().startOf('day').diff(moment(this.model.date), 'days') === 0;

            if (!today) {
                date = moment(this.model.date);
            }

            let start = date.clone().startOf('hour');

            if(!today) {
                start = date.clone().startOf('day').subtract(1, 'hour');
            }

            let end = date.clone().endOf('day');
            let diff = end.diff(start, 'hours');

            let currentHour = start.clone();
            for (let i = 0; i < diff; i++) {
                let hour = currentHour.add(1, 'hour').clone();
                times.push({'name': hour.format('LT'), value: hour});
            }
        }

        return times;
    }

    showTimes() {
        return this.model.date !== '';
    }

    showUsers() {
        return this.model.type !== '';
    }

    contactLabel(capitalize=false) {
        let label = 'ser';

        if(this.model.type === 'class') {
            label = 'sers';
        }

        if(capitalize) {
            label = 'U' + label;
        }
        else {
            label = 'u' + label;
        }

        return label;
    }

    toggle(item, list) {
        let idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    exists(item, list) {
        return list.indexOf(item) > -1;
    }

    showDateError() {
        return this.bookingForm.$submitted && this.model.date === '';
    }

    showTimesError() {
        return this.bookingForm.$submitted && this.model.times.length === 0;
    }

    showTypeError() {
        return this.bookingForm.$submitted && this.model.type === '';
    }

    showMinUsersError() {
        return this.bookingForm.$submitted && this.model.users < 1;
    }

    showMaxUsersError() {
        return this.bookingForm.$submitted && this.model.users > 1 && this.model.type === 'individual';
    }

    submit() {
        this.bookingForm.$submitted = true;

        if (this.bookingForm.$valid && this.model.times.length > 0 && this.model.users.length > 0) {
            let model = {times: [], users: []};
            model.date = this.model.date;
            model.type = this.model.type;
            // model.users = this.model.users;

            // Hours
            for(let i = 0; i < this.model.times.length; i++) {
                model.times.push(this.model.times[i].hour())
            }

            // Users
            for(let i = 0; i < this.model.users.length; i++) {
                let user = this.model.users[i];
                model.users.push({'name': user.name, 'upi': user.upi, 'image': user.image});
            }

            Meteor.call('bookings.insert', model, (error, result) => {
                if(result) {
                    this.$state.go('confirmation', {id: result});
                }
            });
        }
    }

    querySearch(criteria) {
        return criteria ? this.allContacts.filter(this.createFilterFor(criteria)) : [];
    }

    createFilterFor(query) {
        let lowercaseQuery = angular.lowercase(query);

        return (contact) => {
            return (contact._lowername.indexOf(lowercaseQuery) != -1);
        };

    }

    loadContacts() {
        let contacts = [
            {name: 'Jamie Diprose', upi: 'jdip004'},
            {name: 'Manish Kukreja', upi: '3324'},
            {name: 'Nick Young', upi: '324234'},
            {name: 'Martin Feller', upi: 'sdfsdf'},
            {name: 'Sina Mosad Ansari', upi: '2334'},
            {name: 'Jason He', upi: '98979'}
        ];

        return contacts.map((c, index) => {
            let hash = CryptoJS.MD5(c.upi);

            let contact = {
                name: c.name,
                upi: c.upi,
                image: '//www.gravatar.com/avatar/' + hash + '?s=50&d=retro'
            };
            contact._lowername = contact.name.toLowerCase();
            return contact;
        });
    }
}

const name = 'booking';
export default angular.module(name, [
    angularMeteor
])
    .component(name, {
        template,
        controller: BookingCtrl
    });