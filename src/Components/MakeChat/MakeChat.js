import React, {useState} from 'react'
import {useParams} from 'react-router-dom'

import './MakeChat.css'

import api from '../../API';
import GatheringSide from '../GatheringSide/GatheringSide';

function MakeChat(props) {
    const {Id} = useParams()

    const [ChatName, setChatName] = useState()

    const handleMakeChat = async () => {
        if(ChatName){
            await api.makeChat(Id, ChatName)
            props.history.push('/StudyRoom/'+Id+'/GatheringHome')
        }
        else{
            document.getElementById('makeChat-name').style.border='2px solid red'
        }
    }

    return (
        <div className='MakeChat'>
            <aside>
                <GatheringSide Id={Id}/>
            </aside>

            <div>
                <input type='text' className='makeChat-name' id='makeChat-name' placeholder='채팅방 이름' onChange={(e) => setChatName(e.target.value)}></input>
                <button className='makeChat-btn' onClick={handleMakeChat}>생성</button>
            </div>
            
        </div>
    )
}

export default MakeChat
