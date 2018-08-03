import React, { Component } from 'react';
import ContainerRow from './components/ContainerRow';
import AddContainerForm from './components/AddContainerForm';
import AppHeader from './components/AppHeader';
import './App.css';

var SERVICE_URL = "http://localhost:8081";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containers: [],
      addContainer: false
    };
  }

  componentDidMount() {
    this._fetchContainers();
  }

  render() {
    return (
      <div className="App">
        {
          this.state.addContainer ?
            <AddContainerForm confirm={this._addContainer} cancel={() => this.setState({ addContainer: false })} /> :
            null
        }
        <AppHeader />
        <div className="body">
          <button onClick={() => this.setState({ addContainer: true })} className="button">Add Container</button>
          <table id="containers">
            <tr className="table-header">
              <th>Name</th>
              <th>Image</th>
              <th></th>
            </tr>
            {
              this.state.containers.map((item) => {
                return (
                  <ContainerRow
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    id={item.id}
                    removeContiner={this._removeContiner} />
                );
              })
            }
          </table>
        </div>
      </div>
    );
  }

  _removeContiner = (id) => {
    fetch(SERVICE_URL + "/api/container/" + id, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.ok){
          this._fetchContainers();
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }

  _fetchContainers = () => {
    fetch(SERVICE_URL + "/api/container", {
      method: 'GET'
    })
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then(containers => {
        this.setState({ containers: JSON.parse(JSON.stringify(containers)) });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }

  _addContainer = (name, image) => {
    var body = {
      Name: name,
      Image: image
    }

    fetch(SERVICE_URL + "/api/container", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {

        if (response.ok) {
          this.setState({ addContainer: false }, () => {
            this._fetchContainers();
          });
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  }
}