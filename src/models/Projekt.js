import { destroy, getParent, types } from "mobx-state-tree"
import { Bauteil } from "./Bauteil"

/**
 * Definition eines Raums
 */
export const Raum = types.model({
    Name: types.string,
    Geschoss: types.string,
    Auslegungsinnentemperatur: types.number,
    Raumbreite: types.number,
    Raumlänge: types.number,
    Raumhöhe: types.number,
    Deckendicke: types.number,
    Elemente: types.array(types.late(()=>Element))
})
.actions( self => ({
    addElement(element) {
        self.Elemente.push(element)
    },
    removeElement(element){
        destroy(element)
    }
}))
.views(self => ({
    get Raumfläche () {
        return self.Raumbreite * self.Raumlänge
    },
    get Geschosshöhe () {
        return self.Raumhöhe + self.Deckendicke
    },
    get Raumvolumen() {
        return self.Raumfläche * self.Raumhöhe
    },
    get Raumhüllfläche() {
        return self.Raumhöhe * self.Raumbreite * 2 + self.Raumhöhe * self.Raumlänge * 2 + self.Raumfläche * 2
    }
})) 

/**
 * Elemente eines Raums welche in den Tabellenblättern zeilenweise eingetragen werden
 */
export const Element = types.model({
    Orientierung: types.string, // ist eigentlich eine Referenz auf ein enum
    Bauteil: types.reference(Bauteil), // von Hand eintragen, ist eigentlich eine Referent auf ein Bauteil
    Anzahl: types.number,
    Breite: types.number,
    Länge_Höhe: types.number, // teilen und types.maype verwenden
    Abzugsfläche: types.maybe(types.number), //über parent auf den folgenden einträgen ziehen, bis eine andre orientierung kommt, müsste also hier in einer noch zu definierenden view stehen
    grenzt_an: types.string, // ist eigentlich eine Referenz auf ein enum
    angrenzende_Temperatur: types.number, // von Hand eintragen, ergibt sich später aus der Zeichnung des Gebäudes
    temperatur_Anpassung: types.number, // von Hand eintragen, ist eigentlich ein errechneter Wert
    uWert_Bauteil: types.number, // von Hand eintragen, ist eigentlich der uWert aus Referenz Bauteil
    Wärmebrückenzuschlag: types.number, // von Hand eintragen,
})
.views( self => ({
    get Bruttofläche () {
        return self.Breite * self.Länge_Höhe
    },
    get Bauteilfläche () {
        // Abzugsfläche ist im Modell als type.maybe definiert und kann daher undefined sein
        if(self.Abzugsfläche !== undefined){
            return self.Bruttofläche - self.Abzugsfläche    
        }
        return self.Bruttofläche
    },
    get korrigierter_uWert() {
        return self.uWert_Bauteil + self.Wärmebrückenzuschlag
    },
    get Transmissionswärmeverlust() {
        return Math.ceil(self.Bauteilfläche * self.korrigierter_uWert * (getParent(self,2).Auslegungsinnentemperatur - self.angrenzende_Temperatur))
    }
}))

export const Projekt = types.model({
    Bauteildefinitionen: types.array(Bauteil),
    Räume: types.array(Raum)
})