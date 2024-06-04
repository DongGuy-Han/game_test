import React from 'react';
import { useNavigate } from "react-router-dom";
import srchicon from './test_image/srchicon.svg';
import './css/NavBar.css'; // CSS 파일 추가

const NavBar = ({ isLoggedIn, handleLogout, handleLogin, handleSignup, textValue, handleSetValue, handleKeyDown }) => {
    const navigate = useNavigate();

    const handleMain = () => navigate(`/`);

    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <div className='navbar-content'>
                    <div className='left-content' onClick={handleMain}>
                        <div className='header-logo'></div>
                        <a className='game-tour-text'>GAME TOUR</a>
                    </div>
                    <div className='right-content'>
                        <div className='srch'>
                            <img src={srchicon} width='20px' alt='Search Icon'></img>
                            <textarea
                                placeholder='검색어를 입력해주세요'
                                value={textValue}
                                onChange={handleSetValue}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        {isLoggedIn ? (
                            <button onClick={handleLogout}>로그아웃</button>
                        ) : (
                            <div className="auth-buttons">
                                <button onClick={handleLogin}>로그인</button>
                                <button onClick={handleSignup}>회원가입</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
