import React, { Component } from "react"
import { observer } from "mobx-react"
import { Button, Modal } from "react-bootstrap";
import { Element } from "../models/Element";

class ElementAdd extends Component {
    

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            show: false
        };

        this.state = {
            element: Element.create({
                Orientierung:"",
                Bauteil: 1,
                Anzahl: 1,
                Breite: 0,
                Länge_Höhe: 0,
                grenzt_an: "",
                angrenzende_Temperatur: 20,
                temperatur_Anpassung: 0
            })
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleAdd() {
        //this.props.raum.addElement(this.state.element)
        
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const element = this.props
        return (
            <div>
                <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
                    Add Element
                </Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>One fine body... {element.Abzugsfläche}</Modal.Body>

                    <Modal.Footer>
                        <Button bsstyle="primary" onClick={this.handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default observer(ElementAdd)