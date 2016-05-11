
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/Navbar';

export default class NotFoundPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <NavBar />
                
                <h3>
                    This is not the page you are looking for
                </h3>
            </div>
        );
    }
}

