import React, { useState } from 'react';
import ValidateAuthInput from '../Utility/AuthInputValidator.js';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({emailError : "", passwordError : ""});

  const tryLogin = async (e) => {
    e.preventDefault();

    //入力値チェック
    const errors = ValidateAuthInput(email, password);
    if (!(errors === null)) {
      setInputErrors(errors);
      return;
    }

    //入力値が有効ならログイン処理実行
    props.login(email, password);
  }

  return (
    <span>
      <form onSubmit={(e) => tryLogin(e)}>
        <div>
          メールアドレス: &nbsp;
          <input
            type="text"
            name="userId"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!(inputErrors.emailError === "")) {
                setInputErrors((prev) => {
                  return {...prev, emailError : ""};
                });
              }
            }}
          />
          &nbsp;<font color="red">{inputErrors.emailError}</font>
        </div>
        <div>
          パスワード: &nbsp;
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!(inputErrors.passwordError === "")) {
                setInputErrors((prev) => {
                  return {...prev, passwordError : ""};
                });
              }
            }}
          />
          &nbsp;<font color="red">{inputErrors.passwordError}</font>
        </div>
        <div>
          <button type="submit" id="loginButton">ログイン</button>
        </div>
      </form>
    </span>
  );
}

export default LoginForm;
