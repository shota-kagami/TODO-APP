import React, { useState, useEffect } from 'react';
import AuthManager from '../../auth/AuthManager.js';
import LoadingIcon from '../Utility/LoadingIcon.js';
import AddUserForm from './AddUserForm.js';

const AddUser = (props) => {
  const [AddError, setAddError] = useState('');
  const [nowLoading, setNowLoading] = useState(true);

  const addUser = async (email, password) => {
    setNowLoading(true);

    //ユーザー登録
    const user = await AuthManager.addUser(email, password).catch((error) => {
      setErrorMessage(error.code);
      return null;
    });

    //登録失敗時は画面遷移せずエラーメッセージを表示
    if (user === null) {
      setNowLoading(false);
      return;
    }

    //登録成功時はトップ画面へ遷移
    AuthManager.saveIdInLocalStorage(user.uid);
    props.history.push("/top");
  }

  //firebaseから返されたエラーコードをもとにエラーメッセージを設定
  const setErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setAddError("入力されたメールアドレスは既に登録済みです。");
        break;
      case "auth/invalid-email":
        setAddError("入力されたメールアドレスに誤りがあります。");
        break;
      case "auth/operation-not-allowed":
        setAddError("そのユーザーは無効です。");
        break;
      case "auth/weak-password":
        setAddError("パスワードの強度が不足しています。英大文字、小文字、数字を含めて再度お試しください。");
        break;
      default:
        setAddError("ユーザー登録に失敗しました。再度お試しください。");
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
        <span>
          <font color="red">{AddError}</font>
          <AddUserForm addUser={(email, password) => addUser(email, password)} />
          <div>
            <button 
              type="button"
              id="movePageButton-toLogin"
              onClick={() => props.history.push('/')}
            >
              ログイン画面
            </button>
          </div>
        </span>
      }
    </span>
  );
}

export default AddUser;
