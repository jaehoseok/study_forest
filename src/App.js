import react, {useState} from 'react'

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

function App() {

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
                <Route exact path="/StudyRoom/:Id/GatheringNotice" component={GatheringNotice} />
                <Route exact path="/StudyRoom/:Id/MakeGathering" component={MakeGathering} />
                <Route exact path="/StudyRoom/:Id/GatheringChat" component={GatheringChat} />
              </Switch>
            
          </div>

          <div className="footer-box"><Footer/></div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
