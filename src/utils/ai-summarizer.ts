import {
  pipeline,
  env,
  type SummarizationOutput,
} from "@huggingface/transformers";

// Configure for Node.js environment
env.allowLocalModels = false;
env.useBrowserCache = false;

/**
 * Run AI summarization with a given prompt
 * @param prompt The text to summarize
 * @param maxLength Maximum length of summary
 * @param minLength Minimum length of summary
 * @returns Summary text or empty string on error
 */
async function runSummarization(
  prompt: string,
  maxLength: number,
  minLength: number,
): Promise<string> {
  try {
    const model = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");

    const result = await model(prompt, {
      max_length: maxLength,
      min_length: minLength,
      do_sample: false,
    } as Parameters<typeof model>[1]);

    // Handle both single and array responses
    const output = Array.isArray(result) ? result : [result];
    const summary = (output as SummarizationOutput)[0]?.summary_text || "";
    return summary.trim();
  } catch (error) {
    console.error("Error running summarization:", error);
    return "";
  }
}

/**
 * Generate a concise AI summary of job experience
 * @param description Array of bullet points describing the experience
 * @param role Job role/title
 * @param company Company name
 * @returns Concise summary (1-2 sentences)
 */
export async function generateExperienceSummary(
  description: string[],
  role: string,
  company: string,
): Promise<string> {
  // Create a better prompt focusing on what the person accomplished/did
  const accomplishments = description.join(". ");
  const prompt = `As a ${role} at ${company}, this person's key accomplishments and responsibilities included: ${accomplishments}`;

  const summary = await runSummarization(prompt, 60, 20);
  return summary || "";
}

/**
 * Generate summary for grouped experience (multiple roles at same company)
 */
export async function generateGroupedExperienceSummary(
  roles: Array<{ role: string; description: string[] }>,
  company: string,
): Promise<string> {
  // Create a better prompt focusing on career progression and accomplishments
  const rolesText = roles
    .map((r) => `As ${r.role}, accomplished: ${r.description.join(". ")}`)
    .join(". Then, ");

  const prompt = `During the career at ${company}, this person progressed through ${roles.length} roles. ${rolesText}`;

  const summary = await runSummarization(prompt, 80, 30);
  return summary || `${roles.length} roles at ${company}`;
}
