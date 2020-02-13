//Todo登録(更新)時の入力値検証
const ValidateTodoInput = (title, desc, imageFile) => {
  const titleError = validateTitle(title);
  const descError = validateDescription(desc);
  const imageError = validateImageFile(imageFile);

  if (titleError === null && descError === null && imageError === null) return null;

  const errors = {
    "titleError" : titleError,
    "descError" : descError,
    "imageError" : imageError
  }

  return errors;
}

//入力されたタイトルが有効かチェック
const validateTitle = (title) => {
  //タイトルの空チェック
  if (isEmptyInput(title)) {
    return "タイトルは必須です。";
  }

  return null;
}

//入力された説明が有効かチェック
const validateDescription = (desc) => {
  //説明の空チェック
  if (isEmptyInput(desc)) {
    return "パスワードは必須です。";
  }

  return null;
}

//選択されたファイルが有効かチェック
const validateImageFile = (file) => {
  //空はOK
  if (isEmptyInput(file)) return null;

  //ファイルの形式チェック(ひとまずjpg, png, bmp, gifを許可)
  if (isFileNotImage) {
    return "ファイルは画像のみ選択可能です";
  }

  return null;
}

const isEmptyInput = (input) => {
  return (input === "" || input === null);
}

const isFileNotImage = (file) => {
  const fileTypeList = ["image/jpeg", "image/png", "image/bmp", "image/gif"];
  return (fileTypeList.includes(file.type));
}

export default ValidateTodoInput;