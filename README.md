# Student Profile Application with Supabase Authentication & Database

## 1. Project Description
The **Student Profile Application** is a hybrid mobile application built with **Apache Cordova**, **HTML5**, **CSS3**, and **JavaScript**. Originally designed as a static client-side application, it has now evolved into a secure, database-driven mobile app integrated with **Supabase Auth** and **Supabase Database (PostgreSQL)**. 

The application allows students to securely log in, view their personalized profile details, update their academic and personal information, change their profile picture, and navigate across protected application pages.

---

## 2. Application Pages

The application consists of the following primary sections and functionality:

* **Login Functionality:** Serves as the authentication gateway. Unauthenticated users are strictly locked out of protected features and redirected to the login form.
* **Profile (`index.html`):** The primary hub of the authenticated user. Displays the student's avatar, full name, tagline, course, year level, bio, and key skills. Also contains the edit modal/form and photo change triggers.
* **About (`about.html`):** Displays detailed background information about the student, academic focus, and university affiliation.
* **Skills (`skills.html`):** Showcases a categorized breakdown of technical, soft, and domain-specific skills.
* **Projects (`projects.html`):** Highlights featured academic, personal, and coding projects completed by the student.
* **Contact (`contact.html`):** Provides contact details and social links to connect with the student.

---

## 3. Authentication

User authentication is powered by **Supabase Auth** using Email and Password credentials.

### Authentication Flow:
[ Unauthenticated User ]
│
▼
┌───────────┐
│ Login Page│ ──(Enters Email & Password)──► [ Supabase Auth ]
└───────────┘                                       │
│                                      Valid Credentials?
│                                             │
├── NO ──► Display Error Message ◄────────────┤
│                                             │
└── YES ──────────────────────────────────────┘
│
▼
[ Granted Access: Student Profile & Navigation ]


1. **Unauthenticated Check:** When the app opens, `checkAuthSession()` checks for an active Supabase session. If no session exists, secondary pages automatically redirect back to `index.html`, and `index.html` renders only the login form.
2. **Authentication:** The user submits their email and password via `supabaseClient.auth.signInWithPassword()`.
3. **Session Granted:** Upon successful validation, the login interface hides, the protected main layout unhides, and a session token is stored.

---

## 4. Student Profile Management

An authenticated student has full management capabilities over their profile:

* **View Profile:** Retrieves live profile data from Supabase and renders the student's information dynamically.
* **Edit Information:** Clicking the **Edit Profile** button displays an interactive form populated with current details.
* **Save Changes:** Submitting the form updates the record in both the remote Supabase PostgreSQL database and the device's local fallback storage (`localStorage`).
* **Update Profile Picture:** Tapping the profile picture or clicking **Change Profile Picture** opens the device photo/file selector, rendering a live image preview and updating local/remote references.
* **Log Out:** Clicking the **Logout** button in the navigation bar ends the Supabase session (`supabaseClient.auth.signOut()`) and locks all protected routes.

---

## 5. Database Integration

The application utilizes **Supabase Database (PostgreSQL)** as its backend data store.

### Stored Student Profile Schema (`profiles` table):
* `id`: Primary key (UUID matching `auth.users.id`)
* `fullname`: Student's full name (Text)
* `course`: Degree program (Text)
* `year_level`: Academic year level (Text)
* `tagline`: Short intro/catchphrase (Text)
* `about`: Full bio description (Text)
* `skills`: Comma-separated list of technical skills (Text)
* `avatar`: Profile image source reference or Base64/URL string (Text)

---

## 6. API / Backend Architecture

The Cordova mobile application communicates asynchronously with Supabase via HTTP/REST endpoints handled by the official `@supabase/supabase-js` client SDK.

### Architecture Diagram:
┌─────────────────────────┐        HTTPS / REST        ┌─────────────────────────┐        SQL        ┌─────────────────────────┐
│   Cordova Mobile App    │  ───────────────────────►  │   Supabase API / Auth   │  ─────────────► │   PostgreSQL Database   │
│ (HTML / CSS / JS / SDK) │  ◄───────────────────────  │ (GoTrue / PostgREST API)│  ◄───────────── │   (Profiles Table)      │
└─────────────────────────┘                            └─────────────────────────┘                 └─────────────────────────┘


---

## 7. CRUD Operations

The application performs full CRUD operations on the `profiles` table:

* **Create:** Automatically inserts a default student profile record into the database during initial registration or setup using `supabase.from('profiles').insert()`.
* **Read:** Fetches student details using `supabase.from('profiles').select('*')` upon loading the profile view.
* **Update:** Updates existing field values using `supabase.from('profiles').upsert(payload)` when saving profile edits.
* **Delete:** Supports profile resetting or record removal via `supabase.from('profiles').delete()` or dashboard user administration.

---

## 8. Camera Integration

The camera functionality established in Activity 6 is retained:
* Tapping the profile picture triggers the file/camera interface (`<input type="file" accept="image/*">` or Cordova Camera Plugin).
* Selected images are processed using the `FileReader` API into standard Data URLs.
* The new image immediately updates the DOM `#display-avatar` element and persists across profile updates.

---

## 9. Data Persistence

Profile information remains completely persistent across app lifecycles:
* **Closing / Restarting the App:** Active session tokens and cached profile data stored in `localStorage` ensure details reload instantly without data loss.
* **Logging Out & In Again:** When logging back in, the app executes a fresh `SELECT` query against Supabase to pull and render the latest persisted database record.

---

## 10. Responsive Design

The application uses flexible CSS layouts (Flexbox and Grid) along with mobile-first media queries to ensure seamless responsiveness across device viewports:
* **Desktop:** Wide container layout with dual-column profile cards and inline navigation links.
* **Tablet:** Auto-adjusting padding, scaled font sizes, and flexible card layouts.
* **Mobile:** Single-column stacked cards, full-width form inputs, and touch-friendly buttons.

---

## 11. Security

Security best practices implemented in this project include:
* **Password Hashing:** Passwords are never stored in plain text; Supabase Auth automatically hashes credentials using **bcrypt**.
* **Protected Routes:** JavaScript session checks prevent unauthenticated users from viewing or inspecting secondary HTML pages.
* **Row Level Security (RLS):** Supabase RLS policies are configured on the database to govern row-level access permissions.
* **Environment Credential Safety:** Real production secrets and administrative keys are kept out of public repositories.

---

## 12. How to Run

### Prerequisites:
* **Node.js** & **npm** installed.
* **Apache Cordova CLI** (`npm install -g cordova`).
* A modern browser or Android Emulator/Device.

### Steps:
1. Clone the repository:
   ```bash
   git clone [https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git](https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git)
   cd Galang_StudentProfile