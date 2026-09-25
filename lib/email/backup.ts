import fs from "fs/promises";
import path from "path";

export interface SubmissionPayload {
  formType: "general_inquiry" | "partnership" | "application" | "esg_grievance";
  submittedAt: string;
  data: Record<string, unknown>;
}

export async function logSubmissionLocally(payload: SubmissionPayload): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), "data", "submissions");
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, `${payload.formType}.log`);
    const logEntry = JSON.stringify(payload) + "\n";
    
    await fs.appendFile(filePath, logEntry, "utf-8");
  } catch (error) {
    console.error(`[Local Backup Error] Failed to backup submission for ${payload.formType}:`, error);
  }
}
