import React, {useEffect} from 'react'

import './KakaoMap.css';

const { kakao }  = window


function KakaoMap() {
    
    var geocoder = new kakao.maps.services.Geocoder();

    
    useEffect(() => {
        var container = document.getElementById("map");
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };

        // 맵 생성
        var map = new kakao.maps.Map(container, options);


        // 마커를 생성
        var marker = new kakao.maps.Marker(),infowindow = new kakao.maps.InfoWindow({zindex:1});
        
        // 맵 클릭시 이벤트 처리
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            searchAddrFromCoords(mouseEvent.latLng, function(result, status){
                    var addr;
                    for(var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                            addr = result[i].address_name;
                            break;
                        }
                    }

                    var content =   '<div className="hAddr">' +
                                        '<div className="title">행정동 주소</div>'+
                                        '<div>' + addr + '</div>' + 
                                    '</div>';

                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);
                    infowindow.setContent(content);
                    infowindow.open(map, marker);

                    //TODO 서버로 보내줄 좌표
                    console.log(mouseEvent.latLng);
                
            })
            
        });
    }, [])

    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    return (
        <div>
            <div id="map" className="map"></div>
        </div>
    )
}

export default KakaoMap
