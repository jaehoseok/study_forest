import React, {useState} from 'react'

import './MakeStudy.css';

import KakaoMap from '../KakaoMap/KakaoMap'

function MakeStudy() {

    const [Max, setMax] = useState(2);
    const [isOff, setisOff] = useState(false)

    const addNum = () => {
        var Num = Max;
        Num++;
        setMax(Num);
    }

    const minusNum = () => {
        var Num = Max;
        if(Num > 2){
            Num--;
            setMax(Num);
        }
    }

    const mapToggle = () => {
        var toggle = isOff;
        if(toggle === false){
            setisOff(true)
        }
        else{
            setisOff(false)
        }
    }

    const Online = (
        <div className="Online"></div>
    )

    return (
        <div className="makeStudy">

            <a className="title">스터디 등록</a>

            <div className="top">
                <div className="titleBox">
                    <div>스터디 이름 : </div>
                    <hr/>
                    <div className="hashBox">
                        <div>#해시태그 : </div>
                        <a className="addBtn">추가</a>
                    </div>
                    <hr/>
                </div>

                <div className="countBox">
                    <div className="countTitle">참여인원</div>
                    <div className="count">
                        <div onClick={minusNum}>-</div>
                        <div className="maxNumber">{Max}</div>
                        <div onClick={addNum}>+</div>
                    </div>
                </div>
            </div>

            <div className="contentBox">
                <div class="contentTitle">사진첨부</div>
                <hr/>
                <div className="content">내용</div>
                <hr/>
            </div>
            
            <div className="mapBox">
                <a className="toggle" onClick={mapToggle}>스터디 방식 : {isOff ? '오프라인' : '온라인'}</a>

                <div className="map">{isOff ? <KakaoMap className="KakaoMap"/> : Online }</div>

                <a className="finishBtn">스터디 등록</a>
            </div>
        </div>
    )
}

export default MakeStudy
