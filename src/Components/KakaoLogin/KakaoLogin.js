import React, {useEffect, useState} from 'react'

import axios from 'axios'

import './KakaoLogin.css';

import kakao from 'kakaojs'
import kakaLoginButton from './kakao_login_medium_narrow.png'

function KakaoLogin() {

    useEffect(() => {
        kakao.init('6b2d30e7d44d413e6b0bf591686fdf2a'); //javascript sdk key
        if(kakao.Auth.getAccessToken()){
            console.log("토큰 존재, 세션 유지");
            setisLogin(true)
        }
        else{
            console.log("토큰 없음");
        }
    }, [])

    const [isLogin, setisLogin] = useState(false)

    const Login = () => {
        try{
            return new Promise((resolve, reject) => {
                kakao.Auth.login({
                    success: function(authObj) {
                    //콘솔로 토큰값이 잘 출력되면 로그인은 끝입니다.
                    console.log(JSON.stringify(authObj));
                    const AccessToken = JSON.stringify(authObj["access_token"]);
                    console.log(AccessToken);
                    console.log("로그인 하였습니다.");
                    setisLogin(true);
                    },
                    fail: function(err) {
                        console.log(JSON.stringify(err));
                    }

                });
                
            })
        }
        catch(err){
            console.log(err);
        }
        
    }

    const Logout = () => {
        if(kakao.Auth.getAccessToken()){
            kakao.Auth.logout(() => {
                kakao.Auth.setAccessToken(undefined);
                console.log("로그아웃 하였습니다.");
                setisLogin(false);
                console.log(kakao.Auth.getAccessToken());
                window.sessionStorage.clear();
                window.localStorage.clear();
            });
            
        }
    }

    const loginView = (
        <div>
            <img src={kakaLoginButton} onClick={Login}/>
        </div>
    )

    const mainView = (
        <div className="mainView">
            <a>내정보</a>
            <a onClick={Logout}>로그아웃</a>
        </div>
    )

    return (
        <div>
            {isLogin ? mainView : loginView}
        </div>
    )
}

export default KakaoLogin
