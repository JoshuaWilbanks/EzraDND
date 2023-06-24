import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';

export default class Logout extends Component {
    

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

        this.props.logout();

        this.setState({show: false});
        this.props.toggle();
    }


    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName='logout-modal'
                >
                    <Modal.Header>
                    <Modal.Title>Log out?</Modal.Title>
                    </Modal.Header>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">Log Out</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                



            </div>
        )
    }
}

