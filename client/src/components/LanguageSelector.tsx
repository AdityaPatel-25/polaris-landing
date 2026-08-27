import { Languages } from "lucide-react";
import { useLanguage, type LanguageCode } from "@/contexts/LanguageContext";

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage, isTranslating } = useLanguage();
  return <label className={`language-selector ${className}`} data-no-translate>
    <Languages size={14} aria-hidden="true" />
    <span className="sr-only">Interface language</span>
    <select value={language} onChange={event => setLanguage(event.target.value as LanguageCode)} aria-label="Choose interface language" disabled={isTranslating}>
      <option value="en">EN</option>
      <option value="hi">हिंदी</option>
    </select>
    {isTranslating && <i aria-label="Translating interface" />}
  </label>;
}
