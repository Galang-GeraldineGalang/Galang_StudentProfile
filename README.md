# Student Profile Cordova Application

A hybrid mobile application built using **Apache Cordova**, **HTML5**, **CSS3**, and **vanilla JavaScript**. This application displays student profile information, allows dynamic profile editing with local storage persistence, and integrates native device hardware to capture and save profile pictures using the Cordova Camera Plugin.

---

## 1. Project Description
The Student Profile application is a multi-page portfolio mobile app designed for **Geraldine Galang**, a 3rd-year BS Information Technology student at Xavier University - Ateneo de Cagayan. The app showcases academic background, technical skills, projects, and contact details while incorporating interactive features like live JSON editing and native device camera integration.

---

## 2. Application Pages
* **Profile (`index.html`)**: Serves as the landing page displaying core profile details, skills tags, interactive profile picture camera capture, and dynamic edit profile capabilities.
* **About (`about.html`)**: Details personal background, including structured Senior High School (SHS) and College educational histories with card-styled UI layouts.
* **Skills (`skills.html`)**: Highlights technical competencies categorized into Web Development, Programming Languages, and Core IT Tools.
* **Projects (`projects.html`)**: Showcases featured academic and personal IT projects using responsive card containers.
* **Contact (`contact.html`)**: Contains an interactive contact form and direct personal communication channels.

---

## 3. Profile Editing
The **Edit Profile** feature allows users to modify profile details such as Full Name, Tagline, Course, Year Level, Brief Description, and Key Skills in real-time. 
* Data entered into the edit form is validated and saved as a JSON object into browser/device `localStorage` (`student_profile_data`).
* When the app reopens, it parses the stored JSON string to maintain persistent profile information across sessions.

---

## 4. Camera Integration
The application integrates the native device camera using the `cordova-plugin-camera` plugin.
* **Workflow**:
  `[Tap Profile Picture / Click Change Profile Picture]` ➔ `[Device Camera Opens]` ➔ `[Capture Image]` ➔ `[Update Profile Picture & Save to LocalStorage]`

---

## 5. Device Feature Integration
Apache Cordova provides a native bridge API between JavaScript and the underlying mobile OS (Android/iOS). Standard web applications running in a browser cannot directly access native camera hardware due to security and sandbox restrictions. Cordova's `navigator.camera` API bridges this gap, allowing JavaScript code to trigger native camera hardware activities and retrieve captured image data.

---

## 6. Image Handling
* Upon taking a photo, the camera plugin encodes the captured image into a **Base64 `DATA_URL` string**.
* The application updates the `src` attribute of the `#display-avatar` image element immediately.
* The Base64 image string is saved into the `student_profile_data` JSON object inside `localStorage`, ensuring the new profile picture persists even after closing or restarting the application.

---

## 7. Error Handling
* **Camera Cancellation**: If the user opens the camera and cancels without taking a picture, the application catches the event gracefully, preserves the existing profile picture, and returns to the profile screen without crashing.
* **Permission Denial / Access Errors**: If camera permissions are denied or hardware is unavailable, an alert message (`Unable to access the camera. Please check your device permissions.`) informs the user without terminating the app.

---

## 8. Responsive Design
The app utilizes CSS Flexbox, Grid, relative units, and media queries to ensure smooth layout adaptations across:
* **Desktop Monitors**: Wide multi-column card views and top navbar layout.
* **Tablets**: Adjusted grid gap spacing and fluid container paddings.
* **Mobile Devices**: Stacked single-column card elements and touch-optimized action buttons.

---

## 9. How to Run

### Prerequisites
* Node.js & npm installed
* Apache Cordova CLI installed (`npm install -g cordova`)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone [https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git](https://github.com/Galang-GeraldineGalang/Galang_StudentProfile.git)
   cd Galang_StudentProfile