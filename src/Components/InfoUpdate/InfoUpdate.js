import React, {useState} from 'react'

import './InfoUpdate.css'

import KakaoMap from '../KakaoMap/KakaoMap'
import axios from 'axios'


function ModalLocation(props) {
    
    const [Img, setImg] = useState(null)
    const [Name, setName] = useState(props.Myinfo.MyName)
    const [isImgDelete, setisImgDelete] = useState(false)

    let list = [];
    let data = props.Myinfo.MyInterest;

    if(data != null){
        for(let i=0 ; i < data.length ; i++){
            list.push(
                <a className="h">{data[i]}<span className="tag-del"> &times;</span></a>
            )
        }
    }
    
    const updateHandler = () => {
        const req = {
            'deleteImage': isImgDelete,
            'nickName': Name
        }

        const formData = new FormData();
        formData.append('image', Img);
        formData.append('request', req)
        
        axios({
            method: 'patch',
            url: 'http://localhost:8000/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                "content-type": "multipart/form-data"
            },
            data:formData
        })
        
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
                                <div>내 정보 수정</div>
                                <div>
                                    <div>
                                        프로필 사진 : <input type="file" className="fileUpdate"
                                            onChange={function(e){
                                                setImg(e.target.files[0])
                                            }}
                                        />
                                    </div>
                                        
                                    <input type="text" className="inputUpdate" placeholder="이름" value={Name}
                                        onChange={function(e){
                                            setName(e.target.value)
                                        }}
                                        />
                                    <input type="text" className="inputUpdate" placeholder='관심주제'/>
                                    <div className="modalTag">{list}</div>
                                </div>
                                    
                                {/* <KakaoMap className="modalMap"/> */}
                                
                                <a className="updateBtn" onClick={updateHandler}>수정</a>
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
