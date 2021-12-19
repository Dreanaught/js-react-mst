import React from "react"
import { observer } from "mobx-react"
import { Bauteil } from "../models/Projekt"

const ProjectView = ({project, readonly}) => (
    <div className="list">
        <ul>
            {project.Bauteile.map((bauteil, idx) => (
                <BauteilView key={idx} bauteil={bauteil} readonly={readonly}/>
            ))}
        </ul>
    </div>
)

export default observer(ProjectView)