import React from 'react'

import Friends from '../Friends/Friends'


import "./MyPage.css";


function MyPage() {

    return (
        <div className ="MyPage">
            <div className="MyPageTop">
                <div className="profile">
                    <div className="image">
                        사진
                    </div>
                    <div className="info">
                        <div>이름 : </div>
                        <div>내 동네 : </div>
                        <div>관심주제 : </div>
                    </div>
                </div>
                <div className="requestBtn">
                    스터디 가입요청
                </div>
            </div>

            <Friends className="friends"/>

        </div>
    )
}

export default MyPage;
