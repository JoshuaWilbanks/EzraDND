import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import CustomEditor from './components/CustomEditor';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Tab from './components/Tab';
import Bubble from './components/Bubble';
import CreateBase64 from './components/CreateBase64';
import defaultImage from './images/default.png'
import { Button } from 'react-bootstrap';

const url = "/api/";
//const url = "http://localhost:5052/"
const headers = {
  headers: {
      'Content-Type': 'application/json',
  }
}

export default class App extends Component {

  constructor(props)
  {
    super(props);

    
    this.state = {
      tabs: [],
      bubbles: [],
      bubblesDone: false,
      tabsDone: false,
      edit: false,
      editorView: false,
      loginData: null,
      userAuthorized: false


    }
  }

  
  render()
  {
    return (
        <div className='app-style' style={{border:".1px solid black"}}>
          <Navbar edit={this.state.edit} setEditorMode={this.toggleEditMode} tabs={this.state.tabs} creatorSave={this.creatorSave} creatorCreated={this.creatorCreated} editorSave={this.editorSave} editorDelete={this.editorDelete} editorView={this.state.editorView} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loginData={this.state.loginData}/>
          <Routes>
            {(this.state.tabsDone && this.state.bubblesDone) ?
              <Route exact path="*" element={
                <Home tab={this.state.tabs.find(x => x.formId === 1015)} bubbles={this.state.bubbles.filter(x => x.formId === 1015)} editorDelete={this.editorDelete} editorSave={this.editorSave} creatorSave={this.creatorSave} creatorCreated={this.creatorCreated} setEditorMode={this.toggleEditMode} edit={this.state.edit} bubble={this.state.bubbles.find(x => x.recordId === 43)} bubbleEditorSave={this.bubbleSave} editorView={this.state.editorView}/>
              } /> : null
            }
            <Route exact path={"/customeditor/*"} element={
              <CustomEditor editorSave={this.bubbleSave} />
            } />

            {this.state.tabs.map(tab => (
              <Route key={tab.formId} exact path={"/tab/" + tab.formId + "/*"} element={
                <Tab tab={tab} bubbles={this.state.bubbles.filter(x => x.formId === tab.formId)} editorDelete={this.editorDelete} editorSave={this.editorSave} creatorSave={this.creatorSave} creatorCreated={this.creatorCreated} setEditorMode={this.toggleEditMode} edit={this.state.edit} useEditButton={true} editorView={this.state.editorView}/>
              }/>
            ))}

            {this.state.bubbles.map(bubble => (
              <Route key={bubble.recordId} exact path={"/bubble/" + bubble.recordId + "/*"} element={
                <Bubble bubble={bubble} key={bubble.recordId} editorSave={this.bubbleSave} setEditorMode={this.toggleEditMode} edit={this.state.edit} editorView={this.state.editorView} useToggleImage={true}/>
              }/>
            ))}
          </Routes>
          {this.state.userAuthorized &&
            <div>
              {this.state.editorView ?
                <Button style={{position:"fixed", bottom:"10px", right:"10px"}} onClick={this.toggleEditorView}>Toggle Editor View</Button>
              : <Button style={{position:"fixed", bottom:"10px", right:"10px"}} onClick={this.toggleEditorView}></Button>
              }
            </div>
          }
        </div>
    );
  }

  //get a list of all the tabs and bubbles breif
  componentDidMount() {

    this.loadTabs();

    this.loadBubbles();

    if(localStorage.getItem("userData"))
    {
      var data = JSON.parse(localStorage.getItem("userData"));
      this.setState({loginData: data});
      console.log("user data got!");

      if(this.checkUserAuth(data));
    }

    else
    {
      console.log("user data not found");
      console.log(localStorage);
    }

  }


  checkUserAuth = (data) =>
  {
    var $this = this;

    console.log("getting authorized useres list...")
    axios.get(url + "login/authusers")
    .then(function (response) {
      console.log("List got!");
      $this.logAxios(response);

      var check = response.data.find(x => x.userId === data.userId);
      if(check)
      {
        console.log("user authorized!");
        $this.setState({userAuthorized: true, editorView: true})
      }

      //if(response.data.find(x => x.UserId == data.UserId))

    })
    .catch(function (error) {
      console.log("Getting list failed.");
      console.log(error);
      if(error.response)
      $this.logAxios(error.response);
    })
  }

  handleLogout = () =>
  {
    this.setState({loginData: null, userAuthorized: false, editorView: false});
    localStorage.removeItem("userData");
  }

  handleLogin = (data) =>
  {
    this.setState({loginData: data});
    localStorage.setItem('userData', JSON.stringify(data));

    this.checkUserAuth(data);
  }

  //used through out various components to determine if form is in edit mode
  toggleEditMode = () =>
  {
    if(this.state.userAuthorized)
    {
      var edit = !this.state.edit;
      this.setState({edit});
    }
    else this.setState({edit: false});


  }

  toggleEditorView = () =>
  {

    if(this.state.userAuthorized)
    {
      var edit = this.state.edit;

      var editorView = !this.state.editorView;
      if(!editorView) edit = false;
      this.setState({editorView, edit});
    }
    else this.setState({editorView: false})

  }

  editorDelete = (id, type) =>
  {
    var $this = this;
    var urlx = '';

    if(type === "bubble") urlx = "bubble";
    else urlx = "form";

    axios.post(url + urlx + "/delete/" + id)
    .then(function (response) {
      
      $this.logAxios(response);

      if(type === "tab") $this.loadTabs();
      else $this.loadBubbles();

    })
    .catch(function (error) {
      if(error.response.data)
      $this.logAxios(error.response);
    })
  }


  //save data from editor component
  editorSave = (data, type) =>
  {
    var $this = this;

    var recordJson = '';

    if(type === "tab")
    {
      recordJson = JSON.stringify({name: data.name, formId: data.formId, order: data.order});
    }
    else
    {
      recordJson = JSON.stringify({name: data.name, formId: data.formId, recordId: data.recordId, html: data.html, image: data.image});
    }

    var urlx = "";
    if (type === "tab") urlx = "form/";
    else urlx = "bubble/";

    console.log(recordJson);
    console.log("attempting " + type + " edit");
    axios.post(url + urlx + "edit", recordJson, headers)
    .then(function (response) {
      console.log(type + " edit successful!");
      $this.logAxios(response);

      if(type === "tab") $this.loadTabs();
      else $this.loadBubbles();
      console.log(type + " saved!");

    })
    .catch(function (error) {
      console.log(type + " edit failed.");

      console.log(error);
      if(error.response);
      $this.logAxios(error.response);
    })

  }

  //load the data
  loadBubbles = () =>
  {
    var $this = this;

    console.log("getting all bubbles...");
    axios.get(url +"bubble/Index")
    .then(function (response) {
      console.log("all bubbles got!");
      $this.logAxios(response);

      var bubbles = [];
      response.data.forEach(function (data) {
        bubbles.push(data);
      })

      $this.setState({bubbles, bubblesDone: true});
    })
    .catch(function(error) {
      console.log("Loading bubbles failed.");
      console.log(error.response);
      if(error.response.data)
      $this.logAxios(error.response);
    });

  }

  loadTabs = () =>
  {
    var $this = this;

    console.log("getting all tabs...")
    this.fetchAllRecords("form")
    .then(function (response) {
      console.log("all tabs got!");
      $this.logAxios(response);

      var tabs = [];

      response.data.forEach(function (data) {
        tabs.push(data);
      })

      tabs.sort(function (orderA, orderB) {
        return orderA.order - orderB.order
      })

      tabs.forEach((e) => console.log(e.order))
      
      $this.setState({tabs, tabsDone: true});
    })
    .catch(function(error) {
      console.log("Loading tabs failed.");
      $this.logAxios(error.response);
    });

  }

  //when a new tab is created, componentDidMount calls this method
  creatorCreated = (type) =>
  {
    console.log("New "+ type + " creating...");
    console.log("New " + type + " created!");
    
  }

  //when a new tab is created then the save button is hit, this method is called
  //save the new tab to the db
  creatorSave = (data, type) =>
  {
    console.log(type + " saving...");

    console.log(data);
    
    var $this = this;

    var recordJson = '';

    //tab specific json
    if(type === "tab")
    {
      var order = this.state.tabs[this.state.tabs.length - 1].order + 1;
      recordJson = JSON.stringify({Name: data.name, Order: order});
      save(recordJson);
    }

    //bubble specific json
    else
    {
      if (data.image != null)
      {  

        console.log("converting to base64...");
        CreateBase64(data.image)
        .then(function (response) {
          console.log("conversion successful!");

          recordJson = JSON.stringify({Name: data.name, Image: response, FormId: data.formId})
          save(recordJson);
        })
        .catch(function (error) {
          console.log("conversion failed!");
          console.log(error);
        });
      }

      else{

        recordJson = JSON.stringify({Name: data.name, Image: defaultImage, FormId: data.formId});

        save(recordJson);
      }
    }

    function save(recordJson){

      var urlx = "";
      if (type === "tab") urlx = "form/";
      else urlx = "bubble/";
  
      axios.post(url + urlx + "create", recordJson, headers)
      .then(function (response) {
        console.log("save successful!");
        $this.logAxios(response);
  
        if(type === "tab") $this.loadTabs();
        else $this.loadBubbles();
        console.log(type + " saved!");

      })
      .catch(function (error) {
        console.log(type + " saving failed.");

        console.log(error);
        if(error.response);
        $this.logAxios(error.response);
      })

    }


  }


  //load html for specified bubble
  loadHtml = (recordId) =>
  {
    return axios.get(url + "bubble/details/" + recordId);
    
  }


  //when a bubble's text is updated and the save button hit, this method is called
  bubbleSave = (data) => {

    var recordJson = JSON.stringify({FormId: data.formId, Name: data.name, RecordId: data.recordId, useImage: data.useImage, Html: data.html, Image: data.image});

    console.log(recordJson);


    var $this = this;
    var bool;

    this.toggleEditMode();

    console.log("pinging...");
    axios.get(url + "bubble/exists/" + data.recordId)
    .then(function (response) {
      $this.logAxios(response);
      bool = response.data;
      
      console.log("ping success!");

      if(bool)
      {
        console.log("editing...");
        axios.post(url + "bubble/edit", recordJson, headers)
        .then(() => {
          console.log("edit success!");
          $this.logAxios(response);
          $this.loadBubbles();    
        })
        .catch((error) => {
          $this.logAxios(error.response);});
      }
      else
      {
        console.log("Edit failed.");
        $this.createRecord(recordJson);
      }


    })
    .catch(function(error) {
      if (error.response)
      {
        console.log("Ping failed.");
        $this.logAxios(error.response);
      }
    });





  }



  fetchAllRecords = (urlx)  => {
    return axios.get(url + urlx + "/index");
  }

  pingRecord = (urlx, id)  => {
    return axios.get(url + urlx + "/exists/" + id);
  }

  fetchRecordById = async (urlx, id)  => {
    return axios.get(url + urlx + "details/" + id)
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function(error) {
      if (error.response)
      {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

  }

  createRecord = (urlx, newRecord)  => {
    console.log(newRecord.data);
    axios.post(url + "create", newRecord, headers)
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function(error) {
      if (error.response)
      {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  updateRecord = (updatedRecord)  => {
    axios.post(url + "edit", updatedRecord, headers)
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function(error) {
      if (error.response)
      {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  deleteRecord = (id)  => {
    axios.post(url + "delete/" + id)
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
    .catch(function(error) {
      if (error.response)
      {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  logAxios = (response) => {
    console.log(response);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  }
}