# 🌍 CityLink

### Student Housing & Community Platform for Migrating Students

> Helping students find trusted roommates, verified housing, local services, and real connections when moving to a new city.

---

## 🔗 Live Demo: [CityLink](https://citylink-nine.vercel.app/)

---

# 🚀 The Problem

Every year, millions of students migrate to new cities for college and face the same problems:

- ❌ No reliable way to find compatible roommates
- ❌ Fake or unverified housing listings
- ❌ No trusted student community in a new city
- ❌ Scattered WhatsApp/Telegram groups with poor discoverability
- ❌ No centralized platform designed specifically for migrating students

Most existing platforms are fragmented, generic, or not built around student trust and community.

---

# 💡 The Solution

CityLink is building a trust-first ecosystem for migrating students where users can:

- ✅ Find compatible roommates
- ✅ Discover housing listings
- ✅ Connect with students in the same city
- ✅ Chat in real time
- ✅ Build local communities faster
- ✅ Access local student-friendly services

---

# ✨ Features

## 👤 User Profiles

- Academic details
- College, course, and year
- Lifestyle preferences
- Budget preferences
- City-based discovery
- Profile visibility controls

---

## 🤝 Roommate Matching

Find potential roommates based on:

- Budget compatibility
- Lifestyle preferences
- City
- Student profile data

---

## 🏠 Housing Listings

Users can:

- Post rooms, flats, and PGs
- Browse available listings
- View rent and amenities
- Explore housing within their city

---

## 💬 Real-Time Chat System

Built using Socket.IO + WebSockets with:

- Real-time messaging
- Online user tracking
- Unread message counts
- Optimistic UI updates
- Live sidebar updates
- Read/unread message state
- Responsive modern chat UI
- Real-time event-driven communication
- Socket authentication middleware

---

## 🔐 Authentication & Security

- JWT-based authentication
- Secure HTTP-only cookie sessions
- Protected routes & middleware
- Socket authentication
- User verification system
- Secure cross-origin cookie handling

---

## 📧 Email System

- Email verification flow
- Contact & notification emails
- Connection request handling

---

# 🧠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- Socket.IO
- WebSockets

---

## Database

- PostgreSQL

---

## Other Tools & Services

- JWT Authentication
- Cookie-based sessions
- Nodemailer / Email services

---

# ⚙️ How It Works

1. User creates an account
2. Completes profile setup
3. Sets preferences and city
4. Discovers users and listings
5. Connects and chats in real time
6. Builds trusted local connections

---

# 📈 Upcoming Features

- 🔒 Trust scoring & profile verification
- ⭐ Listing reviews & ratings
- 🧠 Smarter recommendation engine
- 🌐 Multi-city / global scaling
- ⚡ Redis caching
- 📱 Push notifications
- 🗺 Location-aware recommendations
- 🏷 Saved listings & favorites
- 👥 College-based communities
- 📎 Media & file sharing in chat
- 🔔 Real-time notifications


# ❗ Current Limitations

- No advanced recommendation engine yet
- Listing verification still pending
- Chat media/file sharing not implemented
- No caching layer yet
- Limited moderation/admin tooling

---

# 🧪 Running Locally

```bash
# Clone repository
git clone https://github.com/arnavbhure/City-Link.git

# Enter project
cd City-Link

# Install backend dependencies
npm install

# Start backend
npm start

# Start frontend
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in frontend:

````env
VITE_API_URL=http://localhost:3000/api

MODE=development

SOCKET_URL=http://localhost:3000


Create a `.env` file in backend:

```env

PORT=3000

DB_USER=user

DB_HOST=host

DB_NAME=name

DB_PASSWORD=password

DB_PORT=5432

BREVO_API_KEY=api-key-here

BASE_URL=http://localhost:3000/api

FRONTEND_URL_DEV=http://localhost:5173

AUTH_SECRET=auth_secret

JWT_SECRET_KEY=yoursecret

JWT_EXPIRES_IN=1h

EMAIL_USER=email

EMAIL_PASS=email-pass

DATABASE_URL=your-url

SUPPORT_EMAIL=your-email

NODE_ENV=development


---

# 📂 Project Structure

```bash
City-Link/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   └── utils/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── redux/
│   │   ├── pages/
│   │   └── utils/
│
└── README.md
````

---

# 🔌 Real-Time Architecture

CityLink uses Socket.IO + WebSockets for low-latency communication between users.

Current realtime events include:

- `chat:send`
- `chat:message`
- Live sidebar synchronization

---

# 🤝 Contributions

CityLink is actively being developed.

Contributions, suggestions, bug reports, and feedback are welcome.

---

# 📜 License

This project is currently under development and not yet licensed for commercial redistribution.
