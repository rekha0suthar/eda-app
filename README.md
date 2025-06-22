# EDA (Exploratory Data Analysis) App

A comprehensive data exploration dashboard built with React frontend and Django backend for analyzing FMCG retail data.

## Features

- **Interactive Filters**: Brand, Pack Type, PPG, Channel, Year
- **Dynamic Charts**:
  - Horizontal bar charts for Sales Value and Volume by year
  - Vertical bar chart for Year-wise Sales Value
  - Line chart for Monthly Trend of Sales Value
  - Pie/Donut charts for Market Share analysis
- **Real-time Data Exploration**: Filter and explore data with instant visual updates
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

### Frontend

- React 18 with TypeScript
- Chart.js with react-chartjs-2
- Tailwind CSS for styling
- Axios for API calls

### Backend

- Django 4.2 with Django REST Framework
- Pandas for data processing
- SQLite for data storage

## Project Structure

```
eda-app/
├── frontend/          # React application
├── backend/           # Django application
├── data/             # Dataset files
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory: `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Start server: `python manage.py runserver`

### Frontend Setup

1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## API Endpoints

- `GET /api/data/` - Get all data with optional filters
- `GET /api/filters/` - Get available filter options
- `GET /api/charts/sales-by-year/` - Get sales data by year
- `GET /api/charts/volume-by-year/` - Get volume data by year
- `GET /api/charts/monthly-trend/` - Get monthly trend data
- `GET /api/charts/market-share/` - Get market share data

## Usage

1. Start both backend and frontend servers
2. Open browser and navigate to `http://localhost:3000`
3. Use the filters to explore different data segments
4. Interact with charts for detailed insights
5. Export data or charts as needed

## Data Schema

The app works with FMCG retail data containing:

- Sales Value
- Volume (kg)
- Brand
- Pack Type
- PPG (Price Per Gram)
- Channel
- Year
- Month
