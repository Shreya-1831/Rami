// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiVersion: 'v1beta',
});

export async function analyzeResume(resumeText, jobTitle) {
  try {
    if (!resumeText || !jobTitle) {
      throw new Error('Missing required parameters');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Trim large resumes for faster analysis
    const trimmedText = resumeText.slice(0, 3000); // adjust limit as needed

    // Efficient prompt formatting
    const prompt = `
You are an AI recruitment assistant.

Given the resume below, analyze it for the position of "${jobTitle}".

Format:
Match Score: [0-100]%
Key Skills Present:
- ...
Missing Skills:
- ...
Experience:
- Total: [X] years
- Relevant: [Y] years
Strengths:
- ...
Areas for Improvement:
- ...
Voice Feedback:
[2-3 sentence summary]

Resume:
${trimmedText}
    `;

    // Use streaming for faster perceived response
    const resultStream = await model.generateContentStream({
      contents: [{ parts: [{ text: prompt }] }],
    });

    let fullResponse = '';
    for await (const chunk of resultStream.stream) {
      fullResponse += chunk.text();
    }

    return fullResponse;
  } catch (error) {
    console.error('Error in analyzeResume:', error);
    return `⚠️ Analysis Error: ${error.message || 'Oops! Something went wrong.'}`;
  }
}
