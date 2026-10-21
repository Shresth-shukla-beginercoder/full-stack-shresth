# Full-Stack Projects — Shresth

Learning projects from the Colt Steele Full Stack course. Each folder is one project, and the main ones are deployed live on Vercel.

## Live sites

| Site | URL |
|---|---|
| Project hub (static) | https://shresth-static.vercel.app |
| 5. Express + EJS (EJS.Learn) | https://shresth-express.vercel.app |
| 5b. Express Lab | https://shresth-express-lab.vercel.app |
| 8. React Basics | https://shresth-react.vercel.app |

Static examples (projects 1–4) are also served from the hub site:

- `https://shresth-static.vercel.app/1.HTML_CSS_LEARN/`
- `https://shresth-static.vercel.app/2.BOOTSTRAP_PRO/`
- `https://shresth-static.vercel.app/3.JAVASCRIPT/`
- `https://shresth-static.vercel.app/4.Node/Understand-Node.js/node.html`

## Table of contents

| # | Project | What it is |
|---|---|---|
| 1 | `1.HTML_CSS_LEARN` | Standalone HTML/CSS examples (forms, tables, media queries, selectors, box model…) |
| 2 | `2.BOOTSTRAP_PRO` | Bootstrap 4/5 practice pages and the ice-cream store project |
| 3 | `3.JAVASCRIPT` | Interactive JS examples — DOM, events, async APIs, OOP, games |
| 4 | `4.Node` | “Node.js — First Brush” study page (concepts + practice tests) |
| 5 | `5.Express_js` | Express + EJS apps: the EJS.Learn app (root) and the full Express Lab (`Undertanding_Ejs/express-lab`) |
| 6 | `6.RestFul_CRUD` | REST CRUD learning notes + example API |
| 7 | `7.CURD_SQL_PROJECT` | CRUD with PostgreSQL (`pg`). Needs a `.env` with DB credentials — private, not in git |
| 8 | `8.React` | React basics — every lesson demo on one page (Vite) |

## Running locally

- **Static projects (1–4):** open the HTML files directly, or `npx serve .`
- **Express apps (5):** `cd 5.Express_js && npm install && node index.js` · lab: `cd 5.Express_js/Undertanding_Ejs/express-lab && npm install && node app.js`
- **React (8):** `cd 8.React/React_basics && npm install && npm run dev`
- **Node study page (4):** static, open `node.html`

## Deployed with

GitHub (this repo) → Vercel. The Express apps run as Vercel serverless functions (`vercel.json` in each app folder).
