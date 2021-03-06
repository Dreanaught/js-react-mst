import React from "react"
import { observer } from "mobx-react"

import BauteilView from "./BauteilView"
import { Button, Col, Container, Row } from "react-bootstrap"

const ProjectView = ({ project, changeTab }) => (
    <Container fluid="true">
        <Row>
            <Col xs sm="auto">Norm-Außentemperatur</Col>
            <Col />
            <Col xs sm="auto">{project.Norm_Außentemperatur}</Col>
        </Row>
        <Row>
            <Col xs sm="auto">Norm-Heizlast</Col>
            <Col />
            <Col xs sm="auto">{project.NormHeizlast}</Col>
        </Row>
        <Row>
            <Col xs sm="auto">Norm-Transmissionswäremeverlust</Col>
            <Col />
            <Col xs sm="auto">{project.Transmissionswärmeverlust}</Col>
        </Row>
        <Row>
            <Col xs sm="auto">Norm-Lüftungswäremeverlust</Col>
            <Col />
            <Col xs sm="auto">{project.Lüftungswäremeverlust}</Col>
        </Row>
        <Row>
            <Col xs sm="auto">Wäremebrückenzuschlag</Col>
            <Col />
            <Col xs sm="auto">{project.Wäremebrückenzuschlag}</Col>
        </Row>
        {/* räume */}
        <Row><Col xs sm="auto">Räume</Col></Row>
        {project.Räume.map((raum, idx) => (
            <Row key={idx} onClick={() => (changeTab(raum.Name))}>
                <Col xs sm="auto">Raumname</Col>
                <Col xs sm="auto">{raum.Name}</Col>
                <Col />
                <Col xs sm="auto">Heizlast: {raum.NormHeizlast}</Col>
            </Row>
        ))}
        <Row>
            <Col>
                <Button onClick={() => (console.log("raum neu clicked"))}>Neuer Raum</Button>
            </Col>
        </Row>
        {/* Bauteile */}
        <Row><Col xs sm="auto">Bauteildefinitionen</Col></Row>
        {project.Bauteildefinitionen.map((bauteil, idx) => (
            <Row key={idx} onClick={() => (console.log("bauteil row clicked"))}>
                <Col xs sm="auto">id: {bauteil.id}</Col>
                <Col xs sm="auto">Name:  {bauteil.Kurzbezeichner}</Col>
                {bauteil.Kommentar && <Col>Kommentar: {bauteil.Kommentar}</Col>}
                {!bauteil.Kommentar && <Col />}
                <Col xs sm="auto last">U-Wert: {bauteil.uWert}</Col>
            </Row>
        ))}
        <Row>
            <Col>
                <Button onClick={() => (console.log("bauteil neu clicked"))}> Neues Bauteil</Button>
            </Col>
        </Row>
    </Container>
)

export default observer(ProjectView)