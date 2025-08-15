// Cookie Bar functionality for Lafufu Typer website
document.addEventListener("DOMContentLoaded", function () {
  initializeCookieBar();
});

function initializeCookieBar() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  if (!cookieBar || !acceptButton) {
    console.error("Cookie bar elements not found");
    return;
  }

  // Check if cookies were already accepted
  const cookiesAccepted = localStorage.getItem("lafufu-typer-cookies-accepted");

  if (cookiesAccepted) {
    cookieBar.style.display = "none";
    return;
  }

  // Show cookie bar after delay
  setTimeout(() => {
    cookieBar.classList.add("show");
  }, 2000);

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    acceptCookies();
  });

  // Handle keyboard navigation
  acceptButton.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      acceptCookies();
    }
  });
}

function acceptCookies() {
  const cookieBar = document.getElementById("cookie-bar");

  if (!cookieBar) return;

  // Store acceptance in localStorage
  localStorage.setItem("lafufu-typer-cookies-accepted", "true");
  localStorage.setItem("lafufu-typer-cookies-date", new Date().toISOString());

  // Show success message
  showCookieAcceptanceMessage();

  // Hide cookie bar with animation
  cookieBar.classList.remove("show");

  setTimeout(() => {
    cookieBar.style.display = "none";
  }, 500);

  // Track acceptance (if analytics are available)
  trackCookieAcceptance();
}

function showCookieAcceptanceMessage() {
  // Create a temporary success message
  const successMessage = document.createElement("div");
  successMessage.className = "cookie-success-message";
  successMessage.innerHTML = `
        <div class="cookie-success-content">
            <span class="success-icon">✓</span>
            <span>Thank you! Cookies have been accepted.</span>
        </div>
    `;

  // Add styles for the success message
  addCookieSuccessStyles();

  // Add to page
  document.body.appendChild(successMessage);

  // Show message
  setTimeout(() => {
    successMessage.classList.add("show");
  }, 100);

  // Remove message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }, 300);
  }, 3000);
}

function addCookieSuccessStyles() {
  if (document.getElementById("cookie-success-styles")) return;

  const style = document.createElement("style");
  style.id = "cookie-success-styles";
  style.textContent = `
        .cookie-success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--success-color), #32CD32);
            color: white;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        }
        
        .cookie-success-message.show {
            transform: translateX(0);
        }
        
        .cookie-success-content {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .success-icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .cookie-success-message {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100%);
            }
            
            .cookie-success-message.show {
                transform: translateY(0);
            }
        }
        
        @media (max-width: 360px) {
            .cookie-success-message {
                padding: var(--spacing-xs) var(--spacing-sm);
                font-size: 0.9rem;
            }
            
            .success-icon {
                font-size: 1rem;
            }
        }
    `;

  document.head.appendChild(style);
}

function trackCookieAcceptance() {
  // Track cookie acceptance for analytics purposes
  const acceptanceData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookiesAccepted: true,
  };

  // Store in localStorage for potential analytics
  localStorage.setItem(
    "lafufu-typer-cookie-analytics",
    JSON.stringify(acceptanceData)
  );

  // Log for debugging
  console.log("Cookies accepted:", acceptanceData);

  // You can add analytics tracking here (Google Analytics, etc.)
  if (typeof gtag !== "undefined") {
    gtag("event", "cookie_acceptance", {
      event_category: "engagement",
      event_label: "lafufu_typer_cookies",
    });
  }
}

// Function to check if cookies are accepted (for other parts of the app)
function areCookiesAccepted() {
  return localStorage.getItem("lafufu-typer-cookies-accepted") === "true";
}

// Function to get cookie acceptance date
function getCookieAcceptanceDate() {
  const dateString = localStorage.getItem("lafufu-typer-cookies-date");
  return dateString ? new Date(dateString) : null;
}

// Function to reset cookie acceptance (for testing purposes)
function resetCookieAcceptance() {
  localStorage.removeItem("lafufu-typer-cookies-accepted");
  localStorage.removeItem("lafufu-typer-cookies-date");
  localStorage.removeItem("lafufu-typer-cookie-analytics");

  // Reload page to show cookie bar again
  location.reload();
}

// Export functions for use in other modules
window.CookieManager = {
  areCookiesAccepted,
  getCookieAcceptanceDate,
  resetCookieAcceptance,
};

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    // Check if cookies were accepted while page was hidden
    const cookiesAccepted = localStorage.getItem(
      "lafufu-typer-cookies-accepted"
    );
    const cookieBar = document.getElementById("cookie-bar");

    if (cookiesAccepted && cookieBar && cookieBar.style.display !== "none") {
      cookieBar.style.display = "none";
    }
  }
});

// Handle storage events (for cross-tab synchronization)
window.addEventListener("storage", function (e) {
  if (e.key === "lafufu-typer-cookies-accepted") {
    const cookieBar = document.getElementById("cookie-bar");
    if (cookieBar && e.newValue === "true") {
      cookieBar.style.display = "none";
    }
  }
});

// Performance monitoring for cookie bar
if ("performance" in window) {
  window.addEventListener("load", function () {
    const cookieBar = document.getElementById("cookie-bar");
    if (cookieBar) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes("cookie")) {
            console.log("Cookie bar performance:", entry);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ["measure"] });
      } catch (e) {
        console.log("Performance observer not supported");
      }
    }
  });
}
