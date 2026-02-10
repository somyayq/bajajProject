# Bajaj BFHL API CHECKER

Backend API for the Bajaj Finserv Health Limited (BFHL) challenge.
Built with Node.js, Express, and Google Gemini.

## API Endpoints

### Base URL
- **Local:** `http://localhost:3000`
- **Production:** `https://bajaj-project-lemon.vercel.app`

---

### 1. Health Check
**Endpoint:** `GET /health`
**Description:** Returns the operational status and registered email.

**Response:**
```json
{
    "is_success": true,
    "official_email": "your_email@chitkara.edu.in"
}
```

---

### 2. Main API Endpoint
**Endpoint:** `POST /bfhl`
**Description:** Handles various mathematical and AI operations based on the input key.
**Headers:** `Content-Type: application/json`

#### Supported Operations

**A. Fibonacci Sequence**
Returns the first N Fibonacci numbers.
- **Request:** `{"fibonacci": 8}`
- **Response:** `{"is_success": true, "data": [0, 1, 1, 2, 3, 5, 8, 13]}`

**B. Prime Numbers**
Filters prime numbers from an array.
- **Request:** `{"prime": [2, 4, 7, 9, 11]}`
- **Response:** `{"is_success": true, "data": [2, 7, 11]}`

**C. HCF (GCD)**
Calculates Highest Common Factor of an array.
- **Request:** `{"hcf": [24, 36, 60]}`
- **Response:** `{"is_success": true, "data": 12}`

**D. LCM**
Calculates Least Common Multiple of an array.
- **Request:** `{"lcm": [12, 18, 24]}`
- **Response:** `{"is_success": true, "data": 72}`

**E. AI Question (Gemini)**
Answers a question in strictly one word.
- **Request:** `{"AI": "What is the capital of India?"}`
- **Response:** `{"is_success": true, "data": "NewDelhi"}`

---

## Setup & Running Locally

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   cd bfhl-api
   npm install
   ```
3. **Configure Environment:**
   - Create `.env` file in `bfhl-api` folder.
   - Add:
     ```env
     PORT=3000
     GEMINI_API_KEY=your_google_api_key
     OFFICIAL_EMAIL=your_email@chitkara.edu.in
     ```
4. **Start Server:**
   ```bash
   npm start
   ```