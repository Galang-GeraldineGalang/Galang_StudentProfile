document.addEventListener('deviceready', initProfileApp, false);

document.addEventListener('DOMContentLoaded', () => {
    if (!window.cordova) {
        initProfileApp();
    }
});

function initProfileApp() {
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    const btnEdit = document.getElementById('btn-edit');
    const btnCancel = document.getElementById('btn-cancel');
    const formEdit = document.getElementById('form-edit-profile');

    const displayAvatar = document.getElementById('display-avatar');
    const avatarClickable = document.getElementById('avatar-clickable');
    const btnChangePhoto = document.getElementById('btn-change-photo');
    const cameraFileInput = document.getElementById('camera-file-input');

    const displayFullname = document.getElementById('display-fullname');
    const displayTagline = document.getElementById('display-tagline');
    const displayCourse = document.getElementById('display-course');
    const displayYear = document.getElementById('display-year');
    const displayAbout = document.getElementById('display-about');
    const displaySkills = document.getElementById('display-skills');

    const inputFullname = document.getElementById('input-fullname');
    const inputTagline = document.getElementById('input-tagline');
    const inputCourse = document.getElementById('input-course');
    const inputYear = document.getElementById('input-year');
    const inputAbout = document.getElementById('input-about');
    const inputSkills = document.getElementById('input-skills');

    
    const defaultProfileJSON = {
        avatar: "img/pfp.jpg",
        fullname: "Geraldine Galang",
        tagline: "Aspiring Web Developer & IT Student",
        course: "BS Information Technology",
        year: "3rd Year",
        about: "I am a 3rd year Information Technology student at Xavier University - Ateneo de Cagayan focusing on web technologies, coding, and cybersecurity. I am also a student-athlete.",
        skills: ["HTML", "CSS", "JavaScript", "Cybersecurity", "Git"]
    };

    
    function loadProfileFromJSON() {
        const storedJSON = localStorage.getItem('student_profile_data');
        const data = storedJSON ? JSON.parse(storedJSON) : defaultProfileJSON;

        if (displayAvatar && data.avatar) displayAvatar.src = data.avatar;
        if (displayFullname) displayFullname.textContent = data.fullname;
        if (displayTagline) displayTagline.textContent = data.tagline;
        if (displayCourse) displayCourse.textContent = data.course;
        if (displayYear) displayYear.textContent = data.year;
        if (displayAbout) displayAbout.textContent = data.about;

        if (displaySkills) {
            displaySkills.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim();
                li.style.cssText = 'display:inline-block; background:#800000; color:#fff; padding:4px 10px; margin:3px; border-radius:4px; font-size:0.85rem;';
                displaySkills.appendChild(li);
            });
        }
    }

   
    function triggerCamera() {
        if (window.navigator && window.navigator.camera && typeof Camera !== "undefined") {
            
            const cameraOptions = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL, // Returns Base64 String
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                correctOrientation: true,
                allowEdit: false
            };

            navigator.camera.getPicture(
                function(imageData) {
                    let imageSrc = imageData;
                    if (!imageData.startsWith("data:image") && !imageData.startsWith("file://") && !imageData.startsWith("content://")) {
                        imageSrc = "data:image/jpeg;base64," + imageData;
                    }
                    saveNewAvatar(imageSrc);
                },
                function(message) {
                    
                    if (message && (message.toLowerCase().includes("cancelled") || 
                                    message.toLowerCase().includes("canceled") || 
                                    message.toLowerCase().includes("no image selected"))) {
                        console.log("User cancelled camera operation.");
                        return;
                    }
                    alert("Unable to access the camera. Please check your device permissions.");
                },
                cameraOptions
            );
        } else if (cameraFileInput) {
          
            cameraFileInput.click();
        } else {
            alert("Unable to access the camera. Please check your device permissions.");
        }
    }

   
    if (cameraFileInput) {
        cameraFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    saveNewAvatar(evt.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function saveNewAvatar(imageSrc) {
        const storedJSON = localStorage.getItem('student_profile_data');
        const data = storedJSON ? JSON.parse(storedJSON) : defaultProfileJSON;
        
        data.avatar = imageSrc;
        localStorage.setItem('student_profile_data', JSON.stringify(data));
        
        if (displayAvatar) displayAvatar.src = imageSrc;
    }

    if (avatarClickable) avatarClickable.addEventListener('click', triggerCamera);
    if (btnChangePhoto) btnChangePhoto.addEventListener('click', triggerCamera);

    if (btnEdit) {
        btnEdit.addEventListener('click', () => {
            const storedJSON = localStorage.getItem('student_profile_data');
            const data = storedJSON ? JSON.parse(storedJSON) : defaultProfileJSON;

            if (inputFullname) inputFullname.value = data.fullname;
            if (inputTagline) inputTagline.value = data.tagline;
            if (inputCourse) inputCourse.value = data.course;
            if (inputYear) inputYear.value = data.year;
            if (inputAbout) inputAbout.value = data.about;
            if (inputSkills) inputSkills.value = data.skills.join(', ');

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
            const storedJSON = localStorage.getItem('student_profile_data');
            const currentData = storedJSON ? JSON.parse(storedJSON) : defaultProfileJSON;

            const updatedProfileJSON = {
                avatar: currentData.avatar,
                fullname: inputFullname.value.trim(),
                tagline: inputTagline.value.trim(),
                course: inputCourse.value.trim(),
                year: inputYear.value.trim(),
                about: inputAbout.value.trim(),
                skills: inputSkills.value.split(',').map(s => s.trim()).filter(s => s !== '')
            };

            localStorage.setItem('student_profile_data', JSON.stringify(updatedProfileJSON));
            loadProfileFromJSON();
            profileEdit.classList.add('hidden');
            profileView.classList.remove('hidden');
        });
    }

    // Initial Load
    loadProfileFromJSON();
}