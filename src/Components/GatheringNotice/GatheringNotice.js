import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './GatheringNotice.css'

import GatheringSide from '../GatheringSide/GatheringSide'

import api from '../../API'

function GatheringNotice(props) {
    useEffect(async () => {
    }, [])
    return (
        <div className="StudyRoom">
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>
            
            <div>
                공지사항
            </div>
        </div>
        
    )
}

export default GatheringNotice
