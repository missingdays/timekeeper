
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/Navbar';

export default class CategoriesPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <NavBar />
                
                <h3>
                    Some categories here
                </h3>
            </div>
        );
    }
}

