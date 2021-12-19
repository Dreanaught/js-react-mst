import React, { Component } from "react"
import { observer } from "mobx-react"
import {clone, getSnapshot, applySnapshot} from "mobx-state-tree"

class BauteilView extends Component {
    constructor(){
        super()
        this.state = { isEditing: false }
    }

    render() {
        const { bauteil, readonly } = this.props
        return this.state.isEditing ? (
            this.renderEditable()
        ) : (
            <li className="item">
                <h3>{bauteil.name}</h3>
                <span>{bauteil.uWert}</span>
                {!readonly && (
                    <span>
                        <button onClick={this.onToggleEdit}>✏</button>
                        <button onClick={bauteil.remove}>❎</button>
                    </span>
                )}
            </li>
        )
    }

    renderEditable() {
        return (
            <li className="item">
                <button onClick={this.onSaveEdit}>💾</button>
                <button onClick={this.onCancelEdit}>❎</button>
            </li>
        )
    }

    onToggleEdit = () => {
        this.setState({
            isEditing: true,
            clone: clone(this.props.bauteil)
        })
    }

    onCancelEdit = () => {
        this.setState({ isEditing: false })
    }

    onSaveEdit = () => {
        applySnapshot(this.props.bauteil, getSnapshot(this.state.clone))
        this.setState({
            isEditing: false,
            clone: null
        })
    }
}

export default observer(BauteilView)
