document.addEventListener('deviceready', onDeviceReady, false);


document.addEventListener('DOMContentLoaded', () => {
  if (!window.cordova) {
    onDeviceReady();
  }
});

const DEFAULT_PROFILE = {
  fullName: 'Geraldine Galang',
  course: 'BS Information Technology',
  yearLevel: '3rd Year',
  about: 'Student at Xavier University - Ateneo de Cagayan with a focus on web technologies, coding, and networking.',
  skills: ['JavaScript', 'HTML/CSS', 'Python', 'Git']
};

function onDeviceReady() {
  
  loadProfile();

  
  const btnEdit = document.getElementById('btn-edit');
  const btnCancel = document.getElementById('btn-cancel');
  const formEdit = document.getElementById('form-edit-profile');

  if (btnEdit) btnEdit.addEventListener('click', openEditView);
  if (btnCancel) btnCancel.addEventListener('click', cancelEdit);
  if (formEdit) formEdit.addEventListener('submit', saveProfile);
}


function loadProfile() {
  const savedData = localStorage.getItem('studentProfile');
  let profileData;

  if (savedData) {
    profileData = JSON.parse(savedData);
  } else {
    profileData = DEFAULT_PROFILE;
    localStorage.setItem('studentProfile', JSON.stringify(DEFAULT_PROFILE));
  }

  updateProfileUI(profileData);
}

function updateProfileUI(data) {
  document.getElementById('display-fullname').textContent = data.fullName;
  document.getElementById('display-course').textContent = data.course;
  document.getElementById('display-year').textContent = data.yearLevel;
  document.getElementById('display-about').textContent = data.about;

  const skillsList = document.getElementById('display-skills');
  skillsList.innerHTML = '';

  if (data.skills && data.skills.length > 0) {
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  } else {
    skillsList.innerHTML = '<li>No skills listed.</li>';
  }
}


function openEditView() {
  populateFormFromStorage();
  toggleEditMode(true);
}

function populateFormFromStorage() {
  const savedData = localStorage.getItem('studentProfile');
  const data = savedData ? JSON.parse(savedData) : DEFAULT_PROFILE;

  document.getElementById('input-fullname').value = data.fullName || '';
  document.getElementById('input-course').value = data.course || '';
  document.getElementById('input-year').value = data.yearLevel || '';
  document.getElementById('input-about').value = data.about || '';
  document.getElementById('input-skills').value = data.skills ? data.skills.join(', ') : '';
}


function validateInputs(fullName, course, yearLevel, about) {
  if (!fullName) {
    alert("Please enter your full name.");
    return false;
  }
  if (!course) {
    alert("Please enter your course.");
    return false;
  }
  if (!yearLevel) {
    alert("Please enter your year level.");
    return false;
  }
  if (!about) {
    alert("Please complete your About Me section.");
    return false;
  }
  return true;
}


function saveProfile(event) {
  event.preventDefault();

  const fullName = document.getElementById('input-fullname').value.trim();
  const course = document.getElementById('input-course').value.trim();
  const yearLevel = document.getElementById('input-year').value.trim();
  const about = document.getElementById('input-about').value.trim();
  const skillsInput = document.getElementById('input-skills').value.trim();

  if (!validateInputs(fullName, course, yearLevel, about)) {
    return;
  }

  const skillsArray = skillsInput
    ? skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0)
    : [];

  const updatedProfile = {
    fullName,
    course,
    yearLevel,
    about,
    skills: skillsArray
  };

  localStorage.setItem('studentProfile', JSON.stringify(updatedProfile));
  updateProfileUI(updatedProfile);
  toggleEditMode(false);
}


function cancelEdit() {
  toggleEditMode(false);
}


function toggleEditMode(isEditing) {
  const viewContainer = document.getElementById('profile-view');
  const editContainer = document.getElementById('profile-edit');

  if (isEditing) {
    viewContainer.classList.add('hidden');
    editContainer.classList.remove('hidden');
  } else {
    viewContainer.classList.remove('hidden');
    editContainer.classList.add('hidden');
  }
}