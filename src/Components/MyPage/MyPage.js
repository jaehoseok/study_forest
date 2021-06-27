import axios from 'axios';
import React, {useState, useEffect} from 'react'

import Friends from '../Friends/Friends'
import InfoUpdate from '../InfoUpdate/InfoUpdate'
import Interest from '../Interest/Interest'


import "./MyPage.css";

const Myinfo = {
    MyName : '석재호',
    MyLocation : '경기도 시흥시',
    MyInterest : ['react', 'spring'],
    MyProfileImage: '',
    MyThumbnailImage: '',
    MyNumberOfStudyApply: 0
}


function MyPage() {
    
    useEffect(() => {
        axios({
            //로그인 회원 조회
            method: 'get',
            url: 'http://localhost:8000/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            console.log(res.data);
            Myinfo.MyName = res.data.nickName;
            Myinfo.MyLocation = res.data.locationId;
            Myinfo.MyProfileImage = res.data.image.profileImage;
            Myinfo.MyThumbnailImage = res.data.image.thumbnailImage;
            Myinfo.MyNumberOfStudyApply = res.data.numberOfStudyApply;
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
                        <img className="image" src={Myinfo.MyThumbnailImage}/>

                    <div className="info">
                        <div>이름 : {Myinfo.MyName}</div>
                        <div>내 동네 : {Myinfo.MyLocation}</div>
                        <div>관심주제 : {Myinfo.MyInterest}</div>
                    </div>
                </div>
                <div className="requestBtn">
                    스터디 가입요청 <p>{Myinfo.MyNumberOfStudyApply}</p>
                </div>
            </div>
            <p className="updateBtn" onClick={openModal}>수정하기</p>
            <InfoUpdate isOpen={isModalOpen} close={closeModal} Myinfo={Myinfo}/>

            <div className="friendsTitle">
                <p>친구목록</p>
                <p className="re">동기화</p>
            </div>
            

            <Friends/>

        </div>
    )
}

export default MyPage;
