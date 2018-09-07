var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');
var usersList = document.getElementById('usersList');

addButton.addEventListener('click', function () {
    create(nameInput.value, ageInput.value);
});

function create(name, age) {
    var data = {
        name: name,
        age: age
    };

    return firebase.database().ref().child('/users').push(data).key;
};

var ref = firebase.database().ref("users");
ref.orderByKey().on("value", function(snapshot) {
    usersList.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val());
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(childSnapshot.val().name + ' : ' + childSnapshot.val().age));
        li.className="list-group-item";
        usersList.appendChild(li);
    });
});