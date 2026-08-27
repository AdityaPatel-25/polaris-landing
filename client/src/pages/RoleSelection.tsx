/**
 * Orbital Editorial access gateway: three clearly differentiated routes into one
 * polar observatory, with the north-star glyph marking the role-selection instrument.
 */
import { ArrowRight, Atom, Compass, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { NorthStarMark } from "@/components/NorthStarMark";

const roles = [
  { title: "Explorer", route: "/user", label: "User portal", icon: Compass, text: "Discover research, field expeditions, media and learning pathways through the polar world.", index: "01", color: "role-card--explorer" },
  { title: "Researcher", route: "/researcher", label: "Researcher portal", icon: Atom, text: "Contribute knowledge, track your records and coordinate evidence from your expeditions.", index: "02", color: "role-card--researcher" },
  { title: "Command", route: "/admin", label: "Admin portal", icon: ShieldCheck, text: "Review the knowledge ledger and steward the connected polar-science ecosystem.", index: "03", color: "role-card--command" },
];

export default function RoleSelection() {
  return <div className="role-page"><header className="role-header"><Link href="/" className="brand"><NorthStarMark className="brand-mark" /><span>POLARIS</span></Link><p>ACCESS GATEWAY / SIH 2026</p></header><main className="role-main"><div className="role-intro"><p className="eyebrow"><span className="pulse-mark" /> Select an observation route</p><h1>Choose your<br /><em>POLARIS</em> experience.</h1><p>Every role works from the same evolving record of polar science. Trace the workflow from contribution to discovery.</p></div><div className="role-cards">{roles.map(({ title, route, label, icon: Icon, text, index, color }) => <Link href={route} className={`role-card ${color}`} key={title}><span className="role-index">{index}</span><Icon size={30} strokeWidth={1.35} /><div><p>{label}</p><h2>{title}</h2><span>{text}</span></div><b>Enter route <ArrowRight size={17} /></b></Link>)}</div></main><footer className="role-footer"><span><NorthStarMark /> ONE GATEWAY TO POLAR SCIENCE</span><span>RESEARCH → EXPEDITION → MEDIA → EDUCATION</span></footer></div>;
}
