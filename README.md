# Student Profile Cordova Application

A hybrid mobile application built using **Apache Cordova**, **HTML5**, **CSS3**, and **vanilla JavaScript**. This application displays student profile information and allows dynamic profile editing with client-side validation and persistent storage using `localStorage`.

---

## 1. Project Description
The **Student Profile Application** serves as a digital portfolio for students to display their academic details, personal background, technical skill sets, completed projects, and contact channels. Developed as part of academic coursework, the app emphasizes modular structure, dynamic DOM manipulation using JavaScript, client-side data persistence, and mobile responsiveness.

---

## 2. Application Pages & Sections
The application consists of five main interactive pages/sections:

* **Profile:** Displays core identity information including Full Name, Course, Year Level, profile photo, and an action button to toggle the Edit Profile interface.
* **About:** Contains a detailed personal description, background, academic goals, and hobbies.
* **Skills:** Showcases technical and soft skills rendered dynamically from stored profile data.
* **Projects:** Features previous technical projects, case studies, and application highlights with descriptions and links.
* **Contact:** Provides communication channels such as institutional email, social media links, location, and a contact form interface.

---

## 3. Profile Editing
The **Edit Profile** feature allows users to dynamically update their profile details without modifying source code.

* **Editable Fields:**
  * Full Name
  * Course / Academic Program
  * Year Level
  * About Me Description
  * Skills List (entered as comma-separated values)

When the user selects **Edit Profile**, the application toggles from the display interface to an interactive editing form pre-filled with the current profile data.

---

## 4. JavaScript Functionality
JavaScript drives all dynamic operations in the app:

* **Form Handling:** Captures input events, prevents default browser page reloads upon submission, and extracts field values.
* **Validation:** Enforces input constraints before saving data. Ensures required fields (Full Name, Course, Year Level, About Me) are non-empty and alerts the user if any required data is missing.
* **Profile Updates:** Reads verified inputs, updates the internal profile state object, and immediately re-renders DOM elements in the View section.
* **Save Functionality:** Validates inputs, saves the updated payload to `localStorage`, renders the refreshed UI, and exits Edit Mode.
* **Cancel Functionality:** Discards uncommitted changes, re-populates the form with the last saved state, and closes the Edit Mode without modifying existing data.

---

## 5. Local Data Storage
The application utilizes the browser/WebView **`localStorage` API** to ensure data persistence:

* **Data Format:** Profile data is stored as a serialized JSON string under the key `'studentProfile'`.
* **Startup Retrieval:** When the Cordova app launches, JavaScript retrieves and parses `'studentProfile'`.
* **Default Fallback:** If no data exists in `localStorage` (e.g., first-time app launch), the application initializes and saves default profile information automatically.
* **Persistence:** Changes persist even after closing and reopening the application.

---

## 6. Responsive Design
The application employs flexible CSS layouts to deliver a uniform user experience across various screen sizes:

* **Desktop:** Utilizes multi-column grid layouts, wider form containers, and enhanced spacing.
* **Tablet:** Adapts navigation menus and side-by-side elements into flexible stacked grid items.
* **Mobile (Cordova Target):** Uses single-column flexbox layouts, touch-friendly touch targets/buttons, fluid media queries, and responsive viewport settings.

---

## 7. How to Run
Follow these steps to set up, build, and run the Apache Cordova application locally:

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* [Apache Cordova CLI](https://cordova.apache.org/) installed globally (`npm install -g cordova`)
* Android Studio (for Android build/emulator)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/YourUsername/Cailing_StudentProfile.git](https://github.com/YourUsername/Cailing_StudentProfile.git)
   cd Cailing_StudentProfile