import { getSnapshot, onSnapshot, onPatch, types } from "mobx-state-tree"
import { Haus, Raum, Element, Bauteil } from "./Haus"

it("Test calculated properties of Raum", () => {
    const haus = Haus.create({
        Bauteildefinitionen : [{
            id: "1",
            Name: "AW",
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
    
    // Berechnungen im Raum
    expect(haus.Räume[0].Raumfläche).toBe(2*5)
    expect(haus.Räume[0].Geschosshöhe).toBe(2.5 + 0.15)
    expect(haus.Räume[0].Raumhüllfläche).toBe(10+25+20)

    // Zugriff auf Werte aus Referenz
    expect(haus.Räume[0].Elemente[0].Bauteil).toBe(haus.Bauteildefinitionen[0])

    // Berechnung in den Elementen
    expect(haus.Räume[0].Elemente.length).toBe(1)
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).toBeDefined()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).not.toBeNaN()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).not.toBeNull()
    expect(haus.Räume[0].Elemente[0].Transmissionswärmeverlust).toBe(37)
})