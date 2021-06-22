import React, {useEffect, useState} from 'react'


import './KakaoLogin.css';

import axios from 'axios'

import kakao from 'kakaojs'
import kakaLoginButton from './kakao_login_medium_narrow.png'

function KakaoLogin(props) {

    useEffect(() => {
        kakao.init('6b2d30e7d44d413e6b0bf591686fdf2a'); //javascript sdk key
        if(kakao.Auth.getAccessToken()){
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
                        //콘솔로 토큰값이 잘 출력되면 로그인은 끝입니다.
                        console.log(JSON.stringify(authObj));
                        const AccessToken = JSON.stringify(authObj["access_token"]);
                        console.log(AccessToken);
                        console.log("로그인 하였습니다.");

                        axios.defaults.headers.post = null
                        axios.post('localhost:8000/auth-service/auth', {
                            headers: {
                                kakaoToken: kakao.Auth.getAccessToken()
                            }
                        })
                        .then(res => { // headers: {…} 로 들어감.
                            console.log('send ok', res.data)
                            localStorage.setItem('accessToken', res.headers.get('accessToken'))
                            localStorage.setItem('refreshToken', res.headers.get('refreshToken'))
                        })
                        props.setisLogin(true);
                    },

                    fail: function(err) {
                        console.log(JSON.stringify(err));
                    }

                }); 
    }

    const Logout = () => {
        if(kakao.Auth.getAccessToken()){
            kakao.API.request({
                url: '/v1/user/unlink',
                success: function (response) {
                    console.log(response)
                    console.log("로그아웃 하였습니다.");
                    axios.delete('localhost:8000/auth-service/auth', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                        }
                    })
                    .then(res => {
                        if(res.status === 401){
                            axios.post('localhost:8000/auth-service/auth/refresh', {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('refreshToken')
                                }
                            })
                            .then(res => {
                                localStorage.setItem('accessToken', res.headers.get('accessToken'))
                            })
                        }
                    })
                    props.setisLogin(false);
                },
                fail: function (error) {
                    console.log(error)
                },
            })
            kakao.Auth.setAccessToken(undefined);
        }
    }

    const loginView = (
        <div>
            <img src={kakaLoginButton} onClick={Login}/>
        </div>
    )

    const mainView = (
        <div className="mainView">
            <a href="/MyPage">내정보</a>
            <a onClick={Logout}>로그아웃</a>
        </div>
    )

    return (
        <div>
            {props.isLogin ? mainView : loginView}
            
        </div>
    )
}

export default KakaoLogin
