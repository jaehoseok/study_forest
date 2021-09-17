import React, {useState} from 'react'

import './MakeChat.css'

import api from '../../API';
import GatheringSide from '../GatheringSide/GatheringSide';

function MakeChat(props) {

    const [ChatName, setChatName] = useState()

    const handleMakeChat = async () => {
        console.log(ChatName);
        await api.makeChat(props.match.params.Id, ChatName)
        props.history.push('/StudyRoom/'+props.match.params.Id+'/GatheringHome')
    }

    return (
        <div className='MakeChat'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            <div>
                <input type='text' placeholder='채팅방 이름' onChange={(e) => setChatName(e.target.value)}></input>
                <button onClick={handleMakeChat}>생성</button>
            </div>
            
        </div>
    )
}

export default MakeChat
