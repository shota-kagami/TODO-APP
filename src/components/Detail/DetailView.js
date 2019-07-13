import React from 'react';

const DetailView = (props) => {
  return(
    <span>
      <div name="title">詳細画面</div>
      <div>
        <div>
          TODO ID : 1
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
            <img src={props.imageSrc} alt="" />
          </div>
        </div>
      </div>
      <div>
        <button>編集</button>
      </div>
    </span>
  )
}

export default DetailView;
