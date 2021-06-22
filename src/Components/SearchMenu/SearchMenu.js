import React, {useState} from 'react'
import './SearchMenu.css';

function LeftMenu() {

    const [hash, sethash] = useState('')

    let hashTags = [];

    const onChange = (e) => {
        sethash(e.target.value);
        console.log(hash);
    }

    const addTag = (value) => {
        hashTags.push(value);
        console.log(hashTags);
    }

    return (
        <div className="search">
            <input type="text" placeholder="큰테고리" className="parent-category"/>

            <input type="text" placeholder="작은카테고리" className="child-category"/>

            <input type="text" placeholder="스터디제목" className="study-name"/>

            <div className="hashtag">
                <input type="text" placeholder="#해시태그" onChange={onChange}/>
            </div>

            <p className="searchBtn">검색</p>

            <div className="tag" className="tags">{hashTags}</div>


        </div>
    )
}

export default LeftMenu
