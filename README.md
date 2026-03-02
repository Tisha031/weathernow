# WeatherNow

> Real-time weather intelligence dashboard — search any city, get instant weather data & 5-day forecast.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap_API-orange?style=for-the-badge&logo=openstreetmap&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**🔗 Live Demo:** [https://weather-dashboard-tisha031.vercel.app](https://weather-dashboard-tisha031.vercel.app)

---

## 📸 Preview

> Search any city → get real-time weather instantly with a dynamic UI that changes based on weather conditions.

---

## Features

-  **City Search** — search any city worldwide with Enter key support
-  **Current Weather** — temperature, feels like, humidity, wind speed, visibility, pressure, cloud cover
-  **5-Day Forecast** — daily high/low with weather icons
-  **°C / °F Toggle** — instant unit conversion, no extra API call
-  **Local Time** — shows local time of the searched city
-  **Search History** — last 5 cities saved in localStorage, click to re-search
-  **Favourite City** — pin your favourite city, loads automatically on refresh
-  **Dynamic Background** — gradient changes based on weather (sunny, cloudy, rainy, stormy, snow)
-  **Smart Error Handling** — clear messages for invalid city, expired API key, network errors
-  **Fully Responsive** — works on mobile, tablet, desktop

---

## 🏗️ Architecture

```
User (Browser)
    ↓
Next.js Frontend  ←→  localStorage (history, favourites)
    ↓
Next.js API Routes (server-side)     ← API key stays here, NEVER exposed to browser
    ↓
OpenWeatherMap API (external)
```

### Why Next.js API Routes?

Most weather projects call the OpenWeatherMap API **directly from the browser** — this exposes your API key in the network tab for anyone to steal.

WeatherNow routes all API calls through **server-side Next.js API routes**. The API key lives in `.env.local` and is only accessed on the server via `process.env.OPENWEATHER_API_KEY`. This is how production apps handle third-party API integrations.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14 (App Router)** | Framework, routing, server-side API routes |
| **TypeScript** | Type safety, interfaces for API responses |
| **Tailwind CSS v3** | Styling, responsive design |
| **OpenWeatherMap API** | Weather data (current + 5-day forecast) |
| **localStorage** | Persisting search history & favourite city |
| **Vercel** | Deployment, environment variables |

---

## Folder Structure

```
weather-dashboard/
├── app/
│   ├── api/
│   │   ├── weather/
│   │   │   └── route.ts          # GET /api/weather?city=London
│   │   └── forecast/
│   │       └── route.ts          # GET /api/forecast?city=London
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # main page, wires all components
│
├── components/
│   ├── SearchBar.tsx             # search input + submit
│   ├── WeatherCard.tsx           # current weather display
│   ├── ForecastCard.tsx          # single day forecast card
│   ├── ForecastSection.tsx       # 5-day forecast row
│   ├── SearchHistory.tsx         # recent search pills
│   ├── UnitToggle.tsx            # °C / °F toggle
│   └── LoadingSpinner.tsx        # loading skeleton
│
├── hooks/
│   ├── useWeather.ts             # weather fetch logic + TypeScript interfaces
│   ├── useForecast.ts            # forecast fetch logic
│   └── useLocalStorage.ts        # localStorage read/write hook
│
├── utils/
│   ├── formatDate.ts             # date formatting
│   ├── getWeatherBg.ts           # dynamic background based on condition
│   └── tempConverter.ts          # celsius ↔ fahrenheit conversion
│
├── .env.local                    # OPENWEATHER_API_KEY (never pushed to GitHub)
├── .env.example                  # safe template for contributors
└── README.md
```

---

## Run Locally

### Prerequisites
- Node.js 18+
- Free API key from [openweathermap.org](https://openweathermap.org/api)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Tisha031/weather-dashboard.git

# 2. Go into the project
cd weather-dashboard

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env.local

# 5. Add your OpenWeatherMap API key to .env.local
# OPENWEATHER_API_KEY=your_key_here

## 📡 API Endpoints

### `GET /api/weather?city={cityName}`
Returns current weather for the given city.

**Example:**
```
GET /api/weather?city=Mumbai
```

**Response:**
```json
{
  "name": "Mumbai",
  "sys": { "country": "IN" },
  "weather": [{ "main": "Clear", "description": "clear sky", "icon": "01d" }],
  "main": {
    "temp": 31.5,
    "feels_like": 36.2,
    "humidity": 70,
    "temp_min": 29.0,
    "temp_max": 33.0,
    "pressure": 1008
  },
  "wind": { "speed": 4.1 },
  "visibility": 6000,
  "clouds": { "all": 20 }
}
```

### `GET /api/forecast?city={cityName}`
Returns 5-day / 3-hour forecast for the given city.

---


## 👩‍💻 Author

**Tisha Jinger**
- GitHub: [@Tisha031](https://github.com/Tisha031)
- Bio: Turning Complex Problems into Clean, Scalable Backend Systems | Python • FastAPI • PostgreSQL

---

> ⭐ If you found this project useful, give it a star on GitHub!
