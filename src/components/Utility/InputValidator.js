import React from 'react';

const checkInput = (todoTitle, todoDescription, todoImage) => {
  let inputInfo = {
    emptyTitle: false,
    emptyDescription: false,
    emptyFile: false,
    fileIsNotImage: false
  };

  checkTitleOrDescriptionEmpty(todoTitle, todoDescription, inputInfo);
  checkFile(todoImage, inputInfo);

  return inputInfo;
}

const checkTitleOrDescriptionEmpty = (todoTitle, todoDescription, inputInfo) => {
  const isTitleEmpty = (todoTitle === null || todoTitle === "");
  const isDescEmpty = (todoDescription === null || todoDescription === "");

  if (isTitleEmpty) inputInfo.emptyTitle = true;
  if (isDescEmpty) inputInfo.emptyDescription = true;
}

const checkFile = (todoImage, inputInfo) => {
  if (todoImage === null || todoImage === "") {
    inputInfo.emptyFile = true;
    return;
  }

  checkFileType(todoImage, inputInfo);
}

const checkFileType = (todoImage, inputInfo) => {
  const fileTypeList = ["image/jpeg", "image/png", "image/bmp"];

  if (fileTypeList.includes(todoImage.type)) return;

  inputInfo.fileIsNotImage = true;
}

export default checkInput;
