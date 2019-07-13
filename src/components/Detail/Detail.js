import React, { useState, useEffect } from 'react';
import DetailView from './DetailView.js';
import LoadingIcon from '../Utility/LoadingIcon.js';
import FileManager from '../../file/FileManager.js';

const Detail = (props) => {
  const [nowLoading, setNowLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('https://placehold.jp/150x150.png');
  const todo = props.location.state.todo;

  const getImage = async () => {
    if (todo.image === null || todo.image === "") {
      setNowLoading(false);
      return;
    }

    const downloadURL = await FileManager.download(todo.image).catch((error) => {
      setNowLoading(false);
      return;
    });

    setImageSrc(downloadURL);
    setNowLoading(false);
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <span>
      {nowLoading ?
        <LoadingIcon /> :
        <DetailView
          todo={todo}
          imageSrc={imageSrc}
        />
      }
    </span>
  );
}

export default Detail;
