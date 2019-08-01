import React, { useState, useEffect } from 'react';
import DataManager from '../../database/DataManager.js';
import FileManager from '../../file/FileManager.js';
import AuthManager from '../../auth/AuthManager.js';
import AddTodoForm from './AddTodoForm.js';
import LoadingIcon from '../Utility/LoadingIcon.js';

const AddTodo = (props) => {
  const [saveError, setSaveError] = useState('');
  const [nowLoading, setNowLoading] = useState(true);

  const saveTodo = async (title, desc, image, isEmptyFile) => {
    let filePath = "";
    if (!isEmptyFile) {
      const uploadResult = await FileManager.upload(image, AuthManager.getUserId())
                                            .catch((error) => {
                                              setUploadError(error);
                                              return null;
                                            });

      //アップロードに失敗した場合TODO登録はしない
      if (uploadResult === null) return;

      filePath = uploadResult.metadata.fullPath;
    }

    setNowLoading(true);

    await DataManager.saveTodo(title, desc, filePath, new Date(), AuthManager.getUserId())
                     .catch((error) => {
                       setSaveError("追加に失敗しました。再度お試しください。")
                     });

    setNowLoading(false);
  }

  const setUploadError = (error) => {
    switch (error.code) {
      case "storage/unknown":
        setSaveError("ファイルのアップロード中にエラーが発生しました");
        break;
      case "storage/retry-limit-exceeded":
        setSaveError("ファイルのアップロード中にタイムアウトしました。回線状況を確認し再度お試しください");
        break;
      case "storage/canceled":
        setSaveError("ファイルのアップロードがキャンセルされました");
        break;
      case "storage/cannot-slice-blob":
        setSaveError("ファイルが選択後に変更されました。再選択してください");
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
        <span>
          <LoadingIcon />
        </span>:
        <span>
          <h1>新規追加画面</h1>
          <p><font color="red">{saveError}</font></p>
          <AddTodoForm
            saveTodo={(e, title, desc, image) => saveTodo(e, title, desc, image)}
          />
        </span>
      }
    </span>
  );
}

export default AddTodo;
