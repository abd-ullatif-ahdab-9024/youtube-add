let request = window.indexedDB.open("timerDataBase", 1);
let db;
let tx;
let store;
let index;

request.onupgradeneeded = function () {
  db = request.result;
  let store = db.createObjectStore("timer", {
    keyPath: "Id",
    autoIncrement: true,
  });
  console.log("ugrade");
  //   store = db.createObjectStore("timerStore", {
  //     autoIncrement: true,
  //   });

  index = store.createIndex("timer", "timer", { unique: false });
};
request.onerror = function (e) {
  console.log("error:", e.target.errorCode);
};
request.onsuccess = function (e) {
  db = request.result;

  db.onerror = function (e) {
    console.log("error:", e.target.errorCode);
  };
};

export const addTime = (from, to) => {
  console.log("meo");
  tx = db.transaction("timer", "readwrite");
  store = tx.objectStore("timer");
  store.put({
    from,
    to,
    timer: to - from,
  });
};

