import React, {useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user.action'


export default function (SpecificComponent, option, adminRoute = null) {

    //option 종류
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                if (!response.payload) {
                    if (option) {
                        window.alert('로그인이 필요합니다.')
                        props.history.push('/')
                    }
                    //Loggined in Status 
                } 
                // else {
                //     //supposed to be Admin page, but not admin person wants to go inside
                //     if (adminRoute && !response.payload.isAdmin) {
                //         props.history.push('/')
                //     }
                //     //Logged in Status, but Try to go into log in page 
                //     else {
                //         if (option === false) {
                //             props.history.push('/')
                //         }
                //     }
                // }
            })
        
        }, [])

        return(
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}