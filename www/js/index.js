const SUPABASE_URL = 'https://rkgtnmadqwrpmbdqhttd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZ3RubWFkcXdycG1iZHFodHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0Njk3OTEsImV4cCI6MjEwNjA0NTc5MX0.60H3WjaBHlwmHfrZncDjMMcmC6YPyn_gsTJBkOD4e6U';

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const authSection = document.getElementById('auth-section');
const protectedMain = document.getElementById('protected-main');
const formLogin = document.getElementById('form-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const authError = document.getElementById('auth-error');
const btnLogout = document.getElementById('btn-logout');

const profileView = document.getElementById('profile-view');
const profileEdit = document.getElementById('profile-edit');
const btnEdit = document.getElementById('btn-edit');
const btnCancel = document.getElementById('btn-cancel');
const formEdit = document.getElementById('form-edit-profile');

const displayAvatar = document.getElementById('display-avatar');
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

const avatarClickable = document.getElementById('avatar-clickable');
const btnChangePhoto = document.getElementById('btn-change-photo');
const cameraFileInput = document.getElementById('camera-file-input');

const defaultProfile = {
    avatar: "img/pfp.jpg",
    fullname: "Geraldine Galang",
    tagline: "Aspiring Web Developer & IT Student",
    course: "BS Information Technology",
    year: "3rd Year",
    about: "I am a 3rd year Information Technology student at Xavier University - Ateneo de Cagayan focusing on web technologies, coding, and cybersecurity. I am also a student-athlete.",
    skills: ["HTML", "CSS", "JavaScript", "Cybersecurity", "Git"]
};


async function checkAuthSession() {
    if (!supabaseClient) return;

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        authSection.classList.add('d-none');
        protectedMain.classList.remove('d-none');
        btnLogout.classList.remove('d-none');
        loadProfileData();
    } else {
        authSection.classList.remove('d-none');
        protectedMain.classList.add('d-none');
        btnLogout.classList.add('d-none');
    }
}

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        authError.classList.add('d-none');
        authError.textContent = '';

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!supabaseClient) {
            authError.textContent = "Supabase client not initialized.";
            authError.classList.remove('d-none');
            return;
        }

const { data: { session } } = await supabaseClient.auth.getSession();

if (!session || !session.user) {
  alert('No active user session found. Please log in again.');
  return;
}

const profilePayload = {
  id: session.user.id, // KINAHANGLAN: Matches auth.users.id
  fullname: document.getElementById('edit-fullname').value,
  tagline: document.getElementById('edit-tagline').value,
  course: document.getElementById('edit-course').value,
  year_level: document.getElementById('edit-year').value,
  about: document.getElementById('edit-about').value,
  skills: document.getElementById('edit-skills').value
};

const { error } = await supabaseClient
  .from('profiles')
  .upsert(profilePayload);

if (error) {
  alert('Saved locally, but failed to sync to Supabase: ' + error.message);
} else {
  alert('Profile saved and synced with Supabase successfully!');

}
    });
}

// Handle Logout Action
if (btnLogout) {
    btnLogout.addEventListener('click', async (e) => {
        e.preventDefault();
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        checkAuthSession();
    });
}


function renderProfileUI(profile) {
    if (displayAvatar) displayAvatar.src = profile.avatar || defaultProfile.avatar;
    if (displayFullname) displayFullname.textContent = profile.fullname || defaultProfile.fullname;
    if (displayTagline) displayTagline.textContent = profile.tagline || defaultProfile.tagline;
    if (displayCourse) displayCourse.textContent = profile.course || defaultProfile.course;
    if (displayYear) displayYear.textContent = profile.year || defaultProfile.year;
    if (displayAbout) displayAbout.textContent = profile.about || defaultProfile.about;

    if (displaySkills) {
        displaySkills.innerHTML = '';
        const skillsArr = Array.isArray(profile.skills) 
            ? profile.skills 
            : (typeof profile.skills === 'string' ? profile.skills.split(',') : defaultProfile.skills);

        skillsArr.forEach(skill => {
            if (!skill.trim()) return;
            const li = document.createElement('li');
            li.textContent = skill.trim();
            li.style.cssText = 'display:inline-block; background:#800000; color:#fff; padding:4px 10px; margin:3px; border-radius:4px; font-size:0.85rem;';
            displaySkills.appendChild(li);
        });
    }
}

function populateForm(profile) {
    if (inputFullname) inputFullname.value = profile.fullname || '';
    if (inputTagline) inputTagline.value = profile.tagline || '';
    if (inputCourse) inputCourse.value = profile.course || '';
    if (inputYear) inputYear.value = profile.year || '';
    if (inputAbout) inputAbout.value = profile.about || '';
    if (inputSkills) {
        inputSkills.value = Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || '';
    }
}

async function loadProfileData() {
    let localData = null;
    try {
        const stored = localStorage.getItem('student_profile_data');
        if (stored) localData = JSON.parse(stored);
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }

    if (!supabaseClient) {
        renderProfileUI(localData || defaultProfile);
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .limit(1)
            .maybeSingle();

        if (data && !error) {
            const mappedProfile = {
                avatar: localData?.avatar || defaultProfile.avatar,
                fullname: data.fullname || defaultProfile.fullname,
                tagline: localData?.tagline || defaultProfile.tagline,
                course: data.course || defaultProfile.course,
                year: data.year_level || defaultProfile.year,
                about: localData?.about || defaultProfile.about,
                skills: localData?.skills || defaultProfile.skills
            };

            renderProfileUI(mappedProfile);
            localStorage.setItem('student_profile_data', JSON.stringify(mappedProfile));
        } else {
            renderProfileUI(localData || defaultProfile);
        }
    } catch (err) {
        console.error('Error loading profile:', err);
        renderProfileUI(localData || defaultProfile);
    }
}

async function saveProfile(updatedProfile) {
    renderProfileUI(updatedProfile);
    localStorage.setItem('student_profile_data', JSON.stringify(updatedProfile));

    if (!supabaseClient) return;

    try {
        const { data: existingData } = await supabaseClient
            .from('profiles')
            .select('*')
            .limit(1)
            .maybeSingle();

        const payload = {
            fullname: updatedProfile.fullname,
            course: updatedProfile.course,
            year_level: updatedProfile.year
        };

        let resultError = null;

        if (existingData) {
            const primaryKey = existingData.id ? 'id' : (existingData.student_id ? 'student_id' : null);
            const primaryVal = existingData.id || existingData.student_id;

            if (primaryKey && primaryVal) {
                const { error } = await supabaseClient
                    .from('profiles')
                    .update(payload)
                    .eq(primaryKey, primaryVal);
                resultError = error;
            } else {
                const { error } = await supabaseClient.from('profiles').upsert(payload);
                resultError = error;
            }
        } else {
            const { error } = await supabaseClient.from('profiles').insert([payload]);
            resultError = error;
        }

        if (resultError) {
            alert('Saved locally, but failed to sync to Supabase: ' + resultError.message);
        } else {
            alert('Profile saved and synced with Supabase successfully!');
        }
    } catch (err) {
        console.error('Unexpected error during save:', err);
    }
}


function triggerPhotoChange() {
    if (cameraFileInput) cameraFileInput.click();
}

if (avatarClickable) avatarClickable.addEventListener('click', triggerPhotoChange);
if (btnChangePhoto) btnChangePhoto.addEventListener('click', triggerPhotoChange);

if (cameraFileInput) {
    cameraFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newAvatarUrl = event.target.result;
                const storedJSON = localStorage.getItem('student_profile_data');
                const data = storedJSON ? JSON.parse(storedJSON) : { ...defaultProfile };
                data.avatar = newAvatarUrl;
                
                renderProfileUI(data);
                localStorage.setItem('student_profile_data', JSON.stringify(data));
            };
            reader.readAsDataURL(file);
        }
    });
}

if (btnEdit) {
    btnEdit.addEventListener('click', () => {
        const storedJSON = localStorage.getItem('student_profile_data');
        const currentData = storedJSON ? JSON.parse(storedJSON) : defaultProfile;
        populateForm(currentData);

        profileView.classList.add('d-none');
        profileEdit.classList.remove('d-none');
    });
}

if (btnCancel) {
    btnCancel.addEventListener('click', () => {
        profileEdit.classList.add('d-none');
        profileView.classList.remove('d-none');
    });
}

if (formEdit) {
    formEdit.addEventListener('submit', async (e) => {
        e.preventDefault();

        const storedJSON = localStorage.getItem('student_profile_data');
        const currentData = storedJSON ? JSON.parse(storedJSON) : defaultProfile;

        const updatedData = {
            avatar: currentData.avatar || defaultProfile.avatar,
            fullname: inputFullname.value.trim(),
            tagline: inputTagline.value.trim(),
            course: inputCourse.value.trim(),
            year: inputYear.value.trim(),
            about: inputAbout.value.trim(),
            skills: inputSkills.value.split(',').map(s => s.trim()).filter(s => s !== '')
        };

        await saveProfile(updatedData);

        profileEdit.classList.add('d-none');
        profileView.classList.remove('d-none');
    });
}

document.addEventListener('DOMContentLoaded', checkAuthSession);