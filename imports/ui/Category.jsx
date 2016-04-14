import React, { Component } from 'react';

import { objectTime } from '../utils/time.js';

export default class Category extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		let time = objectTime(this.state.time * 1000);

		return (
			<ul>
				<li className="list-group-item">
					<span className="badge">{
						`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`
					}</span>
					Overall time
				</li>
			</ul>
		);
	}

	updateTime(){
		let self = this;
		Meteor.call('users.getOverallTime', (err, time) => {
			time = Math.floor(time);
			self.setState({ time: time });
		});
	}

	componentDidMount(){
		this.updateTime();
	}
}