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

    const selectedLen = useRef();
    const selectedLet = useRef();
    const selectedLocation = useRef();

    // useEffect(() => {
    //     if(props.len && props.let && props.selectedLocation){
    //         selectedLen.current = props.len
    //         selectedLet.current = props.let
    //         selectedLocation.current = props.selectedLocation
            
    //     }
    //     console.log(props.len, props.let, props.selectedLocation);
    // }, [])

    const btnC = async() => {
        const res = await api.searchLocation(SearchMap, page.current)
        console.log(res);
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
            console.log('scroll end');
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
                <div className="selectedLocation">선택된 주소 : {selectedLocation.current}</div>
            </div>
            <div className="rightMap">
                <div className='selectedMap' id='selectedMap'></div>
            </div>
        </div>
    )
}

export default KakaoMap
