import React , {useEffect, useState} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import CreatorWrapper from '../Creator/CreatorWrapper';
import { Button } from 'react-bootstrap';
import ComponentEditor from '../Creator/ComponentEditor';
import Delete from '../Creator/Delete';
import GoogleLoginButton from '../GoogleLoginButton';
import Logout from './Logout'

const Navbar = (props) => {

  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState("home");
  const [tabEdit, setTabEdit] = useState(false);
  const [tabDelete, setTabDelete] = useState(false);
  const [logoutEnable, setLogoutEnable] = useState(false);


  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  //esentailly componentDidMount (runs on start and when values in array change, and there are no values so never re-runs)
  useEffect(() =>{

    setTabs(props.tabs);

  }, [props.tabs])

  function onClick(tab)
  {
    setCurrentTab(tab);
  }

  function toggleEditor() {
    if(currentTab !== "home")
    setTabEdit(!tabEdit);

    else alert("Sorry! Can't edit the home tab. Feel free to edit my content though :)")
  }

  function toggleDelete() {
    if(currentTab !== "home")
    setTabDelete(!tabDelete);

    else alert("Sorry! Can't delete the home tab. Feel free to edit me though :)")
  }

  function editorDelete(id, type) {
    props.editorDelete(id, type);
    animation();
  }

  function editorSave(data, type) {
    console.log(data);
    console.log(type);
    props.editorSave(data, type);
  }

  function logoutToggle() {
    setLogoutEnable(!logoutEnable);
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg" style={{paddingBottom:"0"}}>

    <button 
      className="navbar-toggler"
      onClick={ function(){
        setTimeout(function(){ animation(); });
      }}
      type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars text-white"></i>
    </button>

    <div 
      className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
          
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          
          <li className="nav-item active">
            <NavLink className="nav-link" to="/" exact onClick={() => onClick("home")}>
                Home
            </NavLink>
          </li>

          {tabs.map(tab => (
            tab.formId !== 1015 && 
            <li className="nav-item" key={tab.formId}>
              <NavLink className="nav-link" to={"/tab/" + tab.formId}  onClick={() => onClick(tab)} exact>
                {tab.name}
              </NavLink>
            </li>
          ))}
      </ul>

    </div>
    {props.edit &&
      <Button variant="danger" onClick={toggleDelete}  style={{marginRight:"20px"}}>Delete</Button>
    }
    {props.edit &&
      <Button variant="success" onClick={toggleEditor} style={{marginRight:"20px"}}>Edit</Button>
    }

    {props.edit &&
      <CreatorWrapper save={props.creatorSave} created={props.creatorCreated} type="tab" className="nav-bar-plus" />
    }

    {props.editorView &&
    <div style={{marginRight:"15px"}}>
      {!props.edit ?
        <Button onClick={props.setEditorMode}>Edit</Button>
        : 
        <Button onClick={props.setEditorMode}>Done</Button>
      }
    </div>
    }

    {!props.loginData ? 
      <div style={{marginRight:"15px"}}>
        <GoogleLoginButton handleLogin={props.handleLogin}/>
      </div>

    : <div>
        <button style={{background:'none', border:'none', borderRadius:"40%", width:"50px", marginRight:"15px"}} onClick={logoutToggle}><img src={props.loginData.picture} className='' style={{borderRadius:"40%", width:"100%"}} alt="" referrerpolicy="no-referrer" /></button>
      </div>
    }



    {currentTab !== {} && tabEdit &&
      <ComponentEditor tab={currentTab} toggle={toggleEditor} type="tab" save={editorSave}/>
    }

    {currentTab !== {} && tabDelete && 
      <Delete name={currentTab.name} toggle={toggleDelete} delete={editorDelete} id={currentTab.formId} type="tab"/>
    }

    {logoutEnable &&
      <Logout toggle={logoutToggle} logout={props.handleLogout}/>
    }


  </nav>
  )
}
export default Navbar;