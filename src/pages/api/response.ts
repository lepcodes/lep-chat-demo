import { GoogleGenAI } from '@google/genai';
import type { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.API_KEY;
const role = process.env.CHAT_ROLE;
const model = process.env.CHAT_MODEL;

// Comprobación para asegurarnos de que las variables existen.
if (!apiKey || !role || !model) {
  throw new Error("Missing required environment variables");
}

const ai = new GoogleGenAI({ apiKey });
const chat = ai.chats.create(
  {
    model: model,
    config: {
      temperature: 0.5,
      maxOutputTokens: 1024,
      systemInstruction: role,
    }
  }
)

type Data = {
  response: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) {
  // Solo aceptamos peticiones POST.
  if (request.method !== 'POST') {
    return response.status(405).json({ response: 'Only POST requests allowed' });
  }

  try {
    const { question } = request.body;
    if (!question) {
      return response.status(400).json({ response: 'Missing "question" in request body' });
    }
    
    // El envío del mensaje es idéntico.
    console.log("Sending message:", question);
    const result = await chat.sendMessage({
      message: question,
    });
    console.log("Received response:", result);
    const txt = result.text;
    if (txt === undefined) {
      return response.status(400).json({ response: 'Error: No text in response' });
    }
    return response.status(200).json({
      response: txt,
    });
  } catch (error) {
    console.error("Error in AI chat function:", error);
    return response.status(500).json({ response: 'An error occurred while processing the chat message.' });
  }
}
