

const btnLogin = document.getElementById("login");
if(btnLogin){
  btnLogin.addEventListener('click', ()=>{
    login()
  })
}

function login(){
  const email = document.getElementById("email").value
  const senha = document.getElementById("senha").value

  auth.signInWithEmailAndPassword(email, senha)
      .then(userL=>{
        window.location.href = "./index.html";
      })
      .catch(err=>{
        console.log(err)
      })
}