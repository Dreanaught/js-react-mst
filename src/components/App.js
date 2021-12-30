import React, { Component } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from 'react-bootstrap';

import ProjectView from './ProjectView';
import { observer } from 'mobx-react';
import RaumView from './RaumView';

class App extends Component {
  constructor() {
    super();
    this.state = { activeTab: 'projekt' };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }

  render() {
    const project = this.props.project
    return (
      <div className="App">
        <h1 className="App-title">Projekt</h1>

        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey="projekt" title="Projekt">
            <ProjectView project={project} changeTab={this.handleSelect} />
          </Tab>
          {/* That key={raum.Name} is required for react not to throw an error*/}
          {Array.from(project.Räume.values()).map((raum, idx) => (
            <Tab title={raum.Name} eventKey={raum.Name} key={raum.Name}>
              <RaumView raum={raum} />
            </Tab>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default observer(App);
