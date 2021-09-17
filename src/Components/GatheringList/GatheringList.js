import React, {useEffect, useState} from 'react'

import './GatheringList.css'

import api from '../../API'

import GatheringSide from '../GatheringSide/GatheringSide';
import {Link} from 'react-router-dom'

function GatheringList(props) {

    const [gatheringList, setgatheringList] = useState()

    useEffect(async () => {
        const res = await api.Gatherings(props.match.params.Id)
        const list = [];

        res.map((gathering, index) => {
            list.push(
                <tr key={index} className='gatheringItem'>
                    <td>날짜 : {gathering.gatheringTime}</td>
                    <td>현재 인원 : {gathering.numberOfPeople}</td>
                    <td>모임 방법 : {gathering.shape}</td>
                    <td><Link to={`/StudyRoom/${props.match.params.Id}/GatheringDetail/${gathering.id}`}className='attendBtn'>상세</Link></td>
                </tr>
            )
        })

        setgatheringList(list)
    }, [])


    return (
        <div className='GatheringList'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>
            
            <div>
                <div className='gatheringTitle'>모임</div>
                <div className='gatheringList-content'>
                    <table>
                        <tbody>
                            {gatheringList}
                        </tbody>
                    </table>     
                </div>
            </div>

        </div>
    )
}

export default GatheringList
