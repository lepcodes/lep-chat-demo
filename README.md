# Lep-Chat Demo

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

> **Live Demonstration of the [Lep-Chat](https://www.npmjs.com/package/lep-chat) Component Library**

This project serves as a production-ready reference implementation for **Lep-Chat**, a high-performance React component library designed for seamless LLM integration. 

In this demo, we showcase a **"Fitness AI"** application, demonstrating how easily `lep-chat` can be customized and connected to a powerful backend (Google Gemini via Next.js API routes).

---

## 🚀 About Lep-Chat (The Core Library)

**Lep-Chat** is a modular React component library engineered to provide a seamless chat interface for AI-driven applications. Built with **React 19** and **TypeScript**, it abstracts the complexities of state management, message rendering, and UI responsiveness.

### Key Features & Engineering Highlights
*   **Library-First Architecture:** Bundled with **Rollup** for optimized ESM/CommonJS output.
*   **Modern Engine:** Built on **React 19**, leveraging the latest functional patterns.
*   **Zero-Leakage Styling:** Hybrid approach using **Tailwind CSS** and **CSS Modules**.
*   **Rich Content:** Professional-grade Markdown rendering (Code blocks, Tables) via `react-markdown` & `remark-gfm`.
*   **Backend Agnostic:** purely presentation/interaction layer; connects to *any* API (OpenAI, Gemini, Anthropic, etc.) via a simple Promise-based contract.

---

## 🛠️ Demo Implementation Details

This repository demonstrates a full-stack integration using **Next.js 15**.

### 1. The Frontend (`src/pages/index.tsx`)
The `Chat` component is imported and configured with custom branding. Notice how the `onGetResponse` prop handles the communication logic, keeping the UI component pure.

```tsx
import Chat from 'lep-chat';
import 'lep-chat/dist/style.css';

// ... (fetch logic)

export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Chat 
        onGetResponse={getResponse} // <--- Connects to your backend
        placeHolder="Ask me anything..."
        overline="Ready to Sweat? 🔥"
        title="Personal"
        highlightedText="Fitness AI"
        gradient={['#F09819', '#EDDE5D']}
        subtitle="Tell me your fitness goal, and I'll generate a personalized workout plan."
      />
    </main>
  );
}
```

### 2. The Backend (`src/pages/api/response.ts`)
The demo uses a Next.js API route to securely communicate with Google's GenAI SDK, keeping API keys hidden from the client.

```typescript
// Simplified snippet
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// ... chat configuration

export default async function handler(req, res) {
  const { question } = req.body;
  const result = await chat.sendMessage({ message: question });
  return res.status(200).json({ response: result.text });
}
```

---

## 💻 Getting Started

To run this demo locally and explore the code:

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/lep-chat-demo.git
cd lep-chat-demo
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory and add your Google Gemini credentials:

```env
API_KEY=your_google_gemini_api_key
CHAT_ROLE="You are a helpful fitness assistant."
CHAT_MODEL="gemini-1.5-flash"
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Technical Stack

| Category | Technology | Usage |
| bound | :--- | :--- |
| **Frontend Framework** | Next.js 15 (Pages Router) | App scaffolding & routing |
| **UI Library** | **Lep-Chat** | Core chat interface & logic |
| **Core** | React 19 | UI Component Architecture |
| **Language** | TypeScript | Type safety & developer experience |
| **AI SDK** | Google GenAI SDK | LLM Interaction |
| **Styling** | CSS Modules / Tailwind | Component styling |

---

## 🤝 Contributing & Licensing

This demo project is open source. 
For the core library documentation, visit the [Lep-Chat NPM package](https://www.npmjs.com/package/lep-chat).
