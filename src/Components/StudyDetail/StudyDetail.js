import React, {useEffect, useState} from 'react'

import './StudyDetail.css'

import api from '../../API';

function StudyDetail(props) {
    const [POST, setPOST] = useState([])
    const [cate, setcate] = useState()

    useEffect(async () => {
        let res = await api.studyDetail(props.match.params.Id)
        let studyInfo = {
            name: res.name,
            content: res.content,
            currentNumberOfPeople: res.currentNumberOfPeople,
            location: res.location.city + res.location.gu + res.location.dong,
            parentCategory: res.parentCategory.name,
            childCategory: res.childCategory.name,
            studyTags: res.studyTags
        }
        console.log(res);
        setPOST(studyInfo)
        setcate(res.parentCategory)
        console.log(POST);
    }, [])

    return (
        <div>
            {POST.name}
            {POST.content}
            {/* {cate.name} */}
            {/* {POST.childCategory.id} */}
            {POST.location}
            {POST.studyTags}
        </div>
    )
}

export default StudyDetail
