# ClimaBoard

ClimaBoard is a full-stack weather application that allows users to search cities, view current weather and 7-day forecasts, compare cities, manage favorites, and use an Atbash text transformer.

Weather data is provided by [Open-Meteo](https://open-meteo.com/).

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- React Hooks
- React Context
- Lucide React

### Backend

- Python
- FastAPI
- Pydantic
- HTTPX
- MongoDB Atlas
- PyMongo Async
- Uvicorn

## Architecture

The frontend never communicates directly with Open-Meteo.

```text
React Frontend
      ↓
FastAPI Backend
      ↓
Open-Meteo API

FastAPI
   ↓
MongoDB Atlas
```

The backend handles validation, external API requests, data transformation, favorites storage, middleware, and error handling.

## Main Features

- Fake explorer login using `localStorage`
- Protected React routes
- City search
- Current weather
- 7-day forecast
- Weather icons based on weather codes
- Compare two cities
- Add and delete favorite cities
- View favorite city details
- MongoDB Atlas persistence
- English / Hebrew interface
- RTL support for Hebrew
- Atbash transformer for English and Hebrew
- Responsive UI

## Project Structure

```text
meteo-tracker/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hook/
    │   ├── pages/
    │   ├── translations/
    │   ├── types/
    │   └── utils/
    └── package.json
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it.

Windows:

```bash
.venv\Scripts\activate
```

macOS / Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
MONGODB_DB=climaboard
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Main API Endpoints

```text
GET    /health
GET    /api/cities/search
GET    /api/weather/current
GET    /api/weather/forecast
GET    /api/weather/compare

GET    /api/favorites
POST   /api/favorites
DELETE /api/favorites/{favorite_id}

POST   /api/utils/atbash
```

## Application Routes

```text
/
 /app/dashboard
 /app/search
 /app/city/:id
 /app/favorites
 /app/compare
```

Private `/app/*` routes require an explorer name stored in `localStorage`.

## Running the Full Application

Run both servers at the same time:

```text
Terminal 1 → FastAPI backend → port 8000
Terminal 2 → React frontend  → port 5173
```

Then open:

```text
http://localhost:5173
```

## External Services

### Open-Meteo

Used for:

- City geocoding
- Current weather
- Weather forecasts

### MongoDB Atlas

Used to store favorite cities.

## Author

ClimaBoard — Full-Stack Weather Application and Avroumi
