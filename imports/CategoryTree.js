
import { throwCatExists, throwNoParentCategory } from './utils/errors.js';

export default class CategoryTree {
	constructor(obj){
		if(obj === undefined){
			this.rootcat = new Category('root');
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

		for(let key in at.subcats){
			let category = this.findCategory(categoryName, at.subcats[key]);

			if(category !== null){
				return category;
			}
		}

		return null;
	}

	increaseTimeToCategory(categoryName, time){
		let category = this.findCategory(categoryName);
		category.increaseTime(time);
	}

	getRoot(){
		return this.rootcat;
	}

	_initFromPlainObject(obj){
		this.rootcat = new Category(obj.rootcat.name);

		for(let key in obj.rootcat.subcats){
			this.rootcat.addChildFromPlainObject(obj.rootcat.subcats[key], this.rootcat);
		}
	}

}

class Category {
	constructor(name, parent){
		this.name = name;
		this.subcats = {};
		this.time = 0;
		this.parent = parent;
	}

	hasChild(childName){
		return this.subcats[childName] !== undefined;
	}

	addChild(child){
		if(this.subcats[child.name]){
			throwCatExists(child.name);
		}

		this.subcats[child.name] = child;
	}

	addChildFromPlainObject(obj, parent){
		if(this.subcats[obj.name]){
			throwCatExists(obj.name);
		}

		let child = this.subcats[obj.name] = new Category(obj.name, parent);

		for(let key in obj.subcats){
			child.addChildFromPlainObject(obj.subcats[key], child);
		}
	}

	increaseTime(t){
		this.time += t;

		if(this.parent !== undefined){
			this.parent.increaseTime(t);
		}
	}

	getTime(){
		return this.time;
	}
}