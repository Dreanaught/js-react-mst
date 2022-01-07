import { destroy, getParent, types } from "mobx-state-tree"
import { Element } from "./Element"

export const Raum = types.model({
    Name: types.identifier,
    Geschoss: types.string,
    Auslegungsinnentemperatur: types.number,
    Raumbreite: types.number,
    Raumlänge: types.number,
    Raumhöhe: types.number,
    Deckendicke: types.number,
    Elemente: types.array(Element)
})
.actions( self => ({
    addElement(element) {
        self.Elemente.push(element)
    },
    removeElement(element){
        destroy(element)
    },
    remove(){
        getParent(self, 2).remove(self)
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
    },
    // lala
    get NormHeizlast(){
        return self.NormTransmissionswäremeverlust + self.NormLüftungswäremeverlust
    },
    get NormTransmissionswäremeverlust (){
        return self.Elemente.reduce((sum, entry) => sum + entry.Transmissionswärmeverlust, 0)
    },
    get NormLüftungswäremeverlust (){
        return 0
    },
    get NormAußentemperatur(){
        return getParent(self, 2).Norm_Außentemperatur
    },
    get Bauelemente(){
        return getParent(self, 2).Bauteildefinitionen
    }
}))