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
            window.location.href='/StudyRoom/'+Id+'/GatheringHome'
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
            <div className='study-header'>&nbsp;채&nbsp;팅&nbsp;방&nbsp;&nbsp;추&nbsp;가&nbsp;</div>
                <input type='text' className='makeChat-name' id='makeChat-name' placeholder='채팅방 이름' onChange={(e) => setChatName(e.target.value)}></input>
                <button className='makeChat-btn' onClick={handleMakeChat}><i class="fas fa-plus" style={{fontSize:'20px'}}></i></button>
            </div>
            
        </div>
    )
}

export default MakeChat
