import React, {useEffect, useState} from 'react'
import './LandingPage.css';

import SearchMenu from '../SearchMenu/SearchMenu'
import Paging from '../Paging/Paging'

import api from '../../API'


function LandingPage() {
    const [studyList, setstudyList] = useState([])
    const [blockNum, setblockNum] = useState(0)
    const [currPage, setcurrPage] = useState(1)
    const [maxPage, setmaxPage] = useState(0)

    useEffect(async () => {
        let res = await api.searchStudy()
        let study = res.content
        let studyList = [];

        for(let i=0; i<study.length ;i++){
            let img;

            if(study[i].image != null){
                img=study[i].image.thumbnailImage
            }
            else{
                img=null
            }
            studyList.push(
                <div className='study'>
                    <div className='img-box'>
                        <img className='study-img' src={img}/>
                    </div>
                    
                    <div className='title-box'>
                        제목 : {study[i].name}
                        <div>
                            관심태그 : {study[i].studyTags}
                        </div>
                    </div>
                    
                </div>
            )
        }
        setstudyList(studyList)
        setmaxPage(study.totalPages)
    }, [])

    let pageLimit='10'


    const firstPage = () => {
        setblockNum(0)
        setcurrPage(1)
    }

    const lastPage = () => {
        setblockNum(Math.ceil(maxPage/pageLimit)-1)
        setcurrPage(maxPage)
    }

    const prevPage = () => {
        if(currPage <= 1){
            return
        }
        if((currPage-1) <= pageLimit * blockNum){
            setblockNum(n=>n-1)
        }
        setcurrPage(n => n-1)
    }

    const nextPage = () => {
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
        list.push(<div className='pageBtn' onClick={
            () => {
                setcurrPage(i)
            }
        }>{i}</div>)
    }
    
    return (
        <div className='landingPage'>
            <SearchMenu/>
            {studyList}
            <div className='page'>
                <h1>currPage: {currPage}</h1>
                <div className='pageBtn-box'>
                    <div className='pageBtn' onClick={firstPage}>&lt;&lt;</div>
                    <div className='pageBtn' onClick={prevPage}>&lt;</div>
                        {list}
                    <div className='pageBtn' onClick={nextPage}>&gt;</div>
                    <div className='pageBtn' onClick={lastPage}>&gt;&gt;</div>
                </div>
            </div>
            
            
        </div>
    )
}

export default LandingPage
