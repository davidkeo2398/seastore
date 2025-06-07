# SeaStore Project

This guide will help you set up and run the Frontend (FE) and Backend (BE) of the SeaStore project.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn** (package manager)
- **Git** (for cloning the repository)
- **Docker** (if using containerized services)

---

## Step-by-Step Guide

### 1. Clone the Repository

```bash
git clone git@github.com:davidkeo2398/seastore.git
cd seastore
```

### 2. Setup Backend (BE)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add necessary configurations (refer to `.env.example` if available).
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend should now be running on `http://localhost:8080`.

### 3. Setup Frontend (FE)

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add necessary configurations (refer to `.env.example` if available).
4. Start the frontend server:
   ```bash
   npm run dev
   ```
   The frontend should now be running on `http://localhost:5173`.

---

## Additional Notes

- Ensure the backend is running before starting the frontend.
- If using Docker, refer to the `docker-compose.yml` file for containerized setup.
- For troubleshooting, check the logs in the respective terminal windows.

---

Happy coding!

### Backend `.env` File

```env
# Backend Environment Variables
PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sea_store
JWT_SECRET=tailwind&AI
NODE_ENV=development

```

### Frontend `.env` File

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:8080
VITE_APP_TITLE=SeaStore
```
