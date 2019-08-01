import React, { useState } from 'react';
import checkInput from '../Utility/InputValidator.js';

const DetailEditForm = (props) => {
  const todo = props.todo;
  const targetId = todo.id;
  //入力内容保持用State
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoDescription, setTodoDescription] = useState(todo.description);
  const [todoImage, setTodoImage] = useState('');
  //エラーメッセージ表示用State
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [fileError, setFileError] = useState('');

  const inputValidation = (e) => {
    e.preventDefault();

    //エラーが存在する場合登録処理を行わない
    const inputCheckResult = checkInput(todoTitle, todoDescription, todoImage);
    if (isExistsError(inputCheckResult)) {
      setInputError(inputCheckResult);
      return;
    }

    //エラーがなければ更新処理へ
    props.updateTodo(todoTitle, todoDescription, todoImage, inputCheckResult.emptyFile);
  }

  const isExistsError = (result) => {
    if (result.emptyTitle) return true;
    if (result.emptyDescription) return true;
    if (!result.emptyFile && result.fileIsNotImage) return true;

    return false;
  }

  const setInputError = (result) => {
    if (result.emptyTitle) setTitleError("タイトルを入力してください");
    if (result.emptyDescription) setDescriptionError("説明を入力してください");
    if (!result.emptyFile && result.fileIsNotImage) setFileError("ファイルは画像のみ選択可能です");
  }

  return(
    <span>
      <form onSubmit={(e) => inputValidation(e)}>
        <div>
          <p style={{margin: "20px 5px 0px 0px"}}>タイトル</p>
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
              setTitleError("");
            }}
          />
          <font color="red">&emsp;{titleError}</font>
        </div>
        <div>
          <p style={{margin: "20px 5px 0px 0px"}}>説明</p>
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
          <font color="red">&emsp;{descriptionError}</font>
        </div>
        <div>
          <p style={{margin: "20px 5px 0px 0px"}}>画像登録</p>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setTodoImage(e.target.files.item(0));
              setFileError("");
            }}
          />
          <font color="red">&emsp;{fileError}</font>
        </div>
        <div style={{margin: "20px 0px"}}>
          <button type="submit">更新</button>&emsp;
          <button onClick={() => props.changeViewMode()}>キャンセル</button>
        </div>
      </form>
    </span>
  )
}

export default DetailEditForm;
