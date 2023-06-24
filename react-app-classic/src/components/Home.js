import React from 'react'
import Tab from '../components/Tab'
import Bubble from './Bubble';




export default function Home(props) {

    return (
        <div>

            <Bubble bubble={props.bubble} editorSave={props.bubbleEditorSave} setEditorMode={props.setEditorMode} edit={props.edit} editorView={props.editorView} useToggleImage={false}/>

            <Tab tab={props.tab} bubbles={props.bubbles} editorDelete={props.editorDelete} editorSave={props.editorSave} creatorSave={props.creatorSave} creatorCreated={props.creatorCreated} setEditorMode={props.setEditorMode} useEditButton={false} edit={props.edit} editorView={props.editorView}/>



        </div>
    )
}
