# 🌍 CityLink

**Student Housing & Community Platform for Migrating Students**

> Helping students find **trusted roommates, verified housing, and local services** when moving to a new city.

---

### 🔗 **[Live Demo](https://citylink-nine.vercel.app/)**

---

## 🚀 Problem

Every year, millions of students move to new cities and face the same problems:

- ❌ No reliable way to find roommates
- ❌ Fake or unverified housing listings
- ❌ No local support system
- ❌ Scattered and unstructured WhatsApp/Telegram groups

Most existing solutions are **unverified, fragmented, or not student-focused**.

---

## 💡 Solution

CityLink builds a **trust-first ecosystem** where:

- ✅ Students find **compatible roommates** based on preferences
- ✅ Housing listings are **community-driven**
- ✅ Users discover **local services** (food, laundry, PGs)
- ✅ Seniors & alumni help new students integrate faster

---

## 🧠 Core Features

### 👤 User Profiles

- Academic details (college, course, year)
- Lifestyle preferences (food, smoking, budget)
- City-based filtering

### 🏠 Housing Listings

- Add & browse PGs, flats, and rooms
- Rent, location, and amenities
- _(Upcoming: verification & reviews)_

### 🤝 Roommate Matching

- Match users based on:
  - Budget
  - Preferences
  - City
- Instantly view potential roommates

### 📩 Contact System _(MVP)_

- Send connection requests via email
- Direct communication happens externally

---

## 🛠 Tech Stack

**Frontend**

- React.js

**Backend**

- Node.js
- Express.js

**Database**

- PostgreSQL

**Other**

- Email service for notifications

---

## ⚙️ How It Works

1. User creates an account
2. Sets preferences and city
3. Browses users and listings
4. Sends a request to connect via email

---

## 📈 What’s Next

- 🔒 Authentication & trust scoring
- 💬 In-app messaging (replace email flow)
- ⚡ Redis caching for performance
- 🌐 Multi-city / global expansion
- 📊 Smarter recommendation engine

---

## ❗ Current Limitations

- No in-app chat (email-based communication)
- No listing verification yet
- Basic filtering & matching logic
- No caching → higher DB load

---

## 🧪 Running Locally

```bash
# Clone the repo
git clone https://github.com/arnavbhure/City-Link/

# Install dependencies
cd citylink
npm install

# Run backend
npm start

# Run frontend
cd frontend
npm run dev

# 🤝 Contribution

This project is in active development.
Contributions, feedback, and ideas are welcome.
```
