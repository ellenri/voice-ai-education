# Tech Interview Simulator - Task List

**Instructions:** Follow these tasks sequentially. Mark a task as complete (`- [x]`) only after the functionality is fully implemented according to the requirements in `PLANNING.md`, unit tests (success, error, edge cases) have passed, and the `README.md` has been updated if necessary.

**Notify the AI Assistant:** When a task or a group of tasks is marked as complete, please inform the AI assistant so it's aware of the project's progress for future interactions.

---

### Phase 1: Project Setup & Foundation

* [x] **1.1: Initialize Project:**
    * Set up Next.js project with TypeScript (`create-next-app`).
    * Integrate Tailwind CSS.
    * Set up Shadcn/ui.
    * Initialize Git repository.

> Projeto Next.js com TypeScript, Tailwind CSS, Shadcn UI e Git já inicializados.

* [x] **1.2: Setup Convex:**
    * Install Convex CLI and client library (`npm install convex`).
    * Initialize Convex in the project (`npx convex dev`).
    * Define basic Convex environment variables.

> Convex instalado, inicializado, variáveis de ambiente configuradas e schema inicial criado (users). Pronto para uso nas próximas etapas.
* [x] **1.3: Setup Stack-Auth:**
    * Install Stack-Auth (`npm install stack-auth @stack-auth/next @stack-auth/convex-adapter`).
    * Configure Stack-Auth basic setup (providers, adapter) following their documentation for Next.js and Convex.
    * Define necessary environment variables for Stack-Auth.

### Phase 2: Authentication & User Data

* [ ] **2.1: Implement User Registration & Login UI:**
    * Create basic pages/components for Sign Up and Sign In using Shadcn components.
    * Implement frontend logic to call Stack-Auth sign-in/sign-up methods.
* [ ] **2.2: Implement Authentication Backend Logic:**
    * Set up Convex functions (mutations/actions) required by the Stack-Auth Convex adapter.
    * Ensure user sessions are managed correctly.
    * Implement basic Sign Out functionality.
* [ ] **2.3: Define User Schema & Basic Profile:**
    * Define `users` table schema in `convex/schema.ts` (e.g., name, email, Stack-Auth userId).
    * Ensure user data is created/updated in Convex upon registration/login via Stack-Auth adapter callbacks.
* [x] **2.4: Protect Routes/UI:**
    * Core interview UI protegida por middleware de autenticação para rotas `/protected/*`.
    * Exibição de informações básicas do usuário disponível via `<UserButton />` (ajustes futuros podem ser necessários para exibir email ou outros dados customizados).

> Middleware de proteção de rota implementado e UserButton integrado.

* [ ] **2.5: Unit Tests for Auth Logic:**
    * Test key Convex functions related to user creation/retrieval (mocking Stack-Auth dependencies if necessary).

### Phase 3: Core Chat Interface & Text Functionality

* [ ] **3.1: Create Basic Chat UI:**
    * Design the main chat interface using Shadcn components (message display area, text input field, send button).
* [ ] **3.2: Define Conversation Schema:**
    * Define `conversations` and `messages` tables in `convex/schema.ts` (linking messages to conversations, conversations to users, storing message content, sender role - 'user'/'ai', timestamps, difficulty level).
* [ ] **3.3: Implement Text Message Sending:**
    * Create Convex mutation to add a new user message to a conversation.
    * Connect frontend text input/send button to trigger this mutation.
* [ ] **3.4: Implement Message Display:**
    * Create Convex query to fetch messages for a specific conversation (or the user's active/latest conversation).
    * Use Convex real-time subscriptions (`useQuery`) in the frontend to display messages dynamically.
* [ ] **3.5: Unit Tests for Chat Logic:**
    * Test Convex mutations/queries for creating and retrieving messages.

### Phase 4: LLM Integration (Placeholder - Requires LLM Choice)

* [ ] **4.1: Select LLM Provider:** Choose and get API access (e.g., OpenAI, Google Gemini, Anthropic Claude).
* [ ] **4.2: Create LLM Service Wrapper:**
    * Build a modular `services/llm.ts` file.
    * Implement a function within a Convex Action (`convex/llm.ts`) to securely call the LLM API using the wrapper. Add necessary environment variables.
* [ ] **4.3: Integrate LLM Response:**
    * Modify the message sending logic: After a user message is saved (Task 3.3), trigger the Convex Action (4.2).
    * Pass the user message, relevant conversation history, and selected difficulty level (initially hardcode or use a default) to the LLM Action.
    * Save the LLM's text response as a new message in the conversation (role: 'ai').
* [ ] **4.4: Unit Tests for LLM Wrapper/Action:**
    * Test the Convex Action logic (mocking the LLM API call). Test handling of success and API errors.

### Phase 5: Speech-to-Text (STT) Integration

* [ ] **5.1: Create Deepgram Service Wrapper:**
    * Build a modular `services/deepgram.ts` file.
    * Implement a function within a Convex Action or HTTP Action (`convex/stt.ts`) to securely call the Deepgram API using the wrapper. Add Deepgram API key to environment variables.
* [ ] **5.2: Implement Frontend Audio Capture:**
    * Add UI elements (e.g., microphone button).
    * Use browser APIs (e.g., `MediaRecorder`) to capture audio input.
* [ ] **5.3: Send Audio & Receive Transcript:**
    * Send captured audio data to the Convex STT Action (5.1).
    * Receive the text transcript back in the frontend.
    * Populate the text input field with the transcript or trigger message sending directly.
* [ ] **5.4: Unit Tests for STT Wrapper/Action:**
    * Test the Convex Action (mocking Deepgram API). Test audio handling (if possible) and transcript return.

### Phase 6: Text-to-Speech (TTS) Integration

* [ ] **6.1: Create Amazon Polly Service Wrapper:**
    * Build a modular `services/polly.ts` file.
    * Implement a function within a Convex Action (`convex/tts.ts`) to securely call the Polly API using the wrapper. Configure AWS credentials/Polly access securely.
* [ ] **6.2: Trigger TTS for AI Responses:**
    * Modify the LLM response logic (Task 4.3): After saving the AI's text message, trigger the Convex TTS Action (6.1) with the text.
* [ ] **6.3: Implement Frontend Audio Playback:**
    * The TTS Action should return an audio stream or URL.
    * Implement logic in the frontend to receive this and play the audio automatically when an AI response arrives.
* [ ] **6.4: Unit Tests for TTS Wrapper/Action:**
    * Test the Convex Action (mocking Polly API). Test text-to-audio conversion logic.

### Phase 7: Difficulty Levels & Refinements

* [ ] **7.1: Implement Difficulty Selection UI:**
    * Add controls (e.g., dropdown, buttons) for the user to select Beginner, Intermediate, or Advanced before starting an interview.
    * Store the selected level (e.g., in component state or associated with the conversation).
* [ ] **7.2: Pass Difficulty to LLM:**
    * Ensure the selected difficulty level is passed as context to the LLM prompt in the Convex LLM Action (Task 4.3). Adjust the system prompt accordingly (e.g., "You are an interviewer for a [Beginner/Intermediate/Advanced] level candidate...").
* [ ] **7.3: Conversation History UI:**
    * Create a separate page or section where users can view a list of their past interviews.
    * Allow users to click on a past interview to view its full transcript.
* [ ] **7.4: UI Polishing & Error Handling:**
    * Refine the UI/UX based on testing.
    * Implement comprehensive error handling for API calls, audio issues, etc., with user-friendly feedback.
* [ ] **7.5: End-to-End Testing:**
    * Manually test the full interview flow for all difficulty levels with both voice and text input.

### Phase 8: Deployment

* [ ] **8.1: Prepare for Deployment:**
    * Ensure all environment variables are correctly configured for production.
    * Optimize build settings if necessary.
* [ ] **8.2: Deploy Application:**
    * Deploy the Next.js frontend (e.g., to Vercel, Netlify).
    * Ensure Convex backend is deployed (`npx convex deploy`).
* [ ] **8.3: Post-Deployment Testing:**
    * Test the live application thoroughly.