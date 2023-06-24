import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';

export default class Delete extends Component {
    

    constructor(props) {
        super(props)
        

        this.state = {
            show: true
             
        }
    }

    handleCancel = () =>{
        this.setState({show: false});
        this.props.toggle();
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        this.props.delete(this.props.id, this.props.type);

        this.setState({show: false});
        this.props.toggle();
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
                    <Modal.Title>Warning!</Modal.Title>
                    </Modal.Header>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            
                            <p className='pop-up-text'>
                                Deletions are permanent. Are you sure you want to delete {this.props.name}?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="danger" type="submit">Delete</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                



            </div>
        )
    }
}

