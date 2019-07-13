import React, { useState } from 'react';
import DataManager from '../../database/DataManager.js';
import FileManager from '../../file/FileManager.js';
import AuthManager from '../../auth/AuthManager.js';

const AddTodo = (props) => {
  //state
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoImage, setTodoImage] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [fileError, setFileError] = useState('');

  const updateTodo = async (e) => {
    e.preventDefault();

    //タイトルまたは説明が空ならエラー
    if (isInputEmpty()) return;

    //画像ファイルが存在する場合アップロード
    let filePath = "";
    if (!isFileEmpty() && isFileImage()) {
      const uploadResult = await FileManager.upload(todoImage, AuthManager.getUserId()).catch((error) => {
        setUploadError(error);
        return null;
      });

      //アップロードに失敗した場合TODO登録はしない
      if (uploadResult === null) return;

      filePath = uploadResult.metadata.fullPath;
    }

    DataManager.saveTodo(todoTitle, todoDescription, filePath, new Date(), AuthManager.getUserId());
  }

  const isInputEmpty = () => {
    const isTitleEmpty = (todoTitle === null || todoTitle === "");
    const isDescEmpty = (todoDescription === null || todoDescription === "");

    if (isTitleEmpty) setTitleError("タイトルを入力してください");
    if (isDescEmpty) setDescriptionError("説明を入力してください");

    return (isTitleEmpty || isDescEmpty);
  }

  const isFileEmpty = () => {
    return (todoImage === null || todoImage === "")
  }

  const isFileImage = () => {
    //許可するファイルタイプのリスト
    const fileTypeList = ["image/jpeg", "image/png", "image/bmp"];

    //許可リストに含まれているかチェック
    if (fileTypeList.includes(todoImage.type)) {
      return true;
    }
    else {
      setFileError("画像ファイルを選択してください");
      return false;
    }
  }

  const setUploadError = (error) => {
    switch (error.code) {
      case "storage/unknown":
        setFileError("ファイルのアップロード中にエラーが発生しました");
        break;
      case "storage/retry-limit-exceeded":
        setFileError("ファイルのアップロード中にタイムアウトしました。回線状況を確認し再度お試しください");
        break;
      case "storage/canceled":
        setFileError("ファイルのアップロードがキャンセルされました");
        break;
      case "storage/cannot-slice-blob":
        setFileError("ファイルが選択後に変更されました。再選択してください");
        break;
      default:
        break;
    }
  }

  return (
    <span>
      <div name="title">新規追加画面</div>
      <form onSubmit={(e) => saveTodo(e)}>
        <div>
          <p style={{margin: "10px 0px"}}>TODO タイトル : <font color="red">{titleError}</font></p>
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
              setTitleError("");
            }}
          />
        </div>
        <div>
          <p style={{margin: "10px 0px"}}>TODO 説明 : <font color="red">{descriptionError}</font></p>
          <textarea
            name="description"
            rows="8"
            cols="80"
            value={todoDescription}
            onChange={(e) => {
              setTodoDescription(e.target.value);
              setDescriptionError("");
            }}
          >
          </textarea>
        </div>
        <div>
          <p style={{margin: "10px 0px"}}>画像登録 : <font color="red">{fileError}</font></p>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setTodoImage(e.target.files.item(0));
              setFileError("");
            }}
          />
        </div>
        <div style={{margin: "10px 0px"}}>
          <button type="submit">登録</button>
        </div>
      </form>
    </span>
  );
}

export default AddTodo;
