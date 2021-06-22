import axios from 'axios';
import React, {useState, useEffect} from 'react'

import Friends from '../Friends/Friends'

import InfoUpdate from '../InfoUpdate/InfoUpdate'


import "./MyPage.css";

const profileImg = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150427_195%2Fninevincent_1430122792465QuPeq_JPEG%2Fkakao_5.jpg&type=a340'

const Myinfo = {
    MyName : '석재호',
    MyLocation : '경기도 시흥시',
    MyInterest : 'React'
}


function MyPage() {
    
    useEffect(() => {
        axios.get('http://localhost:8000/user-service', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res);
        })
    }, [])

    const [isModalOpen, setisModalOpen] = useState(false)

    const openModal = () => {
        setisModalOpen(true)
    };
    
    const closeModal = () => {
        setisModalOpen(false)
    };

    return (
        <div className ="MyPage">
            <div className="MyPageTop">
                <div className="profile">
                        <img className="image" src={profileImg}/>

                    <div className="info">
                        <div>이름 : {Myinfo.MyName}</div>
                        <div>내 동네 : {Myinfo.MyLocation}</div>
                        <div>관심주제 : {Myinfo.MyInterest}</div>
                    </div>
                </div>
                <div className="requestBtn">
                    스터디 가입요청
                </div>
            </div>
            <p className="updateBtn" onClick={openModal}>수정하기</p>
            <InfoUpdate isOpen={isModalOpen} close={closeModal}/>

            <div className="friendsTitle">
                <p>친구목록</p>
                <p className="re">동기화</p>
            </div>
            

            <Friends/>

        </div>
    )
}

export default MyPage;
