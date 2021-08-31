import React from 'react'

import './ManagementMember.css';

import GatheringSide from '../GatheringSide/GatheringSide';

function ManagementMember() {
    return (
        <div className='ManagementMember'>
            <aside>
                <GatheringSide/>
            </aside>
            멤버관리
        </div>
    )
}

export default ManagementMember
