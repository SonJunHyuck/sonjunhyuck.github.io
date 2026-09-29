# Phase 2: portfolio + development blog foundation

## Role of the site

The portfolio earns trust quickly: what was made, why it mattered, and the tangible result. The blog makes that trust durable by showing the decisions, experiments, and implementation lessons behind the work.

## Information architecture

| Area | Visitor question | Primary content |
| --- | --- | --- |
| Home | Who are you and what should I see first? | Short positioning, featured projects, recent notes |
| Work | What can you make or improve? | Outcome-led project case studies |
| Notes | How do you think and build? | Technical articles and build logs |
| About | How can I work with you? | Background, strengths, contact path |

Navigation stays intentionally small: `Work`, `Notes`, and `About`. Each project and post should link to the other where a meaningful relationship exists.

## Design direction

**Quietly technical editorial.** Warm off-white paper, charcoal text, a cobalt signal color, and one restrained mono accent create a site that feels personal without looking casual. The large type and generous spacing foreground ideas; thin rules and compact metadata make it easy to scan. It should feel like a well-kept engineering notebook paired with a considered case-study archive.

Accessibility baseline: visible focus states, semantic landmarks, high-contrast text, no information carried by color alone, and motion only as a small enhancement.

## Content model

### Project

Each project is a Markdown entry with: title, summary, date, role, client/context, tags, link, featured flag, and cover alt text. The narrative should use **Context → Constraint → Decisions → Result → Reflection**. A project earns a place in Work when it can demonstrate a meaningful contribution or learning.

### Note

Each post has: title, description, date, tags, draft flag, and optional related project slug. Use three repeatable formats:

1. **Build log** — what changed, why, and what is next.
2. **Technical note** — one decision, pattern, or debugging lesson.
3. **Retrospective** — outcome, trade-offs, and what would change next time.

Write the first paragraph as the takeaway, then use short sections, code or diagrams only when they clarify, and end with one reusable lesson.

## Operating cadence

After each substantive project milestone, capture a short note within 48 hours. Promote a project to featured only when its outcome, role, and story are all clear. This keeps the home page selective while Notes can remain an honest working archive.
