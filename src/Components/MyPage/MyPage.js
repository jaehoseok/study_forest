import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

import Friends from '../Friends/Friends'
import StudyReq from '../StudyReq/StudyReq'

import api from '../../API'

import "./MyPage.css";

const {kakao} = window;





function MyPage() {

    const [Myinfo, setMyinfo] = useState({
        MyName : '',
        MyLocation : '',
        MyInterest : [],
        MyProfileImage: '',
        MyThumbnailImage: '',
        MyNumberOfStudyApply: 0,
        mapLen: 0,
        mapLet: 0,
    })

    const infoPush = async (data) => {
        const locationRes = await api.location(data.locationId)
        let location_name = locationRes.city + " " + locationRes.dong
        let tagRes = await api.userTag()
        let tagList = []
        let info

        for(let i=0 ; i<tagRes.length; i++){
            tagList.push(tagRes[i].name)
        }
        if(data.image){
            info = {
                MyName : data.nickName,
                MyLocation : location_name,
                MyInterest : tagList,
                MyProfileImage: data.image.profileImage,
                MyThumbnailImage: data.image.thumbnailImage,
                MyNumberOfStudyApply: data.numberOfStudyApply,
            }
        }
        else {
            info = {
                MyName : data.nickName,
                MyLocation : location_name,
                MyInterest : tagList,
                MyProfileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU',
                MyThumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&usqp=CAU',
                MyNumberOfStudyApply: data.numberOfStudyApply,
            }
        }
        
        setMyinfo(info)
    }

    const [StudyApply, setStudyApply] = useState([])
    const [isReqOpen, setisReqOpen] = useState(false)

    useEffect( async () => {
        let data = await api.profile()
        await infoPush(data)
        const locationRes = await api.location(data.locationId)
        const mapContainer = document.getElementById('myMap')
        const mapOptions = {
            center: new kakao.maps.LatLng(locationRes.let, locationRes.len),
            level: 5,
            draggable: false,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
    }, [])

    

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
                <div className="MyPageTag" key={data[i]}>{data[i]}</div>
            )
        }
    }

    return (
        <div className ="MyPage">
            <StudyReq isOpen={isReqOpen} close={closeReq} StudyApply={StudyApply}/>
            <div className='top'>
                <div className='top-title'>내 정보</div>
                <div className="requestBtn" onClick={openReq}>
                    스터디 가입요청 <p>{Myinfo.MyNumberOfStudyApply}</p>
                </div>
            </div>
            
            
            <div className='middle'>

                <div className='profile-box'>
                    <div className='box-title'>프로필</div>
                    <div className='contentBox'>
                        <img className="image" src={Myinfo.MyProfileImage}/>

                        <div className="info">
                            <div>이름 : {Myinfo.MyName}</div>
                                <div >관심주제 : <div className="tags">{list}</div>
                            </div>
                        </div>    
                    </div>

                    <Link className="updateBtn" to='/InfoUpdate'>내정보 수정하기</Link>
                </div>

                <div className='location-box'>
                    <div className='box-title'>지역 설정</div>
                    <div className='contentBox'>
                        <div className='info'>
                            <div>내 동네 : {Myinfo.MyLocation}</div>
                            <div className='myMap' id='myMap'/>
                        </div>
                    </div>
                    
                    <Link className="updateBtn" to='/LocationUpdate'>지역 수정하기</Link>
                </div>
            </div>
            {/* <div>
                <div className="friendsTitle">
                <p>친구목록</p>
                <p className="re">동기화</p>
                </div>
                <Friends/>
            </div> */}
            

        </div>
    )
}

export default MyPage;
