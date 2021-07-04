import React, {useState} from 'react'
import Searchbar from './Searchbar'

function Searapp() {

    const data = [
        {"name":"키움증권", "code":"000000"},
        {"name":"삼성전자", "code":"000002"},
        {"name":"LG전자", "code":"000003"},
        {"name":"스튜디오드래곤", "code":"000004"},
        {"name":"영호화학", "code":"000005"},
        {"name":"씨젠", "code":"000006"},
        {"name":"LG화학", "code":"000007"}, 
        {"name":"DL", "code":"000008"},
        {"name":"오뚜기", "code":"000009"},
        {"name":'react', "code":"0000221"},
        {"name":'react2', "code":"0000221"},
        {"name":'react3', "code":"0000221"},
        {"name":'react4', "code":"0000221"},
        {"name":'react5', "code":"0000221"}
    ];  

    const [keyword, setkeyword] = useState();
    const [results, setresult] = useState([]);
    

      // 필드를 업데이트 
    const updateField = (field, value, update = true) => {
        if (update) onSearch(value);
        if (field === 'keyword') {
        setkeyword(value);
        }
        if (field === 'results') {
        setresult(value);
        }
    }

      // 입력된 텍스트로 data 배열에서 찾아 매칭되는 결과들을 저장 
    const onSearch = text => {
        var results = data.filter(item => true === matchName(item.name, text));
        setresult({ results });
    };

     // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크 
    const matchName = (name, keyword) => {
        var keyLen = keyword.length;
        name = name.toLowerCase().substring(0, keyLen);
        if (keyword === "") return false;
        return name === keyword.toString().toLowerCase();
    };


    return (
        <div>
            <Searchbar keyword={keyword} results={results} updateField={updateField}></Searchbar>
        </div>
    )
}

export default Searapp
