import './App.css';

import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import LandingPage from './Components/LandingPage/LandingPage';
import NoticeBar from './Components/NoticeBar/NoticeBar';
import Footer from './Components/Footer/Footer';
import Search from './Components/SearchMenu/SearchMenu';

function App() {
  return (
    <div className="App">
      <div className="wrap">

        <div className="header-box"><Header/></div>

        <div className="search-box"><Search/></div>

        <div className="container">
          <SideBar/>
          <NoticeBar/>
          <LandingPage className='main'/>
        </div>

        <div className="footer-box"><Footer/></div>

      </div>
    </div>
  );
}

export default App;
