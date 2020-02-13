import React, { useState, useEffect } from 'react';
import DataManager from '../../database/DataManager.js';
import FileManager from '../../file/FileManager.js';
import AuthManager from '../../auth/AuthManager.js';
import LoadingIcon from '../Utility/LoadingIcon.js';
import EditTodoForm from './EditTodoForm.js';

const EditTodo = (props) => {
  //state
  const [saveError, setSaveError] = useState("");
  const [nowLoading, setNowLoading] = useState(true);
  const documentId = props.location.state.todo.id;

  const updateTodo = async (todoInfo) => {
    setNowLoading(true);

    //画像ファイルが存在する場合アップロード
    let filePath = "";
    if (!(todoInfo.imageFile === null || todoInfo.imageFile === "")) {
      const uploadResult = await FileManager.upload(todoInfo.ImageFile, AuthManager.getUserId())
                                            .catch((error) => {
                                              setErrorMessage(error);
                                              setNowLoading(false);
                                              return null;
                                            });

      //アップロードに失敗した場合TODO登録はしない
      if (uploadResult === null) return;

      filePath = uploadResult.metadata.fullPath;
    }

    //imageフィールドに保存先パスを代入　※新規選択されなければ保存済みのパスをそのまま入れる
    todoInfo.image = (filePath === null || filePath === "") ? props.location.state.todo.image : filePath;
    delete todoInfo.imageFile;
    await DataManager.updateTodo(AuthManager.getUserId(), documentId, todoInfo)
                     .catch((e) => {
                       setSaveError("更新に失敗しました。再度お試しください。");
                       setNowLoading(false);
                       return;
                     });

    props.editEnd(todoInfo);
  }

  const setErrorMessage = (error) => {
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
        setSaveError("ファイルのアップロードに失敗しました。");
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
        </span>
        :
        <span>
          <div name="title">新規追加画面</div>
          <p><font color="red">{saveError}</font></p>
          <EditTodoForm
            todo={props.location.state.todo}
            updateTodo={(todoInfo) => updateTodo(todoInfo)}
            editCancel={(beforeEditTodo) => props.editEnd(beforeEditTodo)}
          />
        </span>
      }
    </span>
  );
}

export default EditTodo;
