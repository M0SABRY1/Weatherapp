var signUpBtn = document.getElementById("signUp");
var userName = document.getElementById("signName");
var userEmail = document.getElementById("signEmail");
var userPassword = document.getElementById("signPassword");
var message = document.getElementById("message");
var nameMessage = document.querySelector("#NameMessage");
var emailMessage = document.querySelector("#EmailMessage");
var passwordMessage = document.querySelector("#passwordMessage");
var nameRegex = /^[A-Za-z0-9_]{3,}$/;
var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

var users = [];

if (localStorage.getItem("users") == null) {
    var users = [];
}
else {
    var users = JSON.parse(localStorage.getItem("users"));
}


function isNameExist() {
    return users.some(user => user.name === userName.value);
}

function isEmailExist() {
    return users.some(user => user.email === userEmail.value);
}

function nameValidation() {
    if (!nameRegex.test(userName.value)) {
        userName.classList.add("is-invalid");
        nameMessage.innerHTML = "The name must be at least 3 characters long and contain only letters, numbers, or underscores.";
        nameMessage.style.color = "red";
        return false;
    } else if (isNameExist()) {
        userName.classList.add("is-invalid");
        nameMessage.innerHTML = "This name already exists.";
        nameMessage.style.color = "red";
        return false;
    } else {
        userName.classList.remove("is-invalid");
        userName.classList.add("is-valid");
        nameMessage.innerHTML = "";
        return true;
    }
}

userName.addEventListener("input", nameValidation);

function emailValidation() {
    if (!emailRegex.test(userEmail.value)) {
        userEmail.classList.add("is-invalid");
        emailMessage.innerHTML = "Please enter a valid email.";
        emailMessage.style.color = "red";
        return false;
    } else if (isEmailExist()) {
        userEmail.classList.add("is-invalid");
        emailMessage.innerHTML = "This email already exists.";
        emailMessage.style.color = "red";
        return false;
    } else {
        userEmail.classList.remove("is-invalid");
        userEmail.classList.add("is-valid");
        emailMessage.innerHTML = "";
        return true;
    }
}
userEmail.addEventListener("input", emailValidation);





function passwordValidation() {
    if (passwordRegex.test(userPassword.value)) {
        userPassword.classList.remove("is-invalid");
        userPassword.classList.add("is-valid");
        passwordMessage.innerHTML = "";
        return true;
    } else {
        userPassword.classList.add("is-invalid");
        passwordMessage.innerHTML = "password must be at least 5 characters long and includes both letters and numbers.";
        passwordMessage.style.color = "red";
        return false;
    }
}

userPassword.addEventListener("input", passwordValidation);




function isValid() {
    
    if (nameValidation() == true && emailValidation() == true && passwordValidation() == true) {
        return true;
    } else {
        return false;
    }
}




userEmail.addEventListener("input", isEmailExist);


function addUser() {
    if (userName.value == "" || userEmail.value == "" || userPassword.value == "" || isValid() == false || isEmailExist() == true || isNameExist() == true) {
        message.innerHTML = "All inputs are required";
        message.style.color = "red";

    } else {

        var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        clearData();
        message.innerHTML = "Success";
        message.style.color = "green";


    }

}

function clearData() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}

signUpBtn.addEventListener("click", addUser);

// signUpBtn.addEventListener("click",addUser);


