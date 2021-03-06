import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer'

import './KakaoMap.css';
import api from '../../API'
const { kakao }  = window




function KakaoMap (props) {

    const [scrollRef, inView] = useInView();
    const page = useRef(0)
    const list = useRef([])

    const [SearchMap, setSearchMap] = useState()
    var maplist = []
    
    const [Maplist, setMaplist] = useState([])

    const selectedLen = useRef(126.633000);
    const selectedLet = useRef(37.373832);
    const selectedLocation = useRef('');

    const btnC = async() => {
        const res = await api.searchLocation(SearchMap, page.current)
        maplist=[];
        for(let i=0 ; i<res.length; i++){
            let location_name =  res[i].city + " " + res[i].gu + " " + res[i].dong
            maplist.push(
                <div className="localName-box" key={res[i].code+"box"}>
                    <div className="localName" key={res[i].code} onClick={
                        (e) => {
                            props.setselectedLocationCode(res[i].code)
                            selectedLocation.current=location_name
                            selectedLen.current=res[i].len
                            selectedLet.current=res[i].let
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
        }
    }, [inView])

    useEffect(() => {
        const mapContainer = document.getElementById('selectedMap')
        const mapOptions = {
            center: new kakao.maps.LatLng(selectedLet.current, selectedLen.current),
            level: 5,
            draggable: false,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
    }, [selectedLet.current, selectedLen.current])

    const nextPage = () => {
        page.current = page.current+1
    }

    return (
        <div className='map'> 
            <div className="leftMap">
                <div className='LocationSearch-box'>
                    <input type="text" className="LocationNameInput" placeholder="??????" onChange={
                        function(e){
                            setSearchMap(e.target.value)
                    }}/>
                    <div className='LocationSearchBtn' onClick={
                        ()=>{
                            document.getElementById('mapList').scrollTo({top:0})
                            page.current = 0
                            list.current = []
                            btnC()
                        }}>??????</div>
                </div>
                
                <div className="maplist" id="mapList">
                    {Maplist}
                    <div ref={scrollRef}/>    
                </div>
                <div className="selectedLocation">????????? ?????? : {selectedLocation.current}</div>
            </div>
            <div className="rightMap">
                <div className='selectedMap' id='selectedMap'/>
            </div>
        </div>
    )
}

export default KakaoMap
