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
export type PortalRole = "Explorer" | "Researcher" | "Command";
export interface AccessRequest { id: string; name: string; email: string; role: Exclude<PortalRole, "Command">; status: "pending" | "approved" | "revoked"; requestedAt: string; }
export interface PolarisSession { name: string; email: string; role: PortalRole; }

interface PolarisContextValue {
  research: ResearchResource[];
  expeditions: Expedition[];
  people: DirectoryPerson[];
  savedIds: string[];
  session: PolarisSession | null;
  accessRequests: AccessRequest[];
  submitResearch: (record: NewResearch) => string;
  reviewResearch: (id: string, status: ResearchStatus) => void;
  createExpedition: (record: NewExpedition) => string;
  toggleSaved: (id: string) => void;
  updatePerson: (id: string, updates: Partial<Pick<DirectoryPerson, "role" | "status">>) => void;
  signIn: (email: string, role: PortalRole) => { state: "approved" | "pending" | "denied"; message: string };
  signOut: () => void;
  requestAccess: (name: string, email: string, role: Exclude<PortalRole, "Command">) => { state: "approved" | "pending"; message: string };
  approveAccess: (id: string) => void;
  revokeAccess: (id: string) => void;
  canAccess: (role: PortalRole) => boolean;
  metrics: { research: number; media: number; expeditions: number; active: number; pending: number; users: number; researchers: number };
}

const PolarisContext = createContext<PolarisContextValue | null>(null);

export function PolarisProvider({ children }: { children: ReactNode }) {
  const [research, setResearch] = useState(initialResearch);
  const [expeditions, setExpeditions] = useState(initialExpeditions);
  const [people, setPeople] = useState(directoryPeople);
  const [savedIds, setSavedIds] = useState<string[]>(["cry-241", "med-03", "xli-ant"]);
  const [session, setSession] = useState<PolarisSession | null>(null);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    { id: "access-pending-01", name: "Kavya Das", email: "kavya.das@ncpor.in", role: "Researcher", status: "pending", requestedAt: "Today / 10:40 UTC" },
  ]);

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
  const updatePerson = (id: string, updates: Partial<Pick<DirectoryPerson, "role" | "status">>) => {
    const person = people.find((item) => item.id === id);
    setPeople((current) => current.map((item) => item.id === id ? { ...item, ...updates } : item));
    if (person && updates.status) setAccessRequests((current) => current.map((request) => request.email === person.email ? { ...request, status: updates.status === "Active" ? "approved" : "revoked" } : request));
    if (person?.email === session?.email && updates.status === "Disabled") setSession(null);
  };

  const requestAccess = (name: string, email: string, role: Exclude<PortalRole, "Command">) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchingPerson = people.find((person) => person.email.toLowerCase() === normalizedEmail && person.status === "Active" && (role === "Explorer" ? person.role === "Explorer" || person.role === "Educator" : person.role === "Researcher"));
    if (matchingPerson) return { state: "approved" as const, message: "This address already has an active Admin-issued access grant." };
    const existingRequest = accessRequests.find((request) => request.email === normalizedEmail && request.role === role && request.status === "pending");
    if (existingRequest) return { state: "pending" as const, message: "This access request is already waiting in the Admin review queue." };
    setAccessRequests((current) => [{ id: `access-${Date.now().toString(36)}`, name: name.trim() || "POLARIS applicant", email: normalizedEmail, role, status: "pending", requestedAt: "Just now" }, ...current]);
    return { state: "pending" as const, message: "Request transmitted. An Admin must approve access before this portal can be opened." };
  };

  const approveAccess = (id: string) => {
    const request = accessRequests.find((item) => item.id === id);
    if (!request) return;
    setAccessRequests((current) => current.map((item) => item.id === id ? { ...item, status: "approved" } : item));
    setPeople((current) => {
      const existing = current.find((person) => person.email.toLowerCase() === request.email);
      if (existing) return current.map((person) => person.email.toLowerCase() === request.email ? { ...person, role: request.role, status: "Active" } : person);
      return [{ id: `grant-${Date.now().toString(36)}`, name: request.name, email: request.email, role: request.role, status: "Active", joined: "Today", affiliation: "POLARIS approved account" }, ...current];
    });
  };

  const revokeAccess = (id: string) => {
    const request = accessRequests.find((item) => item.id === id);
    if (!request) return;
    setAccessRequests((current) => current.map((item) => item.id === id ? { ...item, status: "revoked" } : item));
    setPeople((current) => current.map((person) => person.email.toLowerCase() === request.email ? { ...person, status: "Disabled" } : person));
    setSession((current) => current?.email === request.email ? null : current);
  };

  const signIn = (email: string, role: PortalRole) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (role === "Command") {
      if (normalizedEmail === "command@polaris.in") { setSession({ name: "POLARIS Admin", email: normalizedEmail, role }); return { state: "approved" as const, message: "Admin access verified." }; }
      return { state: "denied" as const, message: "Admin access is reserved for the designated administrator." };
    }
    const person = people.find((item) => item.email.toLowerCase() === normalizedEmail);
    const roleMatches = person && (role === "Explorer" ? person.role === "Explorer" || person.role === "Educator" : person.role === "Researcher");
    if (person?.status === "Active" && roleMatches) { setSession({ name: person.name, email: person.email, role }); return { state: "approved" as const, message: "Admin-issued access grant verified." }; }
    const request = accessRequests.find((item) => item.email === normalizedEmail && item.role === role);
    if (request?.status === "pending") return { state: "pending" as const, message: "Access request is pending Admin approval." };
    return { state: "denied" as const, message: "No active Admin-issued access grant exists for this role." };
  };

  const signOut = () => setSession(null);
  const canAccess = (role: PortalRole) => session?.role === role && (role === "Command" || people.some((person) => person.email === session.email && person.status === "Active"));

  const metrics = useMemo(() => ({
    research: research.filter((record) => record.status === "published").length,
    media: mediaAssets.length,
    expeditions: expeditions.length,
    active: expeditions.filter((item) => item.status === "active").length,
    pending: research.filter((record) => record.status === "pending").length,
    users: people.filter((person) => person.role === "Explorer" || person.role === "Educator").length,
    researchers: people.filter((person) => person.role === "Researcher").length,
  }), [expeditions, people, research]);

  return <PolarisContext.Provider value={{ research, expeditions, people, savedIds, session, accessRequests, submitResearch, reviewResearch, createExpedition, toggleSaved, updatePerson, signIn, signOut, requestAccess, approveAccess, revokeAccess, canAccess, metrics }}>{children}</PolarisContext.Provider>;
}

export function usePolaris() {
  const context = useContext(PolarisContext);
  if (!context) throw new Error("usePolaris must be used within PolarisProvider");
  return context;
}
