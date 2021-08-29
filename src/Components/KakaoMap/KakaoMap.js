import axios from 'axios';
import React, {useState, useEffect} from 'react'

import './KakaoMap.css';
import api from '../../API'
const { kakao }  = window




function KakaoMap(props) {
    
    var geocoder = new kakao.maps.services.Geocoder();
    const [SearchMap, setSearchMap] = useState()
    var maplist = []
    var map
    var marker
    var container
    var options
    
    const [Maplist, setMaplist] = useState([])
    const [seletedLocation, setseletedLocation] = useState('')

    
    // useEffect(() => {
    //     container = document.getElementById("map");
    //     options = {
    //         center: new kakao.maps.LatLng(37.4363375149834,126.798039582132),
    //         level: 3
    //     };

    //     // 맵 생성
    //     map = new kakao.maps.Map(container, options);


    //     // 마커를 생성
    //     marker = new kakao.maps.Marker()
    //     var infowindow = new kakao.maps.InfoWindow({zindex:1});
        
    //     // 맵 클릭시 이벤트 처리
    //     kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    //         searchAddrFromCoords(mouseEvent.latLng, function(result, status){
    //                 var addr; //주소
    //                 var Hcode; //행정동코드
    //                 var Bcode; //법정동코드

    //                 for(var i = 0; i < result.length; i++) {
    //                     // 행정동의 region_type 값은 'H' 이므로
    //                     if (result[i].region_type === 'H') {
    //                         addr = result[i].address_name;
    //                         Hcode = result[i].code;
    //                         break;
    //                     }
    //                     if( (result[i].region_type === 'B')){
    //                         Bcode = result[i].code;
    //                     }
    //                 }

    //                 var content =   '<div className="hAddr">' +
    //                                     '<div className="title">행정동 주소</div>'+
    //                                     '<div>' + addr + '</div>' + 
    //                                 '</div>';

    //                 marker.setPosition(mouseEvent.latLng);
    //                 marker.setMap(map);
    //                 infowindow.setContent(content);
    //                 infowindow.open(map, marker);

    //                 //TODO 서버로 보내줄 좌표
                    
    //                 console.log(mouseEvent.latLng);
    //                 console.log('행정동 코드 :' + Hcode);
    //                 console.log('법정동 코드 :' + Bcode);
    //         })
            
    //     });
    // }, [])

        
    // function searchAddrFromCoords(coords, callback) {
    //     // 좌표로 행정동 주소 정보를 요청합니다
    //     geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    // }

    // const btnC = () => {
    //     maplist=[];
    //     axios({
    //         method:'get',
    //         url:'https://dapi.kakao.com/v2/local/search/address.json?query='+encodeURIComponent(SearchMap),
    //         headers: {
    //             Authorization:'KakaoAK 9a9a02eedbe752442e4a7550ec217f88'
    //         }
    //     })
    //     .then(res => {
    //         console.log(res.data.documents);
    //         var key_code;
    //         for(let i=0 ; i<res.data.documents.length; i++){
    //             if(res.data.documents[i].address.h_code){
    //                 key_code = res.data.documents[i].address.h_code;
    //             }
    //             else{
    //                 key_code = res.data.documents[i].address.b_code;
    //             }
    //             maplist.push(
    //                 <div className="localName-box">
    //                     <a className="localName" key={key_code} onClick={
    //                         () => {
    //                             console.log(res.data.documents[i].x);
    //                             console.log(res.data.documents[i].y);
    //                         }
    //                     }>
    //                         {res.data.documents[i].address_name}
    //                     </a>
    //                 </div>
    //             )
    //         }
    //         console.log(maplist);
    //         setMaplist(maplist)
    //     })
    // }


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
        setMaplist(maplist)
    }

    return (
        <div className='map'> 
            <div>
                <div className='LocationSearch-box'>
                    <input type="text" className="LocationNameInput" placeholder="주소" onChange={
                        function(e){
                            setSearchMap(e.target.value)
                    }}/>
                    <div className='LocationSearchBtn' onClick={btnC}>검색</div>
                </div>        
                <div className="maplist">{Maplist}</div>
                <div>{seletedLocation}</div>
            </div>
            <div>
                Map
            </div>
        </div>
    )
}

export default KakaoMap
