import React, {useEffect, useState} from 'react'

import './StudyDetail.css'

import api from '../../API';

function StudyDetail(props) {
    const [POST, setPOST] = useState([])
    const [clickBtn, setclickBtn] = useState()

    useEffect(async () => {
        let res = await api.studyDetail(props.match.params.Id)
        let studyForm;

        if(res.online===res.offline===true){
            studyForm = '온라인 & 오프라인'
        }
        else if(res.online===true && res.offline===false){
            studyForm = '온라인'
        }
        else {
            studyForm = '오프라인'
        }

        if(res.image){
            let studyInfo = {
                id: res.id,
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
        }
        else {
            let studyInfo = {
                id: res.id,
                name: res.name,
                content: res.content,
                currentNumberOfPeople: res.currentNumberOfPeople,
                numberOfPeople: res.numberOfPeople,
                location: res.location.city +' '+ res.location.gu +' '+ res.location.dong,
                parentCategory: res.parentCategory.name,
                childCategory: res.childCategory.name,
                studyTags: res.studyTags,
                studyForm: studyForm,
                apply: res.apply,
                status: res.status==='OPEN' ? true : false
            }
            setPOST(studyInfo)
        }
        
    }, [clickBtn])

    const applyBtn = () => {

        if(POST.status===true){
            if(POST.apply===null){
                return <a>이미 가입된 스터디</a>
            }
            else if(POST.apply===true){
                return <a className='applyCancelBtn' key='지원취소' onClick={
                    async (e) => {
                        await api.applyCancelStudy(POST.id)
                        setclickBtn(e.target)
                    }
                }>지원취소</a>
            }
            else if(POST.apply===false){
                return <a className='applyBtn' key='지원가능' onClick={
                    async (e) => {
                        await api.applyStudy(POST.id)
                        setclickBtn(e.target)
                    }
                }>지원가능</a>
            }
        }
        else if(POST.status===false){
            return <a className='canNotBtn'>지원 불가능</a>
        }
    }

    return (
        <div className='StudyDetail'>
            <div className='StudyDetail-TOP'>
                <div>제목 : {POST.name}</div>
                <div>주제 : {POST.parentCategory}/{POST.childCategory}</div>
                <div>인원 : {POST.currentNumberOfPeople} / {POST.numberOfPeople}</div>
                <div>위치 : {POST.location}</div>
                <div>내용 : {POST.content}</div>
                <div>해시태그 : {POST.studyTags}</div>
                <div>모임 형태 : {POST.studyForm}</div>
            </div>
            
            <img className='StudyDetail-IMAGE' src={POST.thumbnailImage}/>

            <div className='StudyDetailBtn-box'>
                {applyBtn()}
            </div>
        </div>
    )
}

export default StudyDetail
