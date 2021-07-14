import React, {useState, useEffect, useCallback} from 'react'
import {useInView} from 'react-intersection-observer'
// import FormData from 'form-data'

import './InfoUpdate.css'

import api from '../../API'


function ModalLocation(props) {
    
    const [Img, setImg] = useState(null)
    const [Name, setName] = useState(props.Myinfo.MyName)
    const [TagName, setTagName] = useState('')
    const [isImgDelete, setisImgDelete] = useState(false)
    const [items, setItems] = useState([])
    const [list, setlist] = useState([])
    const [imgBase64, setImgBase64] = useState(''); // 파일 base64


    useEffect(async () => {
        let data = await api.profile()
        setName(data.nickName)
        setImgBase64(data.image.profileImage)
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
    
    const updateHandler = () => {
        const req = {
            deleteImage: isImgDelete,
            nickName: Name
        }
        const json = JSON.stringify(req)
        const jsonRequest = new Blob([json],{
            type: 'application/json'
        })

        const formData = new FormData();
        formData.append('image', imgBase64);
        formData.append('request', jsonRequest)
        api.updateProfile(formData)
    }

    const getItems = async () => {
            let list = [];
            let data = await api.searchTag(TagName)
            for(let i=0; i<data.length;i++){
                list.push(
                    <div className='tagName' id={data[i].id} onClick={tagHandler}>{data[i].name}</div>
                )
            }
            setItems(list)
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
            {props.isOpen ? (
                <div className="modal">
                    <div>
                        <div className="inModal">
                            <span className="close" onClick={props.close}>
                                &times;
                            </span>

                            <div className="modalContents">
                                <div className='modalTitle'>내 정보 수정</div>

                                <div className='innerContent'>
                                    <div>
                                        <img className='img' src={imgBase64}/>
                                        프로필 사진 : <input type="file" className="fileUpdate"
                                            onChange={function(e){
                                                handleChangeFile(e)
                                            }}
                                        />
                                    </div>
                                    
                                    <input type="text" className="inputUpdateName" placeholder="이름" value={Name}
                                        onChange={function(e){
                                            setName(e.target.value)
                                        }}
                                    />
                                    <input type="text" className="inputUpdateTag" placeholder='관심주제'
                                        onChange={function(e){
                                            setTagName(e.target.value)
                                        }}
                                        >
                                    </input>

                                    
                                    <a onClick={getItems} className='askBtn'>조회</a>
                                        
                                    <div className='itemList'>{items}</div>

                                    <div className="modalTag">{list}</div>
                                </div>
                                
                                                            
                                <a className="modal-updateBtn" onClick={updateHandler}>수정</a>
                            </div>
                        </div>
                    </div>
                </div>
            ): null}

        {/* //만약 isopen(this.state.isModalOpen)이 true일때 코드를 실행 false면  null
        // <div onClick={close}> 로그인창 말고 회색 바탕을 누를시 모달이 꺼지게 만듬
	    //<span className="close" onClick={close}>&times;</span> x버튼 누를시 꺼짐
        //<div className="modalContents" onClick={isOpen}> 로그인 화면은 버튼 클릭해서 들어오면
        // true인 상태로 있어서 화면이 안꺼진다. */}

            
        </div>
    )
}

export default ModalLocation
