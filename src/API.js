import axios from 'axios'

axios.defaults.baseURL="http://211.37.147.101:8000"


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    //로그인
    login(kakaoToken){
        return axios({
            method: 'post',
            url: '/auth-service/auth',
            headers: {
                'kakaoToken': kakaoToken
            }
        })
        .then(res => {
            console.log(res);
            window.sessionStorage.setItem('accessToken', res.headers.accesstoken)
            window.sessionStorage.setItem('refreshToken', res.headers.refreshtoken)
        })
    },
    //로그아웃
    logout(){
        return axios({
            method: 'delete',
            url: '/auth-service/auth',
            headers: {
                Authorization: window.sessionStorage.getItem('accessToken')
            }
        })
    },
    //프로필 조회
    profile(){
        return axios({
            method:'get',
            url:'/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken')
            },
        })
        .then(res => {
            return res.data
        })
    },

    //동네이름 조회
    location(location_id){
        return axios({
            method: 'get',
            url: '/location-service/locations/'+location_id,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            console.log(res);
            let result = res.data.city +" "+ res.data.dong
            console.log(result);
            return result
        })
    },

    //프로필 수정
    updateProfile(formData){
        return axios({
            method: 'patch',
            url: '/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: formData
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },

    searchLocation(location_id){
        return axios({
            method: 'get',
            url: '/location-service/locations/code?code='+location_id,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            console.log(res.data.id);
            return res.data.id
            
        })
    },

    searchLocation2(searchName){
        return axios({
            method: 'get',
            url: '/location-service/locations/search?page=0&size=20&searchName='+searchName,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            console.log(res);
        })
    },

    //내 동네 수정
    updateLocation(location_id){
        return axios({
            method: 'patch',
            url: '/user-service/users/locations/'+location_id,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            console.log(res);
        })
    },

    searchTag(tagName){
        return axios({
            method: 'get',
            url: '/study-service/tags?page=0&size=10&name='+encodeURIComponent(tagName),
        })
        .then(res => {
            console.log(res.data.content);
            return(res.data.content)
        })
    },

    userTag(){
        return axios({
            method: 'get',
            url: '/user-service/users/tags',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data
        })
    },

    addTag(tagId){
        return axios({
            method: 'post',
            url: '/user-service/users/tags/'+tagId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            console.log(res);
        })
    },

    deleteTag(tagId){
        return axios({
            method: 'delete',
            url: '/user-service/users/tags/'+tagId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            console.log(res);
        })
    },

    parentCategory(){
        return axios({
            method: 'get',
            url: '/study-service/categories/parent',

        })
        .then(res => {
            return res.data
        })
    },

    childCategory(parent_id){
        return axios({
            method: 'get',
            url: '/study-service/categories/'+parent_id+'/child'
        })
        .then(res => {
            return res.data
        })
    },

    //스터디 검색
    searchStudy(currPage){
        return axios({
            method: 'get',
            url: '/study-service/studies?page='+(currPage-1)+'&size=16&offline=true&online=true',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            console.log(res.data);
            return res.data
        })
    },

    //스터디 생성
    makeStudy(formData){
        return axios({
            method: 'post',
            url: '/study-service/studies',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: formData
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },

    //스터디 상세조회
    studyDetail(studyId){
        return axios({
            method: 'get',
            url: '/study-service/studies/'+studyId,
        })
        .then(res => {
            console.log(res.data);
            return res.data
        })
    },

    MyStudy(){
        return axios({
            method: 'get',
            url: '/study-service/users/studies',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            console.log(res);
        })
    }
}