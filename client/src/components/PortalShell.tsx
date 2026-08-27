/**
 * Orbital Editorial portal chrome: a collapsible mission rail, dark instrument header,
 * and route-aware contextual controls shared across all POLARIS roles.
 */
import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight, Compass, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NorthStarMark } from "@/components/NorthStarMark";
import { usePolaris } from "@/contexts/PolarisContext";

export interface PortalNavItem { label: string; href: string; icon: LucideIcon; }

interface PortalShellProps {
  role: "Explorer" | "Researcher" | "Command";
  roleLabel: string;
  nav: PortalNavItem[];
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function PortalShell({ role, roleLabel, nav, children, action }: PortalShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { session, signOut } = usePolaris();
  const visibleRole = role === "Command" ? "Admin" : role;
  const isActive = (item: PortalNavItem) => location === item.href || (item.href.split("/").length > 2 && location.startsWith(`${item.href}/`));
  const activeItem = nav.find(isActive)?.label ?? "Overview";

  return (
    <div className={`portal-frame portal-frame--${role.toLowerCase()} ${collapsed ? "portal-frame--collapsed" : ""}`}>
      <aside className={`portal-rail ${mobileOpen ? "portal-rail--open" : ""}`}>
        <div className="rail-top">
          <Link href="/" className="rail-brand" aria-label="POLARIS landing page"><NorthStarMark /><span>POLARIS</span></Link>
          <button className="rail-collapse" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}</button>
        </div>
        <div className="role-chip"><Compass size={13} /><span>{visibleRole} / {roleLabel}</span></div>
        <nav className="portal-nav" aria-label={`${visibleRole} portal navigation`}>
          {nav.map((item) => {
            const active = isActive(item);
            return <Link href={item.href} className={`portal-nav-link ${active ? "portal-nav-link--active" : ""}`} key={item.href} onClick={() => setMobileOpen(false)}><item.icon size={18} /><span>{item.label}</span>{active && <i />}</Link>;
          })}
        </nav>
        <div className="rail-footer"><Link href="/access" className="role-switch"><span className="role-switch-dot" /> <span>Switch experience</span></Link><button className="session-exit" onClick={() => { signOut(); navigate("/access"); }}><span>Exit {session?.name ?? "session"}</span></button><p>POLARIS / SIH 2026</p></div>
      </aside>
      {mobileOpen && <button className="portal-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <section className="portal-stage">
        <header className="portal-header"><button className="mobile-menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Open portal menu"><Menu size={21} /></button><div className="page-indicator"><span>{roleLabel}</span><b>{activeItem}</b></div><div className="portal-header-actions"><label className="header-search"><Search size={15} /><input placeholder="Search POLARIS" aria-label="Search POLARIS" onKeyDown={(event) => { if (event.key === "Enter") navigate(`/user/repository?q=${encodeURIComponent(event.currentTarget.value)}`); }} /></label>{action}</div></header>
        <main className="portal-content">{children}</main>
      </section>
    </div>
  );
}
