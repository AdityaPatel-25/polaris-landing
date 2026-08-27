/** Permission boundary for the POLARIS local access prototype, with user-facing Admin terminology. */
import type { ReactNode } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { type PortalRole, usePolaris } from "@/contexts/PolarisContext";
import { NorthStarMark } from "@/components/NorthStarMark";

export function AccessBarrier({ role, children }: { role: PortalRole; children: ReactNode }) {
  const { canAccess, session } = usePolaris();
  if (canAccess(role)) return <>{children}</>;
  const roleName = role === "Command" ? "Admin" : role;
  return <main className="access-denied"><section><header className="access-ledger-lockup"><NorthStarMark /><div><b>POLARIS</b><span>POLAR OBSERVATION NETWORK</span></div><i>ACCESS NODE / 06</i></header><p className="eyebrow"><LockKeyhole size={14} /> Authorisation required</p><h1>{roleName}<br /><em>clearance</em> needed.</h1><p>{session ? "Your current clearance does not include this evidence route." : `Sign in with an Admin-issued ${roleName} access grant to view governed polar evidence.`}</p><Link href="/access" className="access-denied-action"><ShieldCheck size={16} /> Verify access grant <ArrowRight size={16} /></Link><div className="access-ledger-meta"><div><span>ACCESS MODE</span><b>{roleName.toUpperCase()} / READ</b></div><div><span>REFERENCE FIELD</span><b>72° N / 69° S</b></div><div><span>STATUS</span><b>ADMIN REVIEW</b></div></div><small>ADMIN AUTHORISATION IS REQUIRED FOR EXPLORER AND RESEARCHER ACCESS</small></section></main>;
}
