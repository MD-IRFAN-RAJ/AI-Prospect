import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

const DEFAULT_MODEL = 'gemini-3.5-flash-lite';

function fallbackText(prompt: string) {
  return `Mock AI response for: ${prompt}`;
}

function fallbackJson<T>(prompt: string): T {
  void prompt;
  return {} as T;
}

function createClient() {
  return env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY }) : null;
}

function parseJsonText<T>(text: string): T {
  const trimmed = text.trim();

  // Try direct parse first
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // Attempt to extract fenced JSON block
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const fencedCandidate = fenced?.[1]?.trim();
    if (fencedCandidate) {
      try {
        return JSON.parse(fencedCandidate) as T;
      } catch {
        // fallthrough to brute-force
      }
    }

    // Fallback: find first { and last } and attempt to parse inner substring
    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidate = trimmed.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(candidate) as T;
      } catch (err) {
        // final fallback
        console.warn('Failed to parse JSON from AI response:', err);
      }
    }

    // As a last resort, throw so callers can handle fallback behavior
    throw new Error('Unable to parse JSON from AI response');
  }
}

export async function generateText(prompt: string) {
  const client = createClient();
  if (!client) return fallbackText(prompt);

  try {
    const response = await client.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
    });

    return response.text || fallbackText(prompt);
  } catch {
    return fallbackText(prompt);
  }
}

export async function generateJSON<T>(prompt: string): Promise<T> {
  const client = createClient();
  const wrapper = [
    'You are an AI sales prospecting assistant.',
    'Return ONLY valid JSON. Do not include markdown, code fences, or explanations.',
    '',
    prompt,
  ].join('\n');

  if (!client) return fallbackJson<T>(prompt);

  try {
    const response = await client.models.generateContent({
      model: DEFAULT_MODEL,
      contents: wrapper,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '{}';
    return parseJsonText<T>(text);
  } catch (err) {
    console.warn('generateJSON failed, returning fallback:', err);
    return fallbackJson<T>(prompt);
  }
}