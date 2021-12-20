import React from "react"
import { observer } from "mobx-react"

const BauteilView = ({bauteil}) => (
    <li className="item">
        <h3>{bauteil.Name}</h3>
        <span>{bauteil.uWert}</span>
    </li>
)

export default observer(BauteilView)
