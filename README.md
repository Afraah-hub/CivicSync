# CivicSync

CivicSync is a civic complaint-management platform with a Flutter mobile app, a React administration dashboard, and a Flask REST API.

Residents can submit and view public service complaints, while administrators can monitor complaint statistics and update complaint status and priority.

## Features

- Create complaints with category, description, location coordinates, address, status, priority, and an optional image
- View complaints from newest to oldest
- Track complaint status and priority
- Upload complaint images to the backend
- View overview statistics in the admin dashboard
- Update complaint status from the admin complaint table
- Seeded SQLite data for quick local testing

## Technology Stack

| Component | Technology |
| --- | --- |
| Mobile app | Flutter, Dart, HTTP |
| Admin dashboard | React 18, React Router, Axios, Lucide React |
| REST API | Python, Flask |
| Database | SQLite with Flask-SQLAlchemy |
| Configuration | Flask-Migrate, Flask-JWT-Extended, python-dotenv |

## Project Structure

```text
.
├── backend/
│   ├── app.py                 # Flask application and seed data
│   ├── config.py              # Environment and database configuration
│   ├── models.py              # SQLAlchemy complaint model
│   ├── routes/complaints.py   # Complaint API routes
│   ├── instance/civicsync.db  # Local SQLite database
│   └── static/uploads/        # Uploaded complaint images
├── admin_dashborad/
│   ├── public/
│   ├── src/
│   │   ├── components/        # Dashboard navigation
│   │   ├── pages/             # Dashboard and complaint management views
│   │   └── services/api.js    # React API client
│   └── package.json
└── mobile/
    └── lib/
        ├── main.dart          # Flutter app entry point
        ├── models/            # Complaint model
        └── services/          # Flutter API service
```

## Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer with npm
- Flutter 3.x and Dart SDK
- Android Emulator, browser, or another supported mobile/desktop target

Install the backend dependencies before starting the API:

```powershell
pip install flask flask-cors flask-sqlalchemy flask-migrate flask-jwt-extended python-dotenv
```

## Configuration

The backend supports these environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `DATABASE_URL` | `sqlite:///civicsync.db` | SQLAlchemy database URL |
| `SECRET_KEY` | Development key | Flask application secret |
| `JWT_SECRET_KEY` | Development key | JWT signing secret |

Create a `.env` file inside `backend/` for local overrides:

```env
SECRET_KEY=replace-with-a-long-random-secret
JWT_SECRET_KEY=replace-with-a-long-random-jwt-secret
DATABASE_URL=sqlite:///civicsync.db
```

For deployment, always replace the development secret keys and restrict CORS and network access appropriately.

## Running the Backend

From the project root:

```powershell
cd backend
python app.py
```

The API starts at `http://localhost:5000`.

The application creates the database tables and adds sample complaints automatically if the database is empty.

## Running the Admin Dashboard

The dashboard API base URL is configured as `http://localhost:5000/api`.

```powershell
cd admin_dashborad
npm install
npm start
```

The React development server normally opens at `http://localhost:3000`.

To create an optimized build:

```powershell
npm run build
```

## Running the Mobile App

The Flutter API service uses `http://10.0.2.2:5000/api`, which is the Android Emulator address for the host machine's localhost.

For a physical device or a different platform, update `baseUrl` in `mobile/lib/services/api_service.dart` to an address reachable from that device.

From the project root:

```powershell
cd mobile
flutter pub get
flutter run
```

The report issue workflow is prepared in the API service but is not yet connected to the mobile report screen.

## REST API

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "healthy",
  "service": "CivicSync AI API"
}
```

### List Complaints

```http
GET /api/complaints
```

### Create a Complaint

```http
POST /api/complaints
Content-Type: multipart/form-data
```

Fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | text | No | Complaint category; defaults to `General` |
| `description` | text | No | Complaint details |
| `latitude` | text | No | Latitude coordinate |
| `longitude` | text | No | Longitude coordinate |
| `address` | text | No | Human-readable location |
| `status` | text | No | Initial status; defaults to `SUBMITTED` |
| `priority` | text | No | Priority; defaults to `Medium` |
| `image` | file | No | PNG or JPEG complaint image |

Example JSON-style body for a complaint endpoint test:

```json
{
  "category": "Roads & Traffic",
  "description": "Large pothole near the market square",
  "latitude": "13.0827",
  "longitude": "80.2707",
  "address": "Market Square, Chennai",
  "status": "SUBMITTED",
  "priority": "Critical"
}
```

For a request with an image, send the fields as `multipart/form-data`.

### Update Complaint Status or Priority

```http
PATCH /api/complaints/{id}/status
PATCH /api/admin/complaints/{id}/status
Content-Type: application/json
```

Example:

```json
{
  "status": "IN PROGRESS",
  "priority": "High"
}
```

## Database

The default SQLite database is stored at `backend/instance/civicsync.db`.

Uploaded files are saved in `backend/static/uploads/` and exposed at paths such as:

```text
/static/uploads/<filename>
```

Delete the SQLite database while the backend is stopped to reset seeded data. The database is recreated and seeded the next time the Flask application starts.

## Current Limitations

- Authentication is configured in the backend, but complaint routes do not require authentication
- The mobile report screen is marked as a future workflow
- The dashboard Map and Teams pages are placeholders
- API and web/Mobile URLs are currently configured directly in source code
- The backend file upload route does not yet validate the configured allowed image extensions
- Database migrations and test suites are not currently included

## License

Add the project's license here before distributing CivicSync publicly.
