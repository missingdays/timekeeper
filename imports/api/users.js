import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('usersMain');

Meteor.methods({
    'users.api.new'(userId, settings){
        console.log(userId);
        Users.insert({
            _id: userId,
            role: settings.role ? settings.role : 'user',
            overallTime: 0
        });
    },

    'users.api.getInfo'(userId){
        let user = Users.findOne({ _id: userId });

        return {
            _id: user._id,
            role: user.role,
            overallTime: user.overallTime
        };
    },

    'users.api.setUserSettings'(userId, settings){
        Meteor.call('users.api.throwIfNotAdmin', userId);
        Users.update({ _id: userId }, { $set: { role: settings.role } });
    },

    'users.api.throwIfNotAdmin'(userId){
        if(!user || user.role !== 'admin'){
            throwAccessDenied();
        }
    },

    'users.api.increaseOverall'(userId, time){
        Users.update({ _id: userId }, { $inc: { overallTime: time } });
    },

    'users.api.addSession'(userId, session){
        let time = (session.end - session.start) / 1000;
        time = Math.floor(time);

        Meteor.call('users.api.increaseOverall', userId, time);
    },

    'users.api.getOverallTime'(userId){
        let info = Meteor.call('users.api.getInfo', userId);

        return info.overallTime;
    }
});

Meteor.methods({
    'users.getInfo'(){
        let userId = this.userId;
        return Meteor.call('users.api.getInfo', userId);
    },

    'users.setUserSettings'(settings){
        let userId = this.userId;
        return Meteor.call('users.api.setUserSettings', userId, settings);
    },

    'users.throwIfNotAdmin'(){
        let userId = this.userId;
        return Meteor.call('users.api.throwIfNotAdmin', userId);
    },

    'users.increaseOverall'(time){
        let userId = this.userId;
        return Meteor.call('users.api.increaseOverall', userId, time);
    },

    'users.addSession'(session){
        let userId = this.userId;
        return Meteor.call('users.api.addSession', userId, session);
    },

    'users.getOverallTime'(callback){
        let userId = this.userId;
        let time = Meteor.call('users.api.getOverallTime', userId);

        return time;
    }
});

Accounts.onCreateUser((options, user) => {
    Meteor.call('users.api.new', user._id, {});

    return user;
});