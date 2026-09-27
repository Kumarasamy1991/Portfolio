# Kumarasamy B — Single-Page Portfolio

A premium, responsive single-page portfolio built with **plain HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step.

## Files
```
portfolio-single/
├── index.html      # all sections: Home, About, Skills, Experience, Projects, Contact
├── style.css       # design tokens, layout, animations, responsive rules
├── script.js       # loader, mobile menu, typing effect, scroll reveal, counters,
│                   # skill bars, project filtering, modal, form validation, back-to-top
├── assets/
│   ├── profile-placeholder.svg   # swap for a real headshot
│   └── resume.pdf                # starter resume — replace with your own
└── README.md
```

## How to run
**Option 1 — just open it:** double-click `index.html`.

**Option 2 — local server (recommended):**
```bash
python3 -m http.server 5500
# open http://localhost:5500
```
or `npx serve .` if you have Node.js installed.

## Notes
- Only external resources loaded are Google Fonts and the Font Awesome icon CDN (`cdnjs.cloudflare.com`) — everything else is self-contained.
- All navigation links are in-page anchors (`#home`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`) with smooth scrolling and active-link highlighting.
- **Resume**: replace `assets/resume.pdf` with your real resume, keeping the same filename (or update every `href="assets/resume.pdf"` in `index.html`).
- **Photo**: replace `assets/profile-placeholder.svg` with a real image and update the `src` on the hero `<img>`.
- **Contact form**: validates client-side only (no backend). To send real emails, wire it to a service like Formspree or EmailJS inside `script.js`'s `initContactForm()` function.
- Colors, fonts, spacing and shadows are all defined as CSS variables at the top of `style.css` under `:root`.
