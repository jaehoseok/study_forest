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
            <Link className='MyStudy-box' key={study.id} to={`/StudyRoom/${study.id}/GatheringHome`}>제목: {study.name}</Link>
        )
        setmyStudyList(list)
    }, [res])

    return (
        <div className='MyStudy'>
            {myStudyList}
        </div>
    )
}

export default MyStudy
