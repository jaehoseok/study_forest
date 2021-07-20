import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import Friends from '../Friends/Friends'
import InfoUpdate from '../InfoUpdate/InfoUpdate'
import LocationUpdate from '../LocationUpdate/LocationUpdate'
import StudyReq from '../StudyReq/StudyReq'

import api from '../../API'

import "./MyPage.css";




function MyPage() {
    
    const [Myinfo, setMyinfo] = useState({
        MyName : '',
        MyLocation : '',
        MyInterest : [],
        MyProfileImage: '',
        MyThumbnailImage: '',
        MyNumberOfStudyApply: 0
    })

    const infoPush = async (data) => {

        let location_name = await api.location(data.locationId)
        console.log(location_name);
        let tagRes = await api.userTag()
        let tagList = []

        for(let i=0 ; i<tagRes.length; i++){
            tagList.push(tagRes[i].name)
        }

        let info = {
            MyName : data.nickName,
            MyLocation : location_name,
            MyInterest : tagList,
            MyProfileImage: data.image.profileImage,
            MyThumbnailImage: data.image.thumbnailImage,
            MyNumberOfStudyApply: data.numberOfStudyApply
        }
        setMyinfo(info)
    }

    const [StudyApply, setStudyApply] = useState([])
    const [isReqOpen, setisReqOpen] = useState(false)

    useEffect( async () => {
        let data = await api.profile()
        await infoPush(data)
    }, [Myinfo])

    

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
                <a className="MyPageTag">{data[i]}</a>
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
                    <img className="image" src={Myinfo.MyProfileImage}/>

                    <div className="info">
                        <div>이름 : {Myinfo.MyName}</div>
                        <div >관심주제 : <div className="tags">{list}</div></div>
                    </div>
                    <Link className="updateBtn" to='/InfoUpdate'>내정보 수정하기</Link>
                </div>

                <div className='location-box'>
                    <div className='box-title'>지역 설정</div>
                    <div className='info'>
                        <div>내 동네 : {Myinfo.MyLocation}</div>
                        {/* todo: Map 넣기 */}
                        <Link className="updateBtn" to='/LocationUpdate'>지역 수정하기</Link>
                    </div>
                    
                </div>
            </div>
            <div>
                <div className="friendsTitle">
                <p>친구목록</p>
                <p className="re">동기화</p>
                </div>
                <Friends/>
            </div>
            

        </div>
    )
}

export default MyPage;
