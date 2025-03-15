const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SYSTEM_PROMPT = {
  role: "system",
  content:
    "Behave like a programming teacher and your answer should be small and simple",
};
const TITLE_PROMPT = {
  role: "system",
  content: "Give the title for the conversation in 4 words",
};

const createMessageString = (messages) => {
  return messages
    .map((message) => `${message.role}:${message.content}`)
    .join("\n");
};
const generateContent = async (
  prompt,
  modelName = "gemini-1.5-flash",
  messages = []
) => {
  const newPrompt = {
    role: "User",
    content: prompt,
  };
  const finalPrompt = createMessageString([
    SYSTEM_PROMPT,
    ...messages,
    newPrompt,
  ]);
  const model_Ai = genAI.getGenerativeModel({ model: modelName });
  const result = await model_Ai.generateContent(finalPrompt);
  return result.response.text();
};

const generateTitle = async (messages) => {
  const titlePrompt = createMessageString([TITLE_PROMPT, ...messages]);
  const model_Ai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model_Ai.generateContent(titlePrompt);
  return result.response.text();
};

module.exports = {
  generateContent,
  generateTitle,
};
