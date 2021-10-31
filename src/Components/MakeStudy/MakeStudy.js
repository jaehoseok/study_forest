import React, {useState, useEffect, useMemo} from 'react'

import './MakeStudy.css';

import api from '../../API'
import Select from 'react-select'
import KakaoMap from '../KakaoMap/KakaoMap'

import 'bootstrap/dist/css/bootstrap.min.css';

function MakeStudy(props) {

    const [studyName, setstudyName] = useState()
    const [studyContent, setstudyContent] = useState()
    const [tagName, settagName] = useState()
    const [tagList, settagList] = useState([])
    const [selectedLocationCode, setselectedLocationCode] = useState()

    const [Max, setMax] = useState(2);

    const [Img, setImg] = useState(null)
    const [imgBase64, setImgBase64] = useState('');

    const [form, setform] = useState()

    const [parentCategory, setparentCategory] = useState([])
    const [childCategory, setchildCategory] = useState([])

    const [parentId, setparentId] = useState()
    const [selectedParent, setselectedParent] = useState()

    const [childId, setchildId] = useState()
    const [selectedChild, setselectedChild] = useState()

    const [tagCount, settagCount] = useState(0)

    let list=tagList
    useEffect(() => {
        settagList(list)
    }, [tagCount])

    useEffect( async () => {
        let parent = await api.parentCategory()
        let parentList = [];

        for(let i=0 ; i< parent.length ; i++){
            const item = {
                label: parent[i].name,
                value: parent[i].name,
                id: parent[i].id
            }
            parentList.push(item)
        }
        setparentCategory(parentList)
    }, [])

    useEffect(async () => {
        let child = 0
        if(parentId){
            child= await api.childCategory(parentId)
        }
        let childList = [];

        for(let i=0; i< child.length ; i++){
            const item = {
                label: child[i].name,
                value: child[i].name,
                id: child[i].id
            }
            childList.push(item)
        }
        setchildCategory(childList)
        
    }, [parentId])

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

    const handleAddTag = () => {
        list = tagList
        for(let i=0 ; i<list.length ; i++){
            if(list[i].key === tagName){
                window.alert('중복된 태그 이름')
                settagName('')
                return
            }
        }
        if(tagCount<6){
            list.push(
                <div key={tagName} className='tagName' id={tagName}>{tagName}<div className='tagDeleteBtn' id={tagName} onClick={
                    async (e) => {
                        await handleDeleteTag(e.target.id)
                    }
                }>&times;</div></div>
            )
            settagCount(n => n+1)
        }
        else{
            window.alert('최대 6개까지 가능합니다.')
            settagName('')
            return
        }
        
        settagName('')
    }

    const handleDeleteTag = (tagName) => {
        list = tagList
        for(let i=0 ; i<list.length ; i++ ){
            if(list[i].key === tagName){
                list.splice(i, 1)
                i--;
            }
        }
        settagCount(n => n-1)
    }

    const handleChangeFile = (e) => {
        let reader = new FileReader();

        reader.onloadend = () => {
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
            online: form.on,
            offline: form.off,
            //locationCode: selectedLocationCode.toString(),
            categoryId: childId,
        }
        if(selectedLocationCode){
            req.locationCode = selectedLocationCode.toString()
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


    const study_form = [
        {label: '온라인', value: {on: true, off: false}},
        {label: '오프라인', value: {on: false, off: true}},
        {label: '온라인&오프라인', value: {on: true, off: true}}
    ]

    return (
        <div className="makeStudy">

            <div className="title">스터디 등록</div>

            <div className="top-content">
                <div className="infoBox">
                    <input type='text' placeholder='스터디 이름' className='studyNameInput' id='studyNameInput'
                        onChange={(e) => {
                            setstudyName(e.target.value)
                    }}/>
                    <hr/>
                    <div className="categoryBox">
                        <Select options={parentCategory} className='col-md-4' placeholder='큰카테고리' id='parentCategory'
                            value={selectedParent}
                            onChange={(e) => {
                                setselectedParent(e.name)
                                setparentId(e.id)
                            }}
                            styles={customStyles}
                        />
                        <Select options={childCategory} className='col-md-4' placeholder='작은카테고리' id='childCategory'
                            value={selectedChild}
                            onChange={(e) => {
                                setselectedChild(e.name)
                                setchildId(e.id)
                            }}
                            styles={customStyles}
                        />
                    </div>
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
                <textarea type='text' placeholder='내용' className='content' id='content'
                    onChange={(e) => {
                    setstudyContent(e.target.value)
                }}/>
                <hr/>
            </div>
            
            <div className="mapBox">
                <Select options={study_form} className='col-md-5' placeholder='스터디형태' id='study_form'
                    onChange={(e) => {
                        setform(e.value)
                    }}
                    styles={customStyles}
                />
                <div id='study_map' className='study_map'>
                    <KakaoMap setselectedLocationCode={setselectedLocationCode} />
                </div>
                
            </div>
            <div className='BtnBox'>
                <a className="finishBtn" onClick={()=>{

                    if(!studyName){
                        document.getElementById('studyNameInput').style.borderColor='red'
                    }
                    if(!studyContent){
                        document.getElementById('content').style.borderColor='red'
                    }
                    if(!parentId){
                        document.getElementById('parentCategory').style.borderColor='red'
                    }
                    if(!childId){
                        document.getElementById('childCategory').style.borderColor='red'
                    }
                    if(!form){
                        document.getElementById('study_form').style.borderColor='red'
                    }
                    if(!selectedLocationCode){
                        document.getElementById('study_map').style.borderColor='red'
                    }

                    if(studyName&&studyContent&&childId&&form&&selectedLocationCode){
                        handleAddStudy()
                    }
                }
                    }>스터디 등록</a>
            </div>
            
        </div>
    )
}

// const req = {
//     name: studyName,
//     numberOfPeople:Max,
//     content: studyContent,
//     tags: reqTagList,
//     online: form.on,
//     offline: form.off,
//     //locationCode: selectedLocationCode.toString(),
//     categoryId: childId,
// }
// if(selectedLocationCode){
//     req.locationCode = selectedLocationCode.toString()
// }

export default MakeStudy
