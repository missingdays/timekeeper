import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { throwAccessDenied, throwNoParentCategory } from '../utils/errors.js';

export const Categories = new Mongo.Collection('categories');

if(Meteor.isServer){
    Meteor.publish('categories', function catsPublication(){
       return Categories.find({}).fetch();
    });
}

Meteor.methods({
    'categories.add'(category){
        check(category, Object);
        
        let user = this.userId;

        Meteor.call("users.throwIfNotAdmin", user);

        if(category.parent){
            let parent = Categories.findOne({ _id: category.name });

            if(!parent){
                throwNoParentCategory(category.parent);
            }

            Categories.update(parent, { $addToSet: { children: category.name } } );
        }

        Categories.insert({
            _id: category.name,
            parent: category.parent,
            children: []
        });
    },

    'categories.removeById'(categoryId){
        check(categoryId, String);

        let user = Meteor.userId();

        if(!user || !Roles.userInRole(user, ['admin'])){
            throwAccessDenied();
        }

        let parent = Categories.findOne({}, { children: { $elemMatch: categoryId } } );

        if(parent){
            Categories.update(parent, { $pull: { children: categoryId } } );
        }

        Categories.remove({ _id: categoryId });
    },
});
