# Tech Interview Simulator

## Overview

Tech Interview Simulator is a web application designed to help users practice technical programming interviews. It provides a conversational interface where users can interact with an AI interviewer via voice or text. The application offers different difficulty levels (Beginner, Intermediate, Advanced) to tailor the interview experience. All interactions are recorded and stored for user review.

## Core Features

1.  **User Authentication:**
    * Secure user registration and login system.
    * User data (profile, interview history) is stored securely.
    * Powered by Stack-Auth.

2.  **Interview Simulation:**
    * AI-powered interviewer that asks relevant programming questions.
    * Adapts questioning based on the selected difficulty level.
    * Engages in a back-and-forth conversation simulating a real interview flow.

3.  **Difficulty Levels:**
    * **Beginner:** Focuses on fundamental concepts, basic syntax, and simple problem-solving.
    * **Intermediate:** Covers data structures, algorithms, system design basics, and more complex problem-solving.
    * **Advanced:** Dives deep into complex algorithms, system design, optimization, and specialized topics.

4.  **Voice Chat:**
    * Users can speak their answers.
    * Speech is converted to text using Deepgram API.
    * The AI's text response is converted back to speech using Amazon Polly API.

5.  **Text Chat:**
    * Users can type their answers.
    * The AI's responses are displayed as text.
    * Provides an alternative interaction method.

6.  **Conversation History:**
    * Full transcripts of past interviews are saved for each user.
    * Interactions (user input, AI response) are stored in the Convex database.
    * Allows users to review their performance and the questions asked.

## Technology Stack

* **Frontend:** Next.js with TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn/ui
* **Authentication:** Stack-Auth (`stack-auth/next`)
* **Database & Backend:** Convex
* **Speech-to-Text (STT):** Deepgram API
* **Text-to-Speech (TTS):** Amazon Polly API
* **LLM:** [To be selected - e.g., OpenAI GPT, Google Gemini, Anthropic Claude]

## Getting Started

*(Instructions on how to set up the development environment, install dependencies, configure API keys, and run the project will be added here as development progresses.)*

```bash
# Clone the repository (example)
git clone [your-repository-url]
cd tech-interview-simulator

# Install dependencies (example)
npm install
# or
yarn install

# Configure environment variables (create .env.local)
# Add API keys for Stack-Auth, Convex, Deepgram, Polly, LLM

# Run the development server (example)
npm run dev
# or
yarn dev