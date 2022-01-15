import { getSnapshot, onSnapshot, onPatch, types } from "mobx-state-tree"
import { Projekt, Raum, Element, Bauteil } from "./Projekt"

it("Test calculated properties of Raum", () => {
    const haus = Projekt.create({
        Bauteildefinitionen : [{
            id: '1',
            Kurzbezeichner: "AW",
            uWert: 1.3
        }],
        Räume : [{
            id: '1',
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
    })

    // NormAußentemperatur
    expect(haus.Norm_Außentemperatur).toBe(-14) // if it is not set it is -16
    
    // Berechnungen im Raum
    expect(haus.Räume[0].Raumfläche).toBe(2.0*5.0)
    expect(haus.Räume[0].Geschosshöhe).toBe(2.5 + 0.15)
    expect(haus.Räume[0].Raumhüllfläche).toBe(10+25+20)

    // Zugriff auf Werte aus Referenz
    expect(haus.Räume[0].Elemente[0].Bauteil).toBe(haus.Bauteildefinitionen[0])

    // Bauteil berechnete Properties
    expect(haus.Bauteildefinitionen[0]).toBeDefined()
    expect(haus.Bauteildefinitionen[0].isExterior).toBeTruthy()
    expect(haus.Bauteildefinitionen[0].isInterior).toBeFalsy()
    expect(haus.Bauteildefinitionen[0].isDoorOrWindow).toBeFalsy()

    // Berechnung in den Elementen
    expect(haus.Räume[0].Elemente.length).toBe(1)
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).toBeDefined()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).not.toBeNaN()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).not.toBeNull()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).toBe(252)
})

it("Test Raum", () => {
    const haus = Projekt.create({
        "Norm_Außentemperatur": -14,
        "NormAußentemperaturJahresmittel": 8.5,
        "Wäremebrückenzuschlag": 0.05,
        "Grundwassertiefe": 5,
        "Bauteildefinitionen": [
          {
            "id": "1",
            "Kurzbezeichner": "AW",
            "Kommentar": "Außenwand 41",
            "uWert": 0.34
          },
          {
            "id": "2",
            "Kurzbezeichner": "AW",
            "Kommentar": "Außenwand 31",
            "uWert": 0.33
          },
          {
            "id": "3",
            "Kurzbezeichner": "AF",
            "Kommentar": "",
            "uWert": 1.4
          },
          {
            "id": "4",
            "Kurzbezeichner": "AT",
            "Kommentar": "",
            "uWert": 1.4
          },
          {
            "id": "5",
            "Kurzbezeichner": "IW",
            "Kommentar": "11,5cm",
            "uWert": 1.83
          },
          {
            "id": "14ec58c8-d854-492a-b27b-80f07e714c37",
            "Kurzbezeichner": "AF",
            "Kommentar": "Fenster 1.10x1.35",
            "uWert": 0.92
          },
          {
            "id": "338e005c-0ff8-47d9-bd19-d435987db479",
            "Kurzbezeichner": "AF",
            "Kommentar": "Fenster 0.48x0.72",
            "uWert": 1.15
          },
          {
            "id": "941f3c58-dd5e-42ae-9d43-9814f111a862",
            "Kurzbezeichner": "AF",
            "Kommentar": "Fenster 1.14x1.35",
            "uWert": 0.92
          },
          {
            "id": "3aca5ad9-884e-4853-a864-4c1de14b71c6",
            "Kurzbezeichner": "AT",
            "Kommentar": "Tür 1.09x2.28",
            "uWert": 0.91
          },
          {
            "id": "89aebdd0-f7de-439c-a87d-a6b931a61253",
            "Kurzbezeichner": "AF",
            "Kommentar": "Fenster 1.14x1.35",
            "uWert": 0.92
          },
          {
            "id": "8f1ee959-24da-49cc-af5b-9c7342b11677",
            "Kurzbezeichner": "AT",
            "Kommentar": "Tür 1.09x2.28",
            "uWert": 0.91
          },
          {
            "id": "aada5492-dfd6-4022-85cd-54e227df1892",
            "Kurzbezeichner": "IW",
            "Kommentar": "Innenwand 11.5",
            "uWert": 1.67
          },
          {
            "id": "f182871d-369f-4432-9d64-af95d2896781",
            "Kurzbezeichner": "IW",
            "Kommentar": "Innenwand 24",
            "uWert": 1.59
          },
          {
            "id": "60e2d6f0-a6a3-460f-9c97-0c3cefd168aa",
            "Kurzbezeichner": "FB",
            "Kommentar": "",
            "uWert": 0.58
          }
        ],
        "Räume": [
          {
            "id": "1",
            "Name": "Raum1",
            "Geschoss": "EG",
            "Auslegungsinnentemperatur": 20,
            "Raumbreite": 2,
            "Raumlänge": 5,
            "Raumhöhe": 2.5,
            "Deckendicke": 0.15,
            "TiefeInsErdreich": 0,
            "ErdreichBerUmfang": 0,
            "Elemente": [
              {
                "Orientierung": "S",
                "Bauteil": "1",
                "Anzahl": 1,
                "Breite": 2,
                "Länge_Höhe": 2.65,
                "grenzt_an": "e",
                "angrenzende_Temperatur": -10
              }
            ]
          },
          {
            "id": "2",
            "Name": "Raum2",
            "Geschoss": "EG",
            "Auslegungsinnentemperatur": 20,
            "Raumbreite": 2,
            "Raumlänge": 5,
            "Raumhöhe": 2.5,
            "Deckendicke": 0.15,
            "TiefeInsErdreich": 0,
            "ErdreichBerUmfang": 0,
            "Elemente": [
              {
                "Orientierung": "S",
                "Bauteil": "1",
                "Anzahl": 1,
                "Breite": 2,
                "Länge_Höhe": 2.65,
                "grenzt_an": "e",
                "angrenzende_Temperatur": -10
              }
            ]
          },
          {
            "id": "f4f54586-1de4-40a5-b56c-68735205616a",
            "Name": "Wohnen",
            "Geschoss": "EG",
            "Auslegungsinnentemperatur": 20,
            "Raumbreite": 4.27,
            "Raumlänge": 4.12,
            "Raumhöhe": 2.6,
            "Deckendicke": 0.26,
            "TiefeInsErdreich": 0,
            "ErdreichBerUmfang": 9.34,
            "B_Strich": 4.67,
            "Elemente": [
              {
                "Orientierung": "N",
                "Bauteil": "1",
                "Anzahl": 1,
                "Breite": 4.69,
                "Länge_Höhe": 2.86,
                "grenzt_an": "e"
              },
              {
                "Orientierung": "O",
                "Bauteil": "2",
                "Anzahl": 1,
                "Breite": 4.65,
                "Länge_Höhe": 2.86,
                "grenzt_an": "e"
              },
              {
                "Orientierung": "",
                "Bauteil": "3",
                "Anzahl": 1,
                "Breite": 1.01,
                "Länge_Höhe": 1.42,
                "grenzt_an": "e"
              },
              {
                "Orientierung": "",
                "Bauteil": "4",
                "Anzahl": 1,
                "Breite": 1.01,
                "Länge_Höhe": 2.26,
                "grenzt_an": "e"
              },
              {
                "Orientierung": "W",
                "Bauteil": "5",
                "Anzahl": 1,
                "Breite": 2.63,
                "Länge_Höhe": 2.86,
                "grenzt_an": "b",
                "angrenzende_Temperatur": 24
              },
              {
                "Orientierung": "H",
                "Bauteil": "60e2d6f0-a6a3-460f-9c97-0c3cefd168aa",
                "Anzahl": 1,
                "Breite": 4.49,
                "Länge_Höhe": 4.65,
                "grenzt_an": "g"
              }
            ]
          }
        ]
      })

      expect(haus.Räume[2]).toBeDefined()
      expect(haus.Räume[2].Raumfläche).toBe(17.59)
      expect(haus.Räume[2].B_Strich).toBe(4.67)
})