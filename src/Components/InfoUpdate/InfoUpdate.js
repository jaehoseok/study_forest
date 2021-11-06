import React, {useState, useEffect, useRef} from 'react'
import {useInView} from 'react-intersection-observer'

import './InfoUpdate.css'

import api from '../../API'


function InfoUpdate(props) {
    
    const [Img, setImg] = useState(null)
    const [Name, setName] = useState('')
    const [TagName, setTagName] = useState('')
    const [isImgDelete, setisImgDelete] = useState(false)
    const [items, setItems] = useState([])
    const [list, setlist] = useState([])
    const [imgBase64, setImgBase64] = useState(''); // 파일 base64

    const page = useRef(0);
    const addlist = useRef([])
    const [scrollRef, inView] = useInView();

    useEffect(async () => {
        let data = await api.profile()
        setName(data.nickName)
        if(data.image){
            setImgBase64(data.image.profileImage)
        }
        else{
            setImgBase64('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU')
        }
        
        let tagData = await api.userTag()
        let tempList=[]
        if(tagData != null){
            for(let i=0 ; i < tagData.length ; i++){
                tempList.push(
                    <a className="tag">
                        <span className='tag-name'>{tagData[i].name}</span>
                        <span className="tag-del" id={tagData[i].tagId}  onClick={tagDeleteHandler}> &times;</span>
                    </a>
                )
            }
        }
        await setlist(tempList)
    }, [])

    useEffect(() => {
        if(addlist.current != [] && inView && TagName){
            nextPage()
            getItems()
        }
    }, [inView])

    const nextPage = () => {
        page.current = page.current+1;
    }
    
    const updateHandler = async () => {
        const req = {
            deleteImage: isImgDelete,
            nickName: Name
        }
        const json = JSON.stringify(req)
        const jsonRequest = new Blob([json],{
            type: 'application/json'
        })

        const formData = new FormData();
        formData.append('image', Img);
        formData.append('request', jsonRequest)
        const res = await api.updateProfile(formData)
        if(res){
            window.location.href='/MyPage'
        }
    }

    const getItems = async () => {
            let list = [];
            let data = await api.searchTag(TagName, page.current)
            for(let i=0; i<data.length;i++){
                list.push(
                    <div className='tagName' id={data[i].id} onClick={tagHandler}>{data[i].name}</div>
                )
            }
            addlist.current=[...addlist.current, ...list]
            setItems(addlist.current)
    }

    const tagHandler = async (e) => {
        await api.addTag(e.target.id)
        let tagData = await api.userTag()
        let tempList=[]
            for(let i=0 ; i < tagData.length ; i++){
                tempList.push(
                    <a className="tag">
                        <span className='tag-name'>{tagData[i].name}</span>
                        <span className="tag-del" id={tagData[i].tagId} onClick={tagDeleteHandler}> &times;</span>
                    </a>
                )
            }
        await setlist(tempList)
    }

    const tagDeleteHandler = async (e) => {
        await api.deleteTag(e.target.id)
        let tagData = await api.userTag()
        let tempList=[]
        if(tagData != null){
            for(let i=0 ; i < tagData.length ; i++){
                tempList.push(
                    <a className="tag">
                        <span className='tag-name'>{tagData[i].name}</span>
                        <span className="tag-del" id={tagData[i].tagId} onClick={tagDeleteHandler}> &times;</span>
                    </a>
                )
            }
        }
        await setlist(tempList)
    }
    
    const handleChangeFile = (event) => {
        let reader = new FileReader();

        reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
            if (base64) {
            setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
            }
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            setImg(event.target.files[0]); // 파일 상태 업데이트
        }
    }


    return (
        <div>
            <div className="InfoUpdate">
                    <div className='modalTitle'>내 정보 수정</div>

                        <div className='innerContent'>
                            <div className='innerContent-top'>
                                <img className='img' src={imgBase64}/>
                                프로필 사진 : <input type="file" className="fileUpdate"
                                    onChange={function(e){
                                        handleChangeFile(e)
                                    }}
                                />

                                <div className='info-checkbox-box'>
                                    <input type='checkbox' checked={isImgDelete}  className='info-checkbox'
                                    onChange={() => {
                                        setisImgDelete(!isImgDelete)
                                    }}/>기본 이미지
                                </div>

                            </div>
                                
                        <input type="text" className="inputUpdateName" placeholder="이름" value={Name}
                            onChange={(e) => {
                                setName(e.target.value)
                        }}/>

                        <input type="text" className="inputUpdateTag" placeholder='관심주제'
                            onChange={(e) => {
                                setTagName(e.target.value)
                        }}/>
                                        
                    <a className='askBtn' onClick={
                        () => {
                            document.getElementById('itemList').scrollTo({top:0})
                            addlist.current=[]
                            page.current=0
                            getItems()
                        }} >조회</a>
                    <div className='itemList' id='itemList'>{items}<div ref={scrollRef}></div></div>
                    <div className="modalTag">{list}</div>                       
                </div>
                <a className="Info-updateBtn" onClick={() =>{
                    if(Name!=''){
                        updateHandler()
                    }
                    else{
                        window.alert('이름은 공백일 수 없습니다.')
                    }
                }}>수정</a>
            </div>
        </div>
    )
}

export default InfoUpdate
