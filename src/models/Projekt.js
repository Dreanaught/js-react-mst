import { destroy, getParent, types } from "mobx-state-tree"
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
            return 0
        },
        get Lüftungswäremeverlust() {
            return 0
        },
        get NormHeizlast() {
            return self.Transmissionswärmeverlust + self.Lüftungswäremeverlust
        },
    }))