import { types } from "mobx-state-tree"

export const Bauteil = types.model({
    id: types.identifier, // reference id
    Kurzbezeichner: types.string, // kurbezeichner des Bauteils
    Kommentar: types.optional(types.string, ""),
    uWert: types.number // U-Wert des Bauteils als gesammtes
}).views( self =>({
    get isExterior(){
        return self.Kurzbezeichner.startsWith('A')
    },
    get isInterior(){
        return self.Kurzbezeichner.startsWith('I')
    },
    get isDoorOrWindow(){
        const kurzbezeichner = self.Kurzbezeichner
        return kurzbezeichner.includes('F') ||  kurzbezeichner.includes('T')
    }
}))