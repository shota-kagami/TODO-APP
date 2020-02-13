import firebase from '../firebase/firebaseInstance.js';

export default class DataManager {
  static async saveTodo(todoInfo, userId) {
    return await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .add(todoInfo);
  }

  static async getTodo(userId) {
    const snapShot = await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .orderBy('date')
                         .get();

    
    const todoList = snapShot.docs.map((doc) => {
      let todo = doc.data();
      todo['id'] = doc.id;
      return todo;
    });

    return todoList;
  }

  static async updateTodo(userId, documentId, todoInfo) {
    return await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .doc(documentId)
                         .update(todoInfo);
  }

  static async deleteTodo(userId, documentId) {
    return await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .doc(documentId)
                         .delete();
  }

}
