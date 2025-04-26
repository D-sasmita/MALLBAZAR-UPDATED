function validate() {
    let isValid = true;

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("e");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Invalid email format.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Password validation
    const password = document.getElementById("password").value.trim();
    const passwordError = document.getElementById("p");
    
    if (password === "") {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    return isValid;
}
