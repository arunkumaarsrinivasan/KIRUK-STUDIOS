# Kiruk Studio Vision, System, and Claude Code Implementation Plan

## Executive Summary

Kiruk Studio is a creative studio built around the idea of transforming raw scribbles and wild imagination into never-before-seen products, with an "everything is an eye" multiverse aesthetic and a strong rejection of templated, trend-following work. It targets polymath, tool-bending clients who want to build worlds and products that do not yet exist, rather than reskinning existing solutions. This report turns that vision into an operating system: brand principles, service model, internal "ISM" lab, documentation stack, Notion workspace, and an end-to-end Claude Code workflow plus a concrete to-do roadmap.[^1]

## 1. Vision and Positioning

### 1.1 Core Narrative

- **Name and meaning**: Kiruk means "scribble" and "crazy" in Tamil, capturing the movement from unfiltered sketch and chaos into a finished, living product.
- **Studio thesis**: Kiruk Studio exists to bring imagination from scribbles and sketchbooks into fully realized, expressive products and worlds; the studio does not just tell stories, it creates worlds for those stories to live in.
- **Visual totem – the eye**: The eye is the central symbol; every logo, icon system, and visual language choice orients around eyes as containers of emotion, vision, and communication.
- **Tone**: A "multiverse of eyes" – hybrid, layered, and experimental, combining multiple design languages and mediums while staying coherent through an eye-based visual system.

### 1.2 Ideal Client Mindset

- Clients are not looking to repeat existing design patterns or clone successful products; they are looking to build something genuinely original that may be difficult to explain in conventional briefs.[^1]
- They are polymaths and tool-benders who enjoy pushing technologies, aesthetics, and formats beyond standard usage.
- They care more about ambition, emotional impact, and creative risk than about safe, trend-compliant outputs; budget is flexible so long as the project serves a wild, meaningful vision.

### 1.3 Non-Negotiables

- No trend-chasing: Kiruk Studio will not accept projects that only aim to imitate Figma/Dribbble trends or create a slightly modified copy of an existing product.[^1]
- No boring work: projects must contain a meaningful creative or conceptual challenge, either in interaction, worldbuilding, narrative framing, or technical experimentation.
- No shallow branding: every identity or website must connect tightly to a deeper concept, not just visual aesthetics.

## 2. Brand Principles and Aesthetic Guardrails

### 2.1 Brand Principles

- **From Kirukal to World**: Every project starts from loose scribbles, sketches, and fragmented ideas, which are preserved as part of the process narrative and often echoed in the final visuals.
- **Eye-First Composition**: The eye becomes a compositional grid – circular, orbital, or multi-eye layouts inform section framing, motion paths, and focal points.
- **Multiverse, Not Chaos**: The multiverse theme means multiple design styles coexisting, but always organized by underlying structural rules (grids, color systems, and motion rules) so the work feels intentional rather than random.
- **Toolbending as Craft**: Using tools in unintended ways (Three.js, WebGL, creative coding, Blender, etc.) is not a gimmick but a core part of the studio’s identity.[^2][^1]
- **End-to-End Ownership**: Kiruk Studio prefers projects where it can influence strategy, naming, identity, UX, interaction, and implementation instead of being limited to a single layer.[^1]

### 2.2 Visual Language Directions

- **Logo system**: Primary logo as an abstract, modular eye; secondary marks as variations (rotated eyes, stacked eyes, eye-constellations) used for patterns, favicons, and motion.
- **Color**: Neutral base plus 1–2 accent colors that can shift per universe or ISM series, with eye elements often using the accent color as an iris or halo.
- **Type**: Hybrid typography – one sharp, rational typeface for structure (grids, UI) and one expressive typeface for headings that embody the "scribble / multiverse" energy.
- **Motion**: Eye-based motion motifs – tracking cursors, gaze-following elements, iris dilations when states change, and transitions that feel like portals between universes.

## 3. Service and Product Model

### 3.1 Core Service Pillars

1. **Worldbuilding Partnerships (Idea → Product)**  
   - Work with founders or teams from napkin sketches to shipped product – naming, narrative, UX flows, interface, and launch visuals.
   - Output: clickable prototypes, production-ready frontends, and documented design systems that capture the world’s rules.

2. **Experimental Web Experiences (Awwwards-Grade)**  
   - Deeply crafted, technically ambitious sites that feel like worlds: portfolio microsites, launch experiences, interactive narratives.[^2]
   - Includes WebGL/Three.js, micro-interaction systems, and custom visuals.

3. **Brand Systems and "Kiruk Guidelines"**  
   - Brand identity from scratch: logo, type, color, layout, image style, the "eye" system, and an opinionated guidelines spec.[^3]
   - Delivered as a living spec (Figma + Notion) that is updated as the brand evolves, not a static PDF.[^3]

4. **Creative OS and Framework Design**  
   - Helping other studios or teams build their own creative operating systems: workflows, templates, and documentation frameworks inspired by Kiruk Studio’s own spec-driven approach.[^2][^1]

### 3.2 Pricing Philosophy

- Budgets are considered flexible and secondary to alignment with the vision; the primary decision factor is how "crazy" and meaningful the project is and whether it fits Kiruk’s worldbuilding ethos.
- Collaboration-first: for especially aligned, experimental projects, non-traditional structures (rev share, co-IP, creative equity) can be considered.

### 3.3 Capacity and Focus

- Maximum active client projects: 2–3 at a time, to maintain depth and experimental quality.
- Parallel track: internal ISM projects that keep the studio’s creative muscles active even when client work is quiet.

## 4. Internal "ISM" Lab

### 4.1 Purpose

- The ISM Lab is Kiruk Studio’s internal playground – a series of self-initiated apps, experiments, and micro-worlds built around personal fascinations like heroism, kirukism, colorism for color-blind people, nomadism, and more.
- It positions the studio as an IP-generating entity, not just a service provider, and becomes a key part of the portfolio narrative and client trust.

### 4.2 ISM Series Examples

- **Heroism**: Interfaces and narratives about everyday heroism; UI concepts where users make heroic choices instead of just clicking buttons.
- **Kirukism**: Pure expression of scribble and chaos – generative drawings, interaction experiments that begin in apparent chaos but resolve into legible structure.
- **Colorism (Color-Blind Lens)**: Tools, palettes, and visualizations designed from the perspective of different color-vision profiles, making accessible design feel like a superpower rather than a limitation.
- **Nomadism**: Tools and visual systems for digital nomads, travelers, and wanderers; interfaces that feel like maps, journals, and campfires.

### 4.3 Role in the Business

- Acts as a constant R&D pipeline for new interaction patterns, aesthetic languages, and technical approaches that later feed into client work.[^1]
- Becomes a recurring content engine (case studies, devlogs, behind-the-scenes) that attracts aligned clients globally.[^1]

## 5. Documentation Stack and Workspace

### 5.1 Client-Facing Documents

For each of the following, Kiruk Studio should maintain a reusable, opinionated template that expresses its worldbuilding and eye-centric identity.

| Document Type | Purpose | Kiruk-Specific Angle |
|---------------|---------|----------------------|
| Portfolio | Get the meeting and show what "worldbuilding" means in practice | Emphasize before/after worlds, show sketches next to shipped interfaces, and foreground ISM experiments as proof of original thinking.[^1] |
| Services Guide | Define offers clearly | Explicitly describe each pillar (Worldbuilding, Experimental Web, Brand Systems, Creative OS), with narrative examples instead of generic bullet lists.[^1][^2] |
| Pitch Deck | Win the brief with story | Structure as a journey: current world → proposed universe → how Kiruk will build the portal (product/experience). |
| Proposal | Close the deal | Spec-driven: goals, constraints, creative principles, milestones, and worldbuilding rules, not just scope and price.[^1][^2] |
| Contract | Protect the work | Includes clauses on experimentation, creative risk, and clear IP rights for both client work and shared experiments. |
| Invoice | Get paid cleanly | Simple, eye-branded invoices that reference the project universe name and phase names (e.g., "Portal Opening" instead of "Phase 1"). |
| Client Onboarding | Start strong | A "Welcome to the Universe" kit explaining process, collaboration expectations, tool stack, and how scribbles become worlds.[^1] |
| Client Offboarding | End well | Wrap-up documents summarizing learnings, a world style guide, and invitations for future expansions of the universe. |

### 5.2 Internal Workspace (Notion OS)

A Notion-based workspace can act as the studio’s creative business operating system.[^2][^1]

Key databases and pages:

- **CRM / Leads**: Companies, founders, agencies, with fields for alignment score (how wild and original the idea is), potential ISM link, and next step.
- **Projects**: All client and internal projects, with fields for universe name, phase, current focus, and energy rating.
- **Spec Library**: Reusable OpenSpec-style specs for proposals, briefs, brand systems, and ISM experiments.[^2]
- **Finance Tracker**: Invoices, payments, taxes, and cashflow, aligned with India-based financial needs and global client payments.[^1]
- **Content & Marketing**: Ideas, drafts, and calendars for case studies, devlogs, long-form writing, and social content aimed at a global audience.[^1]

## 6. Claude Code as the End-to-End Engine

### 6.1 Role of Claude Code

Claude Code can act as Kiruk Studio’s in-house creative engineer and documentation engine: turning high-level visions and scribbles into structured specs, code, content, and templates.[^1]

Key responsibilities for Claude Code:

- Translate raw ideas (voice notes, sketches, scribbles) into structured OpenSpec-style documents.
- Generate and maintain all studio templates (proposals, contracts, invoices, onboarding kits) from a single source-of-truth spec.
- Scaffold full-stack prototypes and frontends for ISM projects and client work.
- Help refactor and update the Notion workspace schema as the studio grows.

### 6.2 Master System Prompt for Claude Code

Kiruk Studio can maintain a master system prompt like:

> You are Kiruk Studio’s in-house creative engineer and spec writer. Kiruk means scribble and crazy in Tamil and exists to turn wild, imaginative scribbles into never-before-seen products and worlds. You will never suggest templated, trend-following solutions; instead, you design systems, interfaces, and documents that feel like unique universes built around the eye motif and multiverse concept. You work in an OpenSpec-style: always ask for clarification, draft a spec first, then generate artifacts (code, Notion schemas, templates) from that spec. You prioritize worldbuilding, originality, and toolbending. You maintain consistency across all documents and code so that Kiruk Studio feels like a single coherent universe.

This prompt can be extended with the current project context, the relevant service pillar, and links or pasted content from existing specs.

### 6.3 Spec-First Workflow Pattern

Each time Claude Code is used, follow a three-step pattern:

1. **Intake and Clarification**  
   - Paste rough notes, scribbles (transcribed), or a high-level idea.  
   - Ask Claude to list questions and assumptions before generating anything.

2. **Spec Generation**  
   - Use a structured spec format with sections like: Goal, Audience, World / Metaphor, Scope, Constraints, Deliverables, Timeline, Risks, and Evaluation.
   - Iterate until the spec reads like a contract-ready understanding of the idea.

3. **Artifact Generation**  
   - Only after the spec is solid, ask Claude to generate:  
     - Code scaffolds (Next.js, Three.js, Node) for prototypes.  
     - Markdown or docx for proposals, contracts, and guides.  
     - Notion-importable markdown or CSV for database schemas.  
     - Content drafts for case studies and launch pages.

### 6.4 File and Project Structure for Claude Code

- **Per project folder**: `/kiruk-projects/{universe-name}/` with `spec.md`, `design-notes.md`, `claude-prompts.md`, and `/src` for code outputs.
- **Global templates folder**: `/kiruk-templates/` for proposals, contracts, onboarding kits, etc., each with a spec plus a generated template file.
- **ISM lab folder**: `/kiruk-ism/` with subfolders for heroism, kirukism, colorism, nomadism, each with its own evolving spec and code.

## 7. To-Do Roadmap Aligned to the Vision

The following roadmap is structured in phases; it can be compressed or expanded depending on available time but respects the earlier idea of building a studio within roughly a month while targeting a global audience.[^1]

### 7.1 Phase 1 – Brand Spine (Week 1)

- Define the final one-line positioning based on: "We build products that do not exist; we do not tell stories, we create worlds from our kirukals."
- Finalize the primary and secondary eye-based logos, including simple motion concepts.
- Choose and test the core type pairing and color system that matches the multiverse-of-eyes concept.
- Draft the first version of the brand principles and non-negotiables in a single "Kiruk Manifesto" page.
- Use Claude Code to create the initial brand guidelines spec from these decisions.

### 7.2 Phase 2 – Services, OS, and Workspace (Week 2)

- Define the detailed service descriptions and processes for the four pillars (Worldbuilding, Experimental Web, Brand Systems, Creative OS).
- Ask Claude Code to generate:  
  - A Services Guide document.  
  - A standard proposal template and an OpenSpec-style project brief.
- Design the Notion workspace: create the CRM, Projects, Spec Library, Finance, and Content databases with fields tuned to alignment, universe names, and creative energy.
- Connect each database entry type to at least one Claude Code prompt pattern (e.g., "Generate a proposal for this lead," "Turn this ISM idea into a spec").

### 7.3 Phase 3 – Portfolio and ISM Launchpad (Week 3)

- Curate 3–5 key past projects (e.g., HP initiatives, freelance work) and rewrite them as worldbuilding case studies rather than feature lists.[^1]
- Sketch and spec the first 1–2 ISM experiments (e.g., Heroism and Kirukism), then use Claude Code to scaffold prototypes.
- Ask Claude Code to generate outline + content skeleton for the Kiruk Studio website: homepage, ISM lab page, services, and about.
- Begin documenting the process of building Kiruk Studio itself as a case study, to later publish as content.

### 7.4 Phase 4 – Public Presence and Client Engine (Week 4 and Beyond)

- Build and ship the first version of the Kiruk Studio site (even if minimal) that clearly communicates the vision, showcases at least one ISM prototype, and offers a clear contact path.[^1]
- Set up a simple content rhythm: weekly or bi-weekly devlogs, design breakdowns, or process posts related to ISM projects and client work.
- Use Claude Code to help:  
  - Draft LinkedIn and portfolio posts tuned to a global audience.  
  - Turn internal specs into shareable, redacted case studies.
- Start targeted outreach to potential aligned clients globally, using the Services Guide and portfolio as proof of the studio’s unique value.[^1]

## 8. Ongoing Evolution

Kiruk Studio’s system should be treated as a living organism: specs, prompts, and templates are regularly updated as the studio learns from projects, ISM experiments, and client feedback.[^1]

- After each project, update the spec library with lessons and improved structures.
- Periodically refine the Claude Code master prompt to reflect new capabilities and stylistic preferences.
- Grow the ISM lab as a parallel body of work that keeps the studio’s edge sharp and attracts the right kind of clients.

By holding tightly to the scribble-to-world, multiverse-of-eyes vision and using Claude Code as a disciplined spec-to-implementation engine, Kiruk Studio can build a coherent, powerful creative practice that feels unlike any generic "design studio" on the internet.[^1]

---

## References

1. [Complete playbook: Build your creative studio from zero with checklists and 30 day timeline in India with global audience.](https://www.perplexity.ai/search/056d039f-fd65-41fe-a50b-4e1cff293be4) - Here's your complete, opinionated playbook for building a creative studio from zero — based in India...

2. [[https://boringstudios.com.au/](https://boringstudios.com.au/)

clone me all the required list for making a creative studio. To make a framework for creative studio

do a deep reserqach like how they made the framework and list me all the required things to make the studio.](https://www.perplexity.ai/search/eec8ca2f-d792-4957-ae8c-c67bd7cf28ec) - At a high level, Boring Studios didn’t just “make a studio”; they built a creative business operatin...

3. [open specs for branding and creative studio article and reference](https://www.perplexity.ai/search/78769994-9a9c-4770-9f1f-4762a7acaf56) - I've opened the Open Source Brand Guidelines Template by StudioSixF in Figma — a comprehensive, free...

