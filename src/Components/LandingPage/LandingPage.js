import React, {useEffect, useState} from 'react'
import './LandingPage.css';

import api from '../../API'


function LandingPage() {
    const [studyList, setstudyList] = useState([])

    useEffect(async () => {
        let study = await api.searchStudy()
        let studyList = [];

        for(let i=0; i<study.length ;i++){
            let img;

            if(study[i].image != null){
                img=study[i].image.thumbnailImage
            }
            else{
                img=null
            }
            studyList.push(
                <div className='study'>
                    <div className='img-box'>
                        <img className='study-img' src={img}/>
                    </div>
                    
                    <div className='title-box'>
                        제목 : {study[i].name}
                        <div>
                            관심태그 : {study[i].studyTags}
                        </div>
                    </div>
                    
                </div>
            )
        }
        setstudyList(studyList)
    }, [])

    
    return (
        <div className='landingPage'>
            {studyList}
        </div>
    )
}

export default LandingPage
