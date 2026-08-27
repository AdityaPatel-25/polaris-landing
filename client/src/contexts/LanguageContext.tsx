import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type LanguageCode = "en" | "hi";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  isTranslating: boolean;
};

type TranslationUnit =
  | { kind: "text"; node: Text; source: string }
  | { kind: "attribute"; node: HTMLElement; attribute: "placeholder" | "title" | "aria-label"; source: string };

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "polaris-interface-language";
const HINDI_INTERFACE_FALLBACK: Record<string, string> = {
  "Explore": "खोजें", "Research": "शोध", "Expeditions": "अभियान", "Media": "मीडिया", "Learn": "जानें", "Sign in": "साइन इन करें", "Sign in to your workspace": "अपने कार्यक्षेत्र में साइन इन करें", "Enter POLARIS": "POLARIS में प्रवेश करें", "See the evidence path": "साक्ष्य मार्ग देखें", "Scroll to trace": "अनुसरण करने के लिए स्क्रॉल करें", "Choose a latitude": "अक्षांश चुनें", "Connected knowledge": "जुड़ा हुआ ज्ञान", "Selected evidence": "चयनित साक्ष्य", "Featured research.": "प्रमुख शोध।", "Route intelligence": "मार्ग जानकारी", "Science outreach": "विज्ञान पहुँच", "Start learning": "सीखना शुरू करें", "Access the observatory": "वेधशाला तक पहुँचें", "About": "के बारे में", "Contact": "संपर्क", "Mission overview": "मिशन अवलोकन", "Switch experience": "अनुभव बदलें", "Switch role": "भूमिका बदलें", "Back": "वापस", "Search POLARIS": "POLARIS खोजें", "Explorer": "अन्वेषक", "Researcher": "शोधकर्ता", "Admin": "प्रशासक", "Overview": "अवलोकन", "Knowledge": "ज्ञान", "Saved": "सहेजा गया", "Request access": "पहुँच का अनुरोध करें", "Verify access grant": "पहुँच अनुमति सत्यापित करें", "Authorisation required": "प्राधिकरण आवश्यक", "Active": "सक्रिय", "Upcoming": "आगामी", "Completed": "पूर्ण", "Polar Assistant": "ध्रुवीय सहायक", "Evidence repository": "साक्ष्य भंडार", "Expedition routes": "अभियान मार्ग", "Visual evidence": "दृश्य साक्ष्य", "Exit": "बाहर निकलें", "Observe the poles.": "ध्रुवों का अवलोकन करें।", "Connect": "जोड़ें", "the evidence.": "साक्ष्यों को।", "Live observation feed": "लाइव अवलोकन फ़ीड", "Platform signal": "प्लेटफ़ॉर्म संकेत", "Research resources": "शोध संसाधन", "Media assets": "मीडिया संसाधन", "Learning resources": "शिक्षण संसाधन", "Explore the poles": "ध्रुवों का अन्वेषण करें", "at their own scale.": "उनके अपने पैमाने पर।", "Polar evidence fails when it stays in separate systems.": "ध्रुवीय साक्ष्य अलग प्रणालियों में रहने पर प्रभावी नहीं रहता।", "Contribute evidence": "साक्ष्य योगदान करें", "Explore published records": "प्रकाशित रिकॉर्ड खोजें", "Spaceborne signal": "अंतरिक्ष संकेत", "Field evidence": "मैदानी साक्ष्य", "Research submission": "शोध प्रस्तुति", "Admin review": "प्रशासक समीक्षा", "Explorer discovery": "अन्वेषक खोज", "Follow polar expeditions.": "ध्रुवीय अभियानों का अनुसरण करें।", "Science, explained": "विज्ञान, सरल भाषा में", "for everyone.": "सभी के लिए।", "The poles are changing.": "ध्रुव बदल रहे हैं।", "Understanding": "समझ", "them starts here.": "यहीं से शुरू होती है।", "Secure access / polar science network": "सुरक्षित पहुँच / ध्रुवीय विज्ञान नेटवर्क", "Select an": "एक", "access mode.": "पहुँच मोड चुनें।", "Change access mode": "पहुँच मोड बदलें", "Approved profile": "स्वीकृत प्रोफ़ाइल", "Load explorer profile": "अन्वेषक प्रोफ़ाइल लोड करें", "Load researcher profile": "शोधकर्ता प्रोफ़ाइल लोड करें", "Load admin profile": "प्रशासक प्रोफ़ाइल लोड करें", "Full name": "पूरा नाम", "Institutional email": "संस्थागत ईमेल", "Submit access request": "पहुँच अनुरोध भेजें", "Explorer and Researcher accounts require Admin approval before entry.": "अन्वेषक और शोधकर्ता खातों के लिए प्रवेश से पहले प्रशासक की स्वीकृति आवश्यक है।", "Public portal": "सार्वजनिक पोर्टल", "Good evening,": "शुभ संध्या,", "Discover something new about the poles today.": "आज ध्रुवों के बारे में कुछ नया जानें।", "Continue exploring": "अन्वेषण जारी रखें", "Choose a new route.": "नया मार्ग चुनें।", "Search records and reports": "रिकॉर्ड और रिपोर्ट खोजें", "Track field missions": "मैदानी मिशनों को ट्रैक करें", "See the polar record": "ध्रुवीय रिकॉर्ड देखें", "Build understanding": "समझ विकसित करें", "Trending polar science": "लोकप्रिय ध्रुवीय विज्ञान", "Evidence people are tracing.": "वे साक्ष्य जिनका लोग अनुसरण कर रहे हैं।", "Open repository": "भंडार खोलें", "Save": "सहेजें", "Science in motion.": "गतिशील विज्ञान।", "View map": "मानचित्र देखें", "Featured media": "प्रमुख मीडिया", "Field records, in view.": "मैदानी रिकॉर्ड, दृष्टि में।", "Open gallery": "गैलरी खोलें", "Research workspace": "शोध कार्यक्षेत्र", "Command center": "कमांड केंद्र", "Users": "उपयोगकर्ता", "Content": "सामग्री", "Analytics": "विश्लेषण", "Settings": "सेटिंग्स", "Pending review": "समीक्षा लंबित", "Published": "प्रकाशित", "Approve": "स्वीकृत करें", "Request revision": "संशोधन का अनुरोध करें", "Submit research": "शोध प्रस्तुत करें", "My research": "मेरा शोध", "Discovery": "खोज", "Dashboard": "डैशबोर्ड",
};

function shouldTranslate(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > 1 && normalized !== "POLARIS" && !/^[\d\s°′·/+:—–\-]+$/.test(normalized);
}

function collectTranslationUnits(root: ParentNode): TranslationUnit[] {
  const units: TranslationUnit[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const parent = current.parentElement;
    const source = current.textContent ?? "";
    if (parent && !parent.closest("[data-no-translate], script, style, code, pre") && shouldTranslate(source)) {
      units.push({ kind: "text", node: current as Text, source });
    }
    current = walker.nextNode();
  }

  root.querySelectorAll<HTMLElement>("[placeholder], [title], [aria-label]").forEach(node => {
    if (node.closest("[data-no-translate]")) return;
    (["placeholder", "title", "aria-label"] as const).forEach(attribute => {
      const source = node.getAttribute(attribute);
      if (source && shouldTranslate(source)) units.push({ kind: "attribute", node, attribute, source });
    });
  });
  return units;
}

function preserveWhitespace(source: string, translation: string) {
  const leading = source.match(/^\s+/)?.[0] ?? "";
  const trailing = source.match(/\s+$/)?.[0] ?? "";
  return `${leading}${translation.trim()}${trailing}`;
}

function applyTranslatedUnits(units: TranslationUnit[], cache: Map<string, string>) {
  units.forEach(unit => {
    const translated = cache.get(unit.source);
    if (!translated) return;
    if (unit.kind === "text") unit.node.textContent = preserveWhitespace(unit.source, translated);
    else unit.node.setAttribute(unit.attribute, translated);
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try { return localStorage.getItem(LANGUAGE_STORAGE_KEY) === "hi" ? "hi" : "en"; } catch { return "en"; }
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const originals = useRef<TranslationUnit[]>([]);
  const translationCache = useRef(new Map<string, string>());
  const translating = useRef(false);

  const restoreEnglish = useCallback(() => {
    originals.current.forEach(unit => {
      if (unit.kind === "text") unit.node.textContent = unit.source;
      else unit.node.setAttribute(unit.attribute, unit.source);
    });
    originals.current = [];
    document.documentElement.lang = "en";
  }, []);

  const translateHindi = useCallback(() => {
    if (translating.current || language !== "hi") return;
    translating.current = true;
    const units = collectTranslationUnits(document.body).filter(unit => !originals.current.some(original => original.node === unit.node && original.kind === unit.kind));
    if (!units.length) { translating.current = false; return; }
    originals.current.push(...units);
    const uniqueSource = Array.from(new Set(units.map(unit => unit.source)));
    uniqueSource.forEach(source => {
      const fallback = HINDI_INTERFACE_FALLBACK[source.trim()];
      if (fallback) translationCache.current.set(source, fallback);
    });
    applyTranslatedUnits(units, translationCache.current);
    document.documentElement.lang = "hi";
    applyTranslatedUnits(units, translationCache.current);
    document.documentElement.lang = "hi";
    translating.current = false;
    setIsTranslating(false);
  }, [language]);

  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch { /* storage is optional */ }
    if (language === "en") { restoreEnglish(); return; }
    void translateHindi();
    const observer = new MutationObserver(() => {
      if (!translating.current) window.setTimeout(() => void translateHindi(), 40);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, restoreEnglish, translateHindi]);

  const setLanguage = (nextLanguage: LanguageCode) => {
    if (nextLanguage === "en") restoreEnglish();
    setLanguageState(nextLanguage);
  };
  const value = useMemo(() => ({ language, setLanguage, isTranslating }), [isTranslating, language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
