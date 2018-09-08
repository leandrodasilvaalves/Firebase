//Buttons
var authEmailPassButton = document.getElementById("authEmailPassButton");
var createUserPassButton = document.getElementById("createUserPassButton");
var authGithubButton = document.getElementById("authGithubButton");
var authFacebookButton = document.getElementById("authFacebookButton");
var authGoogleButton = document.getElementById("authGoogleButton");
var authAnonymouslyButton = document.getElementById("authAnonymouslyButton");
var logOutButton = document.getElementById("logOutButton");

//inputs
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");

//displays
var displayName = document.getElementById("displayName");

createUserPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            alert('Bem vindo ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console');
        });
});

authEmailPassButton.addEventListener("click", function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            console.log(result);
            displayName.innerHTML = "Bem vindo, " + emailInput.value;
            displayName.className = "text-success";
            alert('Autenticado: ' + emailInput.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console');
        });
});

logOutButton.addEventListener("click", function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = "Você não está autenticado";
            displayName.className = "text-danger";
            alert('Você se deslogou');
        }, function (error) {
            console.error(error);
        });
});

authAnonymouslyButton.addEventListener("click", function () {
    firebase
        .auth()
        .signInAnonymously()
        .then(function (result) {
            console.log(result);
            displayName.innerHTML = "Bem vindo, desconhecido";
            displayName.className = "text-success";
            alert('Autenticado: Anonimamente');
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console');
        });
});

authGithubButton.addEventListener('click', function () {
    var provider = new firebase.auth.GithubAuthProvider();
    signIn(provider);
});
authGoogleButton.addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});
authFacebookButton.addEventListener('click', function () {
    var provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
});



function signIn(provider) {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            var token = result.credential.accessToken;
            console.log(token);
            var userName = result.user.displayName
            displayName.innerHTML = "Bem vindo, " + userName;
            displayName.className = "text-success";
            alert('Autenticado: ' + userName);
        }).catch(function (error) {
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console');
        });
}