import React from 'react'
import './GatheringChat.css'

import GatheringSide from '../GatheringSide/GatheringSide'

function GatheringChat(props) {
    return (
        <div className="GatheringChat">
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            <div>
                채팅
            </div>
        </div>
    )
}

export default GatheringChat
