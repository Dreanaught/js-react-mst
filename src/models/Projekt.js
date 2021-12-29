import { types } from "mobx-state-tree"
import { Bauteil } from "./Bauteil"
import { Raum } from "./Room"

export const Projekt = types
    .model({
        Norm_Außentemperatur: types.optional(types.number, -16),
        Wäremebrückenzuschlag: types.optional(types.number, 0.1),
        Bauteildefinitionen: types.array(Bauteil),
        Räume: types.array(Raum)
    })
    .views(self => ({
        get Transmissionswärmeverlust() {
            return self.Räume.reduce((sum, entry) => sum + entry.NormTransmissionswäremeverlust, 0)
        },
        get Lüftungswäremeverlust() {
            return self.Räume.reduce((sum, entry) => sum + entry.NormLüftungswäremeverlust, 0)
        },
        get NormHeizlast() {
            return self.Transmissionswärmeverlust + self.Lüftungswäremeverlust
        },
    }))