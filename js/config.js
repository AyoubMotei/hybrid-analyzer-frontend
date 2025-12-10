// Configuration globale
const API_BASE_URL = "http://127.0.0.1:8000"; // Vérifie que ton backend tourne sur ce port

// Récupère les headers avec le Token JWT s'il existe
function getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// PROTECTION : Redirige vers login si pas connecté (pour dashboard.html)
function checkAuth() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// REDIRECTION : Redirige vers dashboard si déjà connecté (pour index/login/register)
function redirectIfAuth() {
    const token = localStorage.getItem('access_token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
}