import React, { useState, useEffect } from 'react';
import EditTodoForm from './EditTodoForm.js';
import DataManager from '../../database/DataManager.js';
import FileManager from '../../file/FileManager.js';
import AuthManager from '../../auth/AuthManager.js';
import LoadingIcon from '../Utility/LoadingIcon.js';

const EditTodo = (props) => {
  const [saveError, setSaveError] = useState('');
  const [nowLoading, setNowLoading] = useState(true);
  const todo = props.location.state.todo;
  const index = props.location.state.index;

  const updateTodo = async (title, desc, image, isEmptyFile) => {
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

    await DataManager.updateTodo(title, desc, filePath, new Date(), AuthManager.getUserId(), todo.id)
                     .catch((error) => {
                       setSaveError("更新に失敗しました。再度お試しください。")
                       return;
                     });

    props.showDetail(todo.id, index);
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
        <LoadingIcon />:
        <span>
          <h1>詳細編集画面</h1>
          <p><font color="red">{saveError}</font></p>
          <EditTodoForm
            todo={todo}
            updateTodo={(title, desc, image, isEmptyFile) => updateTodo(title, desc, image, isEmptyFile)}
          />
        </span>
      }
    </span>
  );
}

export default EditTodo;
