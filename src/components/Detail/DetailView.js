import React from 'react';

const DetailView = (props) => {
  return(
    <span>
      <h1>詳細画面</h1>
      <div>
        <div>
          TODO ID : {props.index}
        </div>
        <div>
          TODO タイトル
          <div>
            {props.todo.title}
          </div>
        </div>
        <div>
          TODO 詳細説明
          <div>
            {props.todo.description}
          </div>
        </div>
        <div>
          登録画像
          <div>
            <img src={props.imageSrc} alt="画像なし" />
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => props.onEditTodo()}>編集</button>
      </div>
    </span>
  )
}

export default DetailView;
