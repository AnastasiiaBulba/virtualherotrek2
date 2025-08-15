// Main JavaScript file for Safari Match website
document.addEventListener("DOMContentLoaded", function () {
  console.log("Safari Match website loaded successfully");

  // Initialize all components
  initializeAnimations();
  initializeSmoothScrolling();
  initializeLazyLoading();
  initializeIntersectionObserver();

  // Check if cookies are accepted
  checkCookieConsent();
});

// Initialize smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize animations for elements
function initializeAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .slide-in-left, .slide-in-right"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
  });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src || img.src;
    });
  }
}

// Initialize intersection observer for animations
function initializeIntersectionObserver() {
  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition =
              "opacity 0.6s ease-out, transform 0.6s ease-out";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .slide-in-left, .slide-in-right"
    );
    animatedElements.forEach((el) => animationObserver.observe(el));
  }
}

// Check cookie consent status
function checkCookieConsent() {
  const cookiesAccepted = localStorage.getItem("safari-match-cookies-accepted");

  if (!cookiesAccepted) {
    setTimeout(() => {
      const cookieBar = document.getElementById("cookie-bar");
      if (cookieBar) {
        cookieBar.classList.add("show");
      }
    }, 2000);
  }
}

// Utility function to debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize events
window.addEventListener(
  "resize",
  debounce(function () {
    // Adjust iframe size on resize
    const gameContainer = document.querySelector(".game-container");
    if (gameContainer) {
      const iframe = gameContainer.querySelector("iframe");
      if (iframe) {
        // Maintain aspect ratio
        const containerWidth = gameContainer.offsetWidth;
        const aspectRatio = 16 / 9;
        const newHeight = containerWidth / aspectRatio;

        if (newHeight <= window.innerHeight * 0.8) {
          iframe.style.height = newHeight + "px";
        }
      }
    }
  }, 250)
);

// Handle scroll events for performance
window.addEventListener(
  "scroll",
  debounce(function () {
    // Add scroll-based animations or effects here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 16)
);

// Error handling for iframe loading
function handleIframeError(iframe) {
  iframe.addEventListener("error", function () {
    console.error("Failed to load game iframe");
    this.style.display = "none";

    const errorMessage = document.createElement("div");
    errorMessage.className = "game-error";
    errorMessage.innerHTML = `
            <p>Sorry, the game failed to load. Please try refreshing the page.</p>
            <button onclick="location.reload()" class="cta-button">Refresh Page</button>
        `;

    this.parentNode.appendChild(errorMessage);
  });
}

// Initialize game iframe error handling
document.addEventListener("DOMContentLoaded", function () {
  const gameIframe = document.querySelector(".game-container iframe");
  if (gameIframe) {
    handleIframeError(gameIframe);

    // Initialize audio context when game iframe is clicked
    gameIframe.addEventListener("click", function () {
      if (!audioContext) {
        initializeAudioContext();
        // Enable audio in iframe only after user interaction
        enableGameAudio(gameIframe);
      }
    });
  }
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.getEntriesByType("navigation")[0];
      if (perfData) {
        console.log(
          "Page load time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
      }
    }, 0);
  });
}

// Service Worker registration removed - not needed for this project

// Audio context management
let audioContext = null;

function enableGameAudio(iframe) {
  // Enable audio in iframe only after user interaction
  try {
    // Remove muted attribute to enable audio
    iframe.removeAttribute("muted");

    // Send message to iframe to enable audio (if same-origin)
    iframe.contentWindow?.postMessage(
      {
        type: "enableAudio",
        action: "unmute",
      },
      "*"
    );

    console.log("Game audio enabled after user interaction");
  } catch (error) {
    console.log("Could not enable game audio:", error);
  }
}

function initializeAudioContext() {
  // Create audio context only after user interaction
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log("AudioContext initialized successfully");
    } catch (error) {
      console.error("Failed to initialize AudioContext:", error);
    }
  }
}

// Initialize audio context on first user interaction
document.addEventListener(
  "click",
  function () {
    if (!audioContext) {
      initializeAudioContext();
    }
  },
  { once: true }
);

// Export functions for use in other modules
window.SafariMatch = {
  initializeAnimations,
  initializeSmoothScrolling,
  initializeLazyLoading,
  checkCookieConsent,
  debounce,
  initializeAudioContext,
  enableGameAudio,
};
