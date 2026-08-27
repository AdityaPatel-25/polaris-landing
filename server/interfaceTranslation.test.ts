import { describe, expect, it } from "vitest";
import { interfaceTranslationInput, normalizeInterfaceTranslations } from "./interfaceTranslation";

describe("POLARIS interface translation", () => {
  it("accepts bounded Hindi translation batches", () => {
    const input = interfaceTranslationInput.parse({ targetLanguage: "hi", texts: ["Explore research", "Sign in"] });
    expect(input.texts).toEqual(["Explore research", "Sign in"]);
  });

  it("falls back to the English strings when an LLM response is incomplete", () => {
    const source = ["Explorer", "Researcher"];
    expect(normalizeInterfaceTranslations(source, ["अन्वेषक"])).toEqual(source);
    expect(normalizeInterfaceTranslations(source, ["अन्वेषक", "शोधकर्ता"])).toEqual(["अन्वेषक", "शोधकर्ता"]);
  });
});
