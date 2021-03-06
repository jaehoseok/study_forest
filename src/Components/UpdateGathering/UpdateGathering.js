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
            // ?????? ??????????????? ????????? ??????????????? 
            position: map.getCenter() 
        }); 
        // ????????? ????????? ???????????????
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
            // ????????? ??????, ?????? ????????? ??????????????? 
            var latlng = mouseEvent.latLng; 
            
            // ?????? ????????? ????????? ????????? ????????????
            marker.setPosition(latlng);
            
            setLen(latlng.getLng())
            setLet(latlng.getLat())
        });
    }, [])

    const meetHour = [
        {label: '01 ???', value: '01'},
        {label: '02 ???', value: '02'},
        {label: '03 ???', value: '03'},
        {label: '04 ???', value: '04'},
        {label: '05 ???', value: '05'},
        {label: '06 ???', value: '06'},
        {label: '07 ???', value: '07'},
        {label: '08 ???', value: '08'},
        {label: '09 ???', value: '09'},
        {label: '10 ???', value: '10'},
        {label: '11 ???', value: '11'},
        {label: '12 ???', value: '12'},
        {label: '13 ???', value: '13'},
        {label: '14 ???', value: '14'},
        {label: '15 ???', value: '15'},
        {label: '16 ???', value: '16'},
        {label: '17 ???', value: '17'},
        {label: '18 ???', value: '18'},
        {label: '19 ???', value: '19'},
        {label: '20 ???', value: '20'},
        {label: '21 ???', value: '21'},
        {label: '22 ???', value: '22'},
        {label: '23 ???', value: '23'},
        {label: '24 ???', value: '24'},        
    ]

    const meetMinute = [
        {label: '00 ???', value: '00'},
        {label: '01 ???', value: '01'},
        {label: '02 ???', value: '02'},
        {label: '03 ???', value: '03'},
        {label: '04 ???', value: '04'},
        {label: '05 ???', value: '05'},
        {label: '06 ???', value: '06'},
        {label: '07 ???', value: '07'},
        {label: '08 ???', value: '08'},
        {label: '09 ???', value: '09'},
        {label: '10 ???', value: '10'},
        {label: '11 ???', value: '11'},
        {label: '12 ???', value: '12'},
        {label: '13 ???', value: '13'},
        {label: '14 ???', value: '14'},
        {label: '15 ???', value: '15'},
        {label: '16 ???', value: '16'},
        {label: '17 ???', value: '17'},
        {label: '18 ???', value: '18'},
        {label: '19 ???', value: '19'},
        {label: '20 ???', value: '20'},
        {label: '21 ???', value: '21'},
        {label: '22 ???', value: '22'},
        {label: '23 ???', value: '23'},
        {label: '24 ???', value: '24'},
        {label: '25 ???', value: '25'},
        {label: '26 ???', value: '26'},
        {label: '27 ???', value: '27'},
        {label: '28 ???', value: '28'},
        {label: '29 ???', value: '29'},
        {label: '30 ???', value: '30'},
        {label: '31 ???', value: '31'},
        {label: '32 ???', value: '32'},
        {label: '33 ???', value: '33'},
        {label: '34 ???', value: '34'},
        {label: '35 ???', value: '35'},
        {label: '36 ???', value: '36'},
        {label: '37 ???', value: '37'},
        {label: '38 ???', value: '38'},
        {label: '39 ???', value: '39'},
        {label: '40 ???', value: '40'},
        {label: '41 ???', value: '41'},
        {label: '42 ???', value: '42'},
        {label: '43 ???', value: '43'},
        {label: '44 ???', value: '44'},
        {label: '45 ???', value: '45'},
        {label: '46 ???', value: '46'},
        {label: '47 ???', value: '47'},
        {label: '48 ???', value: '48'},
        {label: '49 ???', value: '49'},
        {label: '50 ???', value: '50'},
        {label: '51 ???', value: '51'},
        {label: '52 ???', value: '52'},
        {label: '53 ???', value: '53'},
        {label: '54 ???', value: '54'},
        {label: '55 ???', value: '55'},
        {label: '56 ???', value: '56'},
        {label: '57 ???', value: '57'},
        {label: '58 ???', value: '58'},
        {label: '59 ???', value: '59'},
        {label: '60 ???', value: '60'},
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
        {label: '?????????', value: 'ONLINE'},
        {label: '????????????', value: 'OFFLINE'},
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
                <div className='MakeGathering-title'>?????? ??????</div>
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
                            <Select options={meetHour} className='col-md-3' placeholder={T.current+' ???'}
                            onChange={(e) => T.current=e.value}
                            styles={customStyles}/>
                            <Select options={meetMinute} className='col-md-3' placeholder={m.current+' ???'}
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
                        <textarea type='text' className='make-gathering-contents' value={contents} id='contents' placeholder='??????'
                        onChange={(e) => setcontents(e.target.value)}/>
                    </div>


                    <div className='gathering-map-box'>
                        <div className='gathering-map' id='gathering-map'/>
                    </div>
                    
                    <div className='place-input'>
                        <input type='text' placeholder='?????? ?????? ??????' value={placeName} id='placeName'
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
                            window.alert('????????? ???????????????.')
                        }
                        }}>?????? ??????</button>     
                </div>
            </div>
        </div>

        
    )
}

export default UpdateGathering
