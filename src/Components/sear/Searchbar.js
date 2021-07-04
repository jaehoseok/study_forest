// SearchBar.js

import React from "react";

// 키워드, 결과값들, 업데이트필드를 전달받는다
const Searchbar = ({ keyword, results, updateField }) => {

  // 
    const updateText = text => {
        //console.log('update text', text);
        updateField("keyword", text, false);
        updateField("results", []);
    };
    
    var renderResults;
    const arr = results['results'];
    if(arr) {
    // arr 에 검색어에 대한 결과가 담기면, SearchView 호출 
    renderResults = arr.map((item => {
            return (
                <SearchView
                    updateText={updateText}
                    name={item.name}
                    key={item.code}
                />
            );
        }));
    }
    // onChange를 사용하여 글자를 입력할때마다 updateField호출하고 renderResults를 그린다.
    return (
        <div className="auto">
            <input
                className="search-bar"
                placeholder="관심 해쉬태그 검색"
                value={keyword || ''}
                onChange={e => updateField("keyword", e.target.value)}
            />
            <div className="search-results">{renderResults}</div>
        </div>
    );
};

// 검색된 아이템 "naem" "code" 출력
// 결과값을 클릭하면 updateText를 호출하여 input에 name을 표시
const SearchView = ({ name, code, index, updateText }) => {
    //console.log('search view:', name);

    return (
        <div
            onClick={() => updateText(name)}
            className={`search-preview ${index === 0 ? "start" : ""}`}
        >
            <div className="first">
            <p className="name">{name}</p>
            <p className="code">{code}</p>
            </div>
        </div>
        );
    };

export default Searchbar;