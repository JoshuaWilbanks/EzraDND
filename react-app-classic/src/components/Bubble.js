import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import '../App.css'
import CustomEditor from './CustomEditor';
import { Button } from 'react-bootstrap';


export default class Bubble extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             htmlRaw: JSON.parse(this.props.bubble.html)
        }
    }

    updateText = (html) => {
        this.setState({htmlRaw: html});
    }

    componentDidMount() {
        if (this.props.bubble.useImage != null)
        this.setState({useImage: this.props.bubble.useImage})
        else this.setState({useImage: true})
    }

    componentWillUnmount() {
        if(this.props.edit)
        {
            this.props.setEditorMode();
        }
    }

    toggleImage = () => {
        this.setState({useImage: !this.state.useImage})
    }

    save = (data) => {
        var dataFix = {
            ...data,
            useImage: this.state.useImage
        }

        //console.log(dataFix);
        this.props.editorSave(dataFix);
    }

    cancel = () => {
        this.setState({useImage: this.state.curUseImage});
        this.props.setEditorMode();
    }

    setEditorMode = () =>
    {
        this.setState({curUseImage: this.state.useImage});
        this.props.setEditorMode();
    }

    render() {
        return (
            <div>
                {this.props.editorView &&
                <div>
                    {!this.props.edit && this.props.editorView ?
                        <Button onClick={this.setEditorMode} style={{width:"10%", marginLeft:"45%", marginTop:"2%"}}>Edit</Button>
                    :   this.props.useToggleImage && <Button variant="danger" onClick={this.toggleImage} style={{width:"15%", marginLeft:"42.5%", marginTop:"2%", backgroundColor:"#f03aea", border:"none"}}>Toggle Image</Button>
                    }
                </div>
                }

                {this.state.useImage &&
                <div style={{marginLeft:"40%", width:"20%", marginTop:"1%"}}>
                    <img src={this.props.bubble.image} alt="" className='bubble-image'/>
                </div>
                }
                <div className='bubble-html'>
                    {ReactHtmlParser(draftToHtml(this.state.htmlRaw))}
                </div>

                {this.props.edit &&
                    <CustomEditor save={this.save} bubble={this.props.bubble} updateText={this.updateText} cancel={this.cancel}/>
                }


            </div>
        )
    }
}
