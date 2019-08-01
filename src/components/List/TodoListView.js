import React from 'react';

const TodoListView = (props) => {
  return(
    <div style={{marginTop: '20px'}}>
      <table>
        <thead>
          <tr>
            <th width="10%">TODO ID</th>
            <th width="30%">TODO タイトル</th>
            <th width="50%">TODO 説明</th>
            <th width="5%">詳細</th>
            <th width="5%">削除</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((todo, index) => (
            <tr key={`todo${index + 1}`} height="50px">
              <td align="center">{index + 1}</td>
              <td align="center">{todo.title}</td>
              <td>{todo.description}</td>
              <td align="center"><button name="detailButton" onClick={() => props.showDetail({todo}, {index})}>詳細</button></td>
              <td align="center"><button name="deleteButton" onClick={() => props.onDelete(todo.id)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoListView;
