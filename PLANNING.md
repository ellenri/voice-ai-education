# Tech Interview Simulator - Project Planning

## 1. General Considerations

* **Modularity:** The architecture must prioritize modularity. Each external service (Authentication, DB, STT, TTS, LLM) should be accessed through dedicated wrapper modules/functions. This allows for easier replacement or updates in the future (e.g., swapping Deepgram for another STT service).
* **Scalability:** While starting small, the choice of Convex provides a good foundation for scaling, handling real-time updates and serverless functions efficiently.
* **User Experience (UX):** The interface should be clean, intuitive, and responsive. Clear visual cues for speaking, listening, processing, and displaying text/playing audio are crucial. Error handling should be user-friendly.
* **Security:** Authentication via Stack-Auth is the primary security measure for user data. API keys and sensitive credentials must be handled securely using environment variables and backend-only access where possible. Input validation is necessary.
* **Cost Management:** API usage (Deepgram, Polly, LLM, Convex) incurs costs. Implementations should be mindful of this (e.g., efficient function calls, potentially setting usage limits or warnings).
* **Code Quality:** Adhere to TypeScript best practices, maintain consistent code style, keep functions/components focused (max 300 lines), and include clear comments for complex logic, targeting a junior developer's understanding.
* **Testing:** Implement unit tests for critical functions (especially service wrappers and core logic) covering success, error, and edge cases. Integration or end-to-end tests should be considered later.

## 2. Architecture

The application follows a modern web architecture leveraging Next.js for the frontend and Convex for the backend/database capabilities.

* **Frontend (Client-Side):**
    * **Framework:** Next.js (App Router recommended for modern features). Handles routing, rendering (SSR, SSG, Client Components).
    * **Language:** TypeScript for type safety and improved developer experience.
    * **Styling:** Tailwind CSS for utility-first styling.
    * **UI Components:** Shadcn/ui for accessible and reusable components, integrating well with Tailwind.
    * **State Management:** React state (useState, useContext) or potentially Zustand/Jotai for more complex global state if needed. Convex's real-time features can simplify some state management aspects.
    * **Responsibilities:** Rendering UI, handling user input (text & voice recording triggers), managing client-side state, interacting with backend functions (via Convex client), playing TTS audio.

* **Backend (Serverless Functions & Database):**
    * **Platform:** Convex. Provides real-time database, serverless functions (Mutations, Queries, Actions), and file storage.
    * **Responsibilities:**
        * Handling authentication logic via Stack-Auth integration.
        * Storing and retrieving user data, conversation history.
        * Executing database operations (CRUD on Users, Conversations, Messages).
        * Running server-side logic (Convex Actions) to securely interact with external APIs (Deepgram, Polly, LLM). **API keys should only reside here, not on the frontend.**
        * Processing STT results and LLM responses.

* **External Services:**
    * **Authentication:** Stack-Auth (`stack-auth/next`) - Integrated with Next.js and Convex for user session management and profile storage.
    * **Database:** Convex - Stores user profiles, interview levels, conversation transcripts (user messages, AI responses, timestamps).
    * **Speech-to-Text (STT):** Deepgram API - Accessed via a dedicated, modular service wrapper within a Convex Action. Receives audio data/stream, returns text transcript.
    * **Text-to-Speech (TTS):** Amazon Polly API - Accessed via a dedicated, modular service wrapper within a Convex Action. Receives text, returns audio stream/URL.
    * **Large Language Model (LLM):** [Provider To Be Determined - e.g., OpenAI, Google Gemini, Anthropic Claude] - Accessed via a dedicated, modular service wrapper within a Convex Action. Receives user input text, conversation history, difficulty level context; returns AI interviewer response text.

* **Data Flow (Voice Example):**
    1.  User clicks "Speak" button in Frontend (Next.js).
    2.  Frontend captures audio, potentially sends chunks/blob to a Convex HTTP endpoint or Action.
    3.  Convex Action receives audio.
    4.  Convex Action calls the `DeepgramService` wrapper.
    5.  `DeepgramService` sends audio to Deepgram API, receives transcript.
    6.  Convex Action receives transcript, stores user message in Convex DB.
    7.  Convex Action prepares prompt (transcript, history, level) and calls `LLMService` wrapper.
    8.  `LLMService` sends prompt to the chosen LLM API, receives response text.
    9.  Convex Action stores LLM response text in Convex DB.
    10. Convex Action calls `PollyService` wrapper with the LLM response text.
    11. `PollyService` sends text to Amazon Polly API, receives audio stream/URL.
    12. Convex Action returns audio stream/URL (and maybe the text) to the Frontend.
    13. Frontend receives audio data/URL, plays it using browser APIs (`<audio>` element).
    14. Frontend updates the chat display using Convex real-time subscriptions.

## 3. Technology Stack Summary

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Library:** Shadcn/ui
* **Authentication:** Stack-Auth (`stack-auth/next`)
* **Backend/DB:** Convex
* **STT:** Deepgram
* **TTS:** Amazon Polly
* **LLM:** TBD (Requires selection and integration)

## 4. Development Guidelines

* **Modularity:** Create separate files/modules for each service integration (`services/deepgram.ts`, `services/polly.ts`, `services/llm.ts`, `convex/auth.ts`, etc.).
* **Code Style:** Use Prettier/ESLint for consistent formatting. Follow standard TypeScript/React patterns.
* **Readability:** Write clear, concise code. Add JSDoc comments for functions and complex types. Explain non-obvious logic. Target understandability for a junior developer.
* **File Size:** Aim to keep individual files (components, functions, modules) under 300 lines where feasible. Break down larger components/logic.
* **Testing:** For each significant function or module (especially service wrappers and core Convex functions):
    * Write unit tests using a framework like Vitest or Jest.
    * Include tests for successful execution.
    * Include tests for expected error handling (e.g., API errors, invalid input).
    * Include tests for edge cases (e.g., empty input, unusual data).
* **README Updates:** After completing each major feature defined in `TASK.md`, update the `README.md` to reflect the new functionality and any changes to setup or usage.
* **Task Management:** Follow the sequence defined in `TASK.md`. Mark tasks as complete only when the functionality is implemented, tested, and the README is updated accordingly.