import React, {useEffect, useState} from 'react'

import './StudyDetail.css'

import api from '../../API';

function StudyDetail(props) {
    const [POST, setPOST] = useState([])

    useEffect(async () => {
        let res = await api.studyDetail(props.match.params.Id)
        let studyForm;

        if(res.online===res.offline===true){
            studyForm = '온라인+오프라인'
        }
        else if(res.online===true && res.offline===false){
            studyForm = '온라인'
        }
        else {
            studyForm = '오프라인'
        }

        let studyInfo = {
            name: res.name,
            content: res.content,
            currentNumberOfPeople: res.currentNumberOfPeople,
            numberOfPeople: res.numberOfPeople,
            location: res.location.city +' '+ res.location.gu +' '+ res.location.dong,
            parentCategory: res.parentCategory.name,
            childCategory: res.childCategory.name,
            studyTags: res.studyTags,
            thumbnailImage: res.image.thumbnailImage,
            studyForm: studyForm,
            apply: res.apply,
            status: res.status==='OPEN' ? true : false
        }
        setPOST(studyInfo)
    }, [])

    const case1 = () => {

    }

    return (
        <div className='StudyDetail'>
            <div className='StudyDetail-TOP'>
                <div>제목 : {POST.name}</div>
                <div>주제 : {POST.parentCategory} -> {POST.childCategory}</div>
                <div>인원 : {POST.currentNumberOfPeople} / {POST.numberOfPeople}</div>
                <div>위치 : {POST.location}</div>
                <div>내용 : {POST.content}</div>
                <div>해시태그 : {POST.studyTags}</div>
                <div>모임 형태 : {POST.studyForm}</div>
            </div>
            <img className='StudyDetail-IMAGE' src={POST.thumbnailImage}/>
            <div>
                
            </div>
        </div>
    )
}

export default StudyDetail
