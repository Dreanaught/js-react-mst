import React from "react"
import { observer } from "mobx-react"

import BauteilView from "./BauteilView"
import { Button, CloseButton, Col, Container, Row } from "react-bootstrap"
import BauteilAdd from "./BauteilAdd"
import RaumAdd from "./RaumAdd"

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
            <Row key={idx}>
                <Col xs sm="auto" onClick={() => (changeTab(raum.Name))}>{raum.Name}</Col>
                <Col />
                <Col xs sm="auto">Heizlast: {raum.NormHeizlast}</Col>
                <Col xs sm="auto"><CloseButton onClick={raum.remove}/></Col>
            </Row>
        ))}
        <Row>
            <Col>
            <RaumAdd project={project}/>
            </Col>
        </Row>
        {/* Bauteile */}
        <Row><Col xs sm="auto">U-Wert Definitionen</Col></Row>
        {project.Bauteildefinitionen.map((bauteil, idx) => (
            <Row key={idx}>
                <Col xs sm="auto" onClick={() => (console.log("bauteil row clicked"))}>Name:  {bauteil.Kurzbezeichner}</Col>
                {bauteil.Kommentar && <Col>Kommentar: {bauteil.Kommentar}</Col>}
                {!bauteil.Kommentar && <Col />}
                <Col xs sm="auto last">U-Wert: {bauteil.uWert}</Col>
                <Col xs sm="auto"><CloseButton onClick={bauteil.remove}/></Col>
            </Row>
        ))}
        <Row>
            <Col>
                <BauteilAdd project={project}/>
            </Col>
        </Row>
    </Container>
)

export default observer(ProjectView)