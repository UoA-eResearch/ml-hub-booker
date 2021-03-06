import {Meteor} from 'meteor/meteor';
import {Bookings} from '../imports/collections/bookings';

Meteor.publish("booking", function (bookingId) {
    return Bookings.find({_id: bookingId});
});

Meteor.publish("bookingsOnDate", function (date) {
    return Bookings.find({'date': {$eq: date}}, {fields: {times: 1}});
});