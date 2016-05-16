
import { throwCatExists, throwNoParentCategory } from './utils/errors.js';

export default class CategoryTree {

	constructor(obj){
		if(obj === undefined){
			this.rootcat = new Category(CategoryTree.rootCategory);
		} else {
			this._initFromPlainObject(obj);
		}
	}

	addCategory(category){
		if(!category.parent){
			this.rootcat.addChild(new Category(category.name, this.rootcat));
		} else {
			let parent = this.findCategory(category.parent);

			if(parent === null){
				throwNoParentCategory(category.parent);
			}

			parent.addChild(new Category(category.name, parent));
		}
	}

	findCategory(categoryName, at){

		if(at === undefined){
			at = this.rootcat;
		}

		if(at.name === categoryName){
			return at;
		}

		for(let key in at.children){
			let category = this.findCategory(categoryName, at.children[key]);

			if(category !== null){
				return category;
			}
		}

		return null;
	}

	removeCategory(categoryName){
		if(categoryName === CategoryTree.rootCategory){
			throw new Error("Can't remove root category");
		}

		let category = this.findCategory(categoryName);

		category.remove();
	}

	increaseTimeToCategory(categoryName, time){
		let category = this.findCategory(categoryName);

		if(category === null){
			throw new Error(`Cant increase time to category ${categoryName}: no such category`);
		}
		
		category.increaseTime(time);
	}

	toNonRecursiveObject(){
		return {
			rootcat: this.rootcat.toNonRecursiveObject()
		};
	}

	getRoot(){
		return this.rootcat;
	}

	_initFromPlainObject(obj){
		this.rootcat = new Category(obj.rootcat.name, null, obj.rootcat.time);

		for(let key in obj.rootcat.children){
			this.rootcat.addChildFromPlainObject(obj.rootcat.children[key], this.rootcat);
		}
	}

}

CategoryTree.rootCategory = 'root';

class Category {
	constructor(name, parent, time){
		this.name = name;

		this.children = {};

		this.time = time || 0;
		this.parent = parent;
	}

	hasChild(childName){
		return this.children[childName] !== undefined;
	}

	addChild(child){
		if(this.children[child.name]){
			throwCatExists(child.name);
		}

		this.children[child.name] = child;
	}

	remove(){
		this.parent.removeChild(this.name);
	}

	removeAllChildren(){
		for(let name in this.children){
			this.removeChild(name);
		}
	}

	removeChild(childName){
		this.children[childName].removeAllChildren();
		delete this.children[childName];
	}

	addChildFromPlainObject(obj, parent){
		if(this.children[obj.name]){
			throwCatExists(obj.name);
		}

		let child = this.children[obj.name] = new Category(obj.name, parent, obj.time);

		if(obj.children !== undefined){
			for(let key in obj.children){
				child.addChildFromPlainObject(obj.children[key], child);
			}
		}
	}

	increaseTime(t){
		this.time += t;

		if(this.parent){
			this.parent.increaseTime(t);
		}
	}

	getTime(){
		return this.time;
	}

	toNonRecursiveObject(){

		let children = {};

		for(let key in this.children){
			let subcat = this.children[key];
			children[subcat.name] = subcat.toNonRecursiveObject();
		}

		return {
			name: this.name,
			time: this.time,
			children: children
		}
	}

	childrenAsArray(){
		let s = [];

		for(let name in this.children){
			s.push(this.children[name]);
		}

		return s;
	}
}