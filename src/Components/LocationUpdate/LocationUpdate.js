import React, {useState} from 'react'
import axios from 'axios'

import './LocationUpdate.css'
import api from '../../API'

function LocationUpdate(props) {

    const [SearchMap, setSearchMap] = useState()
    const [Maplist, setMaplist] = useState([])
    const [updated_code, setupdated_code] = useState()
    const [updated_location, setupdated_location] = useState()
    var maplist = []

    const btnC = async() => {
        api.searchLocation2(SearchMap)
        maplist=[];
        axios({
            method:'get',
            url:'https://dapi.kakao.com/v2/local/search/address.json?query='+SearchMap,
            headers: {
                Authorization:'KakaoAK 9a9a02eedbe752442e4a7550ec217f88'
            }
        })
        .then(res => {
            
            console.log(SearchMap);
            console.log(res.data);
            var key_code;
            for(let i=0 ; i<res.data.documents.length; i++){
                if(res.data.documents[i].address.h_code){
                    key_code = res.data.documents[i].address.h_code;
                }
                else{
                    key_code = res.data.documents[i].address.b_code;
                }
                maplist.push(
                    <div className="localName-box">
                        <a className="localName" key={key_code} onClick={
                            (e) => {
                                if(res.data.documents[i].address.h_code){
                                    setupdated_code(res.data.documents[i].address.h_code)
                                }
                                else{
                                    setupdated_code(res.data.documents[i].address.b_code)
                                }
                                setupdated_location(res.data.documents[i].address_name)
                            }
                        }>
                            {res.data.documents[i].address_name}
                        </a>
                    </div>
                )
            }
            console.log(maplist);
            setMaplist(maplist)
        })
    }

    const updateHandler = async () => {
        let id = await api.searchLocation(updated_code)
        console.log(id);
        api.updateLocation(id)
        console.log(updated_code);
        props.history.push('/MyPage')
    }

    return (
        <div>
            <div className="LocationUpdate">
                <div className="LocationContents">
                    <div className='modalTitle'>지역 수정</div>
                    <div className='LocationSearch-box'>
                        <input type="text" className="LocationNameInput" placeholder="주소" onChange={
                            function(e){
                                setSearchMap(e.target.value)
                        }}/>
                        <div className='LocationSearchBtn' onClick={btnC}>검색</div>
                    </div>        
                    <div className="maplist">{Maplist}</div>
                    <div>{updated_location}</div>
                    <a className="Location-updateBtn" onClick={updateHandler}>수정</a>
                </div>
            </div>
        </div>
    )
}

export default LocationUpdate
