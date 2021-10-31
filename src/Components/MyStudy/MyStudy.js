import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './MyStudy.css'

import api from '../../API'

function MyStudy() {
    const [myStudyList, setmyStudyList] = useState([])

    let list = [];
    let res;

    useEffect(async () => {
        res = await api.MyStudy()
        list = res.map((study) =>
            <Link className='MyStudy-box' key={study.id} to={`/StudyRoom/${study.id}/GatheringHome`}>Title: {study.name}</Link>
        )
        setmyStudyList(list)
    }, [res])

    return (
        <div className='MyStudy'>
            <div className='myStudy-header'>&#60;&nbsp;나&nbsp;의&nbsp;&nbsp;&nbsp;스&nbsp;터&nbsp;디&nbsp;&#62;</div>
            {myStudyList}
        </div>
    )
}

export default MyStudy
