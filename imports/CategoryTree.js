
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
			this.rootcat.addChild(new Category(category.name));
		} else {
			let parent = this.findCategory(category.parent);

			if(parent === null){
				throwNoParentCategory(category.parent);
			}

			parent.addChild(category);
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

	_initFromPlainObject(obj){
		this.rootcat = new Category(obj.rootcat.name);

		for(let key in obj.rootcat.subcats){
			this.rootcat.addChildFromPlainObject(obj.rootcat.subcats[key]);
		}
	}

}

class Category {
	constructor(name){
		this.name = name;
		this.subcats = {};
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

	addChildFromPlainObject(obj){
		if(this.subcats[obj.name]){
			throwCatExists(obj.name);
		}

		let child = this.subcats[obj.name] = new Category(obj.name);

		for(let key in obj.subcats){
			child.addChildFromPlainObject(obj.subcats[key]);
		}
	}
}