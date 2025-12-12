#  Hybrid Analyzer - Frontend

[![Frontend](https://img.shields.io/badge/Frontend-HTML%2FJS%2FCSS-blue)](https://github.com/votre-username/hybrid-analyzer-frontend)
[![Backend](https://img.shields.io/badge/Backend-Python%2FFastAPI-green)](https://github.com/votre-username/hybrid-analyzer-backend)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Interface web moderne pour l'orchestration d'analyse IA hybride combinant la classification Zero-Shot (Hugging Face) et la synthèse contextuelle (Google Gemini).



##  Vue d'ensemble

**Hybrid Analyzer Frontend** est l'interface utilisateur d'une plateforme fullstack d'analyse de texte par IA. Elle permet aux utilisateurs d'analyser des articles de presse et documents textuels en combinant deux services d'intelligence artificielle :

1. **Classification Zero-Shot** (Hugging Face - BART-Large-MNLI)
2. **Synthèse Contextuelle & Analyse de Ton** (Google Gemini)

Cette solution répond au besoin d'automatisation du traitement d'articles de veille pour les agences de media monitoring, remplaçant un processus manuel coûteux et lent par une orchestration IA intelligente.

###  Aperçu visuel

Le frontend se compose de :
- Une **landing page moderne** avec design glassmorphism
- Un système d'**authentification sécurisé** (JWT)
- Un **dashboard d'analyse** avec résultats en temps réel
- Une **interface responsive** adaptée mobile et desktop

---

##  Fonctionnalités

###  Authentification
- **Inscription** avec validation côté client
- **Connexion** avec gestion de token JWT
- **Protection des routes** (redirection automatique)
- **Déconnexion** sécurisée avec suppression du token

###  Analyse de texte
- **Input texte multiligne** pour articles longs
- **Affichage en temps réel** des résultats :
  - Catégorie prédite (Finance, RH, IT, Opérations, etc.)
  - Score de confiance (en pourcentage)
  - Résumé contextuel généré par Gemini
  - Ton détecté (Positif / Neutre / Négatif) avec code couleur
- **Indicateur de chargement** pendant le traitement IA
- **Gestion des erreurs** avec messages explicites

###  Interface utilisateur
- Design moderne avec **animations CSS**
- **Glassmorphism effects** sur la landing page
- **Responsive design** 
- **Feedback visuel** sur toutes les actions
- **Thème sombre** pour la landing page
- **Thème clair** pour l'application

---

##  Architecture

### Stack technique

```
Frontend
├── HTML5 (structure sémantique)
├── CSS3 (animations, glassmorphism, grid)
├── JavaScript Vanilla (fetch API, DOM manipulation)
└── Font Awesome (icônes)
```

### Communication avec le backend

```
┌─────────────────┐         HTTP/JSON          ┌──────────────────┐
│                 │◄────────────────────────────┤                  │
│    Frontend     │                             │     Backend      │
│  (HTML/JS/CSS)  │  POST /register             │  (Python/FastAPI)│
│                 │  POST /login                │                  │
│                 │  POST /analyse + JWT        │                  │
└─────────────────┘                             └──────────────────┘
        │                                               │
        │                                               │
        ▼                                               ▼
  localStorage                                    PostgreSQL
  (JWT token)                                     (users)
```

### Flux d'authentification

```
1. Utilisateur → /register → Backend → PostgreSQL
2. Backend → Hash password (bcrypt) → Store user
3. Utilisateur → /login → Backend → Verify credentials
4. Backend → Generate JWT token → Return to frontend
5. Frontend → Store token in localStorage
6. Frontend → Include token in Authorization header
```

### Flux d'analyse

```
1. User inputs text → Dashboard
2. POST /analyse + JWT header
3. Backend validates JWT
4. Backend → Hugging Face API (classification)
5. Backend → Gemini API (summary + tone)
6. Backend → Aggregate results
7. Frontend ← JSON response
8. Display: category, score, summary, tone
```

---

##  Prérequis

### Logiciels requis
- **Navigateur moderne** (Chrome, Firefox, Edge, Safari)
- **Backend Hybrid Analyzer** configuré et lancé
- **Serveur HTTP local** (optionnel pour développement)

### Backend requis
Le frontend dépend du backend pour fonctionner. Assurez-vous que le backend est :
- ✅ Installé et configuré
- ✅ En cours d'exécution sur `http://127.0.0.1:8000`
- ✅ Connecté à PostgreSQL
- ✅ API Keys Hugging Face et Gemini configurées

🔗 **[Voir le repository backend →](https://github.com/AyoubMotei/hybrid-analyzer-backend/tree/master)**

---

##  Installation

### 1. Cloner le repository

```bash
git clone https://github.com/AyoubMotei/hybrid-analyzer-frontend.git
cd hybrid-analyzer-frontend
```

### 2️. Structure des fichiers

Vérifiez que vous avez cette structure :

```
hybrid-analyzer-frontend/
│
├── index.html          # Landing page
├── login.html          # Page de connexion
├── register.html       # Page d'inscription
├── dashboard.html      # Dashboard d'analyse
│
├── css/
│   ├── landing.css     # Styles landing page
│   └── style.css       # Styles application
│
└── js/
    ├── config.js       # Configuration API
    ├── auth.js         # Logique authentification
    └── dashboard.js    # Logique dashboard
```

### 3️. Lancer le frontend

#### Option A : Sans serveur (fichiers locaux)
Ouvrez simplement `index.html` dans votre navigateur.

#### Option B : Avec serveur HTTP local (recommandé)

Accédez ensuite à : `http://localhost:8080`

---

##  Configuration

### Configurer l'URL du backend

Éditez le fichier `js/config.js` :

```javascript
// Configuration globale
const API_BASE_URL = "http://127.0.0.1:8000"; //  Modifier selon votre configuration
```

**Configurations possibles :**

| Environnement | URL Backend |
|---------------|-------------|
| Local | `http://127.0.0.1:8000` |
| Docker | `http://localhost:8000` |


### CORS (Cross-Origin Resource Sharing)

Si vous rencontrez des erreurs CORS, vérifiez la configuration backend dans `main.py` :

```python
# Backend doit autoriser l'origine du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Ajoutez votre origine
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

##  Structure du projet

### Pages HTML

#### `index.html` - Landing Page
```
┌─────────────────────────────────┐
│         NAVBAR                  │
│  [Logo] [Connexion] [Commencer] │
├─────────────────────────────────┤
│         HERO SECTION            │
│  Titre + CTA + Cartes animées   │
├─────────────────────────────────┤
│         FEATURES                │
│  Architecture hybride (3 cards) │
├─────────────────────────────────┤
│         FOOTER                  │
└─────────────────────────────────┘
```

**Fonctionnalités :**
- Redirection intelligente (vers dashboard si connecté)
- Animations glassmorphism
- Design responsive

#### `login.html` & `register.html` - Authentification
```
┌─────────────────────────────────┐
│      FORMULAIRE CENTRÉ          │
│  [Username Input]               │
│  [Password Input]               │
│  [Submit Button]                │
│  [Error Message]                │
│  [Link to other page]           │
└─────────────────────────────────┘
```

**Fonctionnalités :**
- Validation formulaire
- Messages d'erreur dynamiques
- Redirection post-authentification
- Protection contre double connexion

#### `dashboard.html` - Interface d'analyse
```
┌─────────────────────────────────┐
│  NAVBAR [Logout]                │
├─────────────────────────────────┤
│  FORMULAIRE ANALYSE             │
│  [Textarea]                     │
│  [Bouton Analyser]              │
├─────────────────────────────────┤
│  LOADING INDICATOR              │
│  (SVG spinner + texte)          │
├─────────────────────────────────┤
│  RÉSULTATS (carte)              │
│  ┌─────────────────────────────┐│
│  │ Catégorie | Score           ││
│  ├─────────────────────────────┤│
│  │ Résumé contextuel           ││
│  ├─────────────────────────────┤│
│  │ Ton détecté (coloré)        ││
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

### Fichiers CSS

#### `landing.css` - Styles Landing Page
- **Thème** : Dark mode (#0f172a background)
- **Effets** : Glassmorphism, gradients, animations float
- **Typographie** : Inter font, grande échelle typographique
- **Responsive** : Grid auto-fit pour features

#### `style.css` - Styles Application
- **Thème** : Light mode (#f3f4f6 background)
- **Variables CSS** : Couleurs définies en `:root`
- **Composants** : Forms, cards, buttons, tags
- **États** : Loading, error, success

### Fichiers JavaScript

#### `config.js` - Configuration globale
```javascript
// Variables
- API_BASE_URL : URL du backend

// Fonctions
- getAuthHeaders() : Génère headers avec JWT
- checkAuth() : Protège les routes authentifiées
- redirectIfAuth() : Évite double connexion
```

#### `auth.js` - Logique d'authentification
```javascript
// Fonctions
- handleRegister(event) : Inscription utilisateur
  → POST /register
  → Affiche succès
  → Redirige vers login

- handleLogin(event) : Connexion utilisateur
  → POST /login
  → Stocke JWT dans localStorage
  → Redirige vers dashboard
```

#### `dashboard.js` - Logique d'analyse
```javascript
// Fonctions
- logout() : Déconnexion
  → Supprime token
  → Redirige vers accueil

- handleAnalyze(event) : Analyse de texte
  → Validation input
  → POST /analyse + JWT header
  → Gère réponse/erreurs
  → Appelle displayResults()

- displayResults(data) : Affichage résultats
  → Formate score en %
  → Applique couleur au ton
  → Affiche carte résultats
```

---

##  Pages et composants

### Composants réutilisables

#### Formulaire d'authentification
```html
<div class="form-group">
    <label>Nom d'utilisateur</label>
    <input type="text" id="username" required>
</div>
```

#### Carte de résultats
```html
<div class="result-card">
    <div class="result-header">
        <span class="tag tag-cat">Catégorie</span>
        <span class="tag tag-score">Score</span>
    </div>
    <!-- Résumé et ton -->
</div>
```

#### Indicateur de chargement
```html
<div class="loading">
    <svg><!-- Spinner animé --></svg>
    IA en cours de réflexion...
</div>
```

### Navigation entre pages

```
index.html
  ↓ [Commencer / Connexion]
register.html / login.html
  ↓ [Authentification réussie]
dashboard.html
  ↓ [Se déconnecter]
index.html
```

---

##  Gestion d'état

### LocalStorage

Le frontend utilise `localStorage` pour persister le token JWT :

```javascript
// Stockage à la connexion
localStorage.setItem('access_token', data.access_token);

// Récupération pour les requêtes
const token = localStorage.getItem('access_token');

// Suppression à la déconnexion
localStorage.removeItem('access_token');
```

### Cycle de vie du token

1. **Obtention** : POST /login → Backend génère JWT
2. **Stockage** : Frontend stocke dans localStorage
3. **Utilisation** : Ajouté dans header `Authorization: Bearer <token>`
4. **Expiration** : Backend renvoie 401 → Frontend redirige vers login
5. **Suppression** : Logout → removeItem → Redirection

### Données de session

| Clé | Type | Description |
|-----|------|-------------|
| `access_token` | String | Token JWT pour authentification |



---

##  Sécurité

### Mesures implémentées

#### 1. Protection des routes
```javascript
// dashboard.html charge config.js et exécute :
checkAuth(); // Redirige si pas de token
```

#### 2. Validation JWT côté backend
Chaque requête `/analyse` inclut :
```javascript
headers: {
    'Authorization': `Bearer ${token}`
}
```

#### 3. Gestion des tokens expirés
```javascript
if (response.status === 401) {
    alert("Session expirée. Veuillez vous reconnecter.");
    logout();
}
```

#### 4. Validation formulaires
```html
<input type="text" required>
<input type="password" required>
```


##  Utilisation

### Scénario complet

#### 1. Première utilisation

```bash
# 1. Démarrer le backend
cd hybrid-analyzer-backend
uvicorn app.main:app --reload

# 2. Ouvrir le frontend
cd hybrid-analyzer-frontend
python -m http.server 8080
```

#### 2️. Inscription

1. Ouvrir `http://localhost:8080`
2. Cliquer sur **"Commencer"**
3. Remplir le formulaire d'inscription
4. Cliquer sur **"Créer mon compte"**
5. Redirection automatique vers login

#### 3️. Connexion

1. Saisir username et password
2. Cliquer sur **"Se connecter"**
3. Token JWT stocké automatiquement
4. Redirection vers dashboard

#### 4️. Analyser un texte

```
Exemple d'article :

"Apple Inc. a annoncé des résultats financiers record pour 
le trimestre, avec une augmentation de 15% du chiffre 
d'affaires. Les ventes d'iPhone ont dépassé les prévisions 
des analystes, porté par le succès du nouveau modèle Pro."
```

**Résultat attendu :**
- **Catégorie** : Finance / Business
- **Score** : ~85-95%
- **Résumé** : "Apple annonce des résultats trimestriels exceptionnels..."
- **Ton** : Positif (vert)

#### 5️. Déconnexion

1. Cliquer sur **"Se déconnecter"**
2. Token supprimé
3. Redirection vers accueil


-  **Backend Repository** : [hybrid-analyzer-backend](https://github.com/AyoubMotei/hybrid-analyzer-backend/tree/master)
-  **Frontend Repository** : [hybrid-analyzer-frontend](https://github.com/AyoubMotei/hybrid-analyzer-frontend.git)

### Documentation externe

-  [Hugging Face API Documentation](https://huggingface.co/docs/api-inference/index)
- [Google Gemini API Guide](https://ai.google.dev/docs)
- [JWT.io - JSON Web Tokens](https://jwt.io/)
-  [FastAPI Documentation](https://fastapi.tiangolo.com/)

### Ressources utilisées

- **Modèle Zero-Shot** : [facebook/bart-large-mnli](https://huggingface.co/facebook/bart-large-mnli)
- **Fonts** : [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Icons** : [Font Awesome](https://fontawesome.com/)

---


**Dernière mise à jour** : Décembre 2025  
**Version** : 1.0.0  
**Auteur** : AYOUB MOTEI
