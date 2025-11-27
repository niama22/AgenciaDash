# 📊 Dashboard Application - Gestion des Agences et Contacts

Application Next.js avec authentification Clerk permettant de consulter des agences et leurs contacts avec une limite quotidienne de 50 contacts par utilisateur.

## 🚀 Fonctionnalités

- ✅ **Authentification utilisateur** avec Clerk (Sign In / Sign Up)
- 📋 **Liste complète des agences** (villes) avec recherche et pagination
- 👥 **Liste des contacts d'employés** limitée à 50 par jour et par utilisateur
- 🔍 **Recherche en temps réel** sur tous les champs
- 📄 **Pagination** pour une navigation fluide
- 💳 **Système de limitation quotidienne** avec message d'upgrade
- 🎨 **Interface moderne et responsive**

## 🛠️ Technologies Utilisées

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **Authentification**: Clerk
- **Styling**: CSS Modules
- **Déploiement**: Vercel
- **Repository**: GitHub

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Clerk (gratuit)
- Compte Vercel (optionnel pour le déploiement)

### Étapes d'installation

1. **Cloner le repository**
```bash
git remote add origin https://github.com/niama22/AgenciaDash.git
cd dashboard-app
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

4. **Ajouter les données CSV**

Placez vos fichiers dans `/public/data/` :
- `agencies.csv` - Liste des agences
- `contacts.csv` - Liste des contacts

Format CSV attendu :

**agencies.csv**
```
name,state,state_code,type,population,website,county
Los Angeles,California,CA,City,4000000,https://lacity.gov,Los Angeles County
```

**contacts.csv**
```
first_name,last_name,title,email,phone,department,email_type
John,Doe,Manager,john.doe@city.gov,555-1234,HR,Work
```

5. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
dashboard-app/
├── app/
│   ├── components/
│   │   ├── AgenciesView.tsx       # Vue liste des agences
│   │   ├── ContactsView.tsx       # Vue liste des contacts
│   │   ├── DashboardView.tsx      # Vue tableau de bord
│   │   ├── AuthScreen.tsx         # Écran d'authentification
│   │   ├── Sidebar.tsx            # Menu de navigation
│   │   ├── SearchBar.tsx          # Barre de recherche
│   │   └── Pagination.tsx         # Composant de pagination
│   ├── sign-in/
│   │   └── page.tsx               # Page de connexion
│   ├── sign-up/
│   │   └── page.tsx               # Page d'inscription
│   ├── styles/
│   │   ├── AgenciesView.module.css
│   │   ├── ContactsView.module.css
│   │   └── AuthScreen.module.css
│   ├── types.ts                   # Types TypeScript
│   ├── constants.ts               # Constantes de l'app
│   ├── layout.tsx                 # Layout principal
│   └── page.tsx                   # Page principale
├── public/
│   └── data/
│       ├── agencies.csv           # Données des agences
│       └── contacts.csv           # Données des contacts
├── middleware.ts                  # Middleware Clerk
├── .env.local                     # Variables d'environnement
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🎯 Utilisation

### Authentification

1. Accédez à l'application
2. Créez un compte ou connectez-vous
3. Vous serez redirigé vers le dashboard

### Navigation

- **Dashboard** : Vue d'ensemble avec statistiques
- **Agences** : Liste complète des agences avec recherche
- **Contacts** : Liste des contacts (max 50/jour)

### Système de Limitation

- Chaque utilisateur peut consulter **50 contacts maximum par jour**
- Le compteur se réinitialise automatiquement à minuit
- Les données sont stockées dans `localStorage` avec une clé unique par utilisateur
- Un message d'upgrade apparaît lorsque la limite est atteinte

## 🔒 Sécurité

- Authentification gérée par Clerk
- Routes protégées via middleware
- Données utilisateur isolées (localStorage avec clé unique)
- Aucune donnée sensible en clair

## 🚀 Déploiement sur Vercel

1. **Connectez votre repository GitHub à Vercel**

2. **Configurez les variables d'environnement** dans Vercel Dashboard

## 👤 Auteur

SAKHR Niama

Lien du projet: [https://github.com/votre-username/dashboard-app](https://github.com/votre-username/dashboard-app)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Vercel](https://vercel.com/)
