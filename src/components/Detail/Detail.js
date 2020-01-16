import React, { useState, useEffect } from 'react';
import DetailView from './DetailView.js';
import LoadingIcon from '../Utility/LoadingIcon.js';
import AuthManager from '../../auth/AuthManager.js';
import FileManager from '../../file/FileManager.js';
import DataManager from '../../database/DataManager.js';
import noImage from '../../image/noImage.png';

const Detail = (props) => {
  const [todo, setTodo] = useState('');
  const [nowLoading, setNowLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(noImage);
  const todoId = props.location.state.id;
  const index = props.location.state.index;

  const getTodo = async () => {
    const todo = await DataManager.getOnceTodo(AuthManager.getUserId(), todoId);
    const imageSource = await getImage(todo.image);

    setTodo(todo);
    if (!imageSource === null) setImageSrc(imageSource);

    setNowLoading(false);
  }

  const getImage = async (image) => {
    if (image === null || image === "") {
      return null;
    }

    const downloadURL = await FileManager.download(image).catch((error) => {
      return null;
    });

    return downloadURL;
  }

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <span>
      {nowLoading ?
        <LoadingIcon /> :
        <DetailView
          todo={todo}
          index={index}
          imageSrc={imageSrc}
          onEditTodo={() => props.onEditTodo(todo, index)}
        />
      }
    </span>
  );
}

export default Detail;
