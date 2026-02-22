# 🌟 CAN / CAN'T — Interactive English Learning Site

An interactive English learning website for children aged 8–12, covering **CAN / CAN'T** at the A1–A2 level. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no backend required.

## 📖 Description

This site teaches students how to use **CAN** and **CAN'T** through:
- Clear grammar explanations (with Spanish support notes)
- 50+ interactive exercises (fill-in-the-blank, multiple choice, matching, unscramble, image-based, true/false, writing)
- 4 mini-games
- A final quiz (single attempt per device)
- Student progress tracked in localStorage
- Teacher Mode for managing resets and viewing answers

## 🗂️ Project Structure

```
can-cant-site/
├── index.html          # Main HTML file (single-page app)
├── styles.css          # All styles
├── app.js              # All JavaScript logic
├── assets/
│   ├── playground.svg  # Playground scene
│   ├── classroom.svg   # Classroom scene
│   ├── zoo.svg         # Zoo/Animals scene
│   └── home.svg        # Home/chores scene
└── README.md
```

## 🚀 Running Locally

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. No build step or server needed — it just works!

```bash
git clone https://github.com/YOUR_USERNAME/can-cant-site.git
cd can-cant-site
# Open index.html in your browser (double-click or use a local server)
```

To use a simple local server (optional, for best experience):
```bash
npx serve .
# or
python3 -m http.server 8080
```

## 🌐 Deploying with GitHub Pages

1. Push the repository to GitHub
2. Go to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/can-cant-site/`

## 👩‍🏫 Teacher Mode

- Click the 🔐 icon in the navigation bar
- Enter password: `TEACHER123`
- Teacher Mode allows:
  - Show/hide correct answers in exercises
  - Reset the final quiz lock
  - Reset student name

## ♿ Accessibility

- All SVG elements have `role` and `aria-label`
- Keyboard navigable
- High contrast text
- Visible focus indicators

## 📚 Content Coverage

- CAN for ability, permission, and possibility
- Affirmative, negative, and interrogative structures
- Short answers table
- Key grammar rules (no -s with he/she/it, base verb only)
- Common errors section
- Visual glossary of 30+ A1–A2 verbs
- Mini-scenarios in context

## 🛠️ Technologies

- HTML5, CSS3, Vanilla JavaScript
- localStorage for persistence
- Embedded SVG illustrations
- No external dependencies except Google Fonts (loaded via CDN)

---

*Created for EFL/ESL primary classrooms. Supports English instruction with minimal Spanish clarifications.*
