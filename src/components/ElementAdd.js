import React, { Component } from "react"
import { observer } from "mobx-react"
import { Button, Form, Modal } from "react-bootstrap";
import { Element } from "../models/Element";
import ElementAddForm from "./ElementAddForm";

class ElementAdd extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleAdd(values) {
        this.props.raum.addElement(Element.create(values))

        //this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const raum = this.props.raum
        return (
            <div>
                <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
                    Add Element
                </Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Füge neues Element zu {raum.Name} hinzu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ElementAddForm raum={raum} onSubmit={this.handleAdd}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="AddElement" type="submit" bsstyle="primary">Add</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default observer(ElementAdd)