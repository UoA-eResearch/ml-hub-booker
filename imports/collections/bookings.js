import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

Bookings = new Mongo.Collection("bookings");


if (Meteor.isServer) {
    Meteor.methods({
        'bookings.insert' (booking)
        {
            check(booking, {
                type: String,
                users: [Object],
                date: Date,
                times: [Number]
            });

            check(booking.type, Match.OneOf("class", "individual"));

            return Bookings.insert(booking);
        }
    });

    Bookings.allow({
        insert: function(){
            return false;
        },
        update: function(){
            return false;
        },
        remove: function(){
            return false;
        }
    });
}


export default {Bookings};