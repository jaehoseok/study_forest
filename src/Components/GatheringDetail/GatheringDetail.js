import React, {useEffect, useState} from 'react'

import './GatheringDetail.css';

import GatheringSide from '../GatheringSide/GatheringSide';

import api from '../../API'
const {kakao} = window;

function GatheringDetail(props) {

    const [gatheringInfo, setgatheringInfo] = useState([])
    const [join, setjoin] = useState()
    const [memberList, setmemberList] = useState([])

    useEffect(async () => {
        const res = await api.gatheringDetail(props.match.params.gatheringId)
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
        console.log(info);
        setgatheringInfo(info)
        setjoin(res.apply)
    }, [])

    useEffect(async () => {
        const res = await api.gatheringJoinMember(props.match.params.gatheringId)
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

    return (
        <div className='GatheringDetail'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            <div className='gatheringDetail-body'>
                <div className='gatheringDetail-box'>
                    <div className='gatheringDetail-content'>
                        <div>모임시간 : {gatheringInfo.gatheringTime}</div>
                        <div>현재인원 : {gatheringInfo.numberOfPeople}</div>
                        <div>모임형태 : {gatheringInfo.shape}</div>
                        {gatheringInfo.place?<div>장소이름 : {gatheringInfo.place}</div>:<div/>}
                        <textarea type='text' readOnly='true' value={gatheringInfo.content}/>
                    </div>
                    <div className='gatheringMap' id='gatheringMap'>ONLINE 은 지도를 지원하지 않습니다.</div>    
                </div>
                <div className='gatheringMemberList'>
                    <div className='gatheringMemberList-title'>참여 인원</div>
                    {memberList}
                </div>
                <div>
                    {join===null?
                        <div>
                            <div className='gatheringJoinBtn'>
                                수정
                            </div>

                            <div className='gaatheringJoinBtn'>
                                삭제
                            </div>                            
                        </div>

                    :
                        join?
                            <div className='gatheringJoinBtn' onClick={
                                async () => {
                                    await api.gatheringJoinCancel(props.match.params.gatheringId)
                                    const res = await api.gatheringDetail(props.match.params.gatheringId)
                                    setjoin(res.apply)
                                    const member = await api.gatheringJoinMember(props.match.params.gatheringId)
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
                            }>참가취소</div>
                        :
                            <div className='gatheringJoinBtn' onClick={
                                async () => {
                                    await api.gatheringJoin(props.match.params.gatheringId)
                                    const res = await api.gatheringDetail(props.match.params.gatheringId)
                                    setjoin(res.apply)
                                    const member = await api.gatheringJoinMember(props.match.params.gatheringId)
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
                            }>참가하기</div>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default GatheringDetail
