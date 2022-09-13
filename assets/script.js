
const saldo = document.getElementById("saldo");
const receitas = document.getElementById("receitas");
const despesas = document.getElementById("despesas");
const listaTransacoes = document.getElementById("list-transacoes");
let transacoes = [];

const adicionar = document.getElementById("adicionar");
adicionar.addEventListener('click', ()=>{    
    

    let transacao = novaTransacao()
    AddTransacao(transacao)
    InsertTransacoesValue(transacoes);
    valores(transacoes)
    console.log(transacoes)
})

function AddTransacao(transacao){
    transacoes.push(transacao);
}

function novaTransacao(){
    let nome = document.getElementById("nome").value;
    let valor = document.getElementById("valor").value; 
    let transacao = {};
    transacao.Id = Math.floor(Math.random()*19 + 1);
    transacao.nome = nome;
    transacao.valor = valor;

    return transacao
}
    
    

function InsertTransacoesValue(transacoes){
    listaTransacoes.innerHTML = '';
    for(let i = 0; i < transacoes.length; i++){
    InsertTransacoes(transacoes[i])
}
}

function InsertTransacoes(transacoes){
    
    let newli = document.createElement("li");
    let operador = transacoes.valor < 0 ? '-' : '+'
    let valorCheio = Math.abs(transacoes.valor)
    
    let classCSS = transacoes.valor < 0 ? 'desp' : 'rec';

    newli.classList.add(classCSS)
    newli.innerHTML = `
        ${transacoes.nome}<span>R$ ${operador}${valorCheio}</span>
    `
    listaTransacoes.append(newli)
    }

    function valores(transacoes){
        let valorTransacoes = transacoes.map(t => t.valor);
        let valoresNegativos = valorTransacoes.filter(t => t < 0);
        let valoresPositivos = valorTransacoes.filter(t => t > 0);
        
        let vp = 0;
        for(i=0;i < valoresPositivos.length; i++){
            
            vp += parseFloat(valoresPositivos[i]);
        }

        let vn = 0;
        for(i=0; i < valoresNegativos.length; i++){
            
            vn += parseFloat(valoresNegativos[i]);
        }

        let vt = vp + vn;

        InsertValores(vt, vp, vn)
    }

    function InsertValores(vt, vp, vn){
        let saldo = document.getElementById("saldo");
        let receitas = document.getElementById("receitas");
        let despesas = document.getElementById("despesas");

        saldo.innerText = `R$ ${vt}`;
        receitas.innerText = `R$  ${vp}`; 
        despesas.innerText = `R$  ${vn}`;
    }

    