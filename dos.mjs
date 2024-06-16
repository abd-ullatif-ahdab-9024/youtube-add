export function getdb() {
  return new Promise(function (res, rej) {
    let request = window.indexedDB.open("timerDataBase", 1);
    request.onupgradeneeded = function () {
      let db = request.result;
      let store = db.createObjectStore("timer", {
        keyPath: "Id",
        autoIncrement: true,
      });

      store = db.createObjectStore("timerStore", {
        autoIncrement: true,
      });
    };

    request.onerror = function (e) {
      rej(e);
      console.log("error:", e.target.errorCode);
    };
    request.onsuccess = function (e) {
      let db = request.result;
      res(db);
      db.onerror = function (e) {
        rej(e);
        console.log("error:", e.target.errorCode);
      };
    };
  });
}

export const addTime = (from, to, db) => {
  return new Promise(function (ress, rej) {
    console.log(db);
    console.log("meo");
    let tx = db.transaction("timer", "readwrite");
    let store = tx.objectStore("timer");
    const res = store.add({
      from,
      to,
      timer: to - from,
    });
    res.onsuccess = (e) => {
      console.log(e.target.result);
      ress(e.target.result);
      return e.target.result;
    };
  });
};

export const editTime = (id, to, db) => {
  const objectStore = db.transaction("timer", "readwrite").objectStore("timer");
  console.log(objectStore);
  const request = objectStore.get(id);
  console.log("kmlt");
  request.onsuccess = () => {
    const timeTo = request.result;

    // Change the name property
    console.log(timeTo.to);
    timeTo.to = to;

    // Create a request to update
    const updateRequest = objectStore.put(timeTo);

    updateRequest.onsuccess = () => {
      console.log(`${updateRequest.result}`);
    };
  };
  return to + 10;
};
