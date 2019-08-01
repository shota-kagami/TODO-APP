import firebase from '../firebase/firebaseInstance.js';

export default class DataManager {
  static async saveTodo(title, description, filePath, date, userId) {
    const data = {
      "title": title,
      "description": description,
      "image": filePath,
      "date": date
    };

    return await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .add(data);
  }

  static async getTodo(userId) {
    const snapShot = await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .orderBy('date')
                         .get();

    let todoList = [];
    snapShot.forEach((doc) => {
      let todo = doc.data();
      todo['id'] = doc.id;
      todoList.push(todo);
    });

    return todoList;
  }

  static async getOnceTodo(userId, docId) {
    console.log(userId, docId);
    const doc = await firebase.firestore()
                              .collection('todo')
                              .doc(userId)
                              .collection('todo')
                              .doc(docId)
                              .get();

    let todo = doc.data();
    todo['id'] = doc.id;
    return todo;
  }

  static async updateTodo(title, description, filePath, date, userId, docId) {
    const data = {
      "title": title,
      "description": description,
      "image": filePath,
      "date": date
    };

    return await firebase.firestore()
                         .collection('todo')
                         .doc(userId)
                         .collection('todo')
                         .doc(docId)
                         .update(data);
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
