function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
    section.style.animation = 'none'; // Reset animation to allow replay
  });

  // Remove active class from all nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  // Show the selected section
  const section = document.getElementById(sectionId);
  section.classList.add('active');

  // Add active class to the clicked nav link
  const navLink = document.querySelector(`.nav-links a[onclick="showSection('${sectionId}')"]`);
  navLink.classList.add('active');

  // Scroll to the section smoothly
  section.scrollIntoView({ behavior: 'smooth' });
}

// Form Validation for Register Section
const form = document.getElementById('contactForm');

const fields = {
  name: {
    element: document.getElementById('name'),
    validate: value => value.trim().length >= 6,
    error: 'Name must be at least 6 characters long.',
  },
  email: {
    element: document.getElementById('email'),
    validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    error: 'Enter a valid email address (e.g., abc@gmail.com).',
  },
  college: {
    element: document.getElementById('college'),
    validate: value => value.trim() !== '',
    error: 'College name is required.',
  },
  branch: {
    element: document.getElementById('branch'),
    validate: value => value.trim() !== '',
    error: 'Branch is required.',
  },
  year: {
    element: document.getElementById('year'),
    validate: value => value !== '',
    error: 'Please select your current year.',
  },
  course: {
    element: document.getElementById('course'),
    validate: value => value !== '',
    error: 'Please select a course.',
  }
};

// Show or remove error messages
function showError(input, message) {
  removeError(input);
  input.classList.add('error');
  const errorMsg = document.createElement('div');
  errorMsg.className = 'error-message';
  errorMsg.textContent = message;
  input.parentElement.insertBefore(errorMsg, input.nextSibling);
}

function removeError(input) {
  input.classList.remove('error');
  const next = input.nextElementSibling;
  if (next && next.classList.contains('error-message')) {
    next.remove();
  }
}

// Add real-time validation
Object.values(fields).forEach(field => {
  const el = field.element;
  el.addEventListener('input', () => {
    if (field.validate(el.value)) {
      removeError(el);
    }
  });

  el.addEventListener('blur', () => {
    if (!field.validate(el.value)) {
      showError(el, field.error);
    } else {
      removeError(el);
    }
  });
});

// Final form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let hasError = false;

  Object.values(fields).forEach(field => {
    const el = field.element;
    if (!field.validate(el.value)) {
      showError(el, field.error);
      hasError = true;
    } else {
      removeError(el);
    }
  });

  if (!hasError) {
    alert("You've been successfully registered");
    form.reset();
  }
});

// To-Do List Functionality
const taskInput = document.getElementById('taskInput');
const taskError = document.getElementById('taskError');
const taskList = document.getElementById('taskList');

function showTaskError(message) {
  taskInput.classList.add('error');
  taskError.textContent = message;
}

function removeTaskError() {
  taskInput.classList.remove('error');
  taskError.textContent = '';
}

function addTask() {
  const taskText = taskInput.value.trim();

  // Validation: Prevent adding empty tasks
  if (taskText === '') {
    showTaskError('Please enter a task.');
    return;
  }

  removeTaskError();

  // Create a new list item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Create a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = function () {
    li.remove();
  };

  // Append the delete button to the list item
  li.appendChild(deleteBtn);

  // Append the list item to the task list
  taskList.appendChild(li);

  // Clear the input field
  taskInput.value = '';
}

// Real-time validation for task input
taskInput.addEventListener('input', () => {
  if (taskInput.value.trim() !== '') {
    removeTaskError();
  }
});

// Allow adding tasks by pressing Enter
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Show the register section by default on page load
document.addEventListener('DOMContentLoaded', () => {
  showSection('register');
});