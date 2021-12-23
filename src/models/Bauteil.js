import { types } from "mobx-state-tree"

export const Bauteil = types.model({
    id: types.identifierNumber, // reference id
    Kurzbezeichner: types.string, // kurbezeichner des Bauteils
    uWert: types.number // U-Wert des Bauteils als gesammtes
})