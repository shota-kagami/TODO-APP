import React, { useState, useEffect } from 'react';
import LoadingIcon from '../Utility/LoadingIcon.js';
import SearchForm from './SearchForm.js';
import TodoListView from './TodoListView.js';
import DataManager from '../../database/DataManager.js';
import AuthManager from '../../auth/AuthManager.js';

const List = (props) => {
  const [allTodoList, setAllTodoList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  const getTodo = async () => {
    const allTodoList = await DataManager.getTodo(AuthManager.getUserId()).catch((error) => {
      setErrorMessage(error.code);
      console.log(error);
      return null;
    });

    if (allTodoList === null) {
      return;
    }

    setAllTodoList(allTodoList);
    setTodoList(allTodoList);
    setNowLoading(false);
  }

  //検索(部分一致)
  const searchTodo = (e, title, description) => {
    e.preventDefault();

    setTodoList(allTodoList.filter((todo) => {
      return (existsWord(todo.title, title) && existsWord(todo.description, description));
    }));
  }

  //削除
  const deleteTodo = async (id) => {
    setNowLoading(true);
    
    await DataManager.deleteTodo(AuthManager.getUserId(), id);

    getTodo();
  }

  //検索文字列が含まれるかどうか
  const existsWord = (target, searchWord) => {
    if (searchWord === null || searchWord === "") return true;

    const regexp = new RegExp(searchWord, "i");
    return (regexp.test(target));
  }

  //firebaseからのエラーコードをもとにメッセージを表示
  const setErrorMessage = () => {
    //reference見つからんので後で
  }

  useEffect(() => {
    getTodo();
  }, [])

  console.log(props);

  return (
    <span>
      {nowLoading ?
        <LoadingIcon /> :
        <span>
          <div>
            <div name="title">検索</div>
            <SearchForm
              onSubmit={(e, title, description) => searchTodo(e, title, description)}
            />
            <TodoListView
              list={todoList}
              showDetail={({todo}) => props.showDetail(todo)}
              onDelete={(id) => deleteTodo(id)}
            />
          </div>
        </span>
      }
    </span>
  );
}

export default List;
