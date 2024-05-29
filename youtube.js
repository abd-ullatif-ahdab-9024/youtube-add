let request = window.indexedDB.open("QuizQuestDatabase", 1);
let db;
let tx;
let store;
let index;

request.onupgradeneeded = function (e) {
  let db = request.result;
  let store = db.createObjectStore("QuestionStore", {
    keyPath: "qID",
  });
  // store = db.createObjectStore("QuestionStore", {
  //   autoIncrement:true
  // });

  index = store.createIndex("questionText", "questionText", { unique: false });
};
request.onerror = function (e) {
  console.log("error:", e.target.errorCode);
};
request.onsuccess = function (e) {
  let db = request.result;
  tx = db.transaction("QuestionStore", "readwrite");
  store = tx.objectStore("QuestionStore");
  index = store.index("questionText");
  db.onerror = function (e) {
    console.log("error:", e.target.errorCode);
  };
  // store.put({
  //   qID: 1,
  //   questionText: "The sky is blue?",
  //   correctAnswer: true,
  //   studentAnswer: true,
  //   result: true,
  // });
  // store.put({
  //   qID: 2,
  //   questionText: "The grass is green?",
  //   correctAnswer: true,
  //   studentAnswer: true,
  
  //   result: true,
  // });
  let q1 = store.get(1);
  let qs = index.get("The grass is green?");
  q1.onsuccess = function () {
    console.log(q1.result);
    console.log(q1.result.questionText);
  };
  qs.onsuccess = function () {
    console.log(qs.result.questionText);
  };
  tx.oncomplete = function () {
    db.close();
  };
};
