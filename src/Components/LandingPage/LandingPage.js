import React, {useEffect, useState} from 'react'
import './LandingPage.css';

import Searchapp from '../sear/Searapp'
import KakaoMap from '../KakaoMap/KakaoMap';



function LandingPage() {

    const [isModalOpen, setisModalOpen] = useState(false)

    const openModal = () => {
        setisModalOpen(true)
    };
    
    const closeModal = () => {
        setisModalOpen(false)
    };

    let list = [];
    for (let i = 0; i < 4; i++) {
        list.push(
            "ddd"
        )
    }
    
    return (
        <div className='landingPage'>
            <a className="addBtn" href="/MakeStudy">스터디 추가하기</a>
            <Searchapp/>
            <KakaoMap/>
            {list}
        </div>
    )
}

export default LandingPage
