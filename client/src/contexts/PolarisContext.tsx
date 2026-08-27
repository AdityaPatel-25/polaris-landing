/**
 * Orbital Editorial shared state: one local, linked evidence ledger lets submissions
 * move visibly from researcher queue to admin review to the public repository.
 */
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  directoryPeople,
  initialExpeditions,
  initialResearch,
  mediaAssets,
  type DirectoryPerson,
  type Expedition,
  type ExpeditionStatus,
  type ResearchResource,
  type ResearchStatus,
} from "@/lib/mockData";

type NewResearch = Omit<ResearchResource, "id" | "status" | "submittedAt" | "views">;
type NewExpedition = Omit<Expedition, "id" | "marker" | "researchIds" | "mediaIds">;

interface PolarisContextValue {
  research: ResearchResource[];
  expeditions: Expedition[];
  people: DirectoryPerson[];
  savedIds: string[];
  submitResearch: (record: NewResearch) => string;
  reviewResearch: (id: string, status: ResearchStatus) => void;
  createExpedition: (record: NewExpedition) => string;
  toggleSaved: (id: string) => void;
  updatePerson: (id: string, updates: Partial<Pick<DirectoryPerson, "role" | "status">>) => void;
  metrics: { research: number; media: number; expeditions: number; active: number; pending: number; users: number; researchers: number };
}

const PolarisContext = createContext<PolarisContextValue | null>(null);

export function PolarisProvider({ children }: { children: ReactNode }) {
  const [research, setResearch] = useState(initialResearch);
  const [expeditions, setExpeditions] = useState(initialExpeditions);
  const [people, setPeople] = useState(directoryPeople);
  const [savedIds, setSavedIds] = useState<string[]>(["cry-241", "med-03", "xli-ant"]);

  const submitResearch = (record: NewResearch) => {
    const id = `sub-${Date.now().toString(36)}`;
    setResearch((current) => [{ ...record, id, status: "pending", submittedAt: "Today", views: 0 }, ...current]);
    return id;
  };

  const reviewResearch = (id: string, status: ResearchStatus) => {
    setResearch((current) => current.map((record) => record.id === id ? { ...record, status } : record));
  };

  const createExpedition = (record: NewExpedition) => {
    const id = `exp-${Date.now().toString(36)}`;
    setExpeditions((current) => [{ ...record, id, marker: { x: 48 + (current.length % 3) * 8, y: 47 + (current.length % 4) * 7 }, researchIds: [], mediaIds: [] }, ...current]);
    return id;
  };

  const toggleSaved = (id: string) => setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const updatePerson = (id: string, updates: Partial<Pick<DirectoryPerson, "role" | "status">>) => setPeople((current) => current.map((person) => person.id === id ? { ...person, ...updates } : person));

  const metrics = useMemo(() => ({
    research: research.filter((record) => record.status === "published").length,
    media: mediaAssets.length,
    expeditions: expeditions.length,
    active: expeditions.filter((item) => item.status === "active").length,
    pending: research.filter((record) => record.status === "pending").length,
    users: people.filter((person) => person.role === "Explorer" || person.role === "Educator").length,
    researchers: people.filter((person) => person.role === "Researcher").length,
  }), [expeditions, people, research]);

  return <PolarisContext.Provider value={{ research, expeditions, people, savedIds, submitResearch, reviewResearch, createExpedition, toggleSaved, updatePerson, metrics }}>{children}</PolarisContext.Provider>;
}

export function usePolaris() {
  const context = useContext(PolarisContext);
  if (!context) throw new Error("usePolaris must be used within PolarisProvider");
  return context;
}
