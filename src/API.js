import axios from 'axios'

axios.defaults.baseURL="http://211.37.147.101:8000"

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
    //프로필 수정
    updateProfile(formData){
        return axios({
            method: 'patch',
            url: '/user-service/users/profile',
            headers: {
                // ...axios.defaults.headers,
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
    }
}