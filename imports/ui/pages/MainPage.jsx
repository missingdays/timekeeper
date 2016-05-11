
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import NavBar from '../components/Navbar';
import Main from '../components/Main';

export default class MainPage extends Component {

    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <NavBar />
                <Main />
            </div>
        );
    }
}

