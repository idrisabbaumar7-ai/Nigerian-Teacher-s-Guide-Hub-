import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LessonNoteParams {
  className: string;
  subject: string;
  term: string;
  week: string;
  topic?: string;
}

export interface QuestionParams {
  className: string;
  subject: string;
  term: string;
  numQuestions: number;
  questionType: string;
  difficulty: string;
  topic?: string;
}

export async function generateLessonNote(params: LessonNoteParams) {
  const prompt = `Generate a complete lesson note for a Nigerian school teacher.
  Class: ${params.className}
  Subject: ${params.subject}
  Term: ${params.term}
  Week: ${params.week}
  ${params.topic ? `Topic: ${params.topic}` : ""}

  The lesson note must follow the Nigerian approved education standard and curriculum.
  Include:
  1. Topic and Sub-topics
  2. Behavioral Objectives
  3. Instructional Materials
  4. Introduction
  5. Step-by-step Presentation (Content Development)
  6. Evaluation/Classwork
  7. Conclusion/Summary
  8. Assignment
  9. Explanation Hints for the teacher (how to explain the topic)
  10. Suggested Teaching Methods
  11. Real-life Examples for students

  Format the output in clear Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  return response.text;
}

export async function generateQuestions(params: QuestionParams) {
  const prompt = `Generate ${params.numQuestions} ${params.questionType} questions for a ${params.className} ${params.subject} class.
  Term: ${params.term}
  Difficulty: ${params.difficulty}
  ${params.topic ? `Topic: ${params.topic}` : ""}

  The questions must follow the Nigerian approved education standard and curriculum.
  Provide:
  1. The questions (with options for Objective type)
  2. The marking scheme/answers
  3. Brief explanations for the answers to help the teacher.

  Format the output in clear Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  return response.text;
}
