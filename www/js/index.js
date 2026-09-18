document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    initProfileApp();
}

// Fallback for browser testing
document.addEventListener('DOMContentLoaded', () => {
    if (!window.cordova) {
        initProfileApp();
    }
});

function initProfileApp() {
    // DOM Elements - View Mode
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    const btnEdit = document.getElementById('btn-edit');
    const btnCancel = document.getElementById('btn-cancel');
    const formEdit = document.getElementById('form-edit-profile');

    // Display Elements
    const displayAvatar = document.getElementById('display-avatar');
    const displayFullname = document.getElementById('display-fullname');
    const displayTagline = document.getElementById('display-tagline');
    const displayCourse = document.getElementById('display-course');
    const displayYear = document.getElementById('display-year');
    const displayAbout = document.getElementById('display-about');
    const displaySkills = document.getElementById('display-skills');

    // Input Elements
    const inputFullname = document.getElementById('input-fullname');
    const inputTagline = document.getElementById('input-tagline');
    const inputCourse = document.getElementById('input-course');
    const inputYear = document.getElementById('input-year');
    const inputAbout = document.getElementById('input-about');
    const inputSkills = document.getElementById('input-skills');

    // Default Profile Data
    const defaultData = {
        avatar: 'img/pfp.jpg',
        fullname: 'Geraldine Galang',
        tagline: 'Aspiring Web Developer & IT Student',
        course: 'BS Information Technology',
        year: '3rd Year',
        about: 'I am a 3rd year Information Technology student at Xavier University - Ateneo de Cagayan focusing on web technologies, coding, and cybersecurity. I am also a student-athlete.',
        skills: ['HTML/CSS', 'JavaScript', 'Java', 'MySQL', 'Git']
    };

    // Load Profile Data from localStorage or Defaults
    function loadProfile() {
        const storedData = localStorage.getItem('user_profile');
        const data = storedData ? JSON.parse(storedData) : defaultData;

        if (displayAvatar) displayAvatar.src = data.avatar;
        if (displayFullname) displayFullname.textContent = data.fullname;
        if (displayTagline) displayTagline.textContent = data.tagline;
        if (displayCourse) displayCourse.textContent = data.course;
        if (displayYear) displayYear.textContent = data.year;
        if (displayAbout) displayAbout.textContent = data.about;

        // Render Skills
        if (displaySkills) {
            displaySkills.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim();
                displaySkills.appendChild(li);
            });
        }
    }

    // Populate Form Inputs for Editing
    function populateForm() {
        const storedData = localStorage.getItem('user_profile');
        const data = storedData ? JSON.parse(storedData) : defaultData;

        if (inputFullname) inputFullname.value = data.fullname;
        if (inputTagline) inputTagline.value = data.tagline;
        if (inputCourse) inputCourse.value = data.course;
        if (inputYear) inputYear.value = data.year;
        if (inputAbout) inputAbout.value = data.about;
        if (inputSkills) inputSkills.value = data.skills.join(', ');
    }

    // Event Listeners
    if (btnEdit) {
        btnEdit.addEventListener('click', () => {
            populateForm();
            profileView.classList.add('hidden');
            profileEdit.classList.remove('hidden');
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            profileEdit.classList.add('hidden');
            profileView.classList.remove('hidden');
        });
    }

    if (formEdit) {
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedData = {
                avatar: defaultData.avatar, // Keeps current PFP path
                fullname: inputFullname.value.trim(),
                tagline: inputTagline.value.trim(),
                course: inputCourse.value.trim(),
                year: inputYear.value.trim(),
                about: inputAbout.value.trim(),
                skills: inputSkills.value.split(',').filter(s => s.trim() !== '')
            };

            // Save to LocalStorage
            localStorage.setItem('user_profile', JSON.stringify(updatedData));

            // Reload UI & Switch back to View Mode
            loadProfile();
            profileEdit.classList.add('hidden');
            profileView.classList.remove('hidden');
            alert('Profile updated successfully!');
        });
    }

    // Initial Load
    loadProfile();
}