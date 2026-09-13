# Student Profile Application — Activity 4 (Multi-Page Cordova App)

**Developer:** Geraldine Galang
**Course:** Mobile Development  
**Repository:** `Galang_StudentProfile`

---

## 1. Project Description
This project is an extended multi-page hybrid mobile application built using HTML5, CSS3, and Apache Cordova. Expanded from the single-page layout in Activity 3, this application breaks down developer information into five dedicated screens with a consistent visual identity, accessible controls, and fully responsive layouts across mobile, tablet, and desktop screens.

---

## 2. Application Pages
* **Profile (`index.html`):** Homepage serving as the main entryway. Features profile picture, name, tagline, introductory bio, and primary CTAs.
* **About (`about.html`):** Detailed background covering personal biography, academic credentials at Xavier University - Ateneo de Cagayan, and long-term career goals.
* **Skills (`skills.html`):** Itemized breakdown of technical proficiencies categorized under Web Development, Systems & Programming, and Networking/Databases.
* **Projects (`projects.html`):** Portfolio showcase displaying case studies (Cafe Management System, VCMS, and Mobile Student Profile) with project descriptions, developer roles, and tech stacks.
* **Contact (`contact.html`):** Contact information, GitHub profile link, institutional email, and a structured contact form layout.

---

## 3. Navigation Implementation
Navigation is implemented strictly using pure HTML standard hyperlinks (`<a href="...">`) without JavaScript loading mechanisms:
* A sticky top navigation bar (`<nav class="navbar">`) is present on all 5 HTML pages.
* Direct relative links allow immediate movement between any screen (e.g., `Profile → About → Skills → Projects → Contact` and back).
* Visual feedback is provided by styling the `.active` class on the link corresponding to the current page.

---

## 4. Responsive Design
Responsiveness is retained from Activity 3 and applied globally across all 5 pages:
* **CSS Grid & Flexbox:** Page content automatically reflows based on available width.
* **Fluid Images:** Images use `width: 100%` and `object-fit: cover` to avoid stretching or overflow.
* **Mobile Viewports (`max-width: 768px`):** The navigation bar wraps cleanly, buttons stack vertically, and multi-column grids collapse into a single vertical column to eliminate horizontal scrolling.

---

## 5. UI/UX Principles Applied (Module 4)
* **Consistency:** Unified color palette (Maroon `#800020`, neutral gray backgrounds), identical header hierarchy, and matching card structures.
* **Visual Hierarchy:** Distinct headings (`h1`, `h2`), bolded sub-labels, and elevated background cards separate primary details from body text.
* **Accessibility:** High text contrast ratios, standard focus states, explicit `alt` tags on all images, and semantic HTML structure (`<main>`, `<nav>`, `<header>`, `<article>`).

---

## 6. How to Build & Run
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git](https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git)
   cd Galang_StudentProfile