import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';
import { useNavigate } from "react-router-dom";

 class Creator extends Component {
    

    constructor(props) {
        super(props)
        

        this.state = {
            show: true,
            title: '',
            titleError: '',
            image: null,
            imageSnippit: null
             
        }
    }

    handleCancel = () =>{
        this.setState({show: false});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.title === '')
        {
            this.setState({titleError: "Title is required."})
        }
        else if (this.state.title.length > 50) this.setState({titleError: "Title too long. Max 50 characters."})
        else {

            var data = {}

            if(this.state.type === "tab")
            {
                data = {
                    name: this.state.title
                }
            }
            else
            {
                console.log(this.state.image);
                data = {
                    name: this.state.title,
                    image: this.state.image,
                    formId: this.props.formId
                }
            }

            this.props.save(data, this.props.type);
            this.setState({show: false});

            if(this.props.type === "tab")
            this.props.navigation('/');
        }
    }

    
    componentDidMount(){
        this.props.created(this.props.type);
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

    render() {
        return (
            <div className='new-tab'>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Create</Modal.Title>
                    </Modal.Header>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            
                            <p className='pop-up-text'>Name:
                                <input onChange={(e) => this.setState({title: e.target.value})} style={{width:"50%", marginLeft:"2%"}}/>
                            </p>
                            <span style={{ color: "red" }}>{this.state.titleError}</span>
                            {this.props.type === "bubble" &&
                            <div>
                                <hr />
                                <div style={{width:"50%", marginLeft:"25%"}}>
                                    <p className='pop-up-text' style={{width:"50%", marginLeft:"25%"}}>Image</p>
                                    <img src={this.state.imageSnippit} style={{width:"50%", marginLeft:"25%"}} alt="" />
                                    <input type="file" name="myImage" onChange={this.onImageChange} accept='image/*'/>
                                </div>
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

export default function(props) {
    const navigation = useNavigate();

    return <Creator {...props} navigation={navigation} />
}


//TODO:
/*
    -when newtab is created update the tabs list on app
    -use props.newTabCreated to update db
    -propigate changes to Navbar
    -have navbar load tabs from db
    -add image to nav bar (like a pluss sign) that once clicked redirects to this component, creating a new tab



    BRAIN BLAST => new tab should be a pop up window forcing you to enter a title, onSave update db and propigate to navBar


//WHAT WE DID:
    
    -update db
    --form table is now for tabs
    --formId is primary key
    --added name field, removed data field, removed recordId
    ---new bubbles controller, model, and table -> replacing old form table for storing html
    ---RecordId is primary key
    ---added name field, changed 'data' field to 'html', 
    
    -add navbar
    --stole a bunch of code idk how the animation works
    --items in the list show up as tabs basically
    --css has comments on what fields to change for color

    -added logAxios
    -gave up on having all api calls in one place (kinda pointless, its just one line)

    -added routing
    --its pretty straightforward
*/

/*
const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    return (
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        {selectedImage && (
          <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={()=>setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />
       
        <br /> 
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };
  */
