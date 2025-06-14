import {google} from "googleapis"
import { htmlToText } from "html-to-text";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
})

const gmail = google.gmail({version: "v1", auth: oauth2Client});

export async function getLatestEmail(maxResults = 5) : Promise<{ id: string, plainText: string }[]> {
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: "is:unread"
  });

  console.log("[getLatestEmail]", response.data.messages);

  const emails = response.data.messages || [];

  const detailedEmails = await Promise.all(emails.map( async (email) => {
    const msg = await gmail.users.messages.get({
      userId: "me", 
      id: email.id || "",
      format: "full", 
    });
    const parts = msg.data.payload?.parts || [];

    const textPart = parts.find(p => p.mimeType === "text/plain");
    const htmlPart = parts.find(p => p.mimeType === "text/html");
    const chosenPart = textPart || htmlPart;


    const data = chosenPart?.body?.data || "";
    const decoded = Buffer.from(data, "base64").toString("utf-8");

    console.log("[detailedEmails]", decoded);

    const decodedHtml = htmlToText(decoded, { 
      wordwrap: false,
      selectors: [
        { selector: "img", format: "skip" },
        { selector: "script", format: "skip" },
        { selector: "style", format: "skip" },
        { selector: "a", options: { ignoreHref: true } },
      ],    
    });
    const plainText = sanitizeEmailText(decodedHtml); 


    return { id: email.id || "", plainText : plainText };
  }))


  return detailedEmails;
}

function sanitizeEmailText(raw: string): string {
  const noInvisible = removeInvisibleCharacters(raw);
  const noFooter = removeFooter(noInvisible);
  return normalizeText(noFooter);
}

function removeFooter(text: string): string {
  const footerTriggers = [
    "to stop receiving", 
    "unsubscribe", 
    "all rights reserved", 
    "copyright", 
    "do not reply", 
    "you received this",
    "sorting hat technologies", 
    "www.unacademy.com",
    "click here to unsubscribe",
    "manage your preferences"
  ];

  const pattern = new RegExp(footerTriggers.join("|"), "i");
  const index = text.search(pattern);
  return index !== -1 ? text.slice(0, index).trim() : text;
}

function normalizeText(text: string): string {
  return text
    .replace(/\r\n|\r/g, "\n")             // Normalize line breaks
    .replace(/[ \t]{2,}/g, " ")            // Collapse extra spaces
    .replace(/\n{3,}/g, "\n\n")            // Collapse 3+ newlines
    .replace(/^\s+|\s+$/gm, "")            // Trim each line
    .trim();                               // Final trim
}

function removeInvisibleCharacters(text: string): string {
  return text.replace(/[\u0000-\u001F\u007F-\u009F\u034F\u061C\u115F\u1160\u1680\u17B4\u17B5\u180B-\u180E\u2000-\u200F\u2028-\u202F\u205F\u2060-\u206F\u2800\u3000\u3164\uFEFF\uFFA0]/g, '');
}
