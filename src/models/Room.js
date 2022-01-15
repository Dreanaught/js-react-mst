import { destroy, getParent, types } from "mobx-state-tree"
import { Element } from "./Element"

export const Raum = types
    .model({
        id: types.identifier,
        Name: types.string,
        Geschoss: types.string,
        Auslegungsinnentemperatur: types.number,
        Raumbreite: types.number,
        Raumlänge: types.number,
        Raumhöhe: types.number,
        Deckendicke: types.number,
        TiefeInsErdreich: types.optional(types.number, 0.0),
        ErdreichBerUmfang: types.optional(types.number, 0.0),
        B_Strich: types.optional(types.number, 0.0),
        Elemente: types.optional(types.array(Element), [])
    })
    .actions(self => ({
        addElement(element) {
            self.Elemente.push(element)
        },
        removeElement(element) {
            destroy(element)
        },
        remove() {
            getParent(self, 2).remove(self)
        }
    }))
    .views(self => ({
        get Raumfläche() {
            const fläche = self.Raumbreite * self.Raumlänge
            return Number.parseFloat(fläche.toFixed(2))
        },
        get Geschosshöhe() {
            return self.Raumhöhe + self.Deckendicke
        },
        get Raumvolumen() {
            return self.Raumfläche * self.Raumhöhe
        },
        get Raumhüllfläche() {
            return self.Raumhöhe * self.Raumbreite * 2 + self.Raumhöhe * self.Raumlänge * 2 + self.Raumfläche * 2
        },
        uEquiv(uWert){
            const B_Strich = self.B_Strich
            if(B_Strich <= 2){
                if(uWert <= 0.25){
                    return 0.17
                }
                if(uWert <= 0.5){
                    return 0.33
                }
                if(uWert <= 1){
                    return 0.55
                }
                if(uWert <= 2){
                    return 0.77
                }
                return 1.30
            }
            if(B_Strich <= 4){
                if(uWert <= 0.25){
                    return 0.17
                }
                if(uWert <= 0.5){
                    return 0.30
                }
                if(uWert <= 1){
                    return 0.45
                }
                if(uWert <= 2){
                    return 0.59
                }
                return 0.88
            }
            if(B_Strich <= 6){
                if(uWert <= 0.25){
                    return 0.17
                }
                if(uWert <= 0.5){
                    return 0.27
                }
                if(uWert <= 1){
                    return 0.38
                }
                if(uWert <= 2){
                    return 0.48
                }
                return 0.68
            }
            return 1.30
        },
        // lala
        get NormHeizlast() {
            return self.NormTransmissionswäremeverlust + self.NormLüftungswäremeverlust
        },
        get NormTransmissionswäremeverlust() {
            return self.Elemente.reduce((sum, entry) => sum + entry.Transmissionswärmeverlust, 0)
        },
        get NormLüftungswäremeverlust() {
            return 0
        },
        get NormAußentemperatur() {
            return getParent(self, 2).Norm_Außentemperatur
        },
        get NormAußentemperaturJahresmittel(){
            return getParent(self, 2).NormAußentemperaturJahresmittel
        },
        get Bauelemente() {
            return getParent(self, 2).Bauteildefinitionen
        },
        get parent(){
            return getParent(self, 2)
        }
    }))