// Contact form functionality for Safari Match website
document.addEventListener("DOMContentLoaded", function () {
  initializeContactForm();
});

function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) {
    console.error("Contact form not found");
    return;
  }

  // Add form submission handler
  contactForm.addEventListener("submit", handleFormSubmission);

  // Add real-time validation
  addRealTimeValidation();

  // Add form field focus effects
  addFormFocusEffects();
}

function handleFormSubmission(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showSuccessMessage();

    // Reset form
    resetForm(form);

    // Remove loading state
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }, 2000);
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll("input, select, textarea");

  // Clear previous error states
  clearAllErrors();

  fields.forEach((field) => {
    if (field.hasAttribute("required") && !field.value.trim()) {
      showFieldError(field, "This field is required");
      isValid = false;
    } else if (field.type === "email" && field.value.trim()) {
      if (!isValidEmail(field.value)) {
        showFieldError(field, "Please enter a valid email address");
        isValid = false;
      }
    } else if (field.name === "phone" && field.value.trim()) {
      if (!isValidPhone(field.value)) {
        showFieldError(field, "Please enter a valid phone number");
        isValid = false;
      }
    } else if (field.name === "name" && field.value.trim()) {
      if (!isValidName(field.value)) {
        showFieldError(field, "Name can only contain letters and spaces");
        isValid = false;
      }
    }

    // Mark valid fields
    if (field.value.trim() && !field.classList.contains("error")) {
      field.classList.add("valid");
    }
  });

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Allow various phone formats: +44, 44, 0, spaces, dashes, parentheses
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
  return phoneRegex.test(phone);
}

function isValidName(name) {
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name);
}

function showFieldError(field, message) {
  field.classList.add("error");
  field.classList.remove("valid");

  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(field) {
  field.classList.remove("error");
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function clearAllErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  const errorFields = document.querySelectorAll(".error");

  errorMessages.forEach((msg) => (msg.textContent = ""));
  errorFields.forEach((field) => field.classList.remove("error"));
}

function addRealTimeValidation() {
  const form = document.getElementById("contact-form");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    // Validate on blur
    field.addEventListener("blur", function () {
      validateField(this);
    });

    // Clear error on input
    field.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        clearFieldError(this);
      }

      // Remove valid class if field becomes empty
      if (!this.value.trim()) {
        this.classList.remove("valid");
      }
    });

    // Validate on change (for select fields)
    field.addEventListener("change", function () {
      if (this.tagName === "SELECT") {
        validateField(this);
      }
    });
  });
}

function validateField(field) {
  if (field.hasAttribute("required") && !field.value.trim()) {
    showFieldError(field, "This field is required");
    return false;
  }

  if (field.type === "email" && field.value.trim()) {
    if (!isValidEmail(field.value)) {
      showFieldError(field, "Please enter a valid email address");
      return false;
    }
  }

  if (field.name === "phone" && field.value.trim()) {
    if (!isValidPhone(field.value)) {
      showFieldError(field, "Please enter a valid phone number");
      return false;
    }
  }

  if (field.name === "name" && field.value.trim()) {
    if (!isValidName(field.value)) {
      showFieldError(field, "Name can only contain letters and spaces");
      return false;
    }
  }

  // Field is valid
  if (field.value.trim()) {
    field.classList.add("valid");
    field.classList.remove("error");
    clearFieldError(field);
  }

  return true;
}

function addFormFocusEffects() {
  const form = document.getElementById("contact-form");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    field.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
    });
  });
}

function showSuccessMessage() {
  const form = document.getElementById("contact-form");

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <h3>Thank you!</h3>
        <p>We will contact you soon.</p>
    `;

  // Insert before form
  form.parentElement.insertBefore(successMessage, form);

  // Scroll to success message
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove success message after 5 seconds
  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.parentNode.removeChild(successMessage);
    }
  }, 5000);
}

function resetForm(form) {
  // Reset all form fields
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.value = "";
    field.classList.remove("error", "valid");
    field.parentElement.classList.remove("focused");
  });

  // Clear all error messages
  clearAllErrors();

  // Reset submit button
  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.classList.remove("loading");
  submitBtn.disabled = false;
}

// Phone number formatting
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");

  if (value.startsWith("44")) {
    value = "+" + value;
  } else if (value.startsWith("0")) {
    value = "+44" + value.substring(1);
  }

  input.value = value;
}

// Add phone formatting to phone field
document.addEventListener("DOMContentLoaded", function () {
  const phoneField = document.getElementById("phone");
  if (phoneField) {
    phoneField.addEventListener("input", function () {
      formatPhoneNumber(this);
    });
  }
});

// Form accessibility improvements
function improveFormAccessibility() {
  const form = document.getElementById("contact-form");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field, index) => {
    // Add ARIA labels
    if (!field.getAttribute("aria-label")) {
      const label = form.querySelector(`label[for="${field.id}"]`);
      if (label) {
        field.setAttribute("aria-label", label.textContent);
      }
    }

    // Add error descriptions
    if (field.hasAttribute("required")) {
      field.setAttribute("aria-describedby", `${field.name}-error`);
    }

    // Add tabindex for better navigation
    field.setAttribute("tabindex", index + 1);
  });
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveFormAccessibility);

// Handle form submission with Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName === "TEXTAREA") {
    // Allow Enter in textarea
    return;
  }

  if (e.key === "Enter" && e.target.tagName === "INPUT") {
    // Submit form on Enter in input fields
    const form = e.target.closest("form");
    if (form) {
      e.preventDefault();
      form.dispatchEvent(new Event("submit"));
    }
  }
});

// Performance monitoring for contact form
if ("performance" in window) {
  window.addEventListener("load", function () {
    const perfData = performance.getEntriesByType("navigation")[0];
    if (perfData) {
      console.log(
        "Contact page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }
  });
}

// Export functions for use in other modules
window.ContactManager = {
  validateForm,
  showFieldError,
  clearFieldError,
  isValidEmail,
  isValidPhone,
  isValidName,
};
