import React, { Component } from 'react';

import CategoryTree from '../CategoryTree.js';
import { objectTimeS } from '../utils/time.js';

export default class Category extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		let name = this.props.name;

		let categoryTree = this.state.categoryTree;

		if(categoryTree === undefined){
			return (
				<ul></ul>
			);
		}

		let category = categoryTree.findCategory(name);
		let time = objectTimeS(category.getTime());

		return (
			<ul>
				<li className="list-group-item">
					<span className="badge">{
						`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`
					}</span>
					
					{ name === 'root' ? 'Overall time' : name }
				</li>
			</ul>
		);
	}

	updateCategoryTree(){
		let self = this;
		Meteor.call('users.getInfo', (err, info) => {
			self.setState({ categoryTree: new CategoryTree(info.categoryTree) });
		});
	}

	componentDidMount(){
		this.updateCategoryTree();
	}
}