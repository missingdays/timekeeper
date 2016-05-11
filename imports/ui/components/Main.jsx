import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Timer from './Timer.jsx';
import Category from './Category.jsx';

export default class Main extends Component {

	constructor(props){
		super(props);
	}

    render(){
        return (
        	<main className="container-fluid">
	            <h1> Main part </h1>

	            <div className="row">
	            	<div className="col-md-12">
	            		<Category name='root'/>
	            	</div>
	            </div>
			</main>
        );
    }
}
