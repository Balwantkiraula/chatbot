# Backend - Gemini Integration

This backend controller uses the Google Generative AI (Gemini) SDK to generate bot responses dynamically using the Gemini API.

## Required Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

- `GEMINI_API_KEY` (required): Your Google Gemini API key. Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- `GEMINI_MODEL` (optional): Model name to use (default: `gemini-1.5-flash`). Other options: `gemini-1.5-pro`, `gemini-pro`
- `MONGO_URI` (required): Your MongoDB connection string
- `PORT` (optional): Server port (default: `3000`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `Backend` directory:
```
GEMINI_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection_string
PORT=3000
GEMINI_MODEL=gemini-1.5-flash
```

3. Run the server:
```bash
npm start
```

## Notes

- The application uses `@google/generative-ai` SDK package
- All user messages and bot responses are saved to MongoDB
- If `GEMINI_API_KEY` is not configured, the API will return an error
