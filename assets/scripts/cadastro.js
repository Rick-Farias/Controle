
  
const btnCadastro = document.getElementById('cadastro');
if (btnCadastro){
    btnCadastro.addEventListener('click',()=>{
    const email = document.getElementById("email").value
    const senha1 = document.getElementById("senha-1").value
    const senha2 = document.getElementById("senha-2").value

    validarCadastro(email, senha1, senha2)
    
    
})
}

function validarCadastro(email, senha1, senha2){
    if(email == ""){
        alert("digite um email")
        return false
    }

    if(senha1 == ""){
        alert("digite uma senha 1")
        return false
    }
    if(senha2 == ""){
        alert("digite uma senha 2")
        return false
    }

    if(senha1 == senha2){
        criarUsuarios(email, senha1)
    }else{
        alert("As senhas estão diferentes!")
    }
}

function criarUsuarios(email, senha){

    auth.createUserWithEmailAndPassword(email, senha)
        .then(user=>{
            window.location.href = "./login.html";
        })
        .catch(err=>{
            console.log(err)
        })
}