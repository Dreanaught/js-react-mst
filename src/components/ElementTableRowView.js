import React, {Component} from "react"
import { observer } from "mobx-react"

class ElementTableRowView extends Component  {
    render() {
        const { element } = this.props
        return (
            <tr onClick={() => { console.log('clicked')}}>
                <td>{element.Orientierung}</td>
                <td>{element.Bauteil.Kurzbezeichner}</td>
                <td>{element.Anzahl}</td>
                <td>{element.Breite}</td>
                <td>{element.Länge_Höhe}</td>
                <td>{element.Bruttofläche.toFixed(1)}</td>
                <td>{element.Abzugsfläche?element.Abzugsfläche.toFixed(1):'-'}</td>
                <td>{element.Nettofläche.toFixed(1)}</td>
                <td>{element.grenzt_an}</td>
                <td>{element.angrenzende_Temperatur?element.angrenzende_Temperatur:'-'}</td>
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

export default observer(ElementTableRowView)