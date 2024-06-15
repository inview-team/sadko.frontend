import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faUser, faChartLine, faList } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import logo from '../img/logo.png';
import '../styles/Header.css';

export const Header = ({ setVideoData, setSearchQuery }) => {
  return (
    <header className="header" aria-label="Шапка сайта">
      <div className="menu-container">
        <div className="logo">
          <img src={logo} alt="Yappy логотип" width="80" height="24" decoding="async" />
        </div>
        <nav className="menu" aria-label="Главное меню">
          <ul>
            <li>
              <a href="/" className="menu-link" role="menuitem">
                <FontAwesomeIcon icon={faThumbsUp} className="icons" />
                <div className="text">Рекомендации</div>
              </a>
            </li>
            <li>
              <a href="/" className="menu-link" role="menuitem">
                <FontAwesomeIcon icon={faUser} className="icons" />
                <div className="text">Подписки</div>
              </a>
            </li>
            <li>
              <a href="/" className="menu-link" role="menuitem">
                <FontAwesomeIcon icon={faChartLine} className="icons" />
                <div className="text">Тренды</div>
              </a>
            </li>
            <li>
              <a href="/" className="menu-link" role="menuitem">
                <FontAwesomeIcon icon={faList} className="icons" />
                <div className="text">Подборки</div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='search-container'>
        <SearchBar setVideoData={setVideoData} setSearchQuery={setSearchQuery} />
      </div>
    </header>
  );
}

export default Header;
