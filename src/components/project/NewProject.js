import React, { Component } from "react"
import { observer } from "mobx-react"
import { Button, Modal } from "react-bootstrap"
import NewProjectForm from "./NewProjectForm";

class NewProject extends Component{
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
                    Add Project
                </Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <NewProjectForm/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsstyle="primary" onClick={this.handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default observer(NewProject)