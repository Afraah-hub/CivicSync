# 🏛️ CivicSync

### Smarter Civic Complaint Management for Better Communities

**CivicSync** is a full-stack civic issue reporting platform that empowers citizens to report public infrastructure and municipal service issues while providing administrators with powerful tools to monitor, prioritize, and resolve complaints efficiently.

The platform consists of:

- 📱 Flutter Mobile Application
- 💻 React Admin Dashboard
- ⚙️ Flask REST API Backend
- 🗄️ SQLite Database

---

<p align="center">

![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-3.x-black?style=for-the-badge&logo=flask)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# 📖 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Configuration](#-configuration)
- [Running the Backend](#-running-the-backend)
- [Running the Admin Dashboard](#-running-the-admin-dashboard)
- [Running the Mobile App](#-running-the-mobile-app)
- [REST API](#-rest-api)
- [Database](#-database)
- [Future Enhancements](#-future-enhancements)
- [Current Limitations](#-current-limitations)
- [License](#-license)

---

# 🌍 Overview

Municipal issues such as potholes, overflowing waste bins, damaged streetlights, illegal dumping, and drainage problems often go unreported or unresolved due to fragmented communication channels.

**CivicSync** creates a centralized platform where citizens can quickly report issues while local authorities gain visibility into complaint trends, priority levels, and resolution progress.

The platform enables:

✅ Citizen complaint submission

✅ Complaint tracking

✅ Complaint prioritization

✅ Administrative monitoring

✅ Complaint status updates

✅ Image-based reporting

✅ Geolocation support

✅ Municipal transparency

---

# 🚨 Problem Statement

Traditional complaint systems often suffer from:

- Slow response times
- Poor tracking mechanisms
- Lack of transparency
- Limited citizen engagement
- Scattered communication channels

CivicSync solves these challenges through a centralized digital complaint-management system that connects residents with governing authorities.

---

# ✨ Features

## 📱 Resident Mobile App

### Submit Complaints

Residents can report issues with:

- Category
- Description
- Location Coordinates
- Address
- Priority
- Images

### Track Complaints

Users can view:

- Submitted complaints
- Current status
- Priority level
- Complaint history

### Image Uploads

Attach evidence photos directly from a device camera or gallery.

---

## 💻 Admin Dashboard

### Complaint Management

- View all complaints
- Sort complaints
- Monitor activity
- Update statuses

### Real-Time Statistics

Dashboard metrics include:

- Total Complaints
- Resolved Complaints
- Pending Complaints
- High-Priority Complaints

### Priority Management

Administrators can update:

- Status
- Priority
- Progress tracking

---

## ⚙️ Backend API

Provides RESTful endpoints for:

- Complaint creation
- Complaint retrieval
- Complaint updates
- Image management
- Administrative workflows

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|-----------|
| Mobile App | Flutter, Dart |
| Frontend Dashboard | React 18, React Router |
| Backend API | Flask |
| ORM | Flask-SQLAlchemy |
| Authentication | Flask-JWT-Extended |
| Database | SQLite |
| File Uploads | Flask Static Storage |
| HTTP Client | Axios, Flutter HTTP |
| Migrations | Flask-Migrate |
| Environment Management | python-dotenv |

---

# 🏗 System Architecture

```text
                    Citizens
                        │
                        ▼

        ┌─────────────────────────┐
        │ Flutter Mobile App      │
        └───────────┬─────────────┘
                    │ REST API
                    ▼

        ┌─────────────────────────┐
        │ Flask Backend API       │
        │ Complaint Management    │
        └───────────┬─────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼

   SQLite Database      Image Storage
                             │
                             ▼

      ┌───────────────────────────┐
      │ React Admin Dashboard     │
      └───────────────────────────┘
```

---

# 📂 Project Structure

```text
CivicSync/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── routes/
│   │   └── complaints.py
│   │
│   ├── instance/
│   │   └── civicsync.db
│   │
│   └── static/
│       └── uploads/
│
├── admin_dashboard/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── package.json
│
├── mobile/
│   └── lib/
│       ├── models/
│       ├── services/
│       └── main.dart
│
└── README.md
```

---

# ✅ Prerequisites

Before running the project, ensure you have:

- Python 3.10+
- Node.js 18+
- npm
- Flutter 3.x
- Dart SDK
- Git

---

# ⚙️ Configuration

Create a `.env` file inside the backend folder:

```env
SECRET_KEY=replace-with-a-secure-secret

JWT_SECRET_KEY=replace-with-a-secure-jwt-secret

DATABASE_URL=sqlite:///civicsync.db
```

### Environment Variables

| Variable | Description |
|-----------|-------------|
| `SECRET_KEY` | Flask application secret |
| `JWT_SECRET_KEY` | JWT signing secret |
| `DATABASE_URL` | Database connection string |

---

# 🚀 Running the Backend

Install dependencies:

```bash
pip install flask flask-cors flask-sqlalchemy flask-migrate flask-jwt-extended python-dotenv
```

Start the Flask server:

```bash
cd backend

python app.py
```

Backend URL:

```text
http://localhost:5000
```

The application will automatically:

- Create missing tables
- Seed sample data
- Initialize local storage folders

---

# 💻 Running the Admin Dashboard

Install dependencies:

```bash
cd admin_dashboard

npm install
```

Run development server:

```bash
npm start
```

Dashboard URL:

```text
http://localhost:3000
```

Build production bundle:

```bash
npm run build
```

---

# 📱 Running the Mobile App

Fetch Flutter packages:

```bash
cd mobile

flutter pub get
```

Run application:

```bash
flutter run
```

Default API endpoint:

```text
http://10.0.2.2:5000/api
```

For physical devices, update:

```dart
baseUrl
```

inside:

```text
mobile/lib/services/api_service.dart
```

to your local network IP address.

---

# 🔌 REST API

## Health Check

```http
GET /health
```

Response

```json
{
  "status": "healthy",
  "service": "CivicSync AI API"
}
```

---

## Get All Complaints

```http
GET /api/complaints
```

---

## Create Complaint

```http
POST /api/complaints
Content-Type: multipart/form-data
```

Supported fields:

| Field | Type |
|---------|------|
| category | text |
| description | text |
| latitude | text |
| longitude | text |
| address | text |
| status | text |
| priority | text |
| image | file |

Example request body:

```json
{
  "category": "Roads & Traffic",
  "description": "Large pothole near market square",
  "latitude": "13.0827",
  "longitude": "80.2707",
  "address": "Market Square, Chennai",
  "status": "SUBMITTED",
  "priority": "Critical"
}
```

---

## Update Complaint

```http
PATCH /api/complaints/{id}/status
```

Example:

```json
{
  "status": "IN PROGRESS",
  "priority": "High"
}
```

---

# 🗄 Database

Default database location:

```text
backend/instance/civicsync.db
```

Uploaded files are stored in:

```text
backend/static/uploads/
```

Example URL:

```text
/static/uploads/filename.jpg
```

To reset the database:

1. Stop the backend
2. Delete `civicsync.db`
3. Restart the server

A fresh database including demo data will be generated automatically.

---

# 🚀 Future Enhancements

- User Authentication & Authorization
- Role-Based Access Control
- GIS Map Integration
- Push Notifications
- Email Alerts
- Complaint Assignment Workflow
- AI-Based Complaint Classification
- Analytics Dashboard Enhancements
- Complaint Heat Maps
- Mobile Camera Integration
- Multitributions are welcome.

1. Fork the repository

```bash
git clone https://github.com/your-username/civicsync.git
```

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is currently under development.

Add an appropriate open-source license (such as MIT License) before public distribution.

---

# 👨‍💻 CivicSync Team

### Building Better Communities Through Technology

*"Report faster. Resolve smarter. Improve communities."*

⭐ If you find this project useful, consider giving it a star on GitHub.
