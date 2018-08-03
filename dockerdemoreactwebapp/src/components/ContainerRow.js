import React, { Component } from 'react';

export default class ContainerRow extends Component {
  render() {
    return (
      <tr className="container-row">
        <th>{this.props.name}</th>
        <th>{this.props.image}</th>
        <th>
          <button className="remove-button" onClick={() => this.props.removeContiner(this.props.id)}>Remove</button>
        </th>
      </tr>
    );
  }
}