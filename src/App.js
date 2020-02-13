import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Top from './components/Top/Top.js';
import Login from './components/Login/Login.js';
import List from './components/List/List.js';
import Detail from './components/Detail/Detail.js';
import EditTodo from './components/Edit/EditTodo.js';
import AddTodo from './components/AddTodo/AddTodo.js';
import AddUser from './components/AddUser/AddUser.js';

const App = (props) => {
  const showDetail = (props, todo) => {
    props.history.push({
      pathname: "/detail",
      state: {todo: todo}
    });
  }

  const editStart = (props, todo) => {
    props.history.push({
      pathname : "/edit",
      state : {todo : todo}
    });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path='/adduser' component={AddUser} />
        <Route component={Header} />
      </Switch>
      <Route path="/top" component={Top} />
      <Route path="/add" component={AddTodo} />
      <Route path="/list" render={props => <List showDetail={todo => showDetail(props, todo)} {...props} />}/>
      <Route path="/detail" render={props => <Detail editStart={todo => editStart(props, todo)} {...props} />} />
      <Route path="/edit" render={props => <EditTodo editEnd={todo => showDetail(props, todo)} {...props} />}/>
    </BrowserRouter>
  );
}

export default App;
