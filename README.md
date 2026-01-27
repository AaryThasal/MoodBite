# 🍽️ MoodBite — Mood-Based Nearby Food Recommender

MoodBite is a frontend web application that helps users quickly discover nearby food places based on their **current mood and context**, without overwhelming them with unnecessary information like reviews or complex filters.

---

## ✨ Features

### 😊 Mood-Based Recommendations
Users choose a mood, and the system suggests places accordingly:

- Work → Cafés and quiet places
- Quick Bite → Fast food / takeaway
- Budget → Affordable eateries
- Casual → General food spots

Mood affects:
- Place type filtering
- Search radius
- Sorting priority

---

### 📍 Location-Aware Search
- Uses **Browser Geolocation API**
- Users can manually search an address if location permission is denied
- Nearby places shown on:
  - Interactive map
  - Scrollable list

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Leaflet
- Axios / Fetch API

### APIs & Services
- OpenStreetMap (Map tiles)
- Overpass API (Place data)
- Nominatim API (Geocoding)
- Browser Geolocation API

---

## 👤 User Flow

### Step 1: Location
User allows location access or searches an address manually.

### Step 2: Mood Selection
User selects mood and search radius.

### Step 3: Results
System fetches nearby places and shows:
- Map markers
- Place list sorted by distance

---