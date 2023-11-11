import OpenAI from 'openai';

const API_KEY = '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';

const openai = new OpenAI({
  apiKey: API_KEY,
});

export default async function chatCompletion() {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });

  return response;
}
