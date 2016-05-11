
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/Navbar';

export default class ProjectsPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <NavBar />
                
                <h3>
                    Projects page
                </h3>
            </div>
        );
    }
}

