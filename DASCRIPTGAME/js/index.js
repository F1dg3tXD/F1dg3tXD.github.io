const passwords = [
    "a1b2c3D4",
    "e5f6g7A8",
    "9hij0Slm",
    "1n2o3pC4",
    "5r6s7tR8",
    "v9w0xIz",
    "8b9cP0ef",
    "1g2h3iT4",
    "k5l6m7G8",
    "9p0qAstu",
    "1v2w3xM4",
    "z5a6bE7d"
];

let randomIndex = Math.floor(Math.random() * passwords.length);
let passwordToCheck = passwords[randomIndex];

document.getElementById('prompt-message').innerText = `Look on page ${randomIndex + 1}`;

function checkPassword() {
    let userPassword = document.getElementById('password-input').value;
    let errorMessage = document.getElementById('error-message');
    if (userPassword === passwordToCheck) {
        document.getElementById('password-prompt').classList.add('hidden');
        document.getElementById('protected-content').classList.remove('hidden');
    } else {
        errorMessage.innerText = 'Incorrect password. Please try again.';
    }
}
