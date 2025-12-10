// Déconnexion
function logout() {
    localStorage.removeItem('access_token');
    window.location.href = 'index.html';
}

// Fonction principale d'analyse
async function handleAnalyze(event) {
    event.preventDefault();
    
    const textInput = document.getElementById('text-input').value;
    const loader = document.getElementById('loader');
    const resultCard = document.getElementById('result-card');
    const errorMsg = document.getElementById('dash-error');

    if (!textInput.trim()) {
        alert("Veuillez entrer du texte.");
        return;
    }

    // UI : Afficher le chargement
    loader.style.display = 'block';
    resultCard.style.display = 'none';
    errorMsg.style.display = 'none';

    try {
        // Note : Ton backend utilise "/analyse" (avec un s) selon le fichier main.py
        const response = await fetch(`${API_BASE_URL}/analyse`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text: textInput })
        });

        // Gestion token expiré
        if (response.status === 401) {
            alert("Session expirée. Veuillez vous reconnecter.");
            logout();
            return;
        }

        if (!response.ok) throw new Error("Erreur serveur lors de l'analyse.");

        const data = await response.json();
        displayResults(data);

    } catch (err) {
        console.error(err);
        errorMsg.textContent = "Impossible de contacter l'IA. Vérifiez que le backend est lancé.";
        errorMsg.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

// Affichage des résultats
function displayResults(data) {
    const resultCard = document.getElementById('result-card');
    
    //  Catégorie
    document.getElementById('res-category').textContent = data.category;
    
    //  Score (formatage en %)
    const scorePct = (data.score * 100).toFixed(1) + '%';
    document.getElementById('res-score').textContent = `Confiance : ${scorePct}`;
    
    //  Résumé
    document.getElementById('res-summary').textContent = data.summary;
    
    // Ton (Couleur dynamique)
    const toneEl = document.getElementById('res-tone');
    toneEl.textContent = `Ton détecté : ${data.tone}`;
    
    const t = data.tone.toLowerCase();
    if(t.includes('positif')) toneEl.style.color = '#10b981'; // Vert
    else if(t.includes('négatif')) toneEl.style.color = '#ef4444'; // Rouge
    else toneEl.style.color = '#0c57edff'; // Gris

    resultCard.style.display = 'block';
}