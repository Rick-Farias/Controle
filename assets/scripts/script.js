const firebaseConfig = {
    apiKey: "AIzaSyDO-O7rKzi9jWvJvZ3PVg9rTp13DW9b9ZE",
    authDomain: "controle-de-dividas.firebaseapp.com",
    projectId: "controle-de-dividas",
    storageBucket: "controle-de-dividas.appspot.com",
    messagingSenderId: "1024376341198",
    appId: "1:1024376341198:web:987e3c7c363f0b2f5f869f"
  };
  firebase.initializeApp(firebaseConfig)
    firebase.firestore().settings({
      experimentalForceLongPolling: true,
      merge: true,
    });
  
  const auth = firebase.auth();
  const db = firebase.firestore()
  const useer = firebase.auth().currentUser;

  /*
LER TODOS OS DADOS
db.collection("DESPESAS").get()
                            .then((snapshot)=>{
                                snapshot.forEach((doc)=>{
                                    console.log(doc.data())
                                })
                            })


LER DADOS ESPECIFICOS
let docRef = db.collection("DESPESAS").doc("gqqSivb7IEheLfYmX5wy")

docRef.get().then((doc)=>{
    console.log(doc.data())
})
*/