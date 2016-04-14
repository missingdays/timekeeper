import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import CategoryTree from './CategoryTree.js';

if(Meteor.isServer){
	describe('CategoryTree', ()=>{
		let categoryTree;
		
		beforeEach(()=>{
			categoryTree = new CategoryTree();
		})

		describe('#addCategory', ()=>{
			it('should add category with no parent to root', ()=>{
				categoryTree.addCategory({
					name: 'test'
				});

				assert.equal(categoryTree.rootcat.subcats['test'].name, 'test');
			});

			it('should add category with parent', ()=>{
				categoryTree.addCategory({
					name: 'parent'
				});

				categoryTree.addCategory({
					name: 'child',
					parent: 'parent'
				});

				assert.equal(categoryTree.rootcat.subcats['parent'].subcats['child'].name, 'child');
			});
		});

		describe('#findCategory', ()=>{
			it('should find category if exists', ()=>{

				categoryTree.addCategory({
					name: 'test'
				});

				assert.equal(categoryTree.findCategory('test').name, 'test');
			});
		});
	});
}