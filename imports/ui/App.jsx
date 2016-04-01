
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper';
import NavBar from './navbar';
import Main from './main';

class App extends Component {

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

App.propTypes = {
};

export default createContainer(() => {

    return {
    };
}, App);
