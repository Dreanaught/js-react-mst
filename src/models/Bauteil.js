import { getParent, types } from "mobx-state-tree"

export const Bauteil = types
    .model({
        id: types.identifier, // reference id
        Kurzbezeichner: types.string, // kurbezeichner des Bauteils
        Kommentar: types.optional(types.string, ""),
        uWert: types.number // U-Wert des Bauteils als gesammtes
    })
    .views(self => ({
        get isExterior() {
            return self.Kurzbezeichner.startsWith('A')
        },
        get isInterior() {
            return self.Kurzbezeichner.startsWith('I')
        },
        get isDoorOrWindow() {
            const kurzbezeichner = self.Kurzbezeichner
            return !self.isHorizontal && (kurzbezeichner.includes('F') || kurzbezeichner.includes('T'))
        },
        get isHorizontal() {
            const kurzbezeichner = self.Kurzbezeichner
            /* DA^=Dach, D^=Decke, FB^=Fußboden */
            return kurzbezeichner.startsWith('D') || kurzbezeichner.startsWith('F')
        }
    }))
    .actions(self => ({
        remove() {
            /* add check to not remove if referenced */
            getParent(self, 2).remove(self)
        },
    }))