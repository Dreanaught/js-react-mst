import React, {Component} from "react"
import { observer } from "mobx-react"

class ElementView extends Component  {
    render() {
        const { element } = this.props
        return (
            <tr onClick={() => { console.log('clicked')}}>
                <td>{element.Orientierung}</td>
                <td>{element.Bauteil.Kurzbezeichner}</td>
                <td>{element.Anzahl}</td>
                <td>{element.Breite}</td>
                <td>{element.Länge_Höhe}</td>
                <td>{element.Bruttofläche}</td>
                <td>{element.Abzugsfläche}</td>
                <td>{element.Nettofläche}</td>
                <td>{element.grenzt_an}</td>
                <td>{element.angrenzendeTemperatur}</td>
                <td>{element.temperatur_Anpassung.toFixed(2)}</td>
                <td>{element.Bauteil.uWert}</td>
                <td>{element.korrekturwertWäremebrücken}</td>
                <td>{element.korrigierter_uWert.toFixed(2)}</td>
                <td>{element.Wärmeverlustkoeffizient.toFixed(2)}</td>
                <td>{element.Transmissionswärmeverlust}</td>
            </tr>
        )
    }
}

export default observer(ElementView)