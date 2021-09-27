import React,{useEffect, useState, useMemo} from 'react'

import GatheringSide from '../GatheringSide/GatheringSide';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import {ko} from 'date-fns/esm/locale';

import Select from 'react-select'

import 'bootstrap/dist/css/bootstrap.min.css';
import './MakeGathering.css'


function MakeGathering(props) {

    const [gatheringDate, setgatheringDate] = useState(new Date())
    const [gatheringTime, setgatheringTime] = useState()

    useEffect(() => {
        console.log(MakeGathering);
    }, [])

    const meridiem = [
        {label : 'AM', value: 'AM'},
        {label : 'PM', value: 'PM'},
    ]

    const meetHour = [
        {label: '01', value: 1},
        {label: '02', value: 2},
        {label: '03', value: 3},
        {label: '04', value: 4},
        {label: '05', value: 5},
        {label: '06', value: 6},
        {label: '07', value: 7},
        {label: '08', value: 8},
        {label: '09', value: 9},
        {label: '10', value: 10},
        {label: '11', value: 11},
        {label: '12', value: 12},
        
    ]

    const meetMinute = [
        {label: '00', value: 0},
        {label: '01', value: 1},
        {label: '02', value: 2},
        {label: '03', value: 3},
        {label: '04', value: 4},
        {label: '05', value: 5},
        {label: '06', value: 6},
        {label: '07', value: 7},
        {label: '08', value: 8},
        {label: '09', value: 9},
        {label: '10', value: 10},
        {label: '11', value: 11},
        {label: '12', value: 12},
        {label: '13', value: 13},
        {label: '14', value: 14},
        {label: '15', value: 15},
        {label: '16', value: 16},
        {label: '17', value: 17},
        {label: '18', value: 18},
        {label: '19', value: 19},
        {label: '20', value: 20},
        {label: '21', value: 21},
        {label: '22', value: 22},
        {label: '23', value: 23},
        {label: '24', value: 24},
        {label: '25', value: 25},
        {label: '26', value: 26},
        {label: '27', value: 27},
        {label: '28', value: 28},
        {label: '29', value: 29},
        {label: '30', value: 30},
        {label: '31', value: 31},
        {label: '32', value: 32},
        {label: '33', value: 33},
        {label: '34', value: 34},
        {label: '35', value: 35},
        {label: '36', value: 36},
        {label: '37', value: 37},
        {label: '38', value: 38},
        {label: '39', value: 39},
        {label: '40', value: 40},
        {label: '41', value: 41},
        {label: '42', value: 42},
        {label: '43', value: 43},
        {label: '44', value: 44},
        {label: '45', value: 45},
        {label: '46', value: 46},
        {label: '47', value: 47},
        {label: '48', value: 48},
        {label: '49', value: 49},
        {label: '50', value: 50},
        {label: '51', value: 51},
        {label: '52', value: 52},
        {label: '53', value: 53},
        {label: '54', value: 54},
        {label: '55', value: 55},
        {label: '56', value: 56},
        {label: '57', value: 57},
        {label: '58', value: 58},
        {label: '59', value: 59},
        {label: '60', valuy: 60},

        
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


    return (
        <div className="MakeGathering">
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>

            

            <div>
                <div className='MakeGathering-title'>모임 생성</div>
                <div className='MakeGathering-box'>
                    <div className='date-box'>
                        <p className='date-title'>날짜</p>
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
                    </div>
                    <div className='time-box'>
                        <p className='date-title'>시간</p> 
                        <div className='timePicker'>
                            <Select options={meridiem} className='col-md-2' placeholder='AM/PM'/>
                        
                            <Select options={meetHour} className='col-md-2' placeholder='시'/>

                            <Select options={meetMinute} className='col-md-2' placeholder='분'/>
                        </div>
                    </div>
                    


                    <button onClick={()=>{
                        console.log(gatheringDate);
                        console.log(gatheringDate.getFullYear().toString()+'-'+(gatheringDate.getMonth()+1).toString().padStart(2, '0')+'-'+gatheringDate.getDate().toString().padStart(2, '0')+'T');
                        }}>ㅇㅁㄴㅇㅁ</button>         
                </div>
            </div>
        </div>

        
    )
}

export default MakeGathering
