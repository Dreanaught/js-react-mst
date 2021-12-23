import React, { Component } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from 'react-bootstrap';

import ProjectView from './ProjectView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Projekt</h1>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="Home">
            <ProjectView project={this.props.project} />
          </Tab>
          <Tab eventKey="profile" title="Profile">
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default App;
