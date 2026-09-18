const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Administrator credentials
    const adminUsername = "admin";
    const adminPassword = "Admin@123";

    if (username === adminUsername && password === adminPassword) {

        // Remember that the administrator is logged in
        sessionStorage.setItem("adminLoggedIn", "true");

        // Open the Student Management System
        window.location.href = "index.html";

    } else {

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.style.color = "red";
    }
});
