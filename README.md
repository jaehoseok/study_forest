# Study Forest - 졸업작품 Web <img width="40" alt="Logo" src="https://user-images.githubusercontent.com/62582301/140682079-3d8b3fe9-27c6-46d3-814a-4c9cb012a8ff.png">




**위치 API를 이용한 스터디 매칭 서비스**

<img width="1440" alt="LandingPage" src="https://user-images.githubusercontent.com/62582301/140681672-d004b9de-3988-47b2-86fd-c2936e7f3731.png">



<br>
<br>

## 개발환경 📁

- ### Web - 석재호
    - React
    - <a> https://github.com/jaehoseok/study_forest

- ### App - 한다빈
    - Kotlin
    - <a> https://github.com/daisy6365/GraduatedProject

- ### Server - 황주환
    - Spring
    - <a> https://github.com/juhwan0815/study-server


<br>
<br>

## Development Stack 💡

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=black">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=black">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black">
<img src="https://img.shields.io/badge/kakao-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
<img src="https://img.shields.io/badge/sockjs-010101?style=for-the-badge&logo=sockjs&logoColor=white">
<img src="https://img.shields.io/badge/stomp-010101?style=for-the-badge&logo=stomp&logoColor=white">
<img src="https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black">
<img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=black">
<img src="https://img.shields.io/badge/heroku-430098?style=for-the-badge&logo=heroku&logoColor=black">

<br>
<br>

## 주요 기능 ⚙️

- 초기 화면
![screencapture-localhost-3000-2021-11-08-13_53_21](https://user-images.githubusercontent.com/62582301/140686229-b0a7ed31-8d4d-47cb-8ec0-200bc2ed6dce.png)


- 스터디 정보 상세 보기
![screencapture-localhost-3000-StudyDetail-205-2021-11-08-13_51_36](https://user-images.githubusercontent.com/62582301/140686088-364170a4-aa58-4823-b11d-45d3173ab750.png)


- 로그인
<img width="1438" alt="Login" src="https://user-images.githubusercontent.com/62582301/140685530-414d76a8-c0fc-41d6-8913-094fdce67053.png">


- 마이 페이지
![screencapture-localhost-3000-MyPage-2021-11-08-13_55_02](https://user-images.githubusercontent.com/62582301/140686354-dc962045-986d-4671-a8dd-d4da8b3c0d62.png)



- 나의 스터디 (가입한 스터디)
<img width="1440" alt="MyStudy" src="https://user-images.githubusercontent.com/62582301/140685785-80a1a014-e356-4a69-8af6-0975fb289802.png">


- 가입한 스터디 상세보기
<img width="1440" alt="MyStudyDetail" src="https://user-images.githubusercontent.com/62582301/140686632-ca9fd358-9b13-4b68-a371-755bf9d6b732.png">

- 스터디 멤버 관리
![screencapture-localhost-3000-StudyRoom-207-ManagementMember-2021-11-08-13_59_59](https://user-images.githubusercontent.com/62582301/140686721-e2de7624-cf03-4203-ae48-fed75f2954c7.png)


- 모임 생성
![screencapture-localhost-3000-StudyRoom-207-MakeGathering-2021-11-08-14_00_55](https://user-images.githubusercontent.com/62582301/140686794-39ab5c2f-0409-450e-8149-329c20af41dd.png)


- 모임 보기
![screencapture-localhost-3000-StudyRoom-207-GatheringList-2021-11-08-14_01_44](https://user-images.githubusercontent.com/62582301/140686870-123f06b2-1db6-4ff5-b8bf-524d90273cbb.png)


- 모임 상세 보기
![screencapture-localhost-3000-StudyRoom-207-GatheringDetail-7-2021-11-08-14_02_33](https://user-images.githubusercontent.com/62582301/140686940-b0b3a4ed-4651-42eb-ae53-a1a59da4bb6d.png)

- 채팅방 만들기
![screencapture-localhost-3000-StudyRoom-3-MakeChat-2021-11-17-14_52_49](https://user-images.githubusercontent.com/62582301/142142690-f1e5cbf4-8236-41eb-8d05-b76e957818b4.png)

- 채팅방
![screencapture-localhost-3000-StudyRoom-3-GatheringChat-3-2021-11-17-14_47_27](https://user-images.githubusercontent.com/62582301/142142173-7c09491c-8b25-4a91-979b-85abbe57aeab.png)


## 주요 기능 설명 📄
- **kakao auth**

```javascript
    const Login =  () => {
        kakao.Auth.login({
            success: function (authObj) {
                const AccessToken = JSON.stringify(authObj["access_token"]);
                
                let body = {
                    kakaoToken: kakao.Auth.getAccessToken()
                }
                dispatch(loginUser(body))
                .then(response => {
                    if(response.payload.isLogin){
                        window.location.href='/'
                    } else {
                        alert('로그인 실패')
                    }
                })
            },

            fail: function(err) {

            }
        }); 
    }
```
 카카오 auth api 에서 kakaoToken을 받아온 뒤 토큰을 헤더에 담아 서버에 로그인 요청을 보내면 서버 토큰을 받고 Session Storage 에 저장하여 요청을 보낼 때 사용한다.

- **kakao 위치 api**

```javascript
    useEffect(() => {
        const mapContainer = document.getElementById('selectedMap')
        const mapOptions = {
            center: new kakao.maps.LatLng(selectedLet.current, selectedLen.current),
            level: 5,
            draggable: false,
        }
        const map = new kakao.maps.Map(mapContainer, mapOptions)
    }, [selectedLet.current, selectedLen.current])
```
 지역이 선택되면 해당 지역의 좌표값을 가지고 맵을 보여준다.

 - **FCM 알림**
 
 ```javascript
    useEffect(async() => {

    const config =  { 
      apiKey: "apiKey",
      authDomain: "study-forest.firebaseapp.com",
      projectId: "study-forest",
      storageBucket: "study-forest.appspot.com",
      messagingSenderId: "messagingSenderId",
      appId: "appId",
      measurementId: "measurementId"
    }; 
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
  
  await messaging.requestPermission()
  .then(async () => {
    console.log('fcm 허가!');
    const FCMToken = await messaging.getToken({ vapidKey: 'vapiKey' });
    window.sessionStorage.setItem('FCMToken', FCMToken)
    //토큰을 받는 함수를 추가!
  })
  .catch(function(err) {
    console.log('fcm에러 : ', err);
  })
 ```
  App.js 가 렌더링 되면서 FCM 토큰을 받고 로그인을 하며 FCM 토큰을 보내, 알림이 울리도록 설정함.

  ```javascript
  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config =  { 
    apiKey: "apiKey",
    authDomain: "study-forest.firebaseapp.com",
    projectId: "study-forest",
    storageBucket: "study-forest.appspot.com",
    messagingSenderId: "messagingSenderId",
    appId: "appId",
    measurementId: "measurementId"
}; 
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const title  =  payload.data.title;
	const options  = {
		body: payload.data.message,
	};
    console.log(payload);
	return self.registration.showNotification(title, options);
})
  ```
 background에서 알림을 받을 수 있도록 public 폴더 안에 서비스 워커를 등록

- **채팅***

```javascript
    const connect = async () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://211.37.147.101:8000/chat-service/ws-stomp"), // proxy를 통한 접속
            connectHeaders: {
                'token': window.sessionStorage.getItem('accessToken'),
            },
            debug: function (str) {

            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: (frame) => {

                subscribe();
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();
        await pullMessage()
    };

    const disconnect = async () => {
        client.current.deactivate();
        await setprevMessage([])
    };
    
    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${chatId}`, ({ body }) => {
            setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
        },{"token":window.sessionStorage.getItem('accessToken')});
    };

    const publish = async () => {
        if (!client.current.connected) {
            return;
        }
    
        client.current.publish({
            destination: "/pub/chat/message",
            headers:{
                token: window.sessionStorage.getItem('accessToken'),
            },    
            body: JSON.stringify({ roomId: chatId, sender: window.sessionStorage.getItem('nickName'), message: Message }),
        });
        setMessage("");
    };
```
 서버와 Stomp로 메세지를 주고 받고 하며, publish로 메세지를 보내고  subscribe로 들어간 채팅의 알림을 받아올 수 있도록 하였다.


- **배포**
 배포는 헤로쿠를 통해 하였다.
## 보완 사항 ⚠️

- 깃허브를 개인마다 만들어 branch를 활용해보지 못함
- className을 camelCase와 snake-case를 둘다 사용하여 가독성에 문제가 있고 같은 className을 사용하여 예상치 못한 디자인이 나옴
- 파일들의 정리가 잘 안되어 있어, 협업이였다면 문제가 될 소지가 있음
- Redux의 활용이 매우 적어 State의 관리가 제대로 이루어 지지 않음
- API.js 또한 각 카테고리 별로 나누어 만들면 좋았을거 같음
- 서버에 https로 요청하면 ssl에러가 터짐, 배포시에 문제가 됨
- css에 media 쿼리를 사용하지 못함