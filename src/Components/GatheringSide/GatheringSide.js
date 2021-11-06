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

    const deleteStudy = async () => {
        await api.deleteStudy(props.Id)
        window.location.href='/MyStudy'
    }

    return (
            <div className='StudyRoom-side'>
                <section>
                    <Link className='menuTitle-home' to={`/StudyRoom/${props.Id}/GatheringHome`}>
                        <HomeOutlined style={{fontSize: '30px'}}/>
                    </Link>
                </section>
                <section>
                    <div className='menuTitle'>채팅</div>
                    <ul>
                        {ChatList}
                    </ul>
                    <div className='menuBtn-box'><Link className='menuBtn' to={`/StudyRoom/${props.Id}/MakeChat`}>채팅 추가</Link></div>
                </section>
                <section>
                    <div className='menuTitle-box'><Link className='menuTitle-gathering' to={`/StudyRoom/${props.Id}/GatheringList`}>모임</Link></div>
                    <div className='menuBtn-box'><Link className='menuBtn' to={`/StudyRoom/${props.Id}/MakeGathering`}>모임 추가</Link></div>
                </section>
                <section>
                    <div className='menuTitle'>관리</div>
                    <div className='menuBtn-box'><Link className='menuBtn' to={`/StudyRoom/${props.Id}/ManagementMember`}>멤버 관리</Link></div>
                    <div className='menuBtn-box'><Link className='menuBtn' to={`/StudyRoom/${props.Id}/ManagementStudy`}>스터디 수정</Link></div>
                    <div className='menuBtn-box'><a className='menuBtn' onClick={deleteStudy}>스터디 삭제</a></div>
                </section>
            </div>
    )
}

export default GatheringSide
