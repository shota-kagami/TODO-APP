import React, { useState, useEffect } from 'react';
import AuthManager from '../../auth/AuthManager.js';
import LoginForm from './LoginForm.js';
import LoadingIcon from '../Utility/LoadingIcon.js';

const Login = (props) => {
  const [loginError, setLoginError] = useState('');
  const [nowLoading, setNowLoading] = useState(true);

  const login = async (email, password) => {
    setNowLoading(true);

    //メールアドレスとパスワードでログイン
    const data = await AuthManager.login(email, password).catch((error) => {
      setErrorMessage(error.code);
      console.log(error.code, error.message);
      return null;
    });

    //ログイン失敗時は画面遷移せずエラー表示
    if (data === null) {
      setNowLoading(false);
      return;
    }

    //ログイン成功時トップ画面へ遷移
    AuthManager.saveIdInLocalStorage(data.user.uid);
    props.history.push('/top');
  }

  //firebaseから返されたエラーコードをもとにエラーメッセージを設定
  const setErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        setLoginError("メールアドレスに誤りがあります。");
        break;
      case "auth/user-disabled":
        setLoginError("そのユーザーは無効です。");
        break;
      case "auth/user-not-found":
        setLoginError("ユーザーが見つかりません。メースアドレスまたはパスワードに誤りがないか確認してください。");
        break;
      case "auth/wrong-password":
        setLoginError("パスワードに誤りがあります。");
        break;
      default:
        setLoginError("ログインに失敗しました。再度お試しください。");
        break;
    }
  }

  useEffect(() => {
    setNowLoading(false);
  }, []);

  return (
    <span>
      {nowLoading ?
        <LoadingIcon />
        :
        <span>
          <font color="red">{loginError}</font>
          <LoginForm login={(email, password) => login(email, password)} />
          <div>
            <button 
              type="button"
              id="movePageButton-toAddUser"
              onClick={() => props.history.push('/adduser')}
            >
              ユーザー登録
            </button>
          </div>
        </span>
      }
    </span>
  );
}

export default Login;
