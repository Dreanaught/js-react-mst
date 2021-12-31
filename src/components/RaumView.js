import React from "react"
import { observer } from "mobx-react"
import { Col, Container, Row, Table } from "react-bootstrap"
import ElementTableRowView from "./ElementTableRowView"
import ElementAdd from "./ElementAdd"

const RaumView = ({ raum }) => (
    <div>
        <Container fluid="true">
            <Row>
                <Col>
                    Name
                </Col>
                <Col>
                    {raum.Name}
                </Col>
            </Row>
            <Row>
                <Col>
                    Norm-Innentemperatur
                </Col>
                <Col>
                    {raum.Auslegungsinnentemperatur}
                </Col>
            </Row>
            <Row>
                <Col>
                    Norm-Außentemperatur
                </Col>
                <Col>
                    {raum.NormAußentemperatur}
                </Col>
            </Row>
            <Row>
                <Col>
                    Abmessungen
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    Raumbreite
                </Col>
                <Col>
                    {raum.Raumbreite}
                </Col>
            </Row>
            <Row>
                <Col>
                    Raumfläche
                </Col>
                <Col>
                    {raum.Raumfläche}
                </Col>
            </Row>
            <Row>
                <Col>
                    Geschosshöhe
                </Col>
                <Col>
                    {raum.Geschosshöhe}
                </Col>
            </Row>
            <Row>
                <Col>
                    Deckendicke
                </Col>
                <Col>
                    {raum.Deckendicke}
                </Col>
            </Row>
            <Row>
                <Col>
                    Raumhöhe
                </Col>
                <Col>
                    {raum.Raumhöhe}
                </Col>
            </Row>
            <Row>
                <Col>
                    Raumvolumen
                </Col>
                <Col>
                    {raum.Raumvolumen}
                </Col>
            </Row>
            <Row>
                <Col>
                    Erdreich
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    Tiefe ins Erdreich
                </Col>
                <Col>
                    0.0
                </Col>
            </Row>
            <Row>
                <Col>
                    Erdreich ber. Umf.
                </Col>
                <Col>
                    0.0
                </Col>
            </Row>
            <Row>
                <Col>
                    Grundwassertiefe
                </Col>
                <Col>
                    5.0
                </Col>
            </Row>
            <Row>
                <Col>
                    B'-Wert raumweise
                </Col>
                <Col>
                    5.0
                </Col>
            </Row>
        </Container>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                </tr>
                <tr className="rotate">
                    <th>Orientierung</th>
                    <th>Bauteil</th>
                    <th>Anzahl</th>
                    <th>Breite</th>
                    <th>Länge/Höhe</th>
                    <th>Bruttofläche</th>
                    <th>Abzugsfläche</th>
                    <th>Nettofläche</th>
                    <th>grenzt an</th>
                    <th>angrenzende<br />Temperatur</th>
                    <th>Korrekturfaktoren</th>
                    <th>U-Wert</th>
                    <th>Korrekturwert<br />Wäremebrücken</th>
                    <th>korrigierter<br />U-Wert</th>
                    <th>Wäremeverlust-<br />koeffizient</th>
                    <th>Transmissions-<br />wärmeverlust</th>
                </tr>
            </thead>
            <tbody>
                {/* insert elements */}
                {Array.from(raum.Elemente.values()).map((element, idx) => (
                    <ElementTableRowView key={idx} element={element} />
                ))}

            </tbody>
        </Table>
        {/* add elements */}
        <ElementAdd raum={raum} />
    </div>
)

export default observer(RaumView)