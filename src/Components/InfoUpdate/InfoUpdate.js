import React, {useState, useEffect, useCallback} from 'react'
import {useInView} from 'react-intersection-observer'

import './InfoUpdate.css'

import KakaoMap from '../KakaoMap/KakaoMap'
import axios from 'axios'


function ModalLocation(props) {
    
    const [Img, setImg] = useState(null)
    const [Name, setName] = useState(props.Myinfo.MyName)
    const [TagName, setTagName] = useState('')
    const [isImgDelete, setisImgDelete] = useState(false)
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [ref, inView] = useInView()

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

    const getItems = useCallback(async () => {
            setLoading(true)
            await axios({
                method: 'get',
                url: 'http://localhost:8000/study-service/tags?page=${page-1}&size=10&name='+encodeURIComponent(TagName)
            })
            .then(res => {
                setItems(prevState => [...prevState, res.data.content])
            })
            setLoading(false)
    }, [page, TagName])
        
        // `getItems` 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getItems()
    }, [getItems])
        
    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page 증가
        if (inView && !loading) {
        setPage(prevState => prevState + 1)
        }
    }, [inView, loading])

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
                                    <input type="text" className="inputUpdate" placeholder='관심주제'
                                        onChange={function(e){
                                            setTagName(e.target.value)
                                            console.log(TagName)
                                        }}
                                    />
                                    <div className="modalTag">{list}</div>
                                </div>
                                dd
                                {items.map((item, idx) => (
                                    <React.Fragment key={idx}>
                                    {items.length - 1 == idx ? (
                                        <div className="list-item" ref={ref}>
                                        {item}
                                        </div>
                                    ) : (
                                        <div className="list-item">
                                        {item}
                                        </div>
                                    )}
                                    </React.Fragment>
                                    ))
                                }
                                dd
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
