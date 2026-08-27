/**
 * POLARIS Ice Chart access page: an asymmetric credential sheet set against a living
 * polar observation field, inspired by editorial split-screen composition rather than copied imagery or layout.
 */
import { ArrowLeft, ArrowRight, Check, LockKeyhole, Orbit, ShieldCheck, Telescope, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NorthStarMark } from "@/components/NorthStarMark";
import { type PortalRole, usePolaris } from "@/contexts/PolarisContext";

type Notice = { tone: "neutral" | "success" | "pending" | "error"; text: string } | null;
const accessRoles: Array<{ id: PortalRole; label: string; mission: string; icon: typeof Telescope; target: string; profileEmail: string }> = [
  { id: "Explorer", label: "Explorer", mission: "Trace verified research, expeditions, media and learning records.", icon: Telescope, target: "/user", profileEmail: "aarav.kulkarni@mail.com" },
  { id: "Researcher", label: "Researcher", mission: "Contribute evidence and coordinate the field-to-publication path.", icon: Orbit, target: "/researcher", profileEmail: "rmeeranair1@polaris.in" },
  { id: "Command", label: "Command", mission: "Approve access, steward evidence, and oversee observatory operations.", icon: ShieldCheck, target: "/admin", profileEmail: "command@polaris.in" },
];

export default function AccessGateway() {
  const [, navigate] = useLocation();
  const { signIn, requestAccess } = usePolaris();
  const [role, setRole] = useState<PortalRole>("Explorer");
  const [mode, setMode] = useState<"sign-in" | "request">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const activeRole = accessRoles.find((item) => item.id === role) ?? accessRoles[0];
  const Icon = activeRole.icon;
  const selectRole = (next: PortalRole) => { setRole(next); if (next === "Command") setMode("sign-in"); setNotice(null); };
  const loadProfile = () => { setEmail(activeRole.profileEmail); setName(role === "Researcher" ? "Dr. Meera Nair" : role === "Explorer" ? "Aarav Kulkarni" : "POLARIS Command"); setMode("sign-in"); setNotice({ tone: "neutral", text: "Approved profile loaded. Verify access to enter the workspace." }); };
  const verify = () => { const result = signIn(email, role); if (result.state === "approved") { navigate(activeRole.target); return; } setNotice({ tone: result.state === "pending" ? "pending" : "error", text: result.message }); };
  const transmit = () => { if (!email.trim()) { setNotice({ tone: "error", text: "Enter an institutional email address before submitting an access request." }); return; } const result = requestAccess(name, email, role as Exclude<PortalRole, "Command">); setNotice({ tone: result.state === "approved" ? "success" : "pending", text: result.message }); if (result.state === "approved") setMode("sign-in"); };

  return <main className="ice-login-page"><section className="ice-login-sheet"><header className="ice-login-header"><Link href="/" className="ice-login-brand"><NorthStarMark /><span>POLARIS</span></Link><Link href="/" className="ice-login-return"><ArrowLeft size={14} /> Mission overview</Link></header><div className="ice-login-content"><div className="ice-login-intro"><p><span /> Secure access / polar science network</p><h1>Enter the<br /><em>observatory.</em></h1><span className="ice-login-copy">One platform for polar research, expedition intelligence and public discovery.</span></div><div className="ice-role-selector" aria-label="Choose workspace role">{accessRoles.map((item) => { const RoleIcon = item.icon; return <button type="button" onClick={() => selectRole(item.id)} className={role === item.id ? "ice-role ice-role--active" : "ice-role"} key={item.id}><RoleIcon size={16} /><span>{item.label}</span></button>; })}</div><div className="ice-role-detail"><Icon size={17} /><div><span>WORKSPACE</span><b>{activeRole.label}</b></div><p>{activeRole.mission}</p></div>{role !== "Command" && <div className="ice-login-tabs"><button type="button" onClick={() => { setMode("sign-in"); setNotice(null); }} className={mode === "sign-in" ? "ice-login-tab--active" : ""}>Sign in</button><button type="button" onClick={() => { setMode("request"); setNotice(null); }} className={mode === "request" ? "ice-login-tab--active" : ""}>Request access</button></div>}<form className="ice-login-form" onSubmit={(event) => { event.preventDefault(); mode === "request" && role !== "Command" ? transmit() : verify(); }}>{mode === "request" && role !== "Command" && <label><span>FULL NAME</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>}<label><span>INSTITUTIONAL EMAIL</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@institution.in" /></label>{notice && <div className={`ice-login-notice ice-login-notice--${notice.tone}`}>{notice.tone === "success" && <Check size={15} />}{notice.tone === "pending" && <Orbit size={15} />}{notice.tone === "error" && <LockKeyhole size={15} />}<span>{notice.text}</span></div>}<button type="submit" className="ice-login-submit">{mode === "request" && role !== "Command" ? <>Submit access request <ArrowRight size={17} /></> : <>Verify access <ArrowRight size={17} /></>}</button></form><div className="ice-profile-loader"><div><UserRound size={14} /><span>APPROVED PROFILE</span></div><button type="button" onClick={loadProfile}>Load {activeRole.label.toLowerCase()} profile <ArrowRight size={14} /></button></div><p className="ice-login-note"><ShieldCheck size={13} /> Explorer and Researcher accounts require Command approval before entry.</p></div><footer className="ice-login-footer"><span>POLARIS / ACCESS LEDGER</span><span>ARCTIC + ANTARCTIC</span></footer></section><aside className="ice-login-visual" aria-label="Arctic sea ice observed from orbit"><div className="ice-visual-meta"><span>POLAR ORBIT / 716 KM</span><b>OBSERVATION WINDOW 01</b></div><div className="ice-visual-orbits" aria-hidden="true"><i /><i /><i /></div><div className="ice-visual-anchor"><span>78° 55′ N</span><i /><b>Sea-ice<br />observation</b></div><div className="ice-visual-caption"><p>From orbit to fieldwork.</p><span>POLARIS connects the evidence.</span></div></aside></main>;
}
