import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import CategoryTree from '../CategoryTree.js';

const Users = new Mongo.Collection('usersMain');

Meteor.methods({
    'users.api.new'(userId, settings){
        Users.insert({
            _id: userId,
            role: settings.role ? settings.role : 'user',
            overallTime: 0,
            categoryTree: new CategoryTree()
        });
    },

    'users.api.getInfo'(userId){
        let user = Users.findOne({ _id: userId });

        return {
            role: user.role,
            overallTime: user.overallTime,
            categoryTree: user.categoryTree
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

        if(session.categoryName !== undefined){
            Meteor.call('users.api.increaseTimeToCategory', userId, session.categoryName, time);
        }

        Meteor.call('users.api.increaseOverall', userId, time);
    },

    'users.api.getOverallTime'(userId){
        let info = Meteor.call('users.api.getInfo', userId);

        return info.overallTime;
    },

    'users.api.addCategory'(userId, category){
        let user = Users.findOne({ _id: userId });

        let categoryTree = new CategoryTree(user.categoryTree);
        categoryTree.addCategory(category);

        Users.update({ _id: userId }, { $set: {
            categoryTree: categoryTree.toNonRecursiveObject()
        } });
    },

    'users.api.increaseTimeToCategory'(userId, categoryName, time){
        let user = Users.findOne({ _id: userId });

        let categoryTree = new CategoryTree(user.categoryTree);

        categoryTree.increaseTimeToCategory(categoryName, time);

        Users.update({ _id: userId }, { $set: { 
            categoryTree: categoryTree.toNonRecursiveObject()
        } });
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
    },

    'users.addCategory'(category){
        let userId = this.userId;

        Meteor.call('users.api.addCategory', userId, category);
    }
});

Accounts.onCreateUser((options, user) => {
    Meteor.call('users.api.new', user._id, {});

    return user;
});