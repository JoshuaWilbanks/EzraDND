import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Button from 'react-bootstrap/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../App.css'

//const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class CustomEditor extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       contentState: null,
       html: '',
       loaded: false
    }
  }

  onChange = (editorState) => {
    var html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    var contentState = editorState.getCurrentContent();

    this.setState({
    editorState,
    contentState,
    html
    })

    this.props.updateText(convertToRaw(editorState.getCurrentContent()));

    //this.props.onChange(html, contentState);
    this.forceUpdate();
  }


  componentDidMount() {
    //call api for data based on formId passed
    if(this.props.bubble)
    {
      this.load();
      this.setState({loaded: true});
    }
  }

  componentDidUpdate() {
    if(!this.state.loaded)
    {
      if(this.props.bubble)
      {
        this.load();
        this.setState({loaded: true});
      }
    }
  }

  load = () =>
  {
      //var contentState = convertFromRaw(content);
      if(this.props.bubble.html != null)
      {var contentState = convertFromRaw(JSON.parse(this.props.bubble.html));
      var html = draftToHtml(convertToRaw(contentState))
      this.setState({contentState,
        editorState: EditorState.createWithContent(contentState),
        html
      });
      }
      else {this.setState({editorState: EditorState.createEmpty(), html: '', contentState: ''})}
  }

  save = () => {

    var html = null;

    if (this.state.html !== "") html = JSON.stringify(convertToRaw(this.state.contentState));

    
    var data = {
      name: this.props.bubble.name,
      html,
      recordId: this.props.bubble.recordId,
      formId: this.props.bubble.formId,
      image: this.props.bubble.image
    }
    

    this.props.save(data);
  }

  //only load editor if editorState exists, which isn't until api call is finished
  render() {
    return (
      <div>
      
        

        {this.state.editorState ?
        <div>
          <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorStyle={{backgroundColor:'#39373d', border:'none'}}
          />

          <Button variant="success" className='save-button' style={{width:"10%", marginLeft:"37.5%"}} onClick={this.save}>Save</Button>
          <Button variant="secondary" onClick={this.props.cancel} style={{width:"10%", marginLeft:"5%"}}>Cancel</Button>


        </div>
              : null
        
      }


    </div>
    )
  }
}

/*
  text area displaying html converted -> for debugging

          <div className='text-area'>
              <textarea
              disabled
              value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
              />
          </div>

          <div className='bubble-html'> { ReactHtmlParser(this.state.html) } </div>
*/

                
                
