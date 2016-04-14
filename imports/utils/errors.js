
import { Meteor } from 'meteor/meteor';

export function throwAccessDenied(){
    throw new Meteor.Error("Acces denied");
}

export function throwNoParentCategory(category){
    throw new Meteor.Error("No such parent category " + category);
}
