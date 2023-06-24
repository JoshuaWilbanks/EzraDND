import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';
import CreateBase64 from '../CreateBase64';

export default class ComponentEditor extends Component {
    

    constructor(props) {
        super(props)
        

        this.state = {
            show: true,
            title: '',
            titleError: '',
            image: null,
            imageSnippit: null,
            checked: this.props.bubble && this.props.bubble.image ? true : false
             
        }
    }

    handleCancel = () =>{
        this.setState({show: false});
        this.props.toggle();
    }

    componentDidMount() {
        if(this.props.bubble)
        {
            this.setState({title: this.props.bubble.name})
        }
        else
        {
            this.setState({title: this.props.tab.name})
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.title === '')
        {
            this.setState({titleError: "Title is required."})
        }
        else if (this.state.title.length > 50) this.setState({titleError: "Title too long. Max 50 characters."})
        else {
            var $this = this;

            var data = {}

            if(this.props.type === "tab")
            {
                data = {
                    name: this.state.title,
                    order: this.props.tab.order,
                    formId: this.props.tab.formId
                }

                this.props.save(data, this.props.type);
                this.props.toggle();
            }
            else
            {
                if(this.state.image != null)
                {
                    CreateBase64(this.state.image)
                    .then(function (response) {
                        console.log("conversion successful!");

                        data = {
                            name: $this.state.title,
                            image: response,
                            formId: $this.props.bubble.formId,
                            html: $this.props.bubble.html,
                            recordId: $this.props.bubble.recordId
                        }
            
                        $this.props.save(data, $this.props.type);
                        $this.setState({show: false});
                        $this.props.toggle();
                    })
                    .catch(function (error) {
                        console.log("conversion failed!");
                        console.log(error);
                    });
                }
                
                else if(this.state.checked) {
                    data = {
                        name: this.state.title,
                        image: this.props.bubble.image,
                        formId: this.props.bubble.formId,
                        html: this.props.bubble.html,
                        recordId: this.props.bubble.recordId
                    }

                    $this.props.save(data, $this.props.type);
                    $this.setState({show: false});
                    $this.props.toggle();
                }

                else {
                    data = {
                        name: this.state.title,
                        image: null,
                        formId: this.props.bubble.formId,
                        html: this.props.bubble.html,
                        recordId: this.props.bubble.recordId
                    }

                    $this.props.save(data, $this.props.type);
                    $this.setState({show: false});
                    $this.props.toggle();

                }



            }



        }
    }


    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: img,
            imageSnippit: URL.createObjectURL(img)
          });
        }
      };

    checkBoxChange = () => {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <div className='new-tab'>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Edit: {this.props.bubble ? this.props.bubble.name : this.props.tab.name}</Modal.Title>
                    </Modal.Header>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            
                            <p className='pop-up-text'>Name:
                                <input defaultValue={this.props.bubble ? this.props.bubble.name : this.props.tab.name} onChange={(e) => this.setState({title: e.target.value})} style={{width:"50%", marginLeft:"2%"}}/>
                            </p>
                            <span style={{ color: "red" }}>{this.state.titleError}</span>
                            {this.props.type === "bubble" &&
                            <div>
                                <hr />
                                <div style={{width:"50%", marginLeft:"25%"}}>
                                        <img src={this.state.imageSnippit == null ? this.props.bubble.image : this.state.imageSnippit} style={{width:"50%", marginLeft:"25%", marginBottom:"5%"}} alt="" />
                                    <input type="file" name="myImage" onChange={this.onImageChange} accept='image/*'/>
                                </div>
                                <label>Use image? <input type="checkbox" checked={this.state.checked} onChange={this.checkBoxChange} /></label>
                            </div>}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                



            </div>
        )
    }
}

