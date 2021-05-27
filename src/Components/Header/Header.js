import React from 'react'
import './Header.css';

import Right from './RightMenu/RightMenu'

function Header() {
    return (
        <div className="header">
            <div className="logo">Logo</div>
            <Right className='right' />
        </div>
    )
}

export default Header
