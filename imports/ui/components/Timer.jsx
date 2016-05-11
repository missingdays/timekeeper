
import React, { Component } from 'react';

import { formatTime } from '../../utils/time.js';

export default class Timer extends Component {
	constructor(props){
		super(props);

		this.state = {
			sessionStarted: false,
			sessionStartTime: -1,
			sessionTime: -1
		};
	}

	render(){
		let time = this.state.sessionTime;
		let sessionStarted = this.state.sessionStarted;

		return (
			<span className="timer">

				{ sessionStarted ? 
					<button type="button" className="btn btn-danger btn-md" onClick={this.endSession.bind(this)}>
						<span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
					</button>
				:
	    			<button type="button" className="btn btn-success btn-md" onClick={this.startSession.bind(this)}>
						<span className="glyphicon glyphicon-play" aria-hidden="true"></span>
					</button>
				}

				<b>
					{ sessionStarted ? formatTime(time) : "" }
				</b>
			</span>
		);
	}

	tick(){
		let startTime = this.state.sessionStartTime;
		
		this.setState({
			sessionTime: new Date() - startTime,
		});
	}

    startSession(){

		if(!this.state.sessionStarted){
    		this.timer = setInterval(this.tick.bind(this), Timer.updateInterval);

    		this.setState({
    			sessionStarted: true,
    			sessionStartTime: Date.now(),
    			sessionTime: 0
    		});
    	}
    }

    endSession(){
    	if(this.state.sessionStarted){

			clearInterval(this.timer);

    		this.setState({
    			sessionStarted: false
    		});

    		this.updateSessionInfo();
    	}
    }

    updateSessionInfo(){
    	let categoryName;

		if(this.props.category){
			categoryName = this.props.category.props.name;
		}

		Meteor.call('users.addSession', {
			start: this.state.sessionStartTime,
			end: Date.now(),
			categoryName: categoryName
		});

		this.props.category.updateCategoryTree();	
    }

}

Timer.updateInterval = 500;