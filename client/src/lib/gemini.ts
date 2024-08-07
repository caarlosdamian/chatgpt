import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings,
});

export { model };
