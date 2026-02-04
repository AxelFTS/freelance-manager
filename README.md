# 🧾 Freelance Manager

Application web de gestion pour freelances : clients, factures, dashboard et génération PDF.

---

## 🎯 Fonctionnalités

- ✅ Gestion des clients (CRUD complet)
- ✅ Gestion des factures avec lignes dynamiques
- ✅ Dashboard avec statistiques et graphiques
- ✅ Génération de factures PDF
- ✅ Authentification JWT sécurisée
- ✅ Interface responsive (Angular Material)

---

## 🛠️ Stack technique

### Backend

- Java 17
- Spring Boot 4.0
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL 15
- Maven

### Frontend

- Angular 20
- Angular Material
- RxJS
- SCSS

### DevOps

- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Déploiement : Render (back) + Vercel (front)

---

## 📁 Architecture du projet

```
freelance-manager/
├── backend/
│   └── src/main/java/com/axel/backend/
│       ├── controller/    → Endpoints REST
│       ├── service/       → Logique métier
│       ├── repository/    → Accès BDD
│       ├── entity/        → Modèles JPA
│       ├── dto/           → Objets de transfert
│       ├── mapper/        → Conversion Entity ↔ DTO
│       └── exception/     → Gestion des erreurs
├── frontend/
│   └── src/app/
│       ├── core/          → Guards, interceptors, services
│       ├── features/      → Modules métier (clients, factures, dashboard)
│       ├── layout/        → Header, sidebar, main-layout
│       └── shared/        → Composants réutilisables
└── docker-compose.yml
```

---

## 🚀 Installation

### Prérequis

- Java 21
- Node.js 20+
- Docker & Docker Compose
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/AxelFTS/freelance-manager.git
cd freelance-manager
```

### 2. Lancer la base de données

```bash
docker-compose up -d
```

### 3. Lancer le backend

```bash
cd backend
./mvnw spring-boot:run
```

### 4. Lancer le frontend

```bash
cd frontend
npm install
npm start
```

### 5. Accéder à l'application

- Frontend : http://localhost:4200
- Backend API : http://localhost:8080/api

---

## 🔐 Compte démo

À venir

---

## 📸 Screenshots

<img width="2226" height="1080" alt="factures" src="https://github.com/user-attachments/assets/d793141f-296a-4d01-a508-f6dce741abd1" />

---

<img width="2224" height="1081" alt="Clients" src="https://github.com/user-attachments/assets/d8a85437-3f6b-40b6-9fb0-763230dd24c0" />

---

## 🧪 Tests API (Postman)

À venir

---

## 📚 Documentation API

| Méthode | Endpoint               | Description               |
| ------- | ---------------------- | ------------------------- |
| GET     | /api/clients           | Liste tous les clients    |
| GET     | /api/clients/{id}      | Récupère un client        |
| POST    | /api/clients           | Crée un client            |
| PUT     | /api/clients/{id}      | Modifie un client         |
| DELETE  | /api/clients/{id}      | Supprime un client        |
| GET     | /api/factures          | Liste toutes les factures |
| GET     | /api/factures/{id}     | Récupère une facture      |
| POST    | /api/factures          | Crée une facture          |
| PUT     | /api/factures/{id}     | Modifie une facture       |
| DELETE  | /api/factures/{id}     | Supprime une facture      |
| GET     | /api/factures/{id}/pdf | Télécharge le PDF         |
| POST    | /api/auth/login        | Authentification          |

---

## 🏗️ Roadmap

- [x] CRUD Clients
- [ ] CRUD Factures
- [ ] Dashboard avec stats
- [ ] Génération PDF
- [ ] Authentification JWT
- [ ] CI/CD GitHub Actions
- [ ] Gestion des devis
- [ ] Relances automatiques par email
- [ ] Multi-utilisateurs

---

## 👤 Auteur

**Axel Fuentes**

- 🌐 Portfolio : [axelfts.github.io](https://axelfts.github.io/)
- 💼 LinkedIn : [Axel Fuentes](https://www.linkedin.com/in/axel-fuentes/)
- 🧑‍💻 Malt : [axelfuentes](https://www.malt.fr/profile/axelfuentes)

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## **Conventions commits**

**feat**: Nouvelle fonctionnalité  
**fix**: Correction de bug  
**chore**: Config, dépendances, setup  
**docs**: Documentation  
**refactor**: Amélioration du code

### **Exemples concrets SIMPLES** :

git commit -m "feat: add Client entity"  
git commit -m "feat: create invoice API"  
git commit -m "fix: tax calculation error"  
git commit -m "chore: setup Docker PostgreSQL"  
git commit -m "docs: update README"  
git commit -m "refactor: clean Client service"



