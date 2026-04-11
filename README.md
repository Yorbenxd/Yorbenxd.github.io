# Yorben.github.io

Personal portfolio website — showcasing projects, skills, and experience.

## 📁 Folder Structure

```
Yorben.github.io/
├── index.html              ← Home / landing page
├── css/
│   └── style.css           ← All styles (dark theme, responsive)
├── js/
│   └── main.js             ← Navigation toggle, form validation, scroll-reveal
├── pages/
│   ├── about.html          ← About me & timeline
│   └── projects.html       ← Full projects showcase
└── assets/
    └── images/             ← Place your images here
```

## 🚀 Getting Started

No build step needed — open `index.html` directly in your browser, or serve the
folder with any static file server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## ✏️ Customising

| What to change | Where |
|---|---|
| Name & tagline | `index.html` hero section |
| Profile photo | Replace `.avatar-placeholder` div in `pages/about.html` with an `<img>` tag pointing to `assets/images/photo.jpg` |
| Skills | `index.html` and `pages/about.html` skill cards |
| Projects | `pages/projects.html` project cards |
| Colours / fonts | CSS variables at the top of `css/style.css` |
| Social links | Footer in each HTML file |

## 🌐 Deploying to GitHub Pages

Push to the `main` branch — GitHub Pages will serve `index.html` automatically
from the repository root.
