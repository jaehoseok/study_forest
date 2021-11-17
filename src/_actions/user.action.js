import axios from 'axios';

import api from '../API'

import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER
} from './types'

export async function setIsLogin(bool){
    return {
        type: LOGIN_USER,
        payload: {isLogin: bool}
    }
}

export async function loginUser(dataToSubmit){
    const request = await api.login(dataToSubmit.kakaoToken)
    console.log(request);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function logoutUser(){
    const request = await api.login()
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export async function auth(){
    const request = await api.profile()

    return {
        type: AUTH_USER,
        payload: request,
    }
}