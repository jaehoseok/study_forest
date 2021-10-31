import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { ReadOutlined, FileSearchOutlined} from '@ant-design/icons';

import './Header.css';


import KakaoLogin from '../KakaoLogin/KakaoLogin';

function Header(props) {

    return (
        <div className="header">
            <Link className="logo" to="/">STUDY FOREST</Link>
            <div className='nav'>
                <Link className='navBtn-Box' to='/'>
                    <FileSearchOutlined style={{fontSize: '40px', color: 'black'}}/>
                    <div className='navBtn'>주변 스터디</div>
                </Link>
                <Link className='navBtn-Box' to='/MyStudy'>
                    <ReadOutlined style={{fontSize: '40px', color: 'black'}}/>
                    <div className='navBtn'>나의 스터디</div>
                </Link>
                
            </div>
            <div className="loginBtn">
                <KakaoLogin isLogin={props.isLogin} setisLogin={props.setisLogin}/>
            </div>
        </div>
    )
}

export default Header
