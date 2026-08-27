/**
 * Scientific Field Ledger: a dark, data-oriented contributor workspace where
 * research moves from structured intake through Admin review to public evidence.
 */
import { useMemo, useState, type DragEvent, type ReactNode } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, CalendarDays, Check,
  CheckCircle2, ChevronRight, ClipboardCheck, Compass, Database, FileArchive,
  FilePlus2, FileText, FolderKanban, Layers3, Map, Microscope, Plus, Search,
  Send, Upload, X,
} from "lucide-react";
import { PortalShell, type PortalNavItem } from "@/components/PortalShell";
import { usePolaris } from "@/contexts/PolarisContext";
import type { ExpeditionStatus, Region, ResearchResource } from "@/lib/mockData";

const researcherNav: PortalNavItem[] = [
  { label: "Dashboard", href: "/researcher", icon: Compass },
  { label: "My Research", href: "/researcher/research", icon: FileText },
  { label: "Discover", href: "/researcher/discover", icon: Search },
  { label: "Submit Research", href: "/researcher/submit", icon: FilePlus2 },
  { label: "Expeditions", href: "/researcher/expeditions", icon: Map },
  { label: "Saved", href: "/researcher/saved", icon: Bookmark },
];

const steps = ["Record identity", "Scientific context", "Evidence files", "Review & submit"];

function ResearcherShell({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <PortalShell
      role="Researcher"
      roleLabel="Scientific workspace"
      nav={researcherNav}
      action={action ?? <Link href="/researcher/submit" className="role-header-button">New research</Link>}
    >
      {children}
    </PortalShell>
  );
}

function ResearchStatus({ status }: { status: ResearchResource["status"] }) {
  const label = status === "published" ? "Published" : status === "pending" ? "Pending review" : "Revision requested";
  return <span className={`research-status research-status--${status}`}>{label}</span>;
}

function Metric({ title, value, note, tone = "" }: { title: string; value: string | number; note: string; tone?: string }) {
  return <article className={`researcher-metric ${tone}`}><span>{title}</span><b>{value}</b><p>{note}</p><i /></article>;
}

function WorkspaceSignal() {
  return (
    <div className="researcher-command-strip" aria-label="Research workspace status">
      <span><Database size={14} /> Evidence ledger <b>Synced</b></span>
      <span><Activity size={14} /> Review lane <b>1 awaiting action</b></span>
      <span><CalendarDays size={14} /> Field season <b>2026 / active</b></span>
      <span><Microscope size={14} /> Contributor scope <b>Polar systems</b></span>
    </div>
  );
}

function ResearcherDashboard() {
  const { research, metrics, expeditions } = usePolaris();
  const [, navigate] = useLocation();
  const mine = research.filter((item) => item.authors.includes("Arjun") || item.authors.includes("Meera") || item.id.startsWith("sub-")).slice(0, 4);
  const fieldLinked = expeditions.filter((item) => item.status === "active").length;

  return (
    <ResearcherShell>
      <WorkspaceSignal />
      <section className="researcher-welcome">
        <div>
          <p className="eyebrow eyebrow--dark"><Microscope size={14} /> Contributor field ledger</p>
          <h1>Research, in<br /><em>clear formation.</em></h1>
          <p>Organize evidence, trace review status, and contribute research to the shared polar knowledge record.</p>
        </div>
        <button className="workspace-action" onClick={() => navigate("/researcher/submit")}><Plus size={16} /> Begin submission</button>
      </section>

      <section className="researcher-metrics">
        <Metric title="Publication portfolio" value={12} note="3 records released this year" />
        <Metric title="Active field links" value={fieldLinked} note="Missions feeding evidence" tone="researcher-metric--blue" />
        <Metric title="Record visibility" value="28.4K" note="Views across the public ledger" />
        <Metric title="Review queue" value={metrics.pending} note="Records awaiting Admin review" tone="researcher-metric--dark" />
      </section>

      <section className="researcher-insight-grid">
        <article className="activity-panel">
          <div className="activity-heading"><div><p>RESEARCH ACTIVITY / 2026</p><h2>Evidence gaining ground.</h2></div><span>PUBLICATION / VISIBILITY</span></div>
          <div className="activity-chart"><div className="chart-y"><span>12K</span><span>8K</span><span>4K</span><span>0</span></div><div className="chart-area"><i className="chart-line chart-line--one" /><i className="chart-line chart-line--two" /><i className="chart-point chart-point--one" /><i className="chart-point chart-point--two" /><div>{["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"].map((month) => <span key={month}>{month}</span>)}</div></div></div>
          <div className="chart-key"><span><i /> Record views</span><span><i /> Published records</span></div>
        </article>
        <article className="review-lane">
          <div className="panel-kicker"><ClipboardCheck size={15} /> REVIEW LANE</div>
          <h2>One record is in scientific review.</h2>
          <p>Winter Sea-Ice Fracture Patterns is queued for evidence verification and metadata review.</p>
          <div className="review-lane-progress"><span>Submission</span><i /><span>Admin review</span><i className="is-pending" /><span>Repository</span></div>
          <button onClick={() => navigate("/researcher/research?filter=pending")}>Open review ledger <ArrowRight size={16} /></button>
        </article>
      </section>

      <section className="recent-ledger">
        <div className="section-bar"><div><p>CONTRIBUTOR LEDGER</p><h2>Recent research records.</h2></div><Link href="/researcher/research" className="inline-route">Open management view <ArrowRight size={15} /></Link></div>
        <div className="researcher-table"><div className="researcher-table-head"><span>Record</span><span>Status</span><span>Year</span><span>Visibility</span><span /></div>{mine.map((item) => <button key={item.id} onClick={() => navigate(`/user/repository/${item.id}`)}><span><b>{item.title}</b><small>{item.topic} / {item.region}</small></span><ResearchStatus status={item.status} /><span>{item.year}</span><span>{item.views ? item.views.toLocaleString() : "—"}</span><ArrowUpRight size={16} /></button>)}</div>
      </section>

      <section className="workflow-banner"><div><p><span className="pulse-mark" /> CONTRIBUTION PATH / CONTROLLED REVIEW</p><h2>Structured intake. Visible research.</h2><span>RECORD IDENTITY → EVIDENCE FILES → ADMIN REVIEW → PUBLIC LEDGER</span></div><button onClick={() => navigate("/researcher/submit")}>Start a research record <ArrowRight size={16} /></button></section>
    </ResearcherShell>
  );
}

function MyResearch() {
  const { research } = usePolaris();
  const [filter, setFilter] = useState(() => new URLSearchParams(window.location.search).get("filter") ?? "all");
  const [, navigate] = useLocation();
  const ownedRecords = useMemo(() => research.filter((item) => item.authors.includes("Arjun") || item.authors.includes("Meera") || item.id.startsWith("sub-")), [research]);
  const records = useMemo(() => ownedRecords.filter((item) => filter === "all" || item.status === filter), [filter, ownedRecords]);
  const counts = { all: ownedRecords.length, published: ownedRecords.filter((item) => item.status === "published").length, pending: ownedRecords.filter((item) => item.status === "pending").length, revision: ownedRecords.filter((item) => item.status === "revision").length };

  return (
    <ResearcherShell>
      <section className="workspace-page-heading"><div><p className="eyebrow eyebrow--dark"><FileText size={14} /> Contributor archive</p><h1>Research<br />management.</h1></div><p>Track every submitted record from metadata completion to public repository visibility.</p></section>
      <section className="record-summary-strip" aria-label="Research record summary"><span><b>{counts.all}</b> total records</span><span><b>{counts.published}</b> public</span><span><b>{counts.pending}</b> in review</span><span><b>{counts.revision}</b> needs attention</span></section>
      <div className="researcher-controls"><div>{[["all", "All records"], ["published", "Published"], ["pending", "Pending review"], ["revision", "Needs revision"]].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={filter === value ? "filter-pill filter-pill--active" : "filter-pill"}>{label}<small>{counts[value as keyof typeof counts]}</small></button>)}</div><Link href="/researcher/submit"><Plus size={15} /> New research</Link></div>
      <section className="researcher-record-list">{records.length ? records.map((record, index) => <article key={record.id}><span className="record-no">{String(index + 1).padStart(2, "0")}</span><div><p>{record.region} <i /> {record.topic}</p><h2>{record.title}</h2><span>{record.institution} · {record.year}</span></div><ResearchStatus status={record.status} /><span className="record-date">{record.status === "pending" ? `Submitted ${record.submittedAt}` : `${record.views.toLocaleString()} views`}</span><button onClick={() => navigate(`/user/repository/${record.id}`)} aria-label={`View ${record.title}`}><ArrowUpRight size={18} /></button></article>) : <div className="empty-state"><FileText size={30} /><h2>No records in this view.</h2><p>Use another review filter or start a new evidence record.</p></div>}</section>
    </ResearcherShell>
  );
}

function Discover() {
  const { research } = usePolaris();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const records = useMemo(() => research.filter((item) => item.status === "published").filter((item) => region === "All regions" || item.region === region).filter((item) => `${item.title} ${item.topic} ${item.institution}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5), [query, region, research]);

  return (
    <ResearcherShell>
      <section className="workspace-page-heading"><div><p className="eyebrow eyebrow--dark"><Search size={14} /> Evidence intelligence</p><h1>Discover<br />the ledger.</h1></div><p>Connect a new contribution to the scientific records, institutions, and polar regions already in motion.</p></section>
      <section className="discovery-workbench">
        <div className="discovery-workbench-head"><div><p>PUBLIC EVIDENCE INDEX</p><h2>Search before you submit.</h2></div><span><Database size={15} /> {research.filter((item) => item.status === "published").length} published records</span></div>
        <div className="discovery-query"><label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, discipline, or institution" aria-label="Search published research" /></label><select value={region} onChange={(event) => setRegion(event.target.value)} aria-label="Filter published research by region"><option>All regions</option><option>Arctic</option><option>Antarctica</option><option>Southern Ocean</option><option>Both Poles</option></select></div>
        <div className="discovery-results">{records.map((record, index) => <Link href={`/user/repository/${record.id}`} className="discovery-record" key={record.id}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{record.region} <i /> {record.topic}</p><b>{record.title}</b><small>{record.institution} · {record.year}</small></div><ArrowUpRight size={17} /></Link>)}{records.length === 0 && <div className="empty-state"><Search size={28} /><h2>No indexed records found.</h2><p>Try another term or widen the polar-region filter.</p></div>}</div>
      </section>
      <section className="discovery-shortcuts"><Link href="/user/expeditions"><Map size={20} /><span>Route intelligence<small>Find active field missions</small></span><ArrowUpRight size={16} /></Link><Link href="/user/media"><FolderKanban size={20} /><span>Visual evidence<small>Explore connected media</small></span><ArrowUpRight size={16} /></Link><Link href="/user/learn"><ClipboardCheck size={20} /><span>Outreach index<small>Trace public-learning pathways</small></span><ArrowUpRight size={16} /></Link></section>
    </ResearcherShell>
  );
}

const initialSubmission = { title: "", authors: "Dr. Arjun Mehta", institution: "National Centre for Polar & Ocean Research", abstract: "", region: "Antarctica" as Region, topic: "Glaciology", keywords: "", year: "2026", document: "", thumbnail: "" };

function SubmitResearch() {
  const { submitResearch } = usePolaris();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialSubmission);
  const [dragging, setDragging] = useState<"document" | "thumbnail" | null>(null);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const setFile = (field: "document" | "thumbnail", file?: File) => update(field, file?.name ?? "");
  const clearFile = (field: "document" | "thumbnail") => update(field, "");
  const next = () => {
    if (step === 0 && (!form.title.trim() || !form.authors.trim() || !form.institution.trim())) { toast.error("Add the title, author list, and institution before continuing."); return; }
    if (step === 1 && (!form.abstract.trim() || !form.keywords.trim())) { toast.error("Add an abstract and discovery keywords before continuing."); return; }
    setStep((current) => Math.min(current + 1, 3));
  };
  const submit = () => {
    const id = submitResearch({ title: form.title, authors: form.authors, institution: form.institution, description: form.abstract, region: form.region, topic: form.topic, tags: form.keywords.split(",").map((item) => item.trim()).filter(Boolean), year: Number(form.year) || 2026 });
    toast.success("Research record submitted. It is now in the Admin review queue.");
    navigate(`/researcher/research?submitted=${id}`);
  };
  const uploadBox = (field: "document" | "thumbnail", label: string, prompt: string, format: string) => (
    <label className={`upload-box ${dragging === field ? "upload-box--dragging" : ""}`} onDragOver={(event: DragEvent) => { event.preventDefault(); setDragging(field); }} onDragLeave={() => setDragging(null)} onDrop={(event: DragEvent) => { event.preventDefault(); setDragging(null); setFile(field, event.dataTransfer.files[0]); }}>
      <input type="file" accept={field === "document" ? ".pdf,.doc,.docx" : "image/*"} onChange={(event) => setFile(field, event.target.files?.[0])} />
      <span className="upload-box-icon">{field === "document" ? <FileArchive size={22} /> : <Upload size={22} />}</span>
      <b>{form[field] || label}</b><span>{form[field] ? "Attached locally — ready for review" : prompt}</span><small>{format}</small>
      {form[field] && <button type="button" className="upload-clear" onClick={(event) => { event.preventDefault(); clearFile(field); }} aria-label={`Remove ${form[field]}`}><X size={14} /> Remove</button>}
    </label>
  );
  const readiness = [Boolean(form.title && form.authors && form.institution), Boolean(form.abstract && form.keywords), Boolean(form.document || form.thumbnail), step === 3];

  return (
    <ResearcherShell action={<Link href="/researcher/research" className="role-header-button">My research</Link>}>
      <section className="submission-header"><button className="back-route" onClick={() => navigate("/researcher/research")}><ArrowLeft size={16} /> Research management</button><p className="eyebrow eyebrow--dark"><FilePlus2 size={14} /> New scientific contribution</p><h1>Submit<br />research.</h1><p>Structure a verifiable evidence record for controlled review and public discovery.</p></section>
      <div className="submission-topline"><span><Layers3 size={14} /> RECORD DRAFT / {String(step + 1).padStart(2, "0")} OF 04</span><div className="submission-progress" aria-label={`${Math.round(((step + 1) / 4) * 100)} percent complete`}><i style={{ transform: `scaleX(${(step + 1) / 4})` }} /></div><span>{Math.round(((step + 1) / 4) * 100)}% structured</span></div>
      <div className="submission-layout"><aside className="submission-steps">{steps.map((label, index) => <button key={label} type="button" onClick={() => index <= step && setStep(index)} className={index === step ? "submission-step submission-step--active" : index < step ? "submission-step submission-step--done" : "submission-step"}><span>{index < step ? <Check size={14} /> : `0${index + 1}`}</span><b>{label}</b>{index < 3 && <i />}</button>)}</aside>
        <form className="submission-form" onSubmit={(event) => { event.preventDefault(); step === 3 ? submit() : next(); }}>
          {step === 0 && <><p className="form-kicker">STEP 01 / RECORD IDENTITY</p><h2>Define the scientific record.</h2><p className="form-lede">Start with the authorship and citation details that allow a record to be verified, attributed, and discovered across POLARIS.</p><div className="form-grid"><label className="form-field form-field--wide">Research title<input value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Winter Sea-Ice Fracture Patterns near Princess Astrid Coast" /></label><label className="form-field">Contributors<input value={form.authors} onChange={(event) => update("authors", event.target.value)} /></label><label className="form-field">Institution<input value={form.institution} onChange={(event) => update("institution", event.target.value)} /></label><label className="form-field">Publication year<input type="number" min="1900" max="2100" value={form.year} onChange={(event) => update("year", event.target.value)} /></label></div><div className="form-supporting-note"><CheckCircle2 size={16} /><span>Record identity is retained as structured metadata before evidence files are attached.</span></div></>}
          {step === 1 && <><p className="form-kicker">STEP 02 / SCIENTIFIC CONTEXT</p><h2>Describe the evidence.</h2><p className="form-lede">Add the analytical context that helps future researchers locate and interpret this contribution.</p><div className="form-grid"><label className="form-field form-field--wide">Abstract<textarea value={form.abstract} onChange={(event) => update("abstract", event.target.value)} placeholder="Describe the objective, observations, methodology, and scientific contribution…" /><small>{form.abstract.length} characters / concise evidence summary</small></label><label className="form-field">Polar region<select value={form.region} onChange={(event) => update("region", event.target.value)}><option>Arctic</option><option>Antarctica</option><option>Southern Ocean</option><option>Both Poles</option></select></label><label className="form-field">Research area<select value={form.topic} onChange={(event) => update("topic", event.target.value)}><option>Glaciology</option><option>Climate</option><option>Oceanography</option><option>Earth Observation</option><option>Wildlife</option><option>Atmospheric Science</option></select></label><label className="form-field form-field--wide">Discovery keywords<input value={form.keywords} onChange={(event) => update("keywords", event.target.value)} placeholder="Sea ice, synthetic-aperture radar, fractures" /><small>Use commas to separate searchable terms.</small></label></div></>}
          {step === 2 && <><p className="form-kicker">STEP 03 / EVIDENCE FILES</p><h2>Attach supporting material.</h2><p className="form-lede">Attach the primary document and an optional visual reference. Files stay local in this prototype; the interactive evidence record and review state remain connected.</p><div className="upload-grid">{uploadBox("document", "Attach research document", "Drop a PDF or choose a local document", "PDF · DOC · DOCX")}{uploadBox("thumbnail", "Attach visual reference", "Drop an image or choose a local file", "PNG · JPG · WEBP")}</div><div className="upload-integrity"><FileArchive size={17} /><div><b>Evidence-file protocol</b><p>Include a source document for the strongest review hand-off. A visual reference improves recognition in the shared repository.</p></div></div></>}
          {step === 3 && <><p className="form-kicker">STEP 04 / REVIEW & SUBMIT</p><h2>Confirm the hand-off.</h2><p className="form-lede">Review the structured record before it enters the Admin queue. Approved research becomes searchable in the Explorer repository.</p><div className="review-sheet"><div><span>RECORD TITLE</span><b>{form.title || "Untitled research record"}</b></div><div><span>CONTRIBUTORS</span><b>{form.authors}</b></div><div><span>REGION / DISCIPLINE</span><b>{form.region} / {form.topic}</b></div><div><span>DISCOVERY KEYWORDS</span><b>{form.keywords || "No keywords added"}</b></div><div className="review-abstract"><span>ABSTRACT</span><b>{form.abstract || "No abstract added"}</b></div></div><div className="submission-readiness">{["Record identity", "Scientific context", "Evidence files", "Review complete"].map((label, index) => <span key={label} className={readiness[index] ? "is-ready" : ""}>{readiness[index] ? <CheckCircle2 size={15} /> : <ChevronRight size={15} />}{label}</span>)}</div><div className="pending-readout"><span className="pulse-mark" /><div><b>Admin review follows submission</b><p>The record will remain private until an Admin verifies its evidence and publication metadata.</p></div></div></>}
          <div className="form-actions">{step > 0 && <button type="button" className="form-back" onClick={() => setStep((current) => current - 1)}>Back</button>}<button type="submit" className="form-next">{step === 3 ? <><Send size={16} /> Submit for review</> : <>Save and continue <ArrowRight size={16} /></>}</button></div>
        </form>
      </div>
    </ResearcherShell>
  );
}

const initialExpeditionForm = { name: "", region: "Antarctica" as Region, coordinates: "", objective: "", team: "", start: "", end: "", status: "upcoming" as ExpeditionStatus };

function ResearcherExpeditions() {
  const { expeditions, createExpedition } = usePolaris();
  const [, navigate] = useLocation();
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | ExpeditionStatus>("all");
  const [form, setForm] = useState(initialExpeditionForm);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const visibleExpeditions = expeditions.filter((item) => statusFilter === "all" || item.status === statusFilter);
  const statusCount = (status: ExpeditionStatus) => expeditions.filter((item) => item.status === status).length;
  const create = (event: React.FormEvent) => { event.preventDefault(); if (!form.name || !form.coordinates || !form.objective || !form.team || !form.start || !form.end) { toast.error("Complete the mission information before creating an expedition."); return; } createExpedition({ name: form.name, region: form.region, location: form.coordinates, coordinates: form.coordinates, objective: form.objective, team: form.team, dates: `${form.start} — ${form.end}`, status: form.status }); toast.success("Expedition created. It is now visible in the Explorer mission map."); setCreating(false); setForm(initialExpeditionForm); };

  return (
    <ResearcherShell>
      <section className="workspace-page-heading"><div><p className="eyebrow eyebrow--dark"><Map size={14} /> Field contribution</p><h1>Expedition<br />management.</h1></div><p>Organize mission records that connect fieldwork, research evidence, and the shared Explorer map.</p></section>
      <section className="mission-status-strip"><span><b>{expeditions.length}</b> missions indexed</span><button className={statusFilter === "all" ? "is-active" : ""} onClick={() => setStatusFilter("all")}>All <small>{expeditions.length}</small></button><button className={statusFilter === "active" ? "is-active" : ""} onClick={() => setStatusFilter("active")}>Active <small>{statusCount("active")}</small></button><button className={statusFilter === "upcoming" ? "is-active" : ""} onClick={() => setStatusFilter("upcoming")}>Upcoming <small>{statusCount("upcoming")}</small></button><button className={statusFilter === "completed" ? "is-active" : ""} onClick={() => setStatusFilter("completed")}>Completed <small>{statusCount("completed")}</small></button><button className="mission-create" onClick={() => setCreating((value) => !value)}><Plus size={15} /> {creating ? "Close intake" : "New mission"}</button></section>
      {creating && <form className="expedition-form" onSubmit={create}><p className="form-kicker">NEW FIELD MISSION / SHARED STATE</p><h2>Plan an observation route.</h2><p className="form-lede">A new mission becomes available to Explorer users after this structured field record is created.</p><div className="form-grid"><label className="form-field form-field--wide">Expedition name<input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Princess Astrid Winter Survey" /></label><label className="form-field">Polar region<select value={form.region} onChange={(event) => update("region", event.target.value)}><option>Arctic</option><option>Antarctica</option><option>Southern Ocean</option><option>Both Poles</option></select></label><label className="form-field">Mission status<select value={form.status} onChange={(event) => update("status", event.target.value)}><option value="upcoming">Upcoming</option><option value="active">Active</option><option value="completed">Completed</option></select></label><label className="form-field">Coordinates<input value={form.coordinates} onChange={(event) => update("coordinates", event.target.value)} placeholder="69.50°S, 12.10°E" /></label><label className="form-field">Field team<input value={form.team} onChange={(event) => update("team", event.target.value)} placeholder="12 researchers" /></label><label className="form-field">Start date<input type="date" value={form.start} onChange={(event) => update("start", event.target.value)} /></label><label className="form-field">End date<input type="date" value={form.end} onChange={(event) => update("end", event.target.value)} /></label><label className="form-field form-field--wide">Research objective<textarea value={form.objective} onChange={(event) => update("objective", event.target.value)} placeholder="State the field objective and observations this mission will collect…" /></label></div><div className="form-actions"><button type="submit" className="form-next">Create shared mission <ArrowRight size={16} /></button></div></form>}
      <section className="researcher-record-list mission-record-list">{visibleExpeditions.map((item, index) => <article key={item.id}><span className="record-no">{String(index + 1).padStart(2, "0")}</span><div><p>{item.region} <i /> {item.coordinates}</p><h2>{item.name}</h2><span>{item.objective}</span></div><span className={`research-status research-status--${item.status === "active" ? "published" : item.status === "upcoming" ? "pending" : "revision"}`}>{item.status}</span><span className="record-date">{item.dates}</span><button onClick={() => navigate("/user/expeditions")} aria-label={`View ${item.name} in explorer map`}><ArrowUpRight size={18} /></button></article>)}</section>
    </ResearcherShell>
  );
}

function ResearcherSaved() {
  return <ResearcherShell><section className="workspace-page-heading"><div><p className="eyebrow eyebrow--dark"><Bookmark size={14} /> Shared explorer ledger</p><h1>Saved<br />evidence.</h1></div><p>Saved public records remain available when you move from the contributor workspace into Explorer mode.</p></section><section className="saved-transfer"><div><Bookmark size={26} /><h2>Your reading ledger travels with you.</h2><p>Saved research, routes, and visual evidence are held in local prototype state and remain available across the connected POLARIS experience.</p><Link href="/user/saved">Open Explorer saved items <ArrowRight size={16} /></Link></div></section></ResearcherShell>;
}

export function ResearcherRoutes() {
  const [research] = useRoute("/researcher/research");
  const [discover] = useRoute("/researcher/discover");
  const [submit] = useRoute("/researcher/submit");
  const [expeditions] = useRoute("/researcher/expeditions");
  const [saved] = useRoute("/researcher/saved");
  if (research) return <MyResearch />;
  if (discover) return <Discover />;
  if (submit) return <SubmitResearch />;
  if (expeditions) return <ResearcherExpeditions />;
  if (saved) return <ResearcherSaved />;
  return <ResearcherDashboard />;
}
