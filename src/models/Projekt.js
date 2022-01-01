import { applySnapshot, flow, getSnapshot, onSnapshot, types } from "mobx-state-tree"
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
    .actions(self =>({
        afterCreate(){
            /* load data from server after create */
            self.load()
            /* save data to server every time the data changes */
            onSnapshot(self, self.save)
        },
        load: flow(function* load(){
            const response = yield window.fetch('http://localhost:3001/project')
            applySnapshot(self, yield response.json())
        }),
        save: flow(function* save(){
            try {
                yield window.fetch('http://localhost:3001/project', {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(getSnapshot(self))
                })
            }catch (e){
                console.log("Error on saving project", e)
            }
        })
    }))