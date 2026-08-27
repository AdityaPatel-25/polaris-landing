# POLARIS: Candid Three-Minute SIH Judging-Panel Audit

**Judging lens:** A national hackathon panel has limited time. It must understand the problem, believe the solution, see that the core workflow works, and remember one differentiated idea before it evaluates surface polish.

| Question | Candid assessment | Priority response |
|---|---|---|
| **1. What looks impressive?** | The polar-orbit visual identity is distinctive, calm, and more credible than a typical SaaS dashboard. The role system is coherent. Explorer, Researcher, and Admin are meaningfully different. The Admin clearance and research moderation states demonstrate governance rather than an open, unmoderated content feed. | Preserve the dark editorial science system and role-specific terminology. |
| **2. What looks generic?** | Some admin and researcher views still resemble good dashboard templates when viewed in isolation: KPI tiles, standard tables, filters, and charts. The terminology is stronger than the interaction model. | Keep only data surfaces that prove the workflow; make the evidence trail and provenance cues more prominent than generic management chrome. |
| **3. What looks unfinished?** | A judge can infer the end-to-end workflow, but previously had to visit multiple areas to understand why it matters. Some public landing CTAs could feel demonstrative rather than evidence-driven. The live prototype intentionally uses local state, so it does not yet demonstrate persistence across refresh. | Add a public, explicit problem-to-proof path and direct role entry. State persistence is the next technical proof point. |
| **4. What is confusing?** | The value proposition risks reading as “a polished polar content portal” before it reads as a solution to fragmented, hard-to-trace polar evidence. The names Explorer and User have appeared interchangeably. | Use **Explorer** consistently as the public role, and foreground the workflow: signal → field evidence → research submission → Admin review → public discovery. |
| **5. What does not clearly communicate the SIH problem?** | The earlier landing page did not name the operational gap immediately: polar data exists across satellite passes, field teams, papers, and outreach artifacts, but is rarely unified in a controlled journey. | The landing hero and proof section now state the fragmentation problem explicitly and show the governance solution. |
| **6. What features are unnecessary?** | Decorative charts, long dashboards, and static metric density do not carry the SIH pitch unless they demonstrate a decision or an evidence hand-off. Generic search areas should not compete with the core proof flow. | De-emphasize decorative telemetry and retain it only where it conveys a scientific state or review outcome. |
| **7. What features should be emphasized?** | The cross-role local workflow is the best proof: a researcher creates a pending record; an Admin reviews and publishes it; an Explorer discovers only the approved record. Admin-controlled access is also a strong governance differentiator. | Make this workflow visible on the landing page, Researcher workspace, and Admin dashboard. |
| **8. What would make it stand out?** | A visible, traceable evidence chain joined to real polar observation sources, clear Indian polar-program alignment, and a short live demonstration of a record moving across roles would separate POLARIS from a generic science portal. | The prototype now frames this chain prominently. The next leap is connecting it to real feeds, source citations, and persistent audited decisions. |

## High-Priority Improvements Implemented

The landing page now names the **fragmented polar-evidence problem** in the first-screen narrative and replaces a generic expedition CTA with an anchor to the proof section. The proof section now shows the complete five-stage workflow in explicit language and provides direct entry into **Researcher** contribution and **Explorer** discovery modes. The access gateway reads the requested role from the route, so these entry points open the corresponding role panel directly.

The Admin Portal was already updated with a live moderation trace and state-filtered evidence ledger. The shared local state continues to retain the functional prototype flow: Researcher submission creates a `pending` record; Admin review changes it to `published` or `revision`; Explorer discovery indexes only `published` records.

## Blunt Recommendation for the Demo

> Do not begin by touring every dashboard. Begin with the one-sentence problem, submit one concise research record, approve it as Admin, then show it appearing in the Explorer atlas. That is the demonstration the panel will remember.

## Next Technical Priorities

| Priority | Why it matters to judges | Practical next step |
|---|---|---|
| **1. Persistent evidence ledger** | Shows this is a working system rather than a resettable prototype. | Add database-backed research, review, and access-grant records. |
| **2. Source provenance** | Makes scientific credibility auditable. | Attach DOI, satellite product, station, expedition, timestamp, and data-license fields to each research record. |
| **3. Real polar signals** | Demonstrates technical and domain depth. | Connect a small number of curated open polar datasets or mission feeds and show their provenance, not just visual imagery. |
| **4. Demo mode** | Protects the three-minute pitch. | Add a guided scenario that advances one prebuilt record through the four role states without depending on manual navigation. |
