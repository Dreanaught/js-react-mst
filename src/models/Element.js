import { getParent, types } from "mobx-state-tree"
import { Bauteil } from "./Bauteil"

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
    get Nettofläche() {
        if(self.Abzugsfläche){
            return self.Bruttofläche - self.Abzugsfläche
        } else {
            return self.Bruttofläche
        }
    },
    get korrigierter_uWert() {
        return self.uWert_Bauteil + self.Wärmebrückenzuschlag
    },
    get Wärmeverlustkoeffizient(){
        return self.Nettofläche * self.korrigierter_uWert
    },
    get Transmissionswärmeverlust() {
        return Math.ceil(self.Bauteilfläche * self.korrigierter_uWert * (getParent(self,2).Auslegungsinnentemperatur - self.angrenzende_Temperatur))
    }
}))