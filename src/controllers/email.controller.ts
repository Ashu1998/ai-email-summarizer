import { Request, Response } from "express";
import { getLatestEmail } from "../services/gmail.service";
import { summarizeTextWithGemini } from "../services/summarizer.service";

export async function summarizeEmailController(req: Request, res: Response): Promise<void> {
  try {
    const emails = await getLatestEmail(5);
    const result = await Promise.all(emails.map(async (email) => {
      const summary = await summarizeTextWithGemini(email.plainText);
      return {
        id: email.id,
        summary,
      }
    }))

    res.status(200).json({
      success: true,
      summaries: result,
    });
  } catch (error) {
    console.error("[summarizeEmailController]", error);
    res.status(500).json({
      success: false,
      message: "Failed to summarize email",
      error: (error as Error).message
    });
  }
}