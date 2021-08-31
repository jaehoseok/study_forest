import React, {useEffect} from 'react'

import {Link} from 'react-router-dom'
import api from '../../API'

import './GatheringSide.css'

function GatheringSide(props) {
    useEffect(async () => {
        await api.Gatherings(props.Id)
    }, [])

    return (
            <div className='StudyRoom-side'>
                <hr/>
                <section>
                    <div className='menuTitle'>일반</div>
                    <ul>
                        <li><Link to={`/StudyRoom/${props.Id}/GatheringNotice`}>공지사항</Link></li>
                        <li><Link to={`/StudyRoom/${props.Id}/GatheringChat`}>채팅</Link></li>
                    </ul>
                </section>
                <hr/>
                <section>
                    <div className='menuTitle'>모임</div>
                    <Link to={`/StudyRoom/${props.Id}/MakeGathering`}>모임 추가</Link>
                </section>
                <hr/>
                <section>
                    <div className='menuTitle'>관리</div>
                    <ul>
                        <li><Link to={`/StudyRoom/${props.Id}/ManagementMember`}>멤버관리</Link></li>
                        <li><Link to={`/StudyRoom/${props.Id}/ManagementStudy`}>스터디관리</Link></li>
                    </ul>
                </section>
                <hr/>
            </div>
    )
}

export default GatheringSide
