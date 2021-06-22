import React, {useEffect, useState} from 'react'
import './LandingPage.css';


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
        </div>
    )
}

export default LandingPage
