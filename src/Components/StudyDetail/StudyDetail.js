import React, {useEffect, useState} from 'react'

import './StudyDetail.css'

import {TeamOutlined} from '@ant-design/icons'

import api from '../../API';

function StudyDetail(props) {
    const [POST, setPOST] = useState([])
    const [clickBtn, setclickBtn] = useState()

    useEffect(async () => {
        let res = await api.studyDetail(props.match.params.Id)
        let studyForm;
        let tagList = [];
        let resTags = [];

        if(res.online===res.offline===true){
            studyForm = '온라인 & 오프라인'
        }
        else if(res.online===true && res.offline===false){
            studyForm = '온라인'
        }
        else {
            studyForm = '오프라인'
        }

        if(res.studyTags){
            resTags = res.studyTags
            for(let i=0 ; i<resTags.length ; i++){
                if(res.studyTags[i]){
                    tagList.push(
                        <div className='StudyDetail-tagName' key={res.studyTags[i] +" "+ i}>{res.studyTags[i]}</div>
                    )                    
                }
                else{
                    continue
                }
            }
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
                studyTags: tagList,
                thumbnailImage: res.image.thumbnailImage,
                studyImage:res.image.studyImage,
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
                studyTags: tagList,
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
            
                <img className='StudyDetail-IMAGE' src={POST.studyImage}/>
            

            <div className='StudyDetail-TOP'>
                <div className='StudyDetail-title'>Title : {POST.name}</div>
                <div>
                    <div>Subject : {POST.parentCategory}/{POST.childCategory}</div>
                    <div>Location : {POST.location}</div>
                    <div>Tags : {POST.studyTags}</div>
                    <div>Meeting : {POST.studyForm}</div>
                    <div>Contents : {POST.content}</div>
                </div>
                
                <br/>
                <div className='StudyDetail-member-num'><TeamOutlined style={{fontSize: '30px'}} /> : {POST.currentNumberOfPeople} / {POST.numberOfPeople}</div>
            </div>
            
            

            <div className='StudyDetailBtn-box'>
                {applyBtn()}
            </div>
        </div>
    )
}

export default StudyDetail
