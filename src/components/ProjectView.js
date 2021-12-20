import React from "react"
import { observer } from "mobx-react"

import BauteilView from "./BauteilView"

const ProjectView = ({project}) => (
    <div className="list">
        <ul>
            {project.Bauteildefinitionen.map((bauteil, idx) => (
                <BauteilView key={idx} bauteil={bauteil}/>
            ))}
        </ul>
    </div>
)

export default observer(ProjectView)