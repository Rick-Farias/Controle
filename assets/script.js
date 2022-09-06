let saldo = document.getElementById("saldo");
let receitas = document.getElementById("receitas");
let despesas = document.getElementById("despesas");
let transacoes = [];

const adicionar = document.getElementById("adicionar");
adicionar.addEventListener('click', ()=>{    
    


    let transacao = novaTransacao()
    AddTransacao(transacao)
    InsertTransacoes(transacoes);
    valores(transacoes)
    mouseover()
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

    return transacao;
}
    

function InsertTransacoes(transacoes){
    let negativo = document.getElementById("transacoes-negativas");
    let positivo = document.getElementById("transacoes-positivas");
    negativo.innerText = '';
    positivo.innerText = '';
    for(let i = 0; i < transacoes.length; i++){
        let newDiv = document.createElement("div");
        let newPN = document.createElement("p");
        let newPV = document.createElement("p");
        let textNome = document.createTextNode(`${transacoes[i].nome}`);
        let textValor = document.createTextNode(`R$  ${transacoes[i].valor}`);
        newPN.appendChild(textNome)
        newPV.appendChild(textValor)

        newDiv.classList.add('card')
        if(transacoes[i].valor < 0){
                negativo.appendChild(newDiv)
                newDiv.appendChild(newPN)
                newDiv.appendChild(newPV)
            }else{
                positivo.appendChild(newDiv)
                newDiv.appendChild(newPN)
                newDiv.appendChild(newPV)
            }
        }
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
    function mouseexcluir(item){
        item.addEventListener('mouseover', ()=>{
            item.classList.add('excluir')
        })

        item.addEventListener('mouseout', ()=>{
            item.classList.remove('excluir')
        })
        
        
    }
    function mouseover(){
        let cards = document.querySelectorAll('.card')
        cards.forEach(mouseexcluir)
    }
    mouseover()