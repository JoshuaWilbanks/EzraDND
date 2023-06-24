import React, { Component } from 'react';
import { Routes, NavLink } from 'react-router-dom';
import CreatorWrapper from './Creator/CreatorWrapper';
import '../App.css';
import { Button } from 'react-bootstrap';
import ComponentEditor from './Creator/ComponentEditor'
import Delete from './Creator/Delete';

export default class Tab extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bubbleToEdit: {},
             editBubble: false,
             bubbleToDelete: {},
             deleteBubble: false
        }
    }


    
    componentWillUnmount() {
        if(this.props.edit)
        {
            this.props.setEditorMode();
        }
    }

    editBubble = (recordId) => {

        this.setState({
            bubbleToEdit: this.props.bubbles.find(b => b.recordId === recordId),
            editBubble: true
        })

    }
    
    deleteBubble = (recordId) => {
        this.setState({
            bubbleToDelete: this.props.bubbles.find(b => b.recordId === recordId),
            deleteBubble: true
        })
    }

    toggleEditor = () =>
    {
        this.setState({editBubble: false, deleteBubble: false});
    }

    render() {
        return (
            <div>

                {this.props.useEditButton && this.props.editorView &&
                <div>
                    {
                    !this.props.edit ?
                    <Button style={{width:"10%", marginLeft:"45%", marginTop:"2%"}} onClick={this.props.setEditorMode}>Edit</Button>
                    : 
                    <Button style={{width:"10%", marginLeft:"45%", marginTop:"2%"}} onClick={this.props.setEditorMode}>Done</Button>
                    }
                </div>
                }
                
                <ul style={{listStyleType:"none", marginTop:"2%", marginLeft:"0%", paddingLeft:"0%", textAlign:"center"}}>
                    {this.props.bubbles !== [] ?

                        this.props.bubbles.map(bubble => (

                            <li  key={bubble.recordId} style={this.props.edit ? {marginLeft:"3.75%", marginRight:"3.75%", display: 'inline'} : {marginRight:"5%", marginLeft:"5%", display: 'inline', verticalAlign:"middle"}}>
                                {this.props.edit && <Button variant="success" style={{width:"8%", marginRight:"1%"}} onClick={() => this.editBubble(bubble.recordId)}>Edit</Button> }
                                <NavLink to={"/bubble/" + bubble.recordId} className="bubble-nav-link" >
                                    <p className='bubble-text'>{bubble.name}</p>
                                    {bubble.image && <img src={bubble.image} className='bubble-image' alt="" />}
                                </NavLink>
                                {this.props.edit && <Button variant="danger" style={{width:"9%", marginLeft:"1%"}} onClick={() => this.deleteBubble(bubble.recordId)}>Delete</Button> }
                            </li>
                        ))

                        : null
                    }
                    {this.props.edit &&
                        <li style={{ display: 'inline', verticalAlign:"middle", marginRight:"3.75%", marginLeft:"3.75%"}}>
                            <button style={{width:"8%", marginRight:"1%", cursor:"initial", opacity:"0"}} >Edit</button>
                                <div className='bubble-nav-link' style={{width:"20%", backgroundColor:"#00B74A"}}>
                                    <CreatorWrapper save={this.props.creatorSave} created={this.props.creatorCreated} type="bubble" formId={this.props.tab.formId} className="tab-plus"/>
                                </div>
                            <button style={{width:"9%", marginLeft:"1%", cursor:"initial", opacity:"0"}} >Edit</button>
                        </li>
                    }
                </ul>
                
                { this.state.bubbleToEdit !== {} && this.state.editBubble ?
                    <ComponentEditor bubble={this.state.bubbleToEdit} toggle={this.toggleEditor} type="bubble" save={this.props.editorSave}/> : null
                }

                {this.state.bubbleToDelete !== {} && this.state.deleteBubble ?
                    <Delete name={this.state.bubbleToDelete.name} toggle={this.toggleEditor} delete={this.props.editorDelete} id={this.state.bubbleToDelete.recordId} type="bubble"/>
                    : null
                }

                <Routes>
                </Routes>
            </div>
        )
    }
}
