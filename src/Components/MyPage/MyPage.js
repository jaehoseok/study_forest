import axios from 'axios';
import React, {useState, useEffect} from 'react'

import Friends from '../Friends/Friends'
import InfoUpdate from '../InfoUpdate/InfoUpdate'
import StudyReq from '../StudyReq/StudyReq'


import "./MyPage.css";




function MyPage() {
    
    const [Myinfo, setMyinfo] = useState({
        MyName : '석재호',
        MyLocation : '경기도 시흥시',
        MyInterest : ['react', 'spring', 'react', 'spring', 'react', 'spring', 'react', 'spring', 'react', 'spring'],
        MyProfileImage: 'https://mblogthumb-phinf.pstatic.net/20150427_171/ninevincent_1430122791934m8cxB_JPEG/kakao_4.jpg?type=w2',
        MyThumbnailImage: 'https://mblogthumb-phinf.pstatic.net/20150427_171/ninevincent_1430122791934m8cxB_JPEG/kakao_4.jpg?type=w2',
        MyNumberOfStudyApply: 0
    })

    const infoPush = (data) => {
        let info = {
            MyName : data.nickName,
            MyLocation : data.locationId,
            MyInterest : ['react', 'spring'],
            MyProfileImage: data.image.profileImage,
            MyThumbnailImage: data.image.thumbnailImage,
            MyNumberOfStudyApply: data.numberOfStudyApply
        }
        setMyinfo(info)
    }

    const [StudyApply, setStudyApply] = useState([])
    
    useEffect(() => {
        axios({
            //로그인 회원 조회
            method: 'get',
            url: 'http://localhost:8000/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res.data);
            infoPush(res.data);
        })

        axios({
            method:'GET',
            url: 'http://localhost:8000/user-service/users/studyApply',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            setStudyApply(res.data)
        })
    }, [])

    const [isModalOpen, setisModalOpen] = useState(false)

    const openModal = () => {
        setisModalOpen(true)
    };
    
    const closeModal = () => {
        setisModalOpen(false)
    };

    const [isReqOpen, setisReqOpen] = useState(false)

    const openReq = () => {
        setisReqOpen(true)
    }

    const closeReq = () => {
        setisReqOpen(false)
    }

    let list = [];
    let data = Myinfo.MyInterest;
    if(data != null){
        for(let i=0 ; i < data.length ; i++){
            list.push(
                <a className="h">{data[i]}</a>
            )
        }
    }

    return (
        <div className ="MyPage">
            <div className="MyPageTop">
                <div className="profile">
                        <img className="image" src={Myinfo.MyThumbnailImage}/>

                    <div className="info">
                        <div>이름 : {Myinfo.MyName}</div>
                        <div>내 동네 : {Myinfo.MyLocation}</div>
                        <div >관심주제 : <div className="tags">{list}</div></div>
                    </div>
                </div>
                <div className="requestBtn" onClick={openReq}>
                    스터디 가입요청 <p>{Myinfo.MyNumberOfStudyApply}</p>
                </div>
                <StudyReq isOpen={isReqOpen} close={closeReq} StudyApply={StudyApply}/>
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
