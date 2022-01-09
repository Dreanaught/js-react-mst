import { getParent, types } from "mobx-state-tree"
import { Bauteil } from "./Bauteil"

export const Element = types.model({
    Orientierung: types.string, // ist eigentlich eine Referenz auf ein enum
    Bauteil: types.reference(Bauteil), // von Hand eintragen, ist eigentlich eine Referent auf ein Bauteil
    Anzahl: types.number,
    Breite: types.number,
    Länge_Höhe: types.number, // teilen und types.maype verwenden
    grenzt_an: types.string, // ist eigentlich eine Referenz auf ein enum
    angrenzende_Temperatur: types.maybe(types.number), // von Hand eintragen, ergibt sich später aus der Zeichnung des Gebäudes
    temperatur_Anpassung: types.number // von Hand eintragen, ist eigentlich ein errechneter Wert
})
    .views(self => ({
        get Bruttofläche() {
            return self.Breite * self.Länge_Höhe * self.Anzahl
        },
        get Bauteilfläche() {
            // Abzugsfläche ist im Modell als type.maybe definiert und kann daher undefined sein
            if (self.Abzugsfläche !== undefined) {
                return self.Bruttofläche - self.Abzugsfläche
            }
            return self.Bruttofläche
        },
        get Abzugsfläche() {
            // calculate abzugsfläche only if type is AW or IW
            const guard = (self.Bauteil.isExterior || self.Bauteil.isInterior) && !self.Bauteil.isDoorOrWindow
            if (!guard) {
                return 0
            }
            const elemente = getParent(self, 2).Elemente
            const selfPos = elemente.indexOf(self)
            let abzugsfläche = 0
            for (let i = selfPos + 1; i < elemente.length; i++) {
                if (!elemente[i].Bauteil.isDoorOrWindow) {
                    break
                }
                abzugsfläche += elemente[i].Nettofläche
            }
            return abzugsfläche
        },
        get Nettofläche() {
            if (self.Abzugsfläche) {
                return self.Bruttofläche - self.Abzugsfläche
            } else {
                return self.Bruttofläche
            }
        },
        get korrekturwertWäremebrücken() {
            return getParent(self, 4).Wäremebrückenzuschlag
        },
        get korrigierter_uWert() {
            return self.Bauteil.uWert + self.korrekturwertWäremebrücken
        },
        get Wärmeverlustkoeffizient() {
            const fläche = self.Nettofläche
            const uWert = self.korrigierter_uWert
            // if b
            if(self.grenzt_an == 'b'){
                const ro_i = getParent(self, 2).Auslegungsinnentemperatur
                const ro_j = self.angrenzende_Temperatur
                const ro_e = getParent(self, 2).NormAußentemperatur
                const factor = (ro_i - ro_j)/(ro_i - ro_e)
                return factor * fläche * uWert
            }
            return fläche * uWert
        },
        get Transmissionswärmeverlust() {
            const auslegungsInnentemperatur = getParent(self, 2).Auslegungsinnentemperatur
            const angrenzendeTemperatur = getParent(self, 2).NormAußentemperatur
            return Math.round(self.Wärmeverlustkoeffizient * (auslegungsInnentemperatur - angrenzendeTemperatur))
        }
    }))