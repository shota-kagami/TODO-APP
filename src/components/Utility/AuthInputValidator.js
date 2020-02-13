//ログイン or ユーザー登録時の入力値検証
const ValidateAuthInput = (email, password) => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError === null && passwordError === null) return null;

  const errors = {
    "emailError" : emailError,
    "passwordError" : passwordError
  };
  
  return errors;
}
  
//入力されたメールアドレスが有効かチェック
const validateEmail = (email) => {
  //メールアドレスの空チェック
  if (isEmptyInput(email)) {
    return "メールアドレスは必須です。";
  }
    
　//メールアドレスの形式チェック
  if (!isValidEmailFormat(email)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  
  return null;
}
  
//入力されたパスワードが有効かチェック
const validatePassword = (password) => {
  //パスワードの空チェック
  if (isEmptyInput(password)) {
    return "パスワードは必須です。";
  }
  
  //パスワードの形式チェック
  if (!isValidPasswordFormat()) {
    return "パスワードは6文字以上100文字以下の英数字を入力してください。";
  }
  
  return null;
}
  
const isEmptyInput = (input) => {
  return (input === "" || input === null);
}
  
const isValidEmailFormat = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

const isValidPasswordFormat = (password) => {
  return /^[a-z\d]{6, 100}$/.test(password);
}

export default ValidateAuthInput;