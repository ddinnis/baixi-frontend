export const db = wx.cloud.database();
class myCllection {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }
  add(data) {
    return this.collection.add({
      data,
    });
  }
  remove(condition, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).remove();
    } else {
      return this.collection.where(condition).remove();
    }
  }
  update(condition, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).update();
    } else {
      return this.collection.where(condition).update();
    }
  }
  query(offset = 0, size = 20, condition = {}, isDoc = false) {
    if (isDoc) {
      return this.collection.doc(condition).get();
    } else {
      return this.collection.where(condition).skip(offset).limit(size).get();
    }
  }
}

export const favorCollection = new myCllection("c_favor");
export const likeCollection = new myCllection("c_like");
export const historyCollection = new myCllection("c_history");
export const menuCollection = new myCllection("c_menu");
