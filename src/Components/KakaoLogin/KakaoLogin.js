import React, {useEffect, useState} from 'react'
import {Link, withRouter, useHistory} from 'react-router-dom'

import './KakaoLogin.css';
import api from '../../API'

import {useDispatch, useSelector} from 'react-redux'
import {loginUser, setIsLogin} from '../../_actions/user.action';

import kakao from 'kakaojs'
import kakaoLoginButton from './kakao_login_medium_narrow.png'
import { from } from 'form-data';

function KakaoLogin(props) {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {
        kakao.init('e8c8772f05d1f53a6041323e0c8f2c9d'); //javascript sdk key
        if(kakao.Auth.getAccessToken() && window.sessionStorage.getItem('accessToken')){
            dispatch(setIsLogin(true))
        }
        else{
            dispatch(setIsLogin(false))
        }
    }, [])

    const Login =  () => {
        kakao.Auth.login({
            success: function (authObj) {
                const AccessToken = JSON.stringify(authObj["access_token"]);
                
                let body = {
                    kakaoToken: kakao.Auth.getAccessToken()
                }
                dispatch(loginUser(body))
                .then(response => {
                    if(response.payload.isLogin){
                        window.location.href='/'
                    } else {
                        alert('로그인 실패')
                    }
                })
            },

            fail: function(err) {

            }
        }); 
    }

    const Logout = async () => {
        if(kakao.Auth.getAccessToken() && window.sessionStorage.getItem('accessToken')){
            await kakao.API.request({
                url: '/v1/user/unlink',
                success: function (response) {

                },
                fail: function (error) {

                },
            })
            await api.logout()
            window.sessionStorage.removeItem('accessToken')
            kakao.Auth.setAccessToken(undefined);
            dispatch(setIsLogin(false))
        }
    }

    const loginView = (
        <div className='mainView'>
            <img src={kakaoLoginButton} onClick={async () => {
                await Login()
                }}/>
        </div>
    )

    const mainView = (
        <div className="mainView">
            <Link to="/MyPage" className='MyPage-btn'>
                <i className="fas fa-user-circle"></i>
                <div className='navBtn'>내 정보</div>
            </Link>
            <Link onClick={async () => {
                await Logout()
                }} to='/' className='logout_Btn'>Logout</Link>
        </div>
    )

    return (
        <div>
            {user.isLogin ? mainView : loginView}    
        </div>
    )
}

export default KakaoLogin
