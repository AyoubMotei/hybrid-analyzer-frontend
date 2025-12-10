// Gestion de l'inscription
async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');

    // Reset messages
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Erreur lors de l'inscription");
        }

        successMsg.textContent = "Compte créé avec succès ! Redirection...";
        successMsg.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);

    } catch (err) {
        errorMsg.textContent = err.message;
        errorMsg.style.display = 'block';
    }
}

// Gestion de la connexion
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    errorMsg.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }
        
        // Stockage du token
        localStorage.setItem('access_token', data.access_token);
        
        // Redirection vers l'application
        window.location.href = 'dashboard.html';

    } catch (err) {
        errorMsg.textContent = err.message;
        errorMsg.style.display = 'block';
    }
}