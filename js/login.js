var userEmail = document.getElementById("signEmail");
var userPassword = document.getElementById("signPassword");
var logInBtn = document.getElementById("logInBtn");
var message = document.getElementById("message");

var users = [];

if (localStorage.getItem("users") == null) {
    var users = [];
}
else {
    var users = JSON.parse(localStorage.getItem("users"));
}

function isExist(event) {
    event.preventDefault();

    var userFound = false;

    for (var i = 0; i < users.length; i++) {
        if (userEmail.value === users[i].email && userPassword.value === users[i].password) {
            localStorage.setItem("sessionUser", users[i].name);
            window.location.href = "home/home.html";
            userFound = true;
            break;
        }
    }

    if (!userFound) {
        message.innerHTML = "Invalid Email or Password!";
        message.style.color = "red";
    }
}


logInBtn.addEventListener("click" , isExist);



