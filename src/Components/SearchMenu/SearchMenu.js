import React, {useState, useEffect, useMemo} from 'react'
import './SearchMenu.css';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../API'

function SearchMenu(props) {

    const [parentCategory, setparentCategory] = useState([])
    const [childCategory, setchildCategory] = useState([])

    const [selected_parent, setselected_parent] = useState()
    const [parent_id, setparent_id] = useState()

    const [selected_child, setselected_child] = useState()
    const [child_id, setchild_id] = useState()

    const [studyTitle, setstudyTitle] = useState()

    const [form, setform] = useState()
    
    const customStyles = useMemo(
        () => ({
            option:(provided) => ({
                ...provided,

            }),
            control: (provided) => ({
                ...provided,
                width: '150px',
                border: '2px solid black',
                height: '38px'
            })
        })
    )

    useEffect( async () => {
        let parent = await api.parentCategory()
        let parentList = [];

        for(let i=0 ; i< parent.length ; i++){
            const item = {
                label: parent[i].name,
                value: parent[i].name,
                id: parent[i].id
            }
            parentList.push(item)
        }
        setparentCategory(parentList)
    }, [])

    useEffect(async () => {
        let child = 0
        if(parent_id){
            child= await api.childCategory(parent_id)
        }
        let childList = [];

        for(let i=0; i< child.length ; i++){
            const item = {
                label: child[i].name,
                value: child[i].name,
                id: child[i].id
            }
            childList.push(item)
        }
        setchildCategory(childList)
        
    }, [parent_id])
    
    const study_form = [
        {label: '온라인', value: {on: true, off: false}},
        {label: '오프라인', value: {on: false, off: true}},
        {label: '온라인&오프라인', value: {on: true, off: true}}
    ]

    const search = async (e) => {
        let searchOption = props.filter
        if(child_id){
            searchOption.categoryId = '&categoryId='+child_id
        }
        if(form){
            searchOption.offline = form.off
            searchOption.online = form.on
        }
        if(studyTitle){
            searchOption.searchKeyword = '&searchKeyword='+studyTitle
        }
        console.log(props.filter);
        console.log(searchOption);
        await props.setfilter(searchOption)
        let res = await api.searchStudy(1, props.filter)
        await props.handleContent(res.content);
        await props.setmaxPage(res.totalPages)
    }

    return (
        <div className="search">
            <div className='search-wrap'>
                <div className='select-box'>
                    <Select options={parentCategory} className='col-md-3' placeholder='큰카테고리'
                        value={selected_parent}
                        onChange={(e) => {
                            setselected_parent(e.name)
                            setparent_id(e.id)
                        }}
                        styles={customStyles}
                    />
                    <Select options={childCategory} className='col-md-3' placeholder='작은카테고리'
                        value={selected_child}
                        onChange={(e) => {
                            setselected_child(e.name)
                            setchild_id(e.id)
                        }}
                        styles={customStyles}
                    />
                    <Select options={study_form} className='col-md-3' placeholder='스터디형태'
                        // value={child_id}
                        onChange={(e) => {
                            setform(e.value)
                        }}
                        styles={customStyles}
                    />
                </div>
                
                <div className='search-box'>
                    <input type="text" placeholder="스터디제목" className="study-name" onChange={
                        (e) => {
                            setstudyTitle(e.target.value)
                        }
                    }/>

                    <p className="searchBtn" onClick={search}>검색</p>
                </div>  
            </div>



        </div>
    )
}

export default SearchMenu
