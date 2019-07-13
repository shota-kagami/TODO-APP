import React from 'react';
import { Link } from 'react-router-dom';
import AuthManager from '../../auth/AuthManager.js';

const Header = (props) => {
  const logout = async (e) => {
    e.preventDefault();
    await AuthManager.logout();
    props.history.push('/');
  }

  return (
    <div name="header">
      <p>
        <li><Link to="/top">トップ画面へ</Link></li>
        <li><Link to="/list">一覧画面</Link></li>
        <li><Link to="/add">新規追加</Link></li>
        <li><Link to="/" onClick={(e) => logout(e)}>ログアウト</Link></li>
      </p>
    </div>
  );
}

export default Header;
