# TEAM NOVA - Student Team Members Management Application

## Project Description
A full-stack, professional web application designed to manage student team members effectively. It features a polished, modern aesthetic with dark mode and glassmorphism UI traits.

Built using the MERN stack equivalent approach per requirements (React.js frontend, Node.js + Express + MongoDB backend).

### Features
- Modern UI interface with micro-animations & glassmorphism.
- View all active members in a dynamic gallery layout.
- Upload new team members with their custom details and professional portrait headshots.
- Dedicated profile detail pages showing complete credentials and list of achievements.
- Functionality to permanently remove an inactive or former member from the team.

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd TEAM_NOVA
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the backend root and set `MONGODB_URI` if necessary (defaults to local MongoDB).*

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## How to Run the App

Open two separate terminal windows.

**Start the Backend API (Terminal 1)**
```bash
cd backend
node server.js
```
The backend server runs on `http://localhost:5000`

**Start the React Frontend (Terminal 2)**
```bash
cd frontend
npm start
```
The frontend UI will start successfully and can be accessed at `http://localhost:3000`

## API Endpoints

- `GET /api/members`: Retrieves a list of all team members.
- `GET /api/members/:id`: Fetch comprehensive details of a specific team member using their unique ID.
- `POST /api/members`: Submit a new member including an image upload field (multipart/form-data).
- `DELETE /api/members/:id`: Removes a specific team member and deletes their portrait image from the local storage.
