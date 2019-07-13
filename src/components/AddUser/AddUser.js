import React, { useState, useEffect } from 'react';
import AuthManager from '../../auth/AuthManager.js';
import LoadingIcon from '../Utility/LoadingIcon.js';

const AddUser = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nowLoading, setNowLoading] = useState(true);

  const registUser = async (e) => {
    e.preventDefault();

    //入力内容のチェック
    const emailErrorMessage = checkEmail();
    const passwordErrorMessage = checkPassword();

    if (emailErrorMessage === "" && passwordErrorMessage === "") {
      setNowLoading(true);

      let errorInfo;
      //ユーザー登録
      const user = await AuthManager.addUser(email, password).catch((error) => {
        errorInfo = error;
        return null;
      });

      //user情報がNull = 登録に失敗した場合エラーメッセージを表示
      if (user !== null) {
        setRegistErrorMessage(errorInfo.code);
        console.log(errorInfo.code, errorInfo.message);
      }
      //ユーザー登録に成功した場合、ユーザーIDをキャッシュに保持
      else {
        AuthManager.saveIdInLocalStorage(user.uid);
        props.history.push("/top");
      }

      setNowLoading(false);
    }
    else {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
    }
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

  //サーバー側のエラーメッセージをセット
  const setRegistErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setEmailError("入力されたメールアドレスは既に登録されています。");
        break;
      case "auth/invalid-email":
        setEmailError("入力されたメールアドレスに誤りがあります。");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setNowLoading(false);
  }, []);

  return (
    <span>
      {nowLoading ?
        <LoadingIcon /> :
        <form onSubmit={(e) => registUser(e)}>
          <div>
            メールアドレス : <input
                          autoFocus
                          noValidate
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmailError("");
                            setEmail(e.target.value)
                          }}
                         />
            <font color="red">{emailError}</font>
          </div>
          <div>
            　パスワード　 : <input
                          noValidate
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPasswordError("");
                            setPassword(e.target.value)
                          }}
                        />
           <font color="red">{passwordError}</font>
          </div>
          <div>
            <button type="submit" id="registButton">登録</button>
          </div>
          <div>
            <button type="button" id="movePageButton-toLogin" onClick={() => props.history.push('/')}>ログイン画面</button>
          </div>
        </form>
      }
    </span>
  );
}

export default AddUser;
