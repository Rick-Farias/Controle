
const saldo = document.getElementById("saldo");
const receitas = document.getElementById("receitas");
const despesas = document.getElementById("despesas");
const sair = document.getElementById("sair");
let userUID;
const listaTransacoes = document.getElementById("list-transacoes");
let transacoesDados = [];


const adicionar = document.getElementById("adicionar");
if(adicionar){
    adicionar.addEventListener('click', ()=>{    
        validador()
    })
}

auth.onAuthStateChanged(user =>{
    let userUID = user.uid
    if(user){
        userUID = user.uid
        console.log(user.uid)
    }else{
        console.log("ninguem logado")
    }
})
// Essa função valida se oos campos estão digitados
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
// dadosDB recebe os dados digitados
function dadosDB(){
    let nome = document.getElementById("nome").value;
    let valor = parseInt(document.getElementById("valor").value)
    let idRandom = Math.floor(parseInt(Math.random()*1000));
    let documentoId = String(idRandom)
    let usuario = userUID;
    adicionarDB(nome, valor, documentoId, usuario)
}


// ADICIONAR DADOS AO FIRESTORE
function adicionarDB(nome, valor, documentoId, usuario){
    db.collection("TRANSACOES").doc(documentoId).set({
        id: documentoId,
        nome: nome,
        valor: valor,
        user: usuario
    }
).then(()=>{console.log("Deu certo")}
).catch(err=>{console.log(err)})
}


// LER OS DADOS DO FIRESTORE
    db.collection("TRANSACOES")
    .onSnapshot((snapshot)=>{
        snapshot.forEach((doc)=>{
            let data = doc.data();
            console.log(data)
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
    if(data){
        let newli = document.createElement("li");
        let operador = data.valor < 0 ? '-' : '+';
        let valorCheio = Math.abs(data.valor);
        let classCSS = data.valor < 0 ? 'desp' : 'rec';
    
        newli.classList.add(classCSS)
        newli.innerHTML += `
            ${data.nome}<span>R$ ${operador}${valorCheio}</span><button class="btn-excluir" onclick="excluir(${data.id})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg></button>
        `
        if(listaTransacoes){
            listaTransacoes.append(newli)
        }
    }
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

        if(saldo, receitas, despesas){
            saldo.innerText = `R$ ${vt}`;
            receitas.innerText = `R$  ${vp}`; 
            despesas.innerText = `R$  ${vn}`;
        }
        
    }

    

    if(sair){
        sair.addEventListener('click', ()=>{
            auth.signOut()
            .then(() =>{
                window.location.href = "./login.html";
            })
            .catch(()=>{
                
            })
        })
    }