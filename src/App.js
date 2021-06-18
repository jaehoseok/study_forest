import react, {useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
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

function App() {

  const [isLogin, setisLogin] = useState(false)

  return (
    <div className="App">
      <div className="wrap">

        <div className="header-box">
          <Header isLogin={isLogin} setisLogin={setisLogin}/>
        </div>

        <div className="search-box"><Search/></div>

        <div className="container">
          <SideBar isLogin={isLogin}/>
          <NoticeBar/>
          {/* <LandingPage className='main'/> */}

          <BrowserRouter>
            <Switch>
              //todo 로그인이 필요한 경우: true, 로그인을 안해야 하는경우: false, 상관없는 경우: null
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/MakeStudy" component={MakeStudy} />
              <Route exact path="/MyPage" component={MyPage} />
            </Switch>
          </BrowserRouter>
        </div>

        <div className="footer-box"><Footer/></div>

      </div>
    </div>
  );
}

export default App;
