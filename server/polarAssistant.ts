/** POLARIS answer service: bounded conversation context and scientific-response guidance for the Explorer Portal. */
import { z } from "zod";
import { invokeLLM, type Message } from "./_core/llm";

export const POLAR_ASSISTANT_MODEL = "gpt-5-mini";
const MAX_HISTORY_MESSAGES = 8;

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1_200),
});

export const polarAssistantInput = z.object({
  messages: z.array(chatMessageSchema).min(1).max(MAX_HISTORY_MESSAGES),
});

export type PolarAssistantInput = z.infer<typeof polarAssistantInput>;

const polarAssistantSystemPrompt = `You are POLARIS, a lucid and thoughtful AI guide inside a polar-science platform.

Answer the user's question directly, whether it concerns polar science, research, schoolwork, everyday knowledge, or a general problem. Match the user's language. For polar-science questions, explain mechanisms, distinguish established evidence from uncertainty, and connect ice, ocean, atmosphere, ecosystems, fieldwork, or satellites when useful. For unrelated questions, still be helpful without forcing a polar-science angle.

You have no live web access, telemetry, private user information, or authority to change POLARIS records. Do not invent citations, current measurements, expedition results, or platform actions. State uncertainty plainly when a claim depends on current or specialist evidence. For medical, legal, financial, or safety-critical questions, offer general educational information and encourage an appropriate qualified professional. Keep answers clear, practical, and concise; use Markdown headings or bullets only when they improve scanning.`;

export function buildPolarAssistantMessages(input: PolarAssistantInput): Message[] {
  const history = input.messages.slice(-MAX_HISTORY_MESSAGES);
  return [
    { role: "system", content: polarAssistantSystemPrompt },
    ...history,
  ];
}

export async function answerPolarAssistant(input: PolarAssistantInput) {
  const completion = await invokeLLM({
    model: POLAR_ASSISTANT_MODEL,
    messages: buildPolarAssistantMessages(input),
    maxTokens: 700,
  });
  const content = completion.choices[0]?.message.content;
  const answer = typeof content === "string" ? content.trim() : "";

  if (!answer) {
    throw new Error("Polar Assistant returned an empty response.");
  }

  return { answer, model: POLAR_ASSISTANT_MODEL };
}
