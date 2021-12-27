import React from "react"
import { observer } from "mobx-react"

const RaumView = ({ raum }) => (
    <div className="list">
        <span>{raum.Name}</span>
    </div>
)

export default observer(RaumView)