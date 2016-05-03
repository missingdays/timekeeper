import React, { Component } from 'react';

import Timer from './Timer.jsx';

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

					<Timer category={this} />

					<ChildAdder parent={this} />

				</li>
			</ul>
		);
	}

	updateCategoryTree(){
		if(this.props.parent){
			this.setState({ categoryTree: this.props.parent.state.categoryTree});
		} else {
			Meteor.call('users.getInfo', (err, info) => {
				console.log(info);
				this.setState({ categoryTree: new CategoryTree(info.categoryTree) });
			});
		}
	}

	addChild(name){
		Meteor.call('users.addCategory', {
			name: name,
			parent: this.props.name
		});

		this.updateCategoryTree();
	}

	componentDidMount(){
		this.updateCategoryTree();
	}
}

class ChildAdder extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return (
			<span>
				<button onClick={this.btnClicked.bind(this)}>
					<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
				</button>

				<ChildInput parent={this}/>
			</span>
		);
	}

	handleInputChange(value){
		this.setState({
			value: value
		});
	}

	btnClicked(){
		if(this.state.value === undefined){
			return;
		}

		this.props.parent.addChild(this.state.value);
	}
}

class ChildInput extends Component {

	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		return (
			<input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
		);
	}

	handleChange(e){
		this.props.parent.handleInputChange(e.target.value);
	}
}