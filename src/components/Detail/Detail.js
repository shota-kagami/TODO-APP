import React, { useState, useEffect } from 'react';
import DetailContent from './DetailContent.js';
import LoadingIcon from '../Utility/LoadingIcon.js';
import FileManager from '../../file/FileManager.js';
import noImage from '../../image/noImage.png';

const Detail = (props) => {
  const [nowLoading, setNowLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(noImage);
  const [todoDetail, setTodoDetail] = useState(props.location.state.todo);
  const id = props.location.state.id;

  const getImage = async () => {
    if (todoDetail.image === null || todoDetail.image === "") {
      setNowLoading(false);
      return;
    }

    const downloadURL = await FileManager.download(todoDetail.image).catch((error) => {
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
        <DetailContent
          todo={todoDetail}
          setTodo={(todo) => setTodoDetail(todo)}
          id={id}
          imageSrc={imageSrc}
        />
      }
    </span>
  );
}

export default Detail;
