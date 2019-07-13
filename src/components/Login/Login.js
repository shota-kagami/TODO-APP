import React, { useState, useEffect } from 'react';
import AuthManager from '../../auth/AuthManager.js';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();

    let errorInfo;
    const data = await AuthManager.login(email, password).catch((error) => {
      errorInfo = error;
      return null;
    });

    if (data === null) {
      setLoginError(errorInfo.message);
      return;
    }

    AuthManager.saveIdInLocalStorage(data.user.uid);
    props.history.push('/top');
  }

  const setLoginError = (errorCode) => {
    switch (errorCode) {

    }
  }

  useEffect(() => {

  },[]);

  return (
    <span>
      <form onSubmit={(e) => login(e)}>
        <div>
          メールアドレス : <input
                        type="text"
                        name="userId"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                       />
        </div>
        <div>
          　パスワード　 : <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
        </div>
        <div>
          <button type="submit" id="loginButton">ログイン</button>
        </div>
        <div>
          <button type="button" id="movePageButton-toRegistUser" onClick={() => props.history.push('/adduser')}>ユーザー登録</button>
        </div>
      </form>
    </span>
  );
}

export default Login;
