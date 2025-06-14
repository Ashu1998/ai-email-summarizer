# 📧 AI Email Summarizer API

This is a Node.js + TypeScript backend project that connects to your Gmail inbox, fetches recent emails, and summarizes their content using Google's Gemini Pro (`@google/genai`) API. The summarized results are exposed through a REST API.

---

## 🚀 Features

- ✅ Fetches latest emails using Gmail API (OAuth2)
- 🤖 Summarizes emails using Google's Gemini Pro (via `@google/genai`)
- 📦 REST API endpoint to retrieve summaries
- 🧪 Easy to run and test locally

---

## 🧱 Tech Stack

| Layer     | Tool                              |
| --------- | --------------------------------- |
| Language  | Node.js + TypeScript              |
| Framework | Express                           |
| AI Model  | Google Gemini (`@google/genai`) |
| Email API | Gmail API (OAuth2)                |

---

## 📁 Project Structure

```
src/
├── config/              # Gemini client setup
├── controllers/         # API controller logic
├── routes/              # API route definitions
├── services/            # Gmail & summarization logic
├── utils/               # Email cleanup utilities
├── app.ts               # Express setup
└── server.ts            # App launcher
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-email-summarizer-api.git
cd ai-email-summarizer-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file at the root:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
GMAIL_REDIRECT_URI=http://localhost:3000/auth/callback
```

> 🔐 Need help generating Gmail credentials? Refer to [Gmail API OAuth2 Setup Guide](https://developers.google.com/gmail/api/quickstart/nodejs)

---

### 4. Run the App

```bash
npm run dev
```

Your server will start on: `http://localhost:3000`

---

## 📬 API Endpoints

### `GET /api/summarize`

**Description**: Fetches the latest emails from Gmail and returns Gemini-generated summaries.

**Sample Response**:

```json
{
  "summaries": [
    {
      "id": "1892a9c6f56d4f3e",
      "summary": "• Meeting scheduled for 3 PM tomorrow\n• Include final deck\n• Zoom link in calendar"
    }
  ]
}
```

---

## ✅ Todo / Improvements

- [ ] Store summaries in MongoDB
- [ ] Filter emails by sender or date
- [ ] Add authentication
- [ ] Deploy on Render or Railway

---

## 📘 License

MIT

---

## 🙋‍♂️ Author

**Ashish Verma**
Backend Engineer | Tech Enthusiast
[GitHub](https://github.com/your-username)
