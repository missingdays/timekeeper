
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AccountsUIWrapper from './AccountsUIWrapper';

export default class Main extends Component {
    render(){
        return (
          <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Timekeeper</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                  <li><a href="#"> Home </a></li>
                  <li><a href="#"> Categories </a></li>
                  <li><a href="#"> Sites </a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <AccountsUIWrapper />
              </ul>
            </div>
          </div>
        </nav> 
        );
    }
}
