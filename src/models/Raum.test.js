import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { Raum, Element } from "./Raum"

it("Test calculated properties of Raum", () => {
    const raum = Raum.create({
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
                Baueteil: "FB",
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
    })

    // Berechnungen im Raum
    expect(raum.Raumfläche).toBe(2*5)
    expect(raum.Geschosshöhe).toBe(2.5 + 0.15)
    expect(raum.Raumhüllfläche).toBe(10+25+20)

    // Berechnung in den Elementen
    expect(raum.Elemente.length).toBe(1)
    expect(raum.Elemente[0].Transmissionswärmeverlust).toBeDefined()
    expect(raum.Elemente[0].Transmissionswärmeverlust).not.toBeNaN()
    expect(raum.Elemente[0].Transmissionswärmeverlust).not.toBeNull()
    expect(raum.Elemente[0].Transmissionswärmeverlust).toBe(37)
})