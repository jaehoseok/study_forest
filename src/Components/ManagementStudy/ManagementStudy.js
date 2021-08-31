import React from 'react'

import './ManagementStudy.css'

import GatheringSide from '../GatheringSide/GatheringSide';

function ManagementStudy() {
    return (
        <div className='ManagementStudy'>
            <aside>
                <GatheringSide/>
            </aside>
            <div className='ManagementStudyContnetsBox'>
                스터디관리
            </div>
        </div>
    )
}

export default ManagementStudy
