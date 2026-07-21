# PublicEye

PublicEye is a full-stack civic issue reporting and management system that enables citizens to report public infrastructure issues while allowing government authorities to assign, monitor, and resolve them efficiently.

The platform provides separate dashboards for Citizens, Officers, and Administrators, integrating interactive maps, image uploads, issue tracking, voting, and analytics to improve transparency in civic issue management.

---

## Features

### Citizen

- Secure authentication
- Report civic issues with images
- Select issue location using an interactive map
- Automatic reverse geocoding
- Public voting on issues
- Track issue status

### Officer

- View assigned issues
- Update issue progress
- Submit issue reports
- Dashboard with analytics

### Admin

- Manage issues
- Assign and reassign officers
- Manage users
- Review officer reports
- View analytics dashboard

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Leaflet
- OpenStreetMap
- Recharts
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- MongoDB
- Mongoose

---

## Project Structure

```
PublicEye
│
├── backend
│   ├── config
│   ├── controllers
│   ├── issue-images
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   ├── app.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── constants
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/<username>/PublicEye.git
cd PublicEye
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEOAPIFY_API_KEY=your_geoapify_key
```

Run the backend server.

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Issue Workflow

```
Pending
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
```

Issues may also be marked as **Rejected**.

---
