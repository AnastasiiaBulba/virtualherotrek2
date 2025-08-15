// Sections Loader for Lafufu Typer website
document.addEventListener("DOMContentLoaded", function () {
  loadAllSections();
});

async function loadAllSections() {
  const sections = [
    { id: "hero-section-placeholder", file: "sections/hero-section.html" },
    {
      id: "how-to-play-section-placeholder",
      file: "sections/how-to-play-section.html",
    },
    { id: "game-section-placeholder", file: "sections/game-section.html" },
    {
      id: "features-section-placeholder",
      file: "sections/features-section.html",
    },
    {
      id: "field-description-section-placeholder",
      file: "sections/field-description-section.html",
    },
    {
      id: "reviews-section-placeholder",
      file: "sections/reviews-section.html",
    },
  ];

  for (const section of sections) {
    try {
      console.log(`Loading section: ${section.file}`);
      await loadSection(section.id, section.file);

      // Special logging for reviews section
      if (section.file === "sections/reviews-section.html") {
        console.log("Reviews section loaded, checking content...");
        const reviewsPlaceholder = document.getElementById(section.id);
        if (reviewsPlaceholder) {
          const reviewCards =
            reviewsPlaceholder.querySelectorAll(".review-card");
          console.log(`Found ${reviewCards.length} review cards`);
          reviewCards.forEach((card, index) => {
            console.log(
              `Card ${index + 1}:`,
              card.textContent.trim().substring(0, 50) + "..."
            );
          });
        }
      }
    } catch (error) {
      console.error(`Failed to load section ${section.file}:`, error);
    }
  }

  // Dispatch event when all sections are loaded
  document.dispatchEvent(new Event("sectionsLoaded"));
}

async function loadSection(placeholderId, filePath) {
  const placeholder = document.getElementById(placeholderId);

  if (!placeholder) {
    console.error(`Placeholder ${placeholderId} not found`);
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    placeholder.innerHTML = html;

    // Add animation classes after loading
    setTimeout(() => {
      const section = placeholder.querySelector("section");
      if (section) {
        section.classList.add("fade-in-up");
      }
    }, 100);

    // Log successful loading for debugging
    console.log(`Section ${filePath} loaded successfully`);
  } catch (error) {
    console.error(`Error loading section ${filePath}:`, error);
    placeholder.innerHTML = `<div class="section-error">Failed to load section content</div>`;
  }
}

// Add error styling
function addErrorStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .section-error {
      padding: 2rem;
      text-align: center;
      color: var(--error-color);
      background: rgba(220, 20, 60, 0.1);
      border: 1px solid var(--error-color);
      border-radius: var(--border-radius-md);
      margin: 1rem 0;
    }
  `;
  document.head.appendChild(style);
}

// Initialize error styles
addErrorStyles();
