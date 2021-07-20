import React, {useEffect, useState} from 'react'

import api from '../../API';

import './SideBar.css';


function Sidebar(props) {



    useEffect(async () => {
        let temp = await api.MyStudy()
        console.log(temp);
    }, [])

    const LoginView = (
        <div>
            로그인됨
        </div>
    )

    const MainView = (
        <div>
            로그인이 필요합니다
        </div>
    )
    return (
        <div className='sidebar'>
            {props.isLogin ? LoginView : MainView }
        </div>
    )
}

export default Sidebar
