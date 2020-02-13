import React, { useState } from 'react';
import ValidateTodoInput from '../Utility/TodoInputValidator.js';

const EditTodoForm = (props) => {
  //state
  const [todoTitle, setTodoTitle] = useState(props.todo.title);
  const [todoDescription, setTodoDescription] = useState(props.todo.description);
  const [todoImage, setTodoImage] = useState(null);
  const [inputErrors, setInputErrors] = useState({"titleError": "", "descError": "", "imageError": ""});

  const tryUpdateTodo = async (e) => {
    e.preventDefault();

    //入力内容が有効でない場合は更新処理を行わない
    const errors = ValidateTodoInput(todoTitle, todoDescription, todoImage);
    if (!(errors === null)){
        setInputErrors(errors);
        return;
    }

    const todoInfo = {
        "title" : todoTitle
        ,"description" : todoDescription
        ,"imageFile" : todoImage
        ,"date" : new Date()
    }

    props.updateTodo(todoInfo);
  }

  return (
    <span>
      <form onSubmit={(e) => tryUpdateTodo(e)}>
        <div>
          <p style={{margin: "10px 0px"}}>TODO タイトル : <font color="red">{inputErrors.titleError}</font></p>
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
        </div>
        <div>
          <p style={{margin: "10px 0px"}}>TODO 説明 : <font color="red">{inputErrors.descError}</font></p>
          <textarea
            name="description"
            rows="8"
            cols="80"
            value={todoDescription}
            onChange={(e) => {
              setTodoDescription(e.target.value);
              if (!(inputErrors.descError === "")) {
                setInputErrors((prev) => {
                  return {...prev, descError : ""}
                });
              }
            }}
          >
          </textarea>
        </div>
        <div>
          <p style={{margin: "10px 0px"}}>画像登録 : <font color="red">{inputErrors.imageError}</font></p>
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
        </div>
        <div style={{margin: "10px 0px"}}>
          <button type="submit">登録</button> &nbsp;
          <button type="button" onClick={() => props.editCancel(props.todo)}>キャンセル</button>
        </div>
      </form>
    </span>
  );
}

export default EditTodoForm;
