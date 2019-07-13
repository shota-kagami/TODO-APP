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
    let errorInfo;
    const allTodoList = await DataManager.getTodo(AuthManager.getUserId()).catch((error) => {
      errorInfo = error;
      return null;
    });

    if (allTodoList === null) {
      //TODO エラー表示
      return;
    }

    setAllTodoList(allTodoList);
    setTodoList(allTodoList);
    setNowLoading(false);
  }

  const searchTodo = (e, title, description) => {
    e.preventDefault();

    setTodoList(allTodoList.filter((todo) => {
      return (existsWord(todo.title, title) && existsWord(todo.description, description));
    }));
  }

  const deleteTodo = async (id) => {
    setNowLoading(true);
    
    const result = await DataManager.deleteTodo(AuthManager.getUserId(), id);

    getTodo();
  }

  const existsWord = (target, searchWord) => {
    if (searchWord === null || searchWord === "") return true;

    const regexp = new RegExp(searchWord, "i");
    return (regexp.test(target));
  }

  useEffect(() => {
    getTodo();
  }, [])

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
