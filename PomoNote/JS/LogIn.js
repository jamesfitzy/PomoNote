document.addEventListener("DOMContentLoaded", function () {
  const showLoginButton = document.getElementById("show-login");
  const popup = document.querySelector(".popup");
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const loginForm = document.querySelector('.popup .login-form');
  const passwordResetForm = document.querySelector('.popup .password-reset-form');
  const signUpLink = document.getElementById("sign-up-link");
  const signUpForm = document.querySelector('.popup .signup-form');
  const backButtons = document.querySelectorAll('.popup .back-btn'); // Select back buttons

  function hideAllForms() {
    loginForm.style.display = 'none';
    passwordResetForm.style.display = 'none';
    signUpForm.style.display = 'none';
  }

  function showLoginForm() {
    hideAllForms();
    loginForm.style.display = 'block';
  }

  function showSignUpForm() {
    hideAllForms();
    signUpForm.style.display = 'block';
  }

  showLoginButton.addEventListener("click", function () {
    popup.classList.add("active");
    showLoginForm();
  });

  document.querySelector(".popup .close-btn").addEventListener("click", function () {
    popup.classList.remove("active");
    showLoginForm();
  });

  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();
    hideAllForms();
    passwordResetForm.style.display = 'block';
  });

  signUpLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSignUpForm();
  });

  // Add event listeners to back buttons
  backButtons.forEach(button => {
    button.addEventListener('click', showLoginForm);
  });

  // Reset Password button functionality
  const resetPasswordBtn = document.getElementById('reset-password-btn');
  resetPasswordBtn.addEventListener('click', function () {
    const resetEmail = document.getElementById('reset-email').value;
    // Add password reset logic here
    console.log('Email for password reset:', resetEmail);
  });

  // Sign Up button functionality
  const signUpBtn = document.getElementById('signup-btn');
  signUpBtn.addEventListener('click', function () {
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    // Add sign-up logic here
    console.log('New Email:', newEmail);
    console.log('New Password:', newPassword);
  });

  // Reset forms when "Login" button is clicked
  showLoginButton.addEventListener('click', showLoginForm);
});