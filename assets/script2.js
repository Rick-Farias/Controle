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
    
    validador()
    
})
function validador(){
    let nome = document.getElementById("nome").value;
    let valor = document.getElementById("valor").value;

    if(nome == "" && valor ==""){
        alert("CAMPOS VAZIOS")
    }else if(nome == "" && valor != ""){
        alert("insira um nome")
    }else if(valor == "" && nome != ""){
        alert("insira um valor")
    }else{
        dadosDB()
        valores()
        recarregar()
    }
}
function dadosDB(){
    let nome = document.getElementById("nome").value;
    let valor = parseInt(document.getElementById("valor").value)
    let idRandom = Math.floor(parseInt(Math.random()*1000));
    let documentoId = String(idRandom)
    
    adicionarDB(nome, valor, documentoId)
}


// ADICIONAR DADOS AO FIRESTORE
function adicionarDB(nome, valor, documentoId){
    db.collection("TRANSACOES").doc(documentoId).set({
        id: documentoId,
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
            valores()
    })
})

function AddTransacao(dados){
    transacoesDados.push(dados);
}
function dataDados(data){
    let nome = data.nome;
    let valor = data.valor;
    let id = data.id;
    let dados = {};
    dados.id = id
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
        ${data.nome}<span>R$ ${operador}${valorCheio}</span><button class="btn-excluir" onclick="excluir(${data.id})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg></button>
    `
    listaTransacoes.append(newli)
    
    }


function excluir(id){
let documentoId = String(id)
    db.collection("TRANSACOES").doc(documentoId).delete()
                .then(()=>{console.log("excluiu")})
                .catch(err=>{console.log(err)})
    
recarregar()
}


function recarregar(){
    setTimeout(()=>{
        location.reload();
    },450)
}
function valores(){
        let valorTransacoes = transacoesDados.map(t => t.valor);
        let valoresNegativos = valorTransacoes.filter(t => t < 0);
        let valoresPositivos = valorTransacoes.filter(t => t > 0);
        
        let vp = 0;
        for(i=0;i < valoresPositivos.length; i++){
        
            vp += parseInt(valoresPositivos[i]);
        }

        let vn = 0;
        for(i=0; i < valoresNegativos.length; i++){
            
            vn += parseInt(valoresNegativos[i]);
        }
        console.log(vp , vn)
        let vt = vp + vn;
        InsertValores(vt, vp, vn)
    }

    function InsertValores(vt, vp, vn){
        saldo.innerText = `R$ ${vt}`;
        receitas.innerText = `R$  ${vp}`; 
        despesas.innerText = `R$  ${vn}`;
    }

    