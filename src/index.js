import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import {Projekt} from './models/Projekt'

const project = Projekt.create({
  Bauteildefinitionen : [{
      id: "1",
      Name: "AW",
      Beschreibung: "Außenwand",
      uWert: 1.3
  },{
    id: "1",
    Name: "AF",
    Beschreibung: "Außenfenster",
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
              temperatur_Anpassung: 1,
              uWert_Bauteil: 0.18,
              Wärmebrückenzuschlag: 0.05
          }
      ]
  }]
})

ReactDOM.render(
  <React.StrictMode>
    <App project={project}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
