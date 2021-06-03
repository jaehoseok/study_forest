import React from 'react'
import './Header.css';

import Right from './RightMenu/RightMenu'
import KakaoLogin from '../KakaoLogin/KakaoLogin';

function Header() {
    return (
        <div className="header">
            <div className="logo">Study Forest</div>
            <div className="loginBtn">
                <KakaoLogin/>
            </div>
            
        </div>
    )
}

export default Header
