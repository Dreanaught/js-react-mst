import React from "react"
import { observer } from "mobx-react"

import BauteilView from "./BauteilView"

const ProjectView = ({project}) => (
    <div className="list">
    <ul>
        <span>Norm-Außentemperatur: {project.Norm_Außentemperatur}</span>
    </ul>
    <ul>
        <span>Nom-Heizlast: {project.NormHeizlast}</span>
    </ul>
    <ul>
        <span>Nom-Transmissionswäremeverlust: {project.Transmissionswärmeverlust}</span>
    </ul>
    <ul>
        <span>Nom-Lüftungswäremeverlust: {project.Lüftungswäremeverlust}</span>
    </ul>
    <ul>
        <span>Wäremebrückenzuschlag: {project.Wäremebrückenzuschlag}</span>
    </ul>
        <ul>
            {project.Bauteildefinitionen.map((bauteil, idx) => (
                <BauteilView key={idx} bauteil={bauteil}/>
            ))}
        </ul>
    </div>
)

export default observer(ProjectView)