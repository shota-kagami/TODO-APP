import React, { useState } from 'react';
import DetailEdit from './DetailEdit.js';
import DetailView from './DetailView.js';

const DetailContent = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <span>
      {isEditMode ?
        <DetailEdit
          todo={props.todo}
          id={props.id}
          setTodo={(todo) => props.setTodo(todo)}
          changeViewMode={() => setIsEditMode(false)}
        />:
        <DetailView
          todo={props.todo}
          id={props.id}
          imageSrc={props.imageSrc}
          changeEditMode={() => setIsEditMode(true)}
        />
      }
    </span>
  )
}

export default DetailContent;
