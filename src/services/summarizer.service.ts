import {genai} from "../clients/geminiClient";

export async function summarizeTextWithGemini(emailText: string) : Promise<string> {
  if(!emailText) {
    return "";
  }

  const result = await genai.models.generateContent({
      model: "gemini-2.0-flash",
      contents : `Summarize this email in 3-5 bullet points:\n\n${emailText}`
    }
  )

  console.log("[summarizeTextWithGemini]", emailText, result?.text);
  return result?.text?.trim() || "";
}