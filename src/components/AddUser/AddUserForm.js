import React, { useState } from 'react';
import ValidateAuthInput from '../Utility/AuthInputValidator.js';

const AddUserForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({emailError : "", passwordError : ""});
 
  const tryAddUser = async (e) => {
    e.preventDefault();

    //入力値チェック
    const errors = ValidateAuthInput(email, password);
    if (!(errors === null)) {
      setInputErrors(errors);
      return;
    }

    //入力値が有効ならログイン処理実行
    props.addUser(email, password);
  }

  return (
    <span>
      <form onSubmit={(e) => tryAddUser(e)}>
        <div>
          メールアドレス: &nbsp;
          <input
            autoFocus
            noValidate
            type="text"
            name="email"
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
          &nbsp; <font color="red">{inputErrors.emailError}</font>
        </div>
        <div>
          パスワード: &nbsp; 
          <input
            noValidate
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
          &nbsp; <font color="red">{inputErrors.passwordError}</font>
        </div>
        <div>
          <button type="submit" id="registButton">登録</button>
        </div>
      </form>
    </span>
  );
}

export default AddUserForm;
