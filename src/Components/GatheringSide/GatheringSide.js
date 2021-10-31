import React, {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import api from '../../API'

import {HomeOutlined} from '@ant-design/icons'

import './GatheringSide.css'

function GatheringSide(props) {

    const [selectedChat, setselectedChat] = useState()

    const [ChatList, setChatList] = useState([])

    useEffect(async () => {
        const res = await api.chatList(props.Id)

        const list = [];

        res.map((chat, index) => {
            list.push(
                <li key={index}>
                    <Link className='menuBtn' to={`/StudyRoom/${props.Id}/GatheringChat/${chat.id}`} onClick={() => {
                        refresh(props.Id, chat.id)
                    }}>
                        {chat.name}
                    </Link>
                </li>

            )
        })
        setChatList(list)

    }, [])

    const refresh = (studyId, chatId) => {
        if(selectedChat != chatId){
            window.location.href='/StudyRoom/'+studyId+'/GatheringChat/'+chatId
        }
        setselectedChat(chatId)
    }

    return (
            <div className='StudyRoom-side'>
                <section>
                    <Link className='menuTitle-home' to={`/StudyRoom/${props.Id}/GatheringHome`}>
                        <HomeOutlined style={{fontSize: '30px'}}/>
                    </Link>
                </section>
                <hr/>
                <section>
                    <div className='menuTitle'>채팅</div>
                    <ul>
                        {ChatList}
                    </ul>
                    <Link className='menuBtn' to={`/StudyRoom/${props.Id}/MakeChat`}>채팅 추가</Link>
                </section>
                <hr/>
                <section>
                    <div className='menuTitle-box'><Link className='menuTitle' to={`/StudyRoom/${props.Id}/GatheringList`}>모임</Link></div>
                    <Link className='menuBtn' to={`/StudyRoom/${props.Id}/MakeGathering`}>모임 추가</Link>
                </section>
                <hr/>
                <section>
                    <div className='menuTitle'>관리</div>
                    <ul>
                        <li><Link className='menuBtn' to={`/StudyRoom/${props.Id}/ManagementMember`}>멤버관리</Link></li>
                        <li><Link className='menuBtn' to={`/StudyRoom/${props.Id}/ManagementStudy`}>스터디관리</Link></li>
                    </ul>
                </section>
                <hr/>
            </div>
    )
}

export default GatheringSide
