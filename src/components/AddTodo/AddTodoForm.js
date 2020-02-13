import React, { useState } from 'react';
import ValidateTodoInput from '../Utility/TodoInputValidator.js';

const AddTodoForm = (props) => {
  //state
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoImage, setTodoImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({"titleError": "", "descError": "", "imageError": ""});

  const trySaveTodo = (e) => {
    e.preventDefault();

    //必須項目が空またはファイルが画像以外の場合登録処理を行わない
    const errors = ValidateTodoInput(todoTitle, todoDescription, todoImage);
    if (!(errors === null)) {
      setInputErrors(errors);
      return;
    }

    //エラーがなければ登録処理へ
    const todoInfo = {
      "title" : todoTitle
      ,"description" : todoDescription
      ,"imageFile" : todoImage
      ,"date" : new Date()
    }

    props.saveTodo(todoInfo);
  }

  return(
    <span>
      <form onSubmit={(e) => trySaveTodo(e)}>
        <div>
          <p style={{margin: "20px 5px 0px 0px"}}>タイトル</p>
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
              if (!(inputErrors.titleError === "")) {
                setInputErrors((prev) => {
                  return {...prev, titleError : ""};
                });
              }
            }}
          />
          <font color="red">&emsp;{inputErrors.titleError}</font>
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
              if (!(inputErrors.descError === "")) {
                setInputErrors((prev) => {
                  return {...prev, descError : ""};
                });
              };
            }}
          >
          </textarea>
          <font color="red">&emsp;{inputErrors.descError}</font>
        </div>
        <div>
          <p style={{margin: "20px 5px 0px 0px"}}>画像登録</p>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setTodoImage(e.target.files.item(0));
              if (!(inputErrors.imageError === "")) {
                setInputErrors((prev) => {
                  return {...prev, imageError : ""};
                });
              }
            }}
          />
          <font color="red">&emsp;{inputErrors.imageError}</font>
        </div>
        <div style={{margin: "20px 0px"}}>
          <button type="submit">登録</button>
        </div>
      </form>
    </span>
  )
}

export default AddTodoForm;
