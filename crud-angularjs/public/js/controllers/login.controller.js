(function (app) {
    function loginController($scope, $firebaseAuth) {
        var lg = this;
        lg.authObj = $firebaseAuth();

        lg.createAccount = function (email, password) {
            lg.authObj.$createUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    console.log("User " + firebaseUser.user.uid + " created successfully!");
                    swal("Cadastrado!", "Usuário criado com sucesso!", "success");
                }).catch(function (error) {
                    console.error("Error: ", error);
                });
        };

        lg.signIngWithEmailAndPassWord = function (email, passwod) {
            lg.authObj.$signInWithEmailAndPassword(email, passwod).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.user.uid);
                swal("Logado!", "Usuário logado com sucesso!", "success");
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        };

        lg.signOut = function () {
            lg.authObj.$signOut();
            console.log('Você se deslogou');
            swal("Deslogado!", "Usuário deslogado com sucesso!", "success");
        };
    }
    app.controller('loginController', ['$scope', '$firebaseAuth', loginController]);
})(appFb);