import React, {useEffect, useState} from 'react'
import './LandingPage.css';

import ModalLocation from '../ModalLocation/ModalLocation';

function LandingPage() {

    const [isModalOpen, setisModalOpen] = useState(false)

    const openModal = () => {
        setisModalOpen(true)
    };
    
    const closeModal = () => {
        setisModalOpen(false)
    };
    
    return (
        <div className='landingPage'>
            <a className="addBtn" href="/MakeStudy">스터디 추가하기</a>
            <button onClick={openModal}>테스트버튼</button>
            <ModalLocation isOpen={isModalOpen} close={closeModal}/>
        </div>
    )
}

export default LandingPage
