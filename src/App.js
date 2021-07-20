import react, {useState} from 'react'

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';

import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import NoticeBar from './Components/NoticeBar/NoticeBar';
import Footer from './Components/Footer/Footer';
import Search from './Components/SearchMenu/SearchMenu';

import LandingPage from './Components/LandingPage/LandingPage';
import MakeStudy from './Components/MakeStudy/MakeStudy';
import MyPage from './Components/MyPage/MyPage';
import InfoUpdate from './Components/InfoUpdate/InfoUpdate';
import LocationUpdate from './Components/LocationUpdate/LocationUpdate';

function App() {

  const [isLogin, setisLogin] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrap">

          <div className="header-box">
            <Header isLogin={isLogin} setisLogin={setisLogin}/>
          </div>

          <div className="container">
            <SideBar isLogin={isLogin}/>
            <NoticeBar/>

              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/MakeStudy" component={MakeStudy} />
                <Route exact path="/MyPage" component={MyPage} />
                <Route exact path="/InfoUpdate" component={InfoUpdate} />
                <Route exact path="/LocationUpdate" component={LocationUpdate} />
              </Switch>
            
          </div>

          <div className="footer-box"><Footer/></div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
