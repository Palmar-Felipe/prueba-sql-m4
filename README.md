# Billing Management System

This is a monolithic system for managing a library, allowing you to manage users, books, and loans. The backend is built with **Node.js** and **Express**, the database is managed with **MySQL**, and the frontend is located in the `app` folder..

---

## 🚀 Technologies used

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript (Frontend)
- csv-parser (para cargar datos desde archivos CSV)
- vite

---

## 📁 Project structure
```bash
prueba-sql-m4/
│
├── docs/ # Documentation
│       ...
├── app/ # Frontend (HTML, CSS, JS)
│       ...
├── server/ # Backend
│       ...
├── index.html 
├── .env # Variables de entorno
├── .gitignore
└── README.md
```

## 📦 install

1. Clone the repository:

```bash
git clone https://github.com/Palmar-Felipe/prueba-sql-m4.git
cd prueba-sql-m4
```
2. Install dependencies:

```bash
npm install
```

3. Create and configure the file.env:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=db_name
DB_PORT=3306
```

4. Initialize the backend:
```bash
node server/index.js
```

5. Initialize the frontend:
```bash
npm run dev
```

**author**: Felipe MIguel palmar ramirez
**dni** 1119392593
**email** pipepalmar@hotmail.com