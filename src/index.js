import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { getSnapshot } from 'mobx-state-tree';

import { Projekt } from './models/Projekt'

let initialState = {}

let project = window.project = Projekt.create(initialState)

function renderApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App project={project} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Änderungen im Modell und in den View-Definitionen bubble-up zu dieser Stelle
if (module.hot) {
  // wenn die view-Komponenten geändert werden soll die Anwendung neu gerendert werden, der MST bleibt gleich
  module.hot.accept(["./components/App"], () => {
    renderApp()
  })

  // wenn die model-Komponenten geändert wird soll der MST anhand eines Snapshots aktualisiert werden
  // anschließend soll die Anwendung neu gerendert werden
  module.hot.accept(["./models/Projekt"], () => {
    const snapshot = getSnapshot(project)
    project = window.project = Projekt.create(snapshot)
    renderApp()
  })
}

renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
