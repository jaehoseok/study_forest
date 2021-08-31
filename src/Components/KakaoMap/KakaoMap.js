import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer'

import './KakaoMap.css';
import api from '../../API'
const { kakao }  = window




function KakaoMap(props) {

    const [scrollRef, inView] = useInView();
    const page = useRef(0)
    const list = useRef([])

    const [SearchMap, setSearchMap] = useState()
    var maplist = []
    
    const [Maplist, setMaplist] = useState([])
    const [seletedLocation, setseletedLocation] = useState('')

    const btnC = async() => {
        const res = await api.searchLocation(SearchMap)
        console.log(res);
        maplist=[];
        for(let i=0 ; i<res.length; i++){
            let location_name =  res[i].city + " " + res[i].gu + " " + res[i].dong
            maplist.push(
                <div className="localName-box">
                    <div className="localName" key={res[i].code} onClick={
                        (e) => {
                            props.setseletedLocationCode(res[i].code)
                            setseletedLocation(location_name)
                        }
                    }>
                        {location_name}
                    </div>
                </div>
            )
        }
        list.current = [...list.current, ...maplist]
        setMaplist(list.current)
    }

    useEffect(() => {
        if(list.current != [] && inView && SearchMap){
            nextPage()
            btnC()
            console.log('scroll end');
        }
    }, [inView])

    const nextPage = () => {
        page.current = page.current+1
    }

    return (
        <div className='map'> 
            <div>
                <div className='LocationSearch-box'>
                    <input type="text" className="LocationNameInput" placeholder="주소" onChange={
                        function(e){
                            setSearchMap(e.target.value)
                    }}/>
                    <div className='LocationSearchBtn' onClick={
                        ()=>{
                            document.getElementById('mapList').scrollTo({top:0})
                            page.current = 0
                            list.current = []
                            btnC()
                        }}>검색</div>
                </div>
                
                <div className="maplist" id="mapList">
                    {Maplist}
                    <div ref={scrollRef}/>    
                </div>
                <div>{seletedLocation}</div>
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default KakaoMap
