🌍 CityLink

Student Housing & Community Platform for Migrating Students

CityLink helps students moving to a new city find verified roommates, housing, and local services through a trusted, community-driven platform.

[Live Demo](https://citylink-nine.vercel.app/)

🚀 Problem

Every year, millions of students move to new cities and face the same issues:

No trusted way to find roommates
Fake or unreliable housing listings
No local support system
Dependence on scattered WhatsApp/Telegram groups

Most solutions are either unverified, fragmented, or not student-focused.

💡 Solution

CityLink solves this by building a trust-first ecosystem where:

Students can find verified roommates based on preferences
Housing listings are community-validated
Users discover local services (food, laundry, PGs)
Seniors and alumni help new students integrate faster
🧠 Core Features
👤 User Profiles
Academic details (college, course, year)
Lifestyle preferences (food, smoking, budget)
City-based filtering
🏠 Housing Listings
Add/view PGs, flats, and rooms
Key details: rent, location, amenities
Future: verification & reviews
🤝 Roommate Matching
Match users based on:
Budget
Preferences
City
View potential roommates instantly
📩 Contact System (Current MVP)
Users can send a notification/email request
Direct communication happens via email
🛠 Tech Stack

Frontend

React.js

Backend

Node.js
Express.js

Database

PostgreSQL

Other

Email service for notifications
⚙️ How It Works (Current MVP Flow)
User creates an account
Sets preferences and city
Views available users/listings in that city
Sends a notification (email) to connect
📈 Scalability Direction (Planned)
🔒 Authentication & trust scoring
💬 In-app messaging (remove email dependency)
⚡ Caching layer (Redis) to reduce DB load
🌐 Global city expansion
📊 Recommendation engine for better matching
❗ Current Limitations
No in-app chat (email-based communication)
No listing verification yet
Limited filtering and ranking logic
Every profile view hits the database (no caching yet)
🧪 Running Locally

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

🤝 Contribution

This project is in active development. Contributions, feedback, and ideas are welcome.
