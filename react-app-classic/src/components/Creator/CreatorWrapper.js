import React, { useState } from 'react'
import Creator from './Creator';
import plus from './plus.png';
import '../../App.css'

export default function CreatorWrapper(props) {

    const [click, setClick] = useState(false);

    function onClick() {
        console.log(props.style)
        console.log("clicked");
        setClick(!click)
    }

    return(
        <div>
            <button style={{background:'none', border:'none'}} onClick={onClick}><img src={plus} className={props.className} alt=""/></button>
            {click &&
                <Creator save={props.save} created={props.created} type={props.type} formId={props.formId}/>
            }
        </div>
    )


}

