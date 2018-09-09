(function (app) {
    function userController($scope, $firebaseArray) {
        var vm = this;
        var ref = firebase.database().ref().child("users");
        vm.users = $firebaseArray(ref);

        vm.loadAll = function () {
            vm.users.$loaded().then(function () {
                console.log("Dados carregados com sucesso.");
            });
        };

        var _insert = function (user) {
            vm.users.$add(user).then(function (ref) {
                swal("Cadastrado!", "Usuário cadastrado com sucesso!", "success");
            });
        };

        var _update = function (user) {
            vm.users.$save(user).then(function (ref) {
                swal("Atualizado!", "Usuário atualizado com sucesso!", "success");
            });
        };

        var _remove = function (user) {
            vm.users.$remove(user).then(function () {
                swal("Excluído!", "Usuário excluído com sucesso!", "success");
            });
        };

        vm.getUser = function (user) {
            vm.user = vm.users.$getRecord(user.$id);             
        };

        vm.save = function (user) {
            if (user.$id == null) {
                _insert(user);
            }
            else {
                _update(user);
            }
        };

        vm.deleteConfirm = function (user) {
            swal({
                title: "Confirma a exclusão do usuário: " + user.name + " ?",
                text: "Esta operação é irreverssível!",
                icon: "error",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        _remove(user);
                    }
                });
        }
        
    }

    app.controller('userController', ['$scope', '$firebaseArray', userController])
})(appFb);


//https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-removerecordorindex
//https://github.com/firebase/angularfire
//https://github.com/firebase/angularfire/blob/master/docs/reference.md
//https://sweetalert.js.org/docs/