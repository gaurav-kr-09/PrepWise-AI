const axios = require("axios");
const ApiError = require("../utils/ApiError");

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const createGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new ApiError(500, "Gemini API key is missing");
  }

  return axios.create({
    baseURL: GEMINI_BASE_URL,
    params: {
      key: apiKey,
    },
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });
};

const generateInterviewQuestions = async ({
  role,
  type,
  experienceLevel,
  count = 5,
}) => {
  const client = createGeminiClient();
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  const prompt = `Generate ${count} ${type} interview questions for a ${experienceLevel} level ${role} candidate. Return only valid JSON in this shape: {"questions":[{"question":"..."}]}.`;

  const response = await client.post(`/${model}:generateContent`, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
  });

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const sanitized = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(sanitized);

  return parsed.questions || [];
};

const evaluateInterviewAnswer = async ({ question, answer, role, type }) => {
  const client = createGeminiClient();
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  const prompt = `You are an interview evaluator. Assess the answer to the question below for a ${type} interview for a ${role} role. Return only valid JSON with this shape: {"score":0-100,"strengths":["..."],"weaknesses":["..."],"suggestions":["..."],"feedback":"..."}. Question: ${question} Answer: ${answer}`;

  const response = await client.post(`/${model}:generateContent`, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1024,
    },
  });

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const sanitized = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(sanitized);

  return {
    score: Number(parsed.score) || 0,
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    feedback: parsed.feedback || "",
  };
};

const evaluateCompleteInterview = async ({
  role,
  type,
  experienceLevel,
  questions,
}) => {
  const client = createGeminiClient();
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  const transcript = questions
    .map(
      (item, index) =>
        `${index + 1}. Question: ${item.question}\nAnswer: ${item.answer || ""}`,
    )
    .join("\n\n");

  const prompt = `You are a senior interview coach. Evaluate the full interview for a ${experienceLevel} ${role} candidate in a ${type} interview. Return only valid JSON with this exact shape: {"overallScore":0-100,"communicationScore":0-100,"technicalScore":0-100,"strengths":["..."],"weaknesses":["..."],"suggestedImprovements":["..."],"finalSummary":"..."}. Interview transcript:\n${transcript}`;

  const response = await client.post(`/${model}:generateContent`, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1200,
    },
  });

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const sanitized = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(sanitized);

  return {
    overallScore: Number(parsed.overallScore) || 0,
    communicationScore: Number(parsed.communicationScore) || 0,
    technicalScore: Number(parsed.technicalScore) || 0,
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    suggestedImprovements: Array.isArray(parsed.suggestedImprovements)
      ? parsed.suggestedImprovements
      : [],
    finalSummary: parsed.finalSummary || "",
  };
};

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  evaluateCompleteInterview,
};
