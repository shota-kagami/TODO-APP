import React, { useState, useEffect } from 'react';
import AuthManager from '../../auth/AuthManager.js';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const emailErrorMessage = checkEmail();
    const passwordErrorMessage = checkPassword();

    if (!(emailErrorMessage === "" && passwordErrorMessage === "")) {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      return;
    }

    const data = await AuthManager.login(email, password).catch((error) => {
      setLoginErrorMessage(error.code);
      return null;
    });

    if (data === null) return;

    AuthManager.saveIdInLocalStorage(data.user.uid);
    props.history.push('/top');
  }

  const checkEmail = () => {
    //Nullチェック
    if (email === "" || email === null) return "メールアドレスは必須です";

    //メールアドレスの形式チェック
    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regex.test(email)) return "メールアドレスの形式に誤りがあります";

    return (emailError === "") ? "" : emailError;
  }

  const checkPassword = () => {
    //Nullチェック
    if (password === "" || password === null) return "パスワードは必須です";

    //パスワードの形式＆形式チェック
    const regex = /[a-zA-Z0-9]{6,12}/;
    if (!regex.test(password)) return "パスワードは6文字以上の英数字で入力してください";

    return (passwordError === "") ? "" : passwordError;
  }


  const setLoginErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        setLoginError("ユーザーが見つかりません。メールアドレス及びパスワードをご確認ください。");
        break;
      default:
        break;
    }
  }

  return (
    <span>
      <p>
        <font color="red">{loginError}</font>
      </p>
      <form onSubmit={(e) => login(e)}>
        <div>
          メールアドレス : <input
                        type="text"
                        name="userId"
                        value={email}
                        onChange={(e) => {
                          setEmailError("");
                          setEmail(e.target.value)
                        }}
                        autoFocus
                       />
          <font color="red">{emailError}</font>
        </div>
        <div>
          　パスワード　 : <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPasswordError("");
                          setPassword(e.target.value);
                        }}
                      />
          <font color="red">{passwordError}</font>
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
