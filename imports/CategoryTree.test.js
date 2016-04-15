import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import CategoryTree from './CategoryTree.js';

if(Meteor.isServer){
	describe('CategoryTree', ()=>{
		let categoryTree;
		
		beforeEach(()=>{
			categoryTree = new CategoryTree();
		});

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

			it('should throw if category exists', ()=>{
				categoryTree.addCategory({
					name: 'parent'
				});

				assert.throws(()=>{
					categoryTree.addCategory({
						name: 'parent'
					});
				})
			});

			it('should throw if category parent doesnt exist', ()=>{
				assert.throws(()=>{
					categoryTree.addCategory({
						parent: 'false',
						name: 'test'
					});
				})
			})
		});

		describe('#findCategory', ()=>{
			it('should find category if exists', ()=>{

				categoryTree.addCategory({
					name: 'test'
				});

				assert.equal(categoryTree.findCategory('test').name, 'test');
			});

			it('should return null if category doesnt exist', ()=>{
				categoryTree.addCategory({
					name: 'test'
				});

				assert.isNull(categoryTree.findCategory('false'));
			})
		});

		describe('#constructor from object', ()=>{
			it('should init from object with no cats', ()=>{
				categoryTree = new CategoryTree({
					rootcat: {
						name: 'root',
						subcats: {}
					}
				});

				assert.equal(categoryTree.rootcat.name, 'root');
				assert.deepEqual(categoryTree.rootcat.subcats, {});
			});

			it('should init from object with cats', ()=>{
				categoryTree = new CategoryTree({
					rootcat: {
						name: 'root',
						subcats: {
							parent: {
								name: 'parent',
								subcats: {
									child: {
										name: 'child',
										subcats: {}
									}
								}
							}
						}
					}
				});

				assert.equal(categoryTree.findCategory('parent').name, 'parent');
				assert.equal(categoryTree.findCategory('child').name, 'child');
			});
		});
	});
}