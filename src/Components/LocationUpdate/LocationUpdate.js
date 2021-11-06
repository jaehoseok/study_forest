import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useInView} from 'react-intersection-observer'

import './LocationUpdate.css'
import api from '../../API'

function LocationUpdate(props) {

    const [SearchMap, setSearchMap] = useState()
    const [MapList, setMapList] = useState([])
    const [updated_code, setupdated_code] = useState()
    const [updated_location, setupdated_location] = useState()
    const [currPage, setcurrPage] = useState(0)
    const [fetching, setfetching] = useState(false)
    var maplist = []

    const mapList = useRef([])
    const page = useRef(0);

    const list = useRef([])

    const [scrollRef, inView] = useInView();


    const btnC = async() => {
        setfetching(true)
        const res = await api.searchLocation(SearchMap, page.current)
        maplist=[]
        for(let i=0 ; i<res.length; i++){
            let location_name =  res[i].city + " " + res[i].gu + " " + res[i].dong
            maplist.push(
                <div className="localName-box">
                    <div className="localName" key={'loaction'+res[i].code} onClick={
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
        list.current=[...list.current, ...maplist]
        setMapList(list.current)
        setfetching(false)
    }

    useEffect(() => {
        if(list.current != [] && inView && SearchMap){
            nextPage()
            btnC()
        }
    }, [inView])

    const nextPage = () => {
        page.current = page.current+1
    }

    const updateHandler = async () => {
        api.updateLocation(updated_code)
        props.history.push('/MyPage')
    }



    return (
        <div>
            <div className="LocationUpdate">
                <div className="LocationContents">
                    <div className='location-modalTitle' >지역 수정</div>
                    <div className='LocationSearch-box'>
                        <input type="text" className="LocationNameInput" placeholder="주소" onChange={
                            async (e) => {
                                await setSearchMap(e.target.value)
                                
                        }}/>
                        <div className='LocationSearchBtn' onClick={
                            async () => {
                                document.getElementById('mapList').scrollTo({top:0})
                                list.current=[]
                                page.current=0
                                btnC()
                        }}>검색</div>
                    </div>
                    <div>
                        <div className="maplist" id="mapList" inView={inView}>
                            {MapList}
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
