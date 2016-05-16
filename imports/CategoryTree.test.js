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

				assert.equal(categoryTree.rootcat.children['test'].name, 'test');
			});

			it('should add category if parent is specified as root', ()=>{
				categoryTree.addCategory({
					name: 'test',
					parent: 'root'
				});

				assert.equal(categoryTree.rootcat.children['test'].name, 'test');				
			});

			it('should add category with parent', ()=>{
				categoryTree.addCategory({
					name: 'parent'
				});

				categoryTree.addCategory({
					name: 'child',
					parent: 'parent'
				});

				assert.equal(categoryTree.rootcat.children['parent'].children['child'].name, 'child');
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

		describe('#removeCategory', ()=>{
			it('should remove category', ()=>{
				categoryTree.addCategory({
					name: 'test'
				});

				categoryTree.removeCategory('test');

				assert.isNull(categoryTree.findCategory('test'));
			});

			it('should remove all children of category', ()=>{
				categoryTree.addCategory({
					name: 'parent'
				});

				categoryTree.addCategory({
					parent: 'parent',
					name: 'child1'
				});

				categoryTree.addCategory({
					parent: 'parent',
					name: 'child2'
				});

				categoryTree.removeCategory('parent');

				assert.isNull(categoryTree.findCategory('parent'));
				assert.isNull(categoryTree.findCategory('child1'));
				assert.isNull(categoryTree.findCategory('child1'));
			});

			it('should throw error when deleting root', ()=>{
				assert.throws(()=>{
					categoryTree.removeCategory(CategoryTree.rootCategory);
				})
			});
		});

		describe('#increaseTime', ()=>{
			it('should increase time', ()=>{
				categoryTree.addCategory({
					name: 'test'
				});

				let category = categoryTree.findCategory('test');

				category.increaseTime(10);

				assert.equal(category.getTime(), 10);
			});

			it('should increase time to parent', ()=>{
				categoryTree.addCategory({
					name: 'parent'
				});

				categoryTree.addCategory({
					name: 'child',
					parent: 'parent'
				});

				let category = categoryTree.findCategory('child');

				category.increaseTime(10);

				assert.equal(category.getTime(), 10);
				assert.equal(categoryTree.findCategory('parent').getTime(), 10);
				assert.equal(categoryTree.getRoot().getTime(), 10);

				categoryTree.findCategory('parent').increaseTime(10);

				assert.equal(categoryTree.findCategory('parent').getTime(), 20);
				assert.equal(categoryTree.getRoot().getTime(), 20);
			});
		});

		describe('#constructor from object', ()=>{
			it('should init from object with no cats', ()=>{
				categoryTree = new CategoryTree({
					rootcat: {
						name: 'root',
					children: {}
					}
				});

				assert.equal(categoryTree.rootcat.name, 'root');
				assert.deepEqual(categoryTree.rootcat.children, {});
			});

			it('should init from object with cats', ()=>{
				categoryTree = new CategoryTree({
					rootcat: {
						name: 'root',
					children: {
							parent: {
								name: 'parent',
							children: {
									child: {
										name: 'child',
									children: {}
									}
								}
							}
						}
					}
				});

				assert.equal(categoryTree.findCategory('parent').name, 'parent');
				assert.equal(categoryTree.findCategory('child').name, 'child');

				assert.equal(categoryTree.findCategory('child').parent.name, 'parent');
			});
		});

		describe('#toNonRecursiveObject', ()=>{
			it('should transform with just rootcat', ()=>{
				let obj = categoryTree.toNonRecursiveObject();

				assert.deepEqual(obj, {
					rootcat: {
						name: 'root',
						time: 0,
					children: {}
					}
				});
			});

			it('should transform when has.children', ()=>{
				categoryTree = new CategoryTree({
					rootcat: {
						name: 'root',
					children: {
							subcat: {
								name: 'subcat'
							}
						}
					}
				});

				let obj = categoryTree.toNonRecursiveObject();
			});
		});
	});
}