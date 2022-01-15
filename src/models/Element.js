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
})
    .views(self => ({
        get Bruttofläche() {
            const fl = self.Breite * self.Länge_Höhe * self.Anzahl
            return Number.parseFloat(fl.toFixed(1))
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
            return Number.parseFloat(abzugsfläche.toFixed(1))
        },
        get Nettofläche() {
            let fl = self.Bruttofläche
            if (self.Abzugsfläche) {
                fl = self.Bruttofläche - self.Abzugsfläche
            }
            return Number.parseFloat(fl.toFixed(1))

        },
        get korrekturfaktor() {
            const ro_i = getParent(self, 2).Auslegungsinnentemperatur
            const ro_j = self.angrenzende_Temperatur
            const ro_e = getParent(self, 2).NormAußentemperatur
            const ro_me = getParent(self, 2).NormAußentemperaturJahresmittel

            let factor
            if (self.grenzt_an === 'e') {
                factor = 1.0
            }
            if (self.grenzt_an === 'u') {
                factor = 0.0
            }
            if (self.grenzt_an === 'g') {
                const f_g2 = (ro_i - ro_me) / (ro_i - ro_e)
                factor = f_g2
            }
            if (self.grenzt_an === 'b') {
                const f_ij = (ro_i - ro_j) / (ro_i - ro_e)
                factor = f_ij
            }
            return Number.parseFloat(factor.toFixed(2))
        },
        get korrekturwertWäremebrücken() {
            if(self.Bauteil.isInterior){
                return null
            }
            return getParent(self, 4).Wäremebrückenzuschlag
        },
        get korrigierter_uWert() {
            if (self.grenzt_an === 'g') {
                return getParent(self, 2).uEquiv(self.Bauteil.uWert)
            }
            return self.Bauteil.uWert + self.korrekturwertWäremebrücken
        },
        get Wärmeverlustkoeffizient() {
            const fläche = self.Nettofläche
            const uWert = self.korrigierter_uWert
            // if b
            if (self.grenzt_an === 'b') {
                const f_ij = self.korrekturfaktor
                return f_ij * fläche * uWert
            } else if (self.grenzt_an === 'g') {
                const f_g1 = 1.45
                const f_g2 = self.korrekturfaktor
                const Gw = 1.0

                return f_g1 * f_g2 * fläche * uWert * Gw
            }
            return fläche * uWert
        },
        get Transmissionswärmeverlust() {
            const auslegungsInnentemperatur = getParent(self, 2).Auslegungsinnentemperatur
            const angrenzendeTemperatur = getParent(self, 2).NormAußentemperatur
            const tempDiff = auslegungsInnentemperatur - angrenzendeTemperatur
            const h_T = self.Wärmeverlustkoeffizient
            const Phi_T = h_T * tempDiff
            return Number.parseFloat(Phi_T.toFixed())
        }
    }))