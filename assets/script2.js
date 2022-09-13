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
const db = firebase.firestore()


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


const saldo = document.getElementById("saldo");
const receitas = document.getElementById("receitas");
const despesas = document.getElementById("despesas");
const listaTransacoes = document.getElementById("list-transacoes");
let transacoesDados = [];


const adicionar = document.getElementById("adicionar");
adicionar.addEventListener('click', ()=>{    
    
    dadosDB()
    
})
function dadosDB(){
    let nome = document.getElementById("nome").value;
    let valor = parseInt(document.getElementById("valor").value)
    let idRandom = Math.floor(parseInt(Math.random()*1000));
    let documentoId = String(idRandom)
    
    adicionarDB(nome, valor, documentoId)
}


// ADICIONAR DADOS AO FIRESTORE
function adicionarDB(nome, valor, documentoId){
    db.collection("TRANSACOES").doc().set({
        nome: nome,
        valor: valor
    }
).then(()=>{console.log("Deu certo")}
).catch(err=>{console.log(err)})
}

    db.collection("TRANSACOES").onSnapshot((snapshot)=>{
        listaTransacoes.innerHTML = ""
        snapshot.forEach((doc)=>{
            let data = doc.data();
            let dados = dataDados(data)
            AddTransacao(dados)
            InsertTransacoes(dados)
    })
})

function AddTransacao(dados){
    transacoesDados.push(dados);
}
function dataDados(data){
    let nome = data.nome;
    let valor = data.valor;
    let dados = {};
    dados.nome = nome
    dados.valor = valor
    
    return dados;
}

function InsertTransacoes(data){
    
    let newli = document.createElement("li");
    let operador = data.valor < 0 ? '-' : '+'
    let valorCheio = Math.abs(data.valor)
    
    let classCSS = data.valor < 0 ? 'desp' : 'rec';

    newli.classList.add(classCSS)
    newli.innerHTML += `
        ${data.nome}<span>R$ ${operador}${valorCheio}</span><button class="btn-excluir" onclick="excluir()">x</button>
    `
    listaTransacoes.append(newli)
    }

function excluir(){
    console.log("teste")
}