import React,{useEffect, useState, useMemo, useRef} from 'react'
import {useParams} from 'react-router-dom'

import GatheringSide from '../GatheringSide/GatheringSide';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import {ko} from 'date-fns/esm/locale';

import Select from 'react-select'

import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateGathering.css';
import api from '../../API.js'
import KakaoMap from '../KakaoMap/KakaoMap';

const {kakao} = window;



function UpdateGathering(props) {
    const {Id, gatheringId} = useParams()

    const [gatheringDate, setgatheringDate] = useState()
    const [gatheringTime, setgatheringTime] = useState()
    const [form, setform] = useState()
    const [Len, setLen] = useState()
    const [Let, setLet] = useState()
    const [contents, setcontents] = useState('')
    const [placeName, setplaceName] = useState('')

    const T = useRef('00');
    const m = useRef('00');


    useEffect(async () => {
        const res = await api.gatheringDetail(gatheringId)
        //const locationRes = await api.location(window.sessionStorage.getItem('locationId'))

        setcontents(res.content)
        setform(res.shape)
        setplaceName(res.place ? res.place.name : '')
        setgatheringDate(new Date(res.gatheringTime))

        const time = ('0' + new Date(res.gatheringTime).getHours()).slice(-2)
        T.current=time
        const minute = ('0' + new Date(res.gatheringTime).getMinutes()).slice(-2)
        m.current=minute

        const temp_len = res.place ? res.place.len : 0//locationRes.len
        const temp_let = res.place ? res.place.let : 0//locationRes.let
        const mapContainer = document.getElementById('gathering-map')
        const mapOptions = {
            center: new kakao.maps.LatLng(temp_let, temp_len),
            level: 3,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
        setLen(temp_len)
        setLet(temp_let)

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
        });
    }, [])

    const meetHour = [
        {label: '01 시', value: '01'},
        {label: '02 시', value: '02'},
        {label: '03 시', value: '03'},
        {label: '04 시', value: '04'},
        {label: '05 시', value: '05'},
        {label: '06 시', value: '06'},
        {label: '07 시', value: '07'},
        {label: '08 시', value: '08'},
        {label: '09 시', value: '09'},
        {label: '10 시', value: '10'},
        {label: '11 시', value: '11'},
        {label: '12 시', value: '12'},
        {label: '13 시', value: '13'},
        {label: '14 시', value: '14'},
        {label: '15 시', value: '15'},
        {label: '16 시', value: '16'},
        {label: '17 시', value: '17'},
        {label: '18 시', value: '18'},
        {label: '19 시', value: '19'},
        {label: '20 시', value: '20'},
        {label: '21 시', value: '21'},
        {label: '22 시', value: '22'},
        {label: '23 시', value: '23'},
        {label: '24 시', value: '24'},        
    ]

    const meetMinute = [
        {label: '00 분', value: '00'},
        {label: '01 분', value: '01'},
        {label: '02 분', value: '02'},
        {label: '03 분', value: '03'},
        {label: '04 분', value: '04'},
        {label: '05 분', value: '05'},
        {label: '06 분', value: '06'},
        {label: '07 분', value: '07'},
        {label: '08 분', value: '08'},
        {label: '09 분', value: '09'},
        {label: '10 분', value: '10'},
        {label: '11 분', value: '11'},
        {label: '12 분', value: '12'},
        {label: '13 분', value: '13'},
        {label: '14 분', value: '14'},
        {label: '15 분', value: '15'},
        {label: '16 분', value: '16'},
        {label: '17 분', value: '17'},
        {label: '18 분', value: '18'},
        {label: '19 분', value: '19'},
        {label: '20 분', value: '20'},
        {label: '21 분', value: '21'},
        {label: '22 분', value: '22'},
        {label: '23 분', value: '23'},
        {label: '24 분', value: '24'},
        {label: '25 분', value: '25'},
        {label: '26 분', value: '26'},
        {label: '27 분', value: '27'},
        {label: '28 분', value: '28'},
        {label: '29 분', value: '29'},
        {label: '30 분', value: '30'},
        {label: '31 분', value: '31'},
        {label: '32 분', value: '32'},
        {label: '33 분', value: '33'},
        {label: '34 분', value: '34'},
        {label: '35 분', value: '35'},
        {label: '36 분', value: '36'},
        {label: '37 분', value: '37'},
        {label: '38 분', value: '38'},
        {label: '39 분', value: '39'},
        {label: '40 분', value: '40'},
        {label: '41 분', value: '41'},
        {label: '42 분', value: '42'},
        {label: '43 분', value: '43'},
        {label: '44 분', value: '44'},
        {label: '45 분', value: '45'},
        {label: '46 분', value: '46'},
        {label: '47 분', value: '47'},
        {label: '48 분', value: '48'},
        {label: '49 분', value: '49'},
        {label: '50 분', value: '50'},
        {label: '51 분', value: '51'},
        {label: '52 분', value: '52'},
        {label: '53 분', value: '53'},
        {label: '54 분', value: '54'},
        {label: '55 분', value: '55'},
        {label: '56 분', value: '56'},
        {label: '57 분', value: '57'},
        {label: '58 분', value: '58'},
        {label: '59 분', value: '59'},
        {label: '60 분', value: '60'},
    ]

    const customStyles = useMemo(
        () => ({
            option:(provided) => ({
                ...provided,

            }),
            control: (provided) => ({
                ...provided,
                border: '3px solid rgb(193, 172, 149)',
                height: '45px',
                color: 'black',
                borderRadius: '15px',
                height: '45px',
            })
        })
    )

    const study_form = [
        {label: '온라인', value: 'ONLINE'},
        {label: '오프라인', value: 'OFFLINE'},
    ]

    const handleUpdateGathering = async () => {
        const gatheringTime=gatheringDate.getFullYear().toString()+'-'+(gatheringDate.getMonth()+1).toString().padStart(2, '0')+'-'+gatheringDate.getDate().toString().padStart(2, '0')+'T'+T.current+":"+m.current+":00"
        
        const ReqBody = {
            gatheringTime: gatheringTime,
            shape: form,
            content: contents,
            placeName: placeName,
            let: Let,
            len: Len,
        }

        await api.updateGathering(gatheringId, ReqBody)
        window.location.href='/StudyRoom/'+Id+'/GatheringList'
    }


    return (
        <div className="MakeGathering">
            <aside>
                <GatheringSide Id={Id}/>
            </aside>

            

            <div className='MakeGathering-contents'>
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
                            <Select options={meetHour} className='col-md-3' placeholder={T.current+' 시'}
                            onChange={(e) => T.current=e.value}
                            styles={customStyles}/>
                            <Select options={meetMinute} className='col-md-3' placeholder={m.current+' 분'}
                            onChange={(e) => m.current=e.value}
                            styles={customStyles}/>
                        </div>
                    </div>

                    <div className='MakeGathering-form-box'>
                        <Select options={study_form} className='col-md-5' placeholder={form} id='form'
                        onChange={(e) => {setform(e.value)}}
                        styles={customStyles}/>
                    </div>
                    
                    <div className='MakeGathering-form-box'>
                        <textarea type='text' className='make-gathering-contents' value={contents} id='contents' placeholder='설명'
                        onChange={(e) => setcontents(e.target.value)}/>
                    </div>


                    <div className='gathering-map-box'>
                        <div className='gathering-map' id='gathering-map'/>
                    </div>
                    
                    <div className='place-input'>
                        <input type='text' placeholder='상세 장소 이름' value={placeName} id='placeName'
                        onChange={(e) => setplaceName(e.target.value)}/>
                    </div>
                    


                    <button className='MakeGathering-Btn' onClick={()=>{
                        if(!form){
                            document.getElementById('form').style.borderColor='red';
                        }
                        if(!contents){
                            document.getElementById('contents').style.borderColor='red';
                        }
                        if(!placeName){
                            document.getElementById('placeName').style.borderColor='red';
                        }
                        if(form&&contents&&placeName){
                            handleUpdateGathering()
                        }
                        else{
                            window.alert('공백이 존재합니다.')
                        }
                        }}>모임 수정</button>     
                </div>
            </div>
        </div>

        
    )
}

export default UpdateGathering
