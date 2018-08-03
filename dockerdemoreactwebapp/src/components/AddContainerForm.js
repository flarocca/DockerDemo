import React, { Component } from 'react';

export default class AddContainerForm extends Component {
  constructor() {
    super();

    this.state = {
      containerName: "",
      containerImage: ""
    }
  }

  render() {
    return (
      <div className="modal-form">
        <div className="data-form">
          <input value={this.state.containerName} onChange={this.updateContainerName} className="input" placeholder="Container name"></input>
          <input value={this.state.containerImage} onChange={this.updateContainerImage} className="input" placeholder="Container image"></input>
        </div>
        <div className="confirm-form">
          <button onClick={() => this.props.confirm(this.state.containerName, this.state.containerImage)} className="confirm-button">Add Container</button>
          <button onClick={this.props.cancel} className="confirm-button" style={{ backgroundColor: "gray" }}>Cancel</button>
        </div>
      </div>
    );
  }

  updateContainerName = (evt) => {
    this.setState({
      containerName: evt.target.value
    });
  }

  updateContainerImage = (evt) => {
    this.setState({
      containerImage: evt.target.value
    });
  }
}