import firebase from '../firebase/firebaseInstance.js';

const SESSION_KEY = `${document.domain}-user-info`;

export default class AuthManager {
  static async addUser(userId, password) {
    return await firebase.auth().createUserWithEmailAndPassword(userId, password);
  }

  static async login(mail, password) {
    return await firebase.auth().signInWithEmailAndPassword(mail, password);
  }

  static async logout() {
    return await firebase.auth().signOut().then(() => {
      localStorage[SESSION_KEY] = null;
    });
  }

  static saveIdInLocalStorage(id) {
    localStorage[SESSION_KEY] = id;
  }

  static getUserId() {
    return localStorage[SESSION_KEY];
  }
}
