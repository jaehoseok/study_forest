import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import './LandingPage.css';

import SearchMenu from '../SearchMenu/SearchMenu'
import {VerticalRightOutlined, LeftOutlined, RightOutlined, VerticalLeftOutlined} from '@ant-design/icons'

import api from '../../API'


function LandingPage() {
    const [studyList, setstudyList] = useState([])
    const [blockNum, setblockNum] = useState(0)
    const [currPage, setcurrPage] = useState(1)
    const [maxPage, setmaxPage] = useState(0)
    const [filter, setfilter] = useState({
        online: true,
        offline: true,
        searchKeyword: "",
        categoryId: '',
    })

    useEffect(async () => {
        let res = await api.searchStudy(currPage, filter)
        handleContent(res.content)
        setmaxPage(res.totalPages)
        console.log(filter);
    }, [currPage])

    const handleContent = (content) => {
        let study = content
        let list = [];
        
        study.map((study, index) => {
            let img;
            let tagList = [];

            if(study.image != null){
                img=study.image.thumbnailImage
            }
            else{
                img=null
            }
            for(let i = 0 ; i<3 ; i++){
                if(study.studyTags[i]){
                    tagList.push(
                        <div className='Landing-tagName' key={study.name +" "+ i}>{study.studyTags[i]}</div>
                    )                    
                }
            }

            list.push(
                <Link className='study' key={index} to={`/StudyDetail/${study.id}`} id={study.id}>
                    <div className='img-box'>
                        <img className='study-img' src={img}/>
                    </div>
                    
                    <div className='title-box'>
                        제목 : {study.name}
                        <div>
                            관심태그 : {tagList}
                        </div>
                    </div>
                    
                </Link>
            )            
        })
        setstudyList(list)
    }

    let pageLimit='10'


    const firstPage = (e) => {
        setblockNum(0)
        setcurrPage(1)
    }

    const lastPage = (e) => {
        setblockNum(Math.ceil(maxPage/pageLimit)-1)
        setcurrPage(maxPage)
    }

    const prevPage = (e) => {
        if(currPage <= 1){
            return
        }
        if((currPage-1) <= pageLimit * blockNum){
            setblockNum(n=>n-1)
        }
        setcurrPage(n => n-1)
    }

    const nextPage = (e) => {
        if(currPage >= maxPage){
            return
        }
        if(pageLimit * Number(blockNum + 1 ) < Number(currPage + 1)){
            setblockNum(n => n+1)
        }
        setcurrPage(n => n+1)
    }
    const pstart = Number(pageLimit * blockNum) + Number(1)
    let pcount;
    if((Number(pageLimit*blockNum)+Number(pageLimit))>maxPage){
        pcount = maxPage;
    }
    else {
        pcount = Number(pageLimit * blockNum) + Number(pageLimit)
    }

    const list = [];
    for(let i = pstart ; i <= pcount ; i++){
        list.push(<div className='pageBtn' key={i} onClick={
            async (e) => {
                setcurrPage(i)
            }
        }>{i}</div>)
    }
    
    return (
        <div className='landingPage'>
            <SearchMenu filter={filter} setfilter={setfilter} handleContent={handleContent} setmaxPage={setmaxPage}/>
    
            <div className='study-content'>
                {studyList}
            </div>

            <div className='btn-space'>
                <Link className='makeStudyBtn' to='/MakeStudy'>스터디 만들기</Link>
            </div>
            
            <div className='page'>
                <div className='pageBtn-box'>
                    <div className='pageBtn' onClick={firstPage}><VerticalRightOutlined /></div>
                    <div className='pageBtn' onClick={prevPage}><LeftOutlined /></div>
                    {list}
                    <div className='pageBtn' onClick={nextPage}><RightOutlined /></div>
                    <div className='pageBtn' onClick={lastPage}><VerticalLeftOutlined /></div>
                </div>
                
            </div>
            
            
        </div>
    )
}

export default LandingPage
