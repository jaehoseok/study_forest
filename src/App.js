import react, {useState, useEffect} from 'react'

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import LandingPage from './Components/LandingPage/LandingPage';
import MakeStudy from './Components/MakeStudy/MakeStudy';
import MyPage from './Components/MyPage/MyPage';
import InfoUpdate from './Components/InfoUpdate/InfoUpdate';
import LocationUpdate from './Components/LocationUpdate/LocationUpdate';
import StudyDetail from './Components/StudyDetail/StudyDetail';
import MyStudy from './Components/MyStudy/MyStudy';
import GatheringNotice from './Components/GatheringNotice/GatheringNotice';
import MakeGathering from './Components/MakeGathering/MakeGathering';
import GatheringChat from './Components/GatheringChat/GatheringChat';
import ManagementMember from './Components/ManagementMember/ManagementMember';
import ManagementStudy from './Components/ManagementStudy/ManagementStudy';
import GatheringHome from './Components/GatheringHome/GatheringHome';
import GatheringList from './Components/GatheringList/GatheringList';
import GatheringDetail from './Components/GatheringDetail/GatheringDetail';
import MakeChat from './Components/MakeChat/MakeChat';

import firebase from 'firebase'; //firebase모듈을 import해줘야 합니다.


function App() {

  useEffect(async() => {

    const config =  { 
      apiKey: "AIzaSyBK0Rkrkp5tf3PV-7wMUcZ67t5YIAmb_AI",
      authDomain: "study-forest.firebaseapp.com",
      projectId: "study-forest",
      storageBucket: "study-forest.appspot.com",
      messagingSenderId: "399146202149",
      appId: "1:399146202149:web:85cbaafdfef2093f137bcc",
      measurementId: "G-02VVMCPY3F"
    }; 
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
  
  await messaging.requestPermission()
  .then(async () => {
    console.log('허가!');
    const FCMToken = await messaging.getToken({ vapidKey: 'BM1PcX3baJoSE8Pxata-43yW6T5JVoW6G0EDxejyoUaH_axKO6wqjfU-hLAVF8cYeCIqZr3-i4PdcTRlX9Feuek' });
    window.sessionStorage.setItem('FCMToken', FCMToken)
    //토큰을 받는 함수를 추가!
  })
  .catch(function(err) {
    console.log('fcm에러 : ', err);
  })
  messaging.onTokenRefresh(() => {
    messaging.getToken({ vapidKey: 'BM1PcX3baJoSE8Pxata-43yW6T5JVoW6G0EDxejyoUaH_axKO6wqjfU-hLAVF8cYeCIqZr3-i4PdcTRlX9Feuek' })
    .then(function(refreshedToken) {
      window.sessionStorage.setItem('FCMToken', refreshedToken) //토큰이 재 생성될 경우 다시 저장
      console.log('Token refreshed.');
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });
  
  messaging.onMessage((payload) => {
    console.log(payload);
    alert(payload.data.title + '\n' + payload.data.message);
  })
  }, [])
  const [isLogin, setisLogin] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrap">

          <div className="header-box">
            <Header isLogin={isLogin} setisLogin={setisLogin}/>
          </div>

          <div className="web-container">
            {/* <SideBar isLogin={isLogin}/> */}
            {/* <NoticeBar/> */}

              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/MakeStudy" component={MakeStudy} />
                <Route exact path="/MyPage" component={MyPage} />
                <Route exact path="/InfoUpdate" component={InfoUpdate} />
                <Route exact path="/LocationUpdate" component={LocationUpdate} />
                <Route exact path="/StudyDetail/:Id" component={StudyDetail} />
                <Route exact path="/MyStudy" component={MyStudy} />
                <Route exact path="/StudyRoom/:Id/GatheringHome" component={GatheringHome} />
                <Route exact path="/StudyRoom/:Id/GatheringNotice" component={GatheringNotice} />
                <Route exact path="/StudyRoom/:Id/MakeGathering" component={MakeGathering} />
                <Route exact path="/StudyRoom/:Id/GatheringChat/:chatId" component={GatheringChat} />
                <Route exact path="/StudyRoom/:Id/ManagementMember" component={ManagementMember} />
                <Route exact path="/StudyRoom/:Id/ManagementStudy" component={ManagementStudy} />
                <Route exact path="/StudyRoom/:Id/GatheringList" component={GatheringList} />
                <Route exact path="/StudyRoom/:Id/GatheringDetail/:gatheringId" component={GatheringDetail} />
                <Route exact path="/StudyRoom/:Id/MakeChat" component={MakeChat} />
              </Switch>
            
          </div>

          <div className="footer-box"><Footer/></div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
