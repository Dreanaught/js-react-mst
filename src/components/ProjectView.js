import React from "react"
import { observer } from "mobx-react"

import BauteilView from "./BauteilView"

const ProjectView = ({ project }) => (
    <div className="list">
        <ul>
            <li>
                <span>Norm-Außentemperatur: {project.Norm_Außentemperatur}</span>
            </li>
            <li>
                <span>Nom-Heizlast: {project.NormHeizlast}</span>
            </li>
            <li>
                <span>Nom-Transmissionswäremeverlust: {project.Transmissionswärmeverlust}</span>
            </li>
            <li>
                <span>Nom-Lüftungswäremeverlust: {project.Lüftungswäremeverlust}</span>
            </li>
            <li>
                <span>Wäremebrückenzuschlag: {project.Wäremebrückenzuschlag}</span>
            </li>
        </ul>
        <button onClick={project.addRoom}>Neuer Raum</button>
        <ul>
            {project.Bauteildefinitionen.map((bauteil, idx) => (
                <BauteilView key={idx} bauteil={bauteil} />
            ))}
        </ul>
    </div>
)

export default observer(ProjectView)