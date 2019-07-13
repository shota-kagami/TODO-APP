import React from 'react';

const TodoListView = (props) => {
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>TODO ID</th>
            <th>TODO タイトル</th>
            <th>TODO 説明</th>
            <th>詳細</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((todo, index) => (
            <tr key={`todo${index + 1}`}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td><button name="detailButton" onClick={() => props.showDetail({todo})}>詳細</button></td>
              <td><button name="deleteButton" onClick={() => props.onDelete(todo.id)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoListView;
