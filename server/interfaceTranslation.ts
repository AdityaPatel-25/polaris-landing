/** Server-side UI translation service for the POLARIS Hindi interface. */
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

const INTERFACE_TRANSLATION_MODEL = "gpt-5-mini";

export const interfaceTranslationInput = z.object({
  targetLanguage: z.literal("hi"),
  texts: z.array(z.string().trim().min(1).max(1_600)).min(1).max(140),
});

export type InterfaceTranslationInput = z.infer<typeof interfaceTranslationInput>;

export function normalizeInterfaceTranslations(source: string[], candidate: unknown): string[] {
  if (!Array.isArray(candidate) || candidate.length !== source.length || candidate.some(item => typeof item !== "string" || !item.trim())) {
    return source;
  }
  return candidate.map(item => item.trim());
}

export async function translateInterface({ targetLanguage, texts }: InterfaceTranslationInput) {
  const completion = await invokeLLM({
    model: INTERFACE_TRANSLATION_MODEL,
    maxTokens: 3_600,
    messages: [
      {
        role: "system",
        content: "You are the POLARIS interface translator. Translate English scientific-product UI strings into clear, concise Hindi written in Devanagari. Preserve POLARIS, acronyms, proper names, coordinate values, numbers, URLs, email addresses, placeholders, and identifiers unchanged. Do not add facts, commentary, or Markdown. Return only the requested strict JSON object.",
      },
      { role: "user", content: `Target language: ${targetLanguage === "hi" ? "Hindi" : targetLanguage}.\nTranslate each item in order:\n${JSON.stringify(texts)}` },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "polaris_interface_translations",
        strict: true,
        schema: {
          type: "object",
          properties: { translations: { type: "array", items: { type: "string" } } },
          required: ["translations"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = completion.choices[0]?.message.content;
  if (typeof content !== "string") return { translations: texts };

  try {
    const parsed = JSON.parse(content) as { translations?: unknown };
    return { translations: normalizeInterfaceTranslations(texts, parsed.translations) };
  } catch {
    return { translations: texts };
  }
}
