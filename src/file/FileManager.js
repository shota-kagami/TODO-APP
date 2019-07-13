import firebase from '../firebase/firebaseInstance.js';

export default class FileManager {
  static async upload(file, userId) {
    const imageRef = firebase.storage().ref().child(`images/${userId}/${file.name}`);
    return await imageRef.put(file);
  }

  static async download(url) {
    const imageRef = firebase.storage().ref(url);
    return await imageRef.getDownloadURL();
  }
}
