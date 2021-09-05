import React,{useEffect,useState} from 'react'

import './GatheringHome.css'

import api from '../../API'
import {EnvironmentOutlined, ApartmentOutlined, CommentOutlined, FileOutlined} from '@ant-design/icons'
import GatheringSide from '../GatheringSide/GatheringSide'

function GatheringHome(props) {

    const [StudyInfo, setStudyInfo] = useState([])

    useEffect(async() => {
        const res = await api.studyDetail(props.match.params.Id)
        console.log(res);

        const Info = {
            StudyName : res.name,
            StudyContent : res.content,
            StudyLocation : res.location.city + " " + res.location.dong,
            StudyCategory : res.parentCategory.name + "/" + res.childCategory.name,
        }
        if(res.image){
            Info.StudyImg = res.image.studyImage
        }
        if(res.online && res.offline){
            Info.StudyForm = 'Online & Offline'
        }
        else if(res.online){
            Info.StudyForm = 'Online'
        }
        else if(res.offline){
            Info.StudyForm = 'Offline'
        }
        setStudyInfo(Info)
        console.log(StudyInfo);
    }, [])

    return (
        <div className='GatheringHome'>
            <aside>
                <GatheringSide Id={props.match.params.Id}/>
            </aside>
            
            <section>
                    {StudyInfo.StudyImg ? <img src={StudyInfo.StudyImg}/> : <img/>}
                    <div className='studyContent'>
                        <div className="studyTitle">{StudyInfo.StudyName}</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='t-icon'><EnvironmentOutlined style={{fontSize: '20px'}}/></td>
                                    <td className='t-label'>위치</td>
                                    <td className='t-content'>{StudyInfo.StudyLocation}</td>
                                </tr>
                                <tr>
                                    <td className='t-icon'><ApartmentOutlined style={{fontSize: '20px'}}/></td>
                                    <td className='t-label'>카테고리</td>
                                    <td className='t-content'>{StudyInfo.StudyCategory}</td>
                                </tr>
                                <tr>
                                    <td className='t-icon'><CommentOutlined style={{fontSize: '20px'}}/></td>
                                    <td className='t-label'>스터디방법</td>
                                    <td className='t-content'>{StudyInfo.StudyForm}</td>
                                </tr>
                                <tr>
                                    <td className='t-icon'><FileOutlined style={{fontSize: '20px'}}/></td>
                                    <td className='t-label'>내용</td>
                                    <td className='t-content'>{StudyInfo.StudyContent}</td>
                                </tr>
                                
                            </tbody>
                        </table>                        
                    </div>

                
            </section>
        </div>
    )
}

export default GatheringHome
