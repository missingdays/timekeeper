import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { assert } from 'meteor/practicalmeteor:chai';

import { Categories } from './category.js';

import { getAdminUser } from '../utils/testing.js';

if(Meteor.isServer){

    describe('Categories', ()=>{

        describe('methods', ()=>{

            const userId = Random.id();
            let categoryId;

            beforeEach(() => {
                Categories.remove({});

                categoryId = Categories.insert({
                    _id: "Test category"
                });
            });

            it('can find category', ()=>{
                let cat = Categories.findOne({ _id: categoryId });

                assert.notEqual(cat, undefined);
            });

            it('can add new category', ()=>{
                const categoriesAdd = Meteor.server.method_handlers['categories.add'];
                const inv = getAdminUser();

                categoriesAdd.apply(inv, [{ _id: 'New cat' }]);

                let cat = Categories.findOne({ _id: "New cat"  });

                assert.equal(cat._id, "New cat");
            });
        });
    });
}
