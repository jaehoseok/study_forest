import React, {useEffect, useState} from 'react'

import './ManagementMember.css';

import GatheringSide from '../GatheringSide/GatheringSide';
import api from '../../API';

function ManagementMember(props) {
    const [MemberList, setMemberList] = useState([])
    const [WaitUsers, setWaitUsers] = useState([])

    useEffect(async() => {
        const MemberRes = await api.StudyMember(props.match.params.Id)
        const MemberList = []
        MemberRes.map((Member, index) => {
            MemberList.push(
                <div className='Member' key={index} id={Member.userId}>
                    {Member.nickName}
                </div>
            )
        })
        setMemberList(MemberList)

        const WaitUsersRes = await api.StudyWaitUsers(props.match.params.Id)
        const waitList = []
        WaitUsersRes.map((waitUser, index) => {
            waitList.push(
                <div className='waitUser' key={index} id={waitUser.userId}>
                    {waitUser.nickName}
                </div>                
            )
        })
        setWaitUsers(waitList)

    }, [])
    
    return (
        <div className='ManagementMember'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>
            <div className='ManagementMember-content'>
                <div className='ManagementMember-title'>
                    멤버관리
                </div>
                <div className='ManagementMember-list'>
                    <div className='left-member'>
                        <div className='list-title'>현재 참가 인원</div>
                        {MemberList}
                    </div>

                    <div className='right-member'>
                        <div className='list-title'>신청 인원</div>
                        {WaitUsers}
                    </div>                    
                </div>

                
            </div>
            
        </div>
    )
}

export default ManagementMember
