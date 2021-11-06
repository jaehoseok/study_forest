import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { ReadOutlined, FileSearchOutlined} from '@ant-design/icons';

import logoImage from './logo_image.png'
import './Header.css';


import KakaoLogin from '../KakaoLogin/KakaoLogin';

function Header(props) {

    return (
        <div className="header">
            <Link className="logo" to="/"><div className='logo-image-box'><img className='logo-image' src={logoImage}/></div>STUDY FOREST</Link>
            
            <div className='nav-box'>
                            <div className='nav'>
                <Link className='navBtn-Box' to='/'>
                    <i className="fas fa-street-view"></i>
                    <div className='navBtn'>주변 스터디</div>
                </Link>
                <Link className='navBtn-Box' to='/MyStudy'>
                    <i className="fas fa-book-open"></i>
                    <div className='navBtn'>나의 스터디</div>
                </Link>
            </div>
            <div className="loginBtn">
                <KakaoLogin/>
            </div>
            </div>

        </div>
    )
}

export default Header
