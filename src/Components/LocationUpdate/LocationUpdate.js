import React, {useState, useEffect, useCallback, useRef} from 'react'
import axios from 'axios'

import './LocationUpdate.css'
import api from '../../API'

function LocationUpdate(props) {

    const [SearchMap, setSearchMap] = useState()
    const [Maplist, setMaplist] = useState([])
    const [updated_code, setupdated_code] = useState()
    const [updated_location, setupdated_location] = useState()
    const [currPage, setcurrPage] = useState(0)
    const [fetching, setfetching] = useState(false)
    var maplist = []

    const rootRef = useRef();
    const scrollRef = useRef();

    const btnC = async() => {
        setfetching(true)
        console.log('currPage=',currPage);
        console.log(SearchMap);
        const res = await api.searchLocation(SearchMap, currPage)
        maplist=[]
        for(let i=0 ; i<res.length; i++){
            let location_name =  res[i].city + " " + res[i].gu + " " + res[i].dong
            maplist.push(
                <div className="localName-box">
                    <div className="localName" key={res[i].id} onClick={
                        (e) => {
                            setupdated_code(res[i].id)
                            setupdated_location(location_name)
                        }
                    }>
                        {location_name}
                    </div>
                </div>
            )
        }
        setMaplist((prev) => [...prev, ...maplist])
        setfetching(false)
    }

    // useEffect(() => {
    //     document.getElementById('mapList').addEventListener('scroll', _infiniteScroll)
    //     return () => {
    //         document.getElementById('mapList').addEventListener('scroll', _infiniteScroll)
    //     }
    // }, [])
    
    // const _infiniteScroll = () => {
    //     let scrollHeight = document.getElementById('mapList').scrollHeight
    //     let scrollTop = document.getElementById('mapList').scrollTop
    //     let clientHeight = document.getElementById('mapList').clientHeight

    //     if(scrollTop + clientHeight >= scrollHeight && fetching===false) {
    //         setcurrPage(n => n+1)
    //         btnC()
    //     }
    // }

    const useInfineteScroll= ({
        root,
        target,
        onIntersect,
        threshold = 0,
        rootMargin = '0px'
    }) => {
        useEffect(() => {
            const observer = new IntersectionObserver(onIntersect, {
                root,
                rootMargin,
                threshold
            });
            if(!root){
                return
            }
            if(!target){
                return
            }
            observer.observe(target);
            return () => {
                observer.unobserve(target)
            }
        }, [target, root, rootMargin, onIntersect, threshold])
    }

    useInfineteScroll({
        rootRef,
        scrollRef,
        onIntersect: ([{isIntersecting}]) => {
            if(isIntersecting){
                console.log('스크롤끝');
                //btnC();
            }
            console.log('dddd');
        }
    })

    // useEffect(() => {
    //     const option = {
    //         root: document.querySelector('scrollArea'),
    //         rootMargin: '0px',
    //         threshold: 1.0
    //     };
    //     const observer = new IntersectionObserver(btnC, option)

    //     if(!scrollRef){
    //         return;
    //     }

    //     observer.observe(scrollRef)
        
    //     return () => observer.unobserve(scrollRef)
    // }, [scrollRef])
    
    // const checkIntersect = ([entry], observer) => {
    //     if(entry.isIntersecting){
    //         // eslint-disable-next-line no-unused-expressions
    //         async () => {
    //             observer.unobserve(entry.target);
    //             await btnC();
    //             observer.observe(entry.target);
    //         }
    //     }
    // }
    // const scrollUpdateContent = useCallback(async() => {
    //     await nextPage()
    //     const res = await api.searchLocation(SearchMap, currPage)
    //     maplist=Maplist;
    //     for(let i=0 ; i<res.length; i++){
    //         let location_name =  res[i].city + " " + res[i].gu + " " + res[i].dong
    //         maplist.push(
    //             <div className="localName-box">
    //                 <div className="localName" key={res[i].id} onClick={
    //                     (e) => {
    //                         setupdated_code(res[i].id)
    //                         setupdated_location(location_name)
    //                     }
    //                 }>
    //                     {location_name}
    //                 </div>
    //             </div>
    //         )
    //     }
    //     setMaplist(maplist)
    // }, [currPage, Maplist]);


    // useEffect(() => {
    //     document.getElementById('mapList').addEventListener('scroll', _infiniteScroll, true)
    //     return () => document.getElementById('mapList').removeEventListener('scroll', _infiniteScroll, true)
    // }, [_infiniteScroll])

    const updateHandler = async () => {
        api.updateLocation(updated_code)
        console.log(updated_code);
        props.history.push('/MyPage')
    }

    return (
        <div>
            <div className="LocationUpdate">
                <div className="LocationContents">
                    <div className='modalTitle' >지역 수정</div>
                    <div className='LocationSearch-box'>
                        <input type="text" className="LocationNameInput" placeholder="주소" onChange={
                            async (e) => {
                                await setSearchMap(e.target.value)
                                
                        }}/>
                        <div className='LocationSearchBtn' onClick={
                            async () => {
                                //await setMaplist([])
                                await setcurrPage(0)
                                await btnC()
                        }}>검색</div>
                    </div>
                    <div>
                        <div className="maplist" id="mapList" ref={rootRef}>
                            {Maplist}
                            <div ref={scrollRef} className='scrollRef'/>
                        </div>
                        
                    </div>
                        
                        
                    <div className="selectedLocationName">선택된 주소 : {updated_location}</div>
                    <a className="Location-updateBtn" onClick={updateHandler}>수정</a>
                </div>
            </div>
        </div>
    )
}

export default LocationUpdate
