import React, { Component } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs'
import { Tab } from 'react-bootstrap';

import ProjectView from './ProjectView';
import { observer } from 'mobx-react';
import RaumView from './RaumView';

class App extends Component {
  render() {
    const project = this.props.project
    return (
      <div className="App">
        <h1 className="App-title">Projekt</h1>

        <Tabs defaultActiveKey="projekt">
          <Tab eventKey="projekt" title="Projekt">
            <ProjectView project={project} changeTab={this.changeTab}/>
          </Tab>
          {/* That key={raum.Name} is required for react not to throw an error*/}
          {Array.from(project.Räume.values()).map((raum, idx) => (
            <Tab title={raum.Name} eventKey={raum.Name} key={raum.Name}>
              <RaumView raum={raum}/>
            </Tab>
          ))}
        </Tabs>
      </div>
    )
  }

  changeTab(tabKey){
    console.log("ChangeTab called "+ tabKey)
  }
}

export default observer(App);
