import React, {useEffect, useState} from 'react'

import './ManagementMember.css';

import GatheringSide from '../GatheringSide/GatheringSide';
import api from '../../API';
import {CloseSquareOutlined, UserAddOutlined} from '@ant-design/icons'

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
                    <div onClick={DeleteMember} key={Member.userId} id={Member.userId}>
                        <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>강퇴
                    </div>
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
                    <div>
                        <div onClick={AddMember}>
                            <UserAddOutlined style={{color: 'green', fontSize: '20px', marginRight: '3px'}}/>승인
                        </div>
                        <div onClick={RejectMember}>
                            <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>거절
                        </div>
                    </div>
                </div>                
            )
        })
        setWaitUsers(waitList)

    }, [])

    const DeleteMember = async(e) => {
        await api.deleteMember(props.match.params.Id, e.target.id)

        const MemberRes = await api.StudyMember(props.match.params.Id)
        const MemberList = []
        MemberRes.map((Member, index) => {
            MemberList.push(
                <div className='Member' key={index} id={Member.userId}>
                    {Member.nickName}
                    <div onClick={DeleteMember} key={Member.userId} id={Member.userId}>
                        <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>강퇴
                    </div>
                </div>
            )
        })
        setMemberList(MemberList)
    }

    const AddMember = async(e) => {
        await api.addMember(props.match.params.Id, e.target.id)

        const WaitUsersRes = await api.StudyWaitUsers(props.match.params.Id)
        const waitList = []
        WaitUsersRes.map((waitUser, index) => {
            waitList.push(
                <div className='waitUser' key={index} id={waitUser.userId}>
                    {waitUser.nickName}
                    <div>
                        <div onClick={AddMember}>
                            <UserAddOutlined style={{color: 'green', fontSize: '20px', marginRight: '3px'}}/>승인
                        </div>
                        <div onClick={RejectMember}>
                            <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>거절
                        </div>
                    </div>
                </div>                
            )
        })
        setWaitUsers(waitList)


        const MemberRes = await api.StudyMember(props.match.params.Id)
        const MemberList = []
        MemberRes.map((Member, index) => {
            MemberList.push(
                <div className='Member' key={index} id={Member.userId}>
                    {Member.nickName}
                    <div onClick={DeleteMember} key={Member.userId} id={Member.userId}>
                        <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>강퇴
                    </div>
                </div>
            )
        })
        setMemberList(MemberList)
    }

    const RejectMember = async (e) => {
        await api.rejectMember(props.match.params.Id, e.target.id)
        
        const WaitUsersRes = await api.StudyWaitUsers(props.match.params.Id)
        const waitList = []
        WaitUsersRes.map((waitUser, index) => {
            waitList.push(
                <div className='waitUser' key={index} id={waitUser.userId}>
                    {waitUser.nickName}
                    <div>
                        <div onClick={AddMember}>
                            <UserAddOutlined style={{color: 'green', fontSize: '20px', marginRight: '3px'}}/>승인
                        </div>
                        <div onClick={RejectMember}>
                            <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>거절
                        </div>
                    </div>
                </div>                
            )
        })
        setWaitUsers(waitList)
    }
    
    return (
        <div className='ManagementMember'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>
            <div className='ManagementMember-content'>
                <div className='ManagementMember-title'>
                    <div className='study-header'>&#60;&nbsp;멤&nbsp;버&nbsp;&nbsp;관&nbsp;리&nbsp;&#62;</div>
                </div>
                <div className='ManagementMember-list'>
                    <div className='left-member'>
                        <div className='list-title'>현재 참가 인원</div>
                        {MemberList}
                    </div>

                    <div className='right-member'>
                        <div className='list-title'>신청 인원</div>
                        {WaitUsers}
                        <div className='waitUser' key='21312' id='3213'>
                            ㅇㅇㅇ
                            <div>
                                <div>
                                    <UserAddOutlined style={{color: 'green', fontSize: '20px', marginRight: '3px'}}/>승인
                                </div>
                                <div>
                                    <CloseSquareOutlined style={{color: 'red', fontSize: '20px', marginRight: '3px'}}/>거절
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>

                
            </div>
            
        </div>
    )
}

export default ManagementMember
