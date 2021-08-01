import React, {useEffect} from 'react'
import './MyStudy.css'

import api from '../../API'

function MyStudy() {

    useEffect(() => {
        api.MyStudy()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default MyStudy
