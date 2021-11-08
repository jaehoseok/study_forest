import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'


axios.defaults.baseURL="http://211.37.147.101:8000"


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    //로그인
    login(kakaoToken){
        return axios({
            method: 'post',
            url: '/auth-service/auth',
            headers: {
                kakaoToken: kakaoToken,
                fcmToken: window.sessionStorage.getItem('FCMToken')
            }
        })
        .then(res => {
            window.sessionStorage.setItem('accessToken', res.headers.accesstoken)
            window.sessionStorage.setItem('refreshToken', res.headers.refreshtoken)
            //이름및 유저ID 저장
            axios({
                method: 'get',
                url: '/user-service/users/profile',
                headers: {
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken')
                },
            })
            .then(res => {          
                window.sessionStorage.setItem('userId', res.data.id)
                window.sessionStorage.setItem('nickName', res.data.nickName)
                window.sessionStorage.setItem('locationId', res.data.locationId)
            })
            return {isLogin: true};
        })
        .catch((err) => {
            return {isLogin: false};
        })
    },
    //로그아웃
    logout(){
        return axios({
            method: 'delete',
            url: '/auth-service/auth',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken')
            }
        })
        .then(res => {
        })
        .catch(err => {
        })
    },
    //프로필 조회
    profile(){
        return axios({
            method: 'get',
            url: '/user-service/users/profile',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken')
            },
        })
        .then(res => {
            return res.data
        })
        .catch((err) => {
            return false
        })
    },

    studyApply(){
        return axios({
            method: 'get',
            url: '/user-service/users/studyApply',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken')
            }
        })
        .then(res => {
            return res.data
        })
    },

    //동네이름 조회
    location(location_id){
        if(location_id != null){
            return axios({
                method: 'get',
                url: '/location-service/locations/'+location_id,
                headers: {
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                },
            })
            .then(res => {
                let result = res.data.city +" "+ res.data.dong
                return res.data
            })
        }
        return false;
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
            return true
        })
        .catch(err => {
        })
    },

    searchLocation(searchName, currPage){
        let Name=''
        if(searchName){
            Name ='&searchName='+searchName
        }
        return axios({
            method: 'get',
            url: '/location-service/locations/search?page='+currPage+'&size=20'+Name,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data.content
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
        })
    },

    searchTag(tagName, page){
        return axios({
            method: 'get',
            url: '/study-service/tags?page='+page+'&size=10&name='+encodeURIComponent(tagName),
        })
        .then(res => {
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
    searchStudy(currPage, filter){
        return axios({
            method: 'get',
            url: '/study-service/studies?page='+(currPage-1)+'&size=16&offline='+filter.offline+'&online='+filter.online+filter.categoryId+filter.searchKeyword,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
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
            return true;
        })
        .catch(err => {
        })
    },
    
    updateStudy(formData, studyId){
        return axios({
            method: 'patch',
            url: '/study-service/studies/'+studyId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: formData
        })
        .then(res => {

        })
        .catch(err => {

        })
    },

    deleteStudy(studyId){
        return axios({
            method: 'delete',
            url: '/study-service/studies/'+studyId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {

        })
        .catch(err => {

        })
    },

    //스터디 상세조회
    studyDetail(studyId){
        return axios({
            method: 'get',
            url: '/study-service/studies/'+studyId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            return res.data
        })
    },

    applyStudy(studyId){
        return axios({
            method: 'post',
            url: '/study-service/studies/'+studyId+'/waitUsers',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
        })
        .catch(err => {
            if(err.status===400){
                window.alert('중복지원 입니다.')
            }
        })
    },

    applyCancelStudy(studyId){
        return axios({
            method: 'delete',
            url: '/study-service/studies/'+studyId+'/waitUsers',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
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
            return res.data
        })
    },

    StudyMember(Id){
        return axios({
            method: 'get',
            url: '/study-service/studies/'+Id+'/users',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data
        })
    },

    StudyWaitUsers(Id){
        return axios({
            method: 'get',
            url: '/study-service/studies/'+Id+'/waitUsers',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data
        })
    },

    Gatherings(Id){
        return axios({
            method: 'get',
            url: '/gathering-service/studies/'+Id+'/gatherings',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data.content
        })
    },

    makeGathering(Id){
        return axios({
            method: 'post',
            url: '/gathering-service/studies'+Id+'/gatherings'
        })
    },

    deleteMember(studyId, userId){
        return axios({
            method: 'delete',
            url: '/study-service/studies/'+studyId+'/users/'+userId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
        })
    },

    addMember(studyId, userId){
        return axios({
            method: 'post',
            url: '/study-service/studies/'+studyId+'/users/'+userId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {

        })
    },

    rejectMember(studyId, userId){
        return axios({
            method: 'delete',
            url: '/study-service/studies/'+studyId+'/waitUsers/'+userId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
        })
    },

    makeGathering(studyId, data){
        return axios({
            method: 'post',
            url: '/gathering-service/studies/'+studyId+'/gatherings',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: data
        })
        .then(res => {
        })
    },

    gatheringDetail(gatheringId){
        return axios({
            method: 'get',
            url: '/gathering-service/gatherings/'+gatheringId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data
        })
    },

    gatheringJoin(gatheringId){
        return axios({
            method: 'post',
            url: '/gathering-service/gatherings/'+gatheringId+'/users',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {

        })
    },

    gatheringJoinCancel(gatheringId){
        return axios({
            method: 'delete',
            url: '/gathering-service/gatherings/'+gatheringId+'/users',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {

        })
    },

    updateGathering(gatheringId, data){
        return axios({
            method: 'patch',
            url: '/gathering-service/gatherings/'+gatheringId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: data
        })
        .then(res => {

        })
    },

    deleteGathering(gatheringId){
        return axios({
            method: 'delete',
            url: '/gathering-service/gatherings/'+gatheringId,
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {

        })
    },

    gatheringJoinMember(gatheringId){
        return axios({
            method: 'get',
            url: '/gathering-service/gatherings/'+gatheringId+'/users',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {

            return res.data
        })
    },

    makeChat(studyId, name){
        return axios({
            method: 'post',
            url: '/chat-service/studies/'+studyId+'/chatRooms',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            },
            data: {
                name: name
            }           
        })
        .then(res => {

        })
    },

    chatList(studyId){
        return axios({
            method: 'get',
            url: '/chat-service/studies/'+studyId+'/chatRooms',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data;
        })
    },
    //"2021-07-23T10:02:00"
    chatMessage(chatId, page){
        return axios({
            method: 'get',
            url: '/chat-service/chatRooms/'+chatId+'/chatMessages?page='+page+'&size=20&lastMessageDate='+moment().format('YYYY-MM-DDTHH:mm:ss'),
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return res.data.content
        })
    },

    resignStudy(Id){
        return axios({
            method: 'delete',
            url: '/study-service/studies/'+Id+'/users',
            headers: {
                Authorization: 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        })
        .then(res => {
            return true;
        })
        .catch(err => {
            window.alert(err.response.data.message)
        })
    },

}