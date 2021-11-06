import {
    LOGIN_USER,
    AUTH_USER
} from '../_actions/types'

export default function (state={}, action){
    switch (action.type){
        case LOGIN_USER:
            return {...state, isLogin: action.payload.isLogin}
        case AUTH_USER:
            return {...state, userData: action.payload }
        default:
            return state;
    }
}