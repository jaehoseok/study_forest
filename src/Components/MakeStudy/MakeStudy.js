import React, {useState} from 'react'

import './MakeStudy.css';

import api from '../../API'

import KakaoMap from '../KakaoMap/KakaoMap'

function MakeStudy(props) {

    const [studyName, setstudyName] = useState()
    const [studyContent, setstudyContent] = useState()
    const [tagName, settagName] = useState()
    const [tagList, settagList] = useState([])

    const [Max, setMax] = useState(2);
    const [isOff, setisOff] = useState(false)

    const [Img, setImg] = useState(null)
    const [imgBase64, setImgBase64] = useState('');

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

    const handleAddTag = () => {
        let list = tagList
        for(let i=0 ; i<list.length ; i++){
            if(list[i].key === tagName){
                window.alert('중복된 태그 이름')
                settagName('')
                return
            }
        }
        list.push(
            <div key={tagName}>{tagName}</div>
        )
        settagName('')
        settagList(list)
    }

    const handleChangeFile = (e) => {
        let reader = new FileReader();

        reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
            if (base64) {
            setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            setImg(e.target.files[0]); // 파일 상태 업데이트
        }
    }

    const handleAddStudy = () => {
        const reqTagList = [];
        for(let i=0 ; i<tagList.length ; i++){
            reqTagList.push(tagList[i].key)
        }

        const req = {
            name: studyName,
            numberOfPeople:Max,
            content: studyContent,
            tags: reqTagList,
            online: true,
            offline: true,
            locationCode: '1111054000',
            categoryId: 8,
        }
        const json = JSON.stringify(req)
        const jsonRequest = new Blob([json],{
            type: 'application/json'
        })

        const formData = new FormData();
        console.log(req);
        formData.append('image', Img);
        formData.append('request', jsonRequest)
        api.makeStudy(formData)
        props.history.push('/')
    }

    return (
        <div className="makeStudy">

            <div className="title">스터디 등록</div>

            <div className="top-content">
                <div className="infoBox">
                    <input type='text' placeholder='스터디 이름' className='studyNameInput'
                        onChange={(e) => {
                            setstudyName(e.target.value)
                    }}/>
                    <hr/>
                    <div className="hashBox">
                        <input tyep='text' placeholder='해시태그' className='hashtagNameInput' value={tagName}
                            onChange={(e) => {
                                settagName(e.target.value)
                        }}/>
                        <div className="addBtn" onClick={
                            handleAddTag
                        }>해쉬태그 추가</div>
                    </div>
                    <div className='hashtagListBox'>
                        {tagList}
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
                <div className='imgBox'>
                    표지사진 <input type="file" className="contentTitle"
                        onChange={function(e){
                            handleChangeFile(e)
                    }}/>
                </div>
                <hr/>
                <textarea type='text' placeholder='내용' className='content'
                    onChange={(e) => {
                    setstudyContent(e.target.value)
                }}/>
                <hr/>
            </div>
            
            <div className="mapBox">
                <a className="toggle" onClick={mapToggle}>스터디 방식 : {isOff ? '오프라인' : '온라인'}</a>

                <div className="map">{isOff ? <KakaoMap className="KakaoMap"/> : Online }</div>

                <a className="finishBtn" onClick={handleAddStudy}>스터디 등록</a>
            </div>
        </div>
    )
}

export default MakeStudy
