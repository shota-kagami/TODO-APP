import React from 'react';

const TodoListView = (props) => {
  return(
    <div>
      <table style={{"width" : "100%"}}>
        <thead>
          <tr>
            <th style={{"width" : "10%"}}>TODO ID</th>
            <th style={{"width" : "30%"}}>TODO タイトル</th>
            <th style={{"width" : "40%"}}>TODO 説明</th>
            <th style={{"width" : "10%"}}>詳細</th>
            <th style={{"width" : "10%"}}>削除</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((todo, index) => (
            <tr key={`todo${index + 1}`}>
              <td style={{"width" : "10%", "textAlign" : "center"}}>{index + 1}</td>
              <td style={{"width" : "30%", "textAlign" : "center"}}>{todo.title}</td>
              <td style={{"width" : "40%", "textAlign" : "center"}}>{todo.description}</td>
              <td style={{"width" : "10%", "textAlign" : "center"}}><button name="detailButton" onClick={() => props.showDetail({todo})}>詳細</button></td>
              <td style={{"width" : "10%", "textAlign" : "center"}}><button name="deleteButton" onClick={() => props.onDelete(todo.id)}>削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoListView;
