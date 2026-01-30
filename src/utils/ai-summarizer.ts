import { pipeline, env } from "@huggingface/transformers";

// Configure for Node.js environment
env.allowLocalModels = false;
env.useBrowserCache = false;

let summarizer: any = null;
let initializationAttempted = false;

/**
 * Initialize the summarization pipeline
 * Using distilbart-cnn-6-6 model
 */
async function getSummarizer() {
  if (!summarizer && !initializationAttempted) {
    initializationAttempted = true;
    try {
      console.log("Initializing AI summarization model...");
      summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");
      console.log("Summarizer initialized successfully");
    } catch (error) {
      console.error("Failed to initialize summarizer:", error);
      return null;
    }
  }
  return summarizer;
}

/**
 * Create a fallback summary from description
 */
function createFallbackSummary(description: string[]): string {
  if (!description || description.length === 0) {
    return "";
  }
  const firstPoint = description[0];
  if (!firstPoint) {
    return "";
  }
  return firstPoint.length > 100
    ? firstPoint.substring(0, 100) + "..."
    : firstPoint;
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
  try {
    const model = await getSummarizer();

    if (!model) {
      return createFallbackSummary(description);
    }

    // Create a better prompt focusing on what the person accomplished/did
    const accomplishments = description.join(". ");
    const fullText = `As a ${role} at ${company}, this person's key accomplishments and responsibilities included: ${accomplishments}`;

    const result = await model(fullText, {
      max_length: 60,
      min_length: 20,
      do_sample: false,
    });

    const summary = result[0]?.summary_text || "";
    return summary.trim() || createFallbackSummary(description);
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return createFallbackSummary(description);
  }
}

/**
 * Generate summary for grouped experience (multiple roles at same company)
 */
export async function generateGroupedExperienceSummary(
  roles: Array<{ role: string; description: string[] }>,
  company: string,
): Promise<string> {
  try {
    const model = await getSummarizer();

    if (!model) {
      return `${roles.length} roles at ${company}`;
    }

    // Create a better prompt focusing on career progression and accomplishments
    const rolesText = roles
      .map((r) => `As ${r.role}, accomplished: ${r.description.join(". ")}`)
      .join(". Then, ");

    const fullText = `During the career at ${company}, this person progressed through ${roles.length} roles. ${rolesText}`;

    const result = await model(fullText, {
      max_length: 80,
      min_length: 30,
      do_sample: false,
    });

    return (
      result[0]?.summary_text?.trim() || `${roles.length} roles at ${company}`
    );
  } catch (error) {
    console.error("Error generating grouped summary:", error);
    return `${roles.length} roles at ${company}`;
  }
}
