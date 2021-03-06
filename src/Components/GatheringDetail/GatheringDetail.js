import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

import './GatheringDetail.css';

import GatheringSide from '../GatheringSide/GatheringSide';

import api from '../../API'
const {kakao} = window;

function GatheringDetail(props) {

    const {Id, gatheringId} = useParams()

    const [gatheringInfo, setgatheringInfo] = useState([])
    const [join, setjoin] = useState(null)
    const [memberList, setmemberList] = useState([])

    useEffect(async () => {
        const res = await api.gatheringDetail(gatheringId)
        const info = {
            content : res.content,
            gatheringTime : res.gatheringTime,
            numberOfPeople: res.numberOfPeople,
            shape: res.shape,
        }
        if(res.place){
            info.place=res.place.name
            info.len=res.place.len
            info.let=res.place.let
            const mapContainer = document.getElementById('gatheringMap')
            const mapOptions = {
            center: new kakao.maps.LatLng(res.place.let, res.place.len),
            level: 5,
            draggable: false,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
        }
        setgatheringInfo(info)
        if(res.apply){
            setjoin(res.apply)
        }
    }, [])

    useEffect(async () => {
        const res = await api.gatheringJoinMember(gatheringId)
        const list = []
        res.map((member, index) => {
            list.push(
                <div className='gatheringMember' key={index}>
                    {member.image?<img src={member.image.thumbnailImage}/>:<div></div>}
                    {member.nickName}
                </div>
            )
        })
        setmemberList(list)
    }, [])

    const deleteGathering = async () => {
        await api.deleteGathering(gatheringId)
        window.location.href = '/StudyRoom/'+Id+'/GatheringList'
    }

    return (
        <div className='GatheringDetail'>
            <aside>
                <GatheringSide Id={Id}/>
            </aside>

            <div className='gatheringDetail-body'>
            <div className='gatheringDetail-header'>???&nbsp;???&nbsp;&nbsp;&nbsp;&nbsp;???&nbsp;???&nbsp;???&nbsp;???</div>
                <div className='gatheringDetail-box'>
                    <div className='gatheringDetail-content'>
                        <div>???????????? : {gatheringInfo.gatheringTime}</div>
                        <div>???????????? : {gatheringInfo.numberOfPeople}</div>
                        <div>???????????? : {gatheringInfo.shape}</div>
                        {gatheringInfo.place?<div>???????????? : {gatheringInfo.place}</div>:<div/>}
                        <textarea type='text' readOnly='true' value={gatheringInfo.content} className='gatheringDetail-contents'/>
                    </div>
                    <div className='gatheringMap' id='gatheringMap'>ONLINE ??? ????????? ???????????? ????????????.</div>    
                </div>
                <div className='gatheringMemberList'>
                    <div className='gatheringMemberList-title'>?????? ??????</div>
                    {memberList}
                </div>
                <div>
                    {join===null?
                        <div className='update_delete-btn-box'>
                            <Link className='gatheringJoinBtn' to={`/StudyRoom/${Id}/UpdateGathering/${gatheringId}`}>
                                ??????
                            </Link>

                            <div className='gatheringJoinBtn' onClick={deleteGathering}>
                                ??????
                            </div>                            
                        </div>

                    :
                        join?
                            <div className='gatheringJoinBtn' onClick={
                                async () => {
                                    await api.gatheringJoinCancel(gatheringId)
                                    const res = await api.gatheringDetail(gatheringId)
                                    setjoin(res.apply)
                                    const member = await api.gatheringJoinMember(gatheringId)
                                    const list = []
                                    member.map((member, index) => {
                                        list.push(
                                            <div className='gatheringMember' key={index}>
                                                {member.image?<img src={member.image.thumbnailImage}/>:<div></div>}
                                                {member.nickName}
                                            </div>
                                        )
                                    })
                                    setmemberList(list)                                

                                }
                            }>?????? ??????</div>
                        :
                            <div className='gatheringJoinBtn' onClick={
                                async () => {
                                    await api.gatheringJoin(gatheringId)
                                    const res = await api.gatheringDetail(gatheringId)
                                    setjoin(res.apply)
                                    const member = await api.gatheringJoinMember(gatheringId)
                                    const list = []
                                    member.map((member, index) => {
                                        list.push(
                                            <div className='gatheringMember' key={index}>
                                                {member.image?<img src={member.image.thumbnailImage}/>:<div></div>}
                                                {member.nickName}
                                            </div>
                                        )
                                    })
                                    setmemberList(list)
                                }
                            }>?????? ??????</div>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default GatheringDetail
