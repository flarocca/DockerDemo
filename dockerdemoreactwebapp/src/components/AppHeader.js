import React, { Component } from 'react';
import dockerlogo from '../images/dockericon.png';
import truelogiclogo from '../images/truelogicicon.png';

export default class AppHeader extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={dockerlogo} className="App-docker-logo" alt="logo" />
        <h1 className="App-title">Docker Demo Container List</h1>
        <img src={truelogiclogo} className="App-truelogic-logo" alt="logo" />
      </header>
    );
  }
}
