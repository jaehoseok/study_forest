import React, {useState} from 'react'

import './Paging.css'

function Paging({maxPage,pageLimit}) {
    const [blockNum, setblockNum] = useState(0)
    const [currPage, setcurrPage] = useState(1)

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
    )
}

export default Paging
