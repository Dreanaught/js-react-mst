import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { getSnapshot } from 'mobx-state-tree';

import {Projekt} from './models/Projekt'

let initialState = {
  Bauteildefinitionen : [{
      id: 1,
      Kurzbezeichner: "AW",
      uWert: 1.3
  },{
    id: 2,
    Kurzbezeichner: "AF",
    Kommentar: "Kommentar",
    uWert: 1.3
}],
  Räume : [{
      Name: "Raum1",
      Geschoss: "EG",
      Auslegungsinnentemperatur: 20,
      Raumbreite: 2,
      Raumlänge: 5,
      Raumhöhe: 2.5,
      Deckendicke: 0.15,
      Elemente: [
          {
              Orientierung: "S",
              Bauteil: "1",
              Anzahl: 1,
              Breite: 2,
              Länge_Höhe: 2.65,
              Abzugsfläche: undefined,
              grenzt_an: "e",
              angrenzende_Temperatur: -10,
              temperatur_Anpassung: 1
          }
      ]
  }]
}

let project = Projekt.create(initialState)

function renderApp (){
  ReactDOM.render(
    <React.StrictMode>
      <App project={project}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Änderungen im Modell und in den View-Definitionen bubble-up zu dieser Stelle
if(module.hot){
  // wenn die view-Komponenten geändert werden soll die Anwendung neu gerendert werden, der MST bleibt gleich
  module.hot.accept(["./components/App"], () =>{
    renderApp()
  })

  // wenn die model-Komponenten geändert wird soll der MST anhand eines Snapshots aktualisiert werden
  // anschließend soll die Anwendung neu gerendert werden
  module.hot.accept(["./models/Projekt"], () => {
    const snapshot = getSnapshot(project)
    project = Projekt.create(snapshot)
    renderApp()
  })
}

renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
