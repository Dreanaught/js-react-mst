import React, {Component} from 'react';
import './../App.css';

import ProjectView from './ProjectView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Projekt</h1>
        </header>
        <ProjectView project={this.props.project} />
      </div>
    )
  }
}

export default App;
