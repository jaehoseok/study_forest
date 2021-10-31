import React, {useEffect, useState} from 'react'
import {Link, withRouter, useHistory} from 'react-router-dom'

import {UserOutlined} from '@ant-design/icons'


import './KakaoLogin.css';
import api from '../../API'

import kakao from 'kakaojs'
import kakaoLoginButton from './kakao_login_medium_narrow.png'

function KakaoLogin(props) {
    const history = useHistory();

    useEffect(() => {
        kakao.init('e8c8772f05d1f53a6041323e0c8f2c9d'); //javascript sdk key
        if(kakao.Auth.getAccessToken() && window.sessionStorage.getItem('accessToken')){
            console.log("토큰 존재, 세션 유지");
            props.setisLogin(true)
        }
        else{
            console.log("토큰 없음");
        }
    }, [])


    const Login = () => {
        kakao.Auth.login({
            success: function(authObj) {
                const AccessToken = JSON.stringify(authObj["access_token"]);
                console.log(AccessToken);
                console.log("로그인 하였습니다.");
                api.login(kakao.Auth.getAccessToken())
                props.setisLogin(true);
                },
            fail: function(err) {
                console.log(JSON.stringify(err));
            }
        }); 
    }

    const Logout = async () => {
        if(kakao.Auth.getAccessToken() && window.sessionStorage.getItem('accessToken')){
            kakao.API.request({
                url: '/v1/user/unlink',
                success: function (response) {
                    console.log(response)
                    console.log("로그아웃 하였습니다.");
                    props.setisLogin(false);
                },
                fail: function (error) {
                    console.log(error)
                },
            })
            await api.logout()
            window.sessionStorage.removeItem('accessToken')
            kakao.Auth.setAccessToken(undefined);
            history.push('/');
        }
    }

    const loginView = (
        <div className='mainView'>
            <img src={kakaoLoginButton} onClick={Login}/>
        </div>
    )

    const mainView = (
        <div className="mainView">
            <Link to="/MyPage"><UserOutlined style={{fontSize: '25px', color: 'black'}}/></Link>
            <Link onClick={Logout} to='/' className='logout_Btn'>Logout</Link>
        </div>
    )

    return (
        <div>
            {props.isLogin ? mainView : loginView}
            
        </div>
    )
}

export default withRouter(KakaoLogin)
