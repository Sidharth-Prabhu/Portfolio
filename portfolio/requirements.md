# Portfolio Website Specification

**Tech Stack:** React + Vite
**Styling:** TailwindCSS + Framer Motion
**Icons:** Lucide React
**Deployment:** Vercel / Netlify
**Theme Support:** Dark + Light Mode

---

# 1. Project Overview

Build a modern, interactive developer portfolio website using **React + Vite**.

The design should be:

* Minimal
* Professional
* Smooth animations
* Modern UI
* Fully responsive
* Dark and light theme support

Avoid cluttered layouts or template-like designs.

The website should highlight:

* About
* Expertise
* Education
* Projects
* Experience
* Achievements
* Contact

---

# 2. Design Principles

### Visual Style

* Clean modern UI
* Rounded components
* Soft shadows
* Glassmorphism accents (subtle)
* Smooth transitions

### Animations

Use **Framer Motion** for:

* Section reveal animations
* Hover effects
* Project card interactions
* Smooth scrolling

### Color System

Light Mode:

* Background: #f8fafc
* Primary: #2563eb
* Text: #0f172a

Dark Mode:

* Background: #0b0f19
* Primary: #3b82f6
* Text: #e2e8f0

Use Tailwind dark mode.

---

# 3. Website Structure

Pages:

Home (Landing)
About
Projects
Experience
Skills
Education
Achievements
Contact

Single-page scroll layout preferred.

Navbar links scroll to sections.

---

# 4. Navbar

Sticky navigation bar.

Features:

* Logo / Name
* Navigation links
* Theme toggle
* Mobile hamburger menu

Links:

Home
About
Projects
Skills
Education
Achievements
Contact

Navbar style:

* Blur background
* Transparent when at top
* Slight shadow when scrolling

---

# 5. Hero Section

The first section users see.

Content:

Name
Title
Short tagline
Two buttons

Example layout:

Left side:

* Name
* Title
* Tagline
* Buttons

Right side:

* Developer illustration
  OR
* Animated code block

Buttons:

Primary:
"View Projects"

Secondary:
"Download Resume"

Animations:

* Text fade-in
* Floating background shapes
* Typing effect for tagline

Example tagline:

"Building intelligent systems, scalable applications, and developer tools."

---

# 6. About Section

Short professional introduction.

Include:

Profile image
Short description
Quick highlights

Example highlights:

* Computer Science Student
* Machine Learning Enthusiast
* Systems Programming
* Full Stack Developer

Layout:

Two columns:

Left:
Profile image

Right:
About text + highlights

---

# 7. Skills / Expertise Section

Interactive skills display.

Categories:

Programming Languages
Frameworks
Tools
Technologies

Example:

Programming
Python
C
JavaScript
SQL

Frameworks
React
Flask
Node.js

Tools
Git
Docker
Linux

Technologies
Machine Learning
System Design
Operating Systems

UI options:

Option A:
Skill cards

Option B:
Skill progress bars

Option C:
Tech icon grid

Preferred: **Icon grid with hover animations**

---

# 8. Projects Section

Showcase projects with interactive cards.

Each card contains:

Project name
Short description
Tech stack
GitHub link
Live demo (optional)

Card hover effect:

* Slight scale
* Shadow
* Reveal buttons

Project data should come from a **JSON file**.

Example structure:

```
{
  "projects":[
    {
      "title":"ShOS",
      "description":"Custom hobby operating system",
      "tech":["C","Assembly"],
      "github":"link",
      "demo":"optional"
    }
  ]
}
```

Cards should animate into view when scrolling.

---

# 9. Experience Section

Timeline style layout.

Example format:

Company / Organization
Role
Duration
Description

Timeline should show progression vertically.

Use subtle animation when scrolling.

---

# 10. Education Section

Card or timeline layout.

Each entry includes:

Institution
Degree
Duration
Description

Example:

University Name
B.Tech Computer Science
2023 – Present

---

# 11. Achievements Section

Display:

* Certifications
* Awards
* Competitive programming stats
* Hackathon wins

Possible additions:

GitHub stats
LeetCode stats
GeeksforGeeks profile

Use cards or metric counters.

---

# 12. Contact Section

Include:

Email
GitHub
LinkedIn
Telegram (optional)

Add a simple contact form.

Fields:

Name
Email
Message

Submit button.

Form can use:

EmailJS
OR
Backend API.

---

# 13. Footer

Footer contains:

Name
Short tagline
Social icons
Copyright

Example:

© 2026 Sidharth Prabhu

---

# 14. Theme Toggle

Add dark/light theme switch.

Requirements:

* Persist theme in localStorage
* Smooth transition between themes
* Toggle icon changes

---

# 15. Responsiveness

Must support:

Desktop
Tablet
Mobile

Mobile adjustments:

* Navbar collapses to hamburger
* Grid layouts stack vertically
* Hero section adjusts spacing

---

# 16. Performance Optimizations

Use:

Lazy loading
Image optimization
Code splitting
Minimal dependencies

---

# 17. Folder Structure

```
src
 ├ components
 │  ├ Navbar
 │  ├ Hero
 │  ├ About
 │  ├ Skills
 │  ├ Projects
 │  ├ Experience
 │  ├ Education
 │  ├ Achievements
 │  ├ Contact
 │  └ Footer
 │
 ├ data
 │  ├ projects.json
 │  ├ skills.json
 │
 ├ pages
 │  └ Home.jsx
 │
 ├ hooks
 │  └ useTheme.js
 │
 ├ assets
 │  └ images
 │
 ├ App.jsx
 └ main.jsx
```

---

# 18. Extra Interactive Features

Optional but recommended:

Animated background gradient

Cursor glow effect

Project filtering by tech

Scroll progress bar

GitHub contribution heatmap

---

# 19. SEO

Add:

Meta tags
Open Graph tags
Structured data

---

# 20. Deployment

Deploy to:

Vercel
or
Netlify

Custom domain recommended.

---

# Final Goal

The portfolio must:

* Look modern
* Feel smooth and interactive
* Clearly showcase projects and expertise
* Work perfectly in dark and light themes
* Be professional and recruiter-friendly

Avoid clutter and unnecessary sections.
