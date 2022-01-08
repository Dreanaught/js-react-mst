import React, { Component } from "react"
import { observer } from "mobx-react"
import { Button, Modal } from "react-bootstrap"
import BauteilAddForm from "./BauteilAddForm";
import { Bauteil } from "../models/Bauteil";

class BauteilAdd extends Component {
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
        //alert(JSON.stringify(values, null, 2));
        this.props.project.addBauteil(Bauteil.create(values))
        //this.props.raum.addElement(this.state.element)
        //this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
                    Neue U-Wert Definition
                </Button>
                <Modal
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Füge neues Element hinzu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<ElementAddForm raum={raum}/>*/}
                        <BauteilAddForm onSubmit={this.handleAdd}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button form="AddElement" type="submit" bsstyle="primary">Add</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default observer(BauteilAdd)