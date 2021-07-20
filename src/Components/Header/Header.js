import React, {useState} from 'react'
import './Header.css';

import KakaoLogin from '../KakaoLogin/KakaoLogin';
import SearchMenu from '../SearchMenu/SearchMenu'

function Header(props) {

    return (
        <div className="header">
            <a className="logo" href="/">Study Forest</a>
            <SearchMenu/>
            <div className="loginBtn">
                <KakaoLogin isLogin={props.isLogin} setisLogin={props.setisLogin}/>
            </div>
            
        </div>
    )
}

export default Header
