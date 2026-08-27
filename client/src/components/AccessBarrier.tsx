/** Permission boundary for the POLARIS local access prototype, with user-facing Admin terminology. */
import type { ReactNode } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { type PortalRole, usePolaris } from "@/contexts/PolarisContext";

export function AccessBarrier({ role, children }: { role: PortalRole; children: ReactNode }) {
  const { canAccess, session } = usePolaris();
  if (canAccess(role)) return <>{children}</>;
  const roleName = role === "Command" ? "Admin" : role;
  return <main className="access-denied"><section><p className="eyebrow"><LockKeyhole size={14} /> Authorisation required</p><h1>{roleName}<br /><em>clearance</em> needed.</h1><p>{session ? "Your current clearance does not include this workspace." : "Sign in with an Admin-issued access grant to enter this workspace."}</p><Link href="/access" className="access-denied-action"><ShieldCheck size={16} /> Open access gateway <ArrowRight size={16} /></Link><small>ADMIN AUTHORISATION IS REQUIRED FOR EXPLORER AND RESEARCHER ACCESS</small></section></main>;
}
