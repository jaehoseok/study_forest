import React,{useEffect, useState, useMemo, useRef} from 'react'

import GatheringSide from '../GatheringSide/GatheringSide';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import {ko} from 'date-fns/esm/locale';

import Select from 'react-select'

import 'bootstrap/dist/css/bootstrap.min.css';
import './MakeGathering.css';
import api from '../../API.js'
import KakaoMap from '../KakaoMap/KakaoMap';

const {kakao} = window;



function MakeGathering(props) {

    const [gatheringDate, setgatheringDate] = useState(new Date())
    const [gatheringTime, setgatheringTime] = useState()
    const [form, setform] = useState()
    const [Len, setLen] = useState()
    const [Let, setLet] = useState()
    const [contents, setcontents] = useState()
    const [placeName, setplaceName] = useState()

    const T = useRef('00');
    const m = useRef('00');
    


    useEffect(async () => {
        const locationRes = await api.location(window.sessionStorage.getItem('locationId'))
        const mapContainer = document.getElementById('gathering-map')
        const mapOptions = {
            center: new kakao.maps.LatLng(locationRes.let, locationRes.len),
            level: 3,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
        setLen(locationRes.len)
        setLet(locationRes.let)

        var marker = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter() 
        }); 
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng; 
            
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            
            setLen(latlng.getLng())
            setLet(latlng.getLat())
            
            console.log(Len, Let);
        });
    }, [])

    const meetHour = [
        {label: '01', value: '01'},
        {label: '02', value: '02'},
        {label: '03', value: '03'},
        {label: '04', value: '04'},
        {label: '05', value: '05'},
        {label: '06', value: '06'},
        {label: '07', value: '07'},
        {label: '08', value: '08'},
        {label: '09', value: '09'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'},
        {label: '19', value: '19'},
        {label: '20', value: '20'},
        {label: '21', value: '21'},
        {label: '22', value: '22'},
        {label: '23', value: '23'},
        {label: '24', value: '24'},        
    ]

    const meetMinute = [
        {label: '00', value: '00'},
        {label: '01', value: '01'},
        {label: '02', value: '02'},
        {label: '03', value: '03'},
        {label: '04', value: '04'},
        {label: '05', value: '05'},
        {label: '06', value: '06'},
        {label: '07', value: '07'},
        {label: '08', value: '08'},
        {label: '09', value: '09'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'},
        {label: '19', value: '19'},
        {label: '20', value: '20'},
        {label: '21', value: '21'},
        {label: '22', value: '22'},
        {label: '23', value: '23'},
        {label: '24', value: '24'},
        {label: '25', value: '25'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '28', value: '28'},
        {label: '29', value: '29'},
        {label: '30', value: '30'},
        {label: '31', value: '31'},
        {label: '32', value: '32'},
        {label: '33', value: '33'},
        {label: '34', value: '34'},
        {label: '35', value: '35'},
        {label: '36', value: '36'},
        {label: '37', value: '37'},
        {label: '38', value: '38'},
        {label: '39', value: '39'},
        {label: '40', value: '40'},
        {label: '41', value: '41'},
        {label: '42', value: '42'},
        {label: '43', value: '43'},
        {label: '44', value: '44'},
        {label: '45', value: '45'},
        {label: '46', value: '46'},
        {label: '47', value: '47'},
        {label: '48', value: '48'},
        {label: '49', value: '49'},
        {label: '50', value: '50'},
        {label: '51', value: '51'},
        {label: '52', value: '52'},
        {label: '53', value: '53'},
        {label: '54', value: '54'},
        {label: '55', value: '55'},
        {label: '56', value: '56'},
        {label: '57', value: '57'},
        {label: '58', value: '58'},
        {label: '59', value: '59'},
        {label: '60', valuy: '60'},
    ]

    const customStyles = useMemo(
        () => ({
            option:(provided) => ({
                ...provided,

            }),
            control: (provided) => ({
                ...provided,
                border: '2px solid black',
                height: '38px',
                color: 'black',
            })
        })
    )

    const study_form = [
        {label: '온라인', value: 'ONLINE'},
        {label: '오프라인', value: 'OFFLINE'},
    ]

    const handleMakeGathering = async () => {
        const gatheringTime=gatheringDate.getFullYear().toString()+'-'+(gatheringDate.getMonth()+1).toString().padStart(2, '0')+'-'+gatheringDate.getDate().toString().padStart(2, '0')+'T'+T.current+":"+m.current+":00"
        
        const ReqBody = {
            gatheringTime: gatheringTime,
            shape: form,
            content: contents,
            placeName: placeName,
            let: Let,
            len: Len,
        }

        await api.makeGathering(props.match.params.Id, ReqBody)
        props.history.push('/StudyRoom/'+props.match.params.Id)
    }


    return (
        <div className="MakeGathering">
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            

            <div>
                <div className='MakeGathering-title'>모임 생성</div>
                <div className='MakeGathering-box'>
                    <div className='time-box'>
                        <DatePicker 
                            selected={gatheringDate}
                            onChange={date => {
                                setgatheringDate(date)
                            }}
                            locale={ko}
                            dateFormat='yyyy-MM-dd'
                            format='yyyy-MM-dd'
                            className='datePicker'
                            selected={gatheringDate}
                            minDate={new Date()}
                        />
                        <div className='timePicker'>
                            <Select options={meetHour} className='col-md-3' placeholder='시'
                            onChange={(e) => T.current=e.value}/>

                            <Select options={meetMinute} className='col-md-3' placeholder='분'
                            onChange={(e) => m.current=e.value}/>
                        </div>
                    </div>

                    <div>
                        <Select options={study_form} className='col-md-5' placeholder='공부형태'
                        onChange={(e) => {setform(e.value)}}/>
                    </div>

                    <textarea type='text' className='make-gathering-contents'
                    onChange={(e) => setcontents(e.target.value)}/>

                    <div className='gathering-map-box'>
                        <div className='gathering-map' id='gathering-map'/>
                    </div>
                    
                    <div className='place-input'>
                        <input type='text' placeholder='상세 장소 이름'
                        onChange={(e) => setplaceName(e.target.value)}/>
                    </div>
                    


                    <button onClick={()=>{
                        handleMakeGathering()
                        }}>모임생성</button>     
                </div>
            </div>
        </div>

        
    )
}

export default MakeGathering
