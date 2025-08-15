// Reviews loader for Lafufu Typer website
async function loadReviews() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    if (data.reviews && data.reviews.items) {
      const reviewsContainer = document.querySelector("#reviews-container");
      if (reviewsContainer) {
        reviewsContainer.innerHTML = "";

        data.reviews.items.forEach((review) => {
          const reviewCard = createReviewCard(review);
          reviewsContainer.appendChild(reviewCard);
        });

        console.log(`Successfully loaded ${data.reviews.items.length} reviews`);
      } else {
        console.log("Reviews container not found yet, will retry later");
        // Retry after a short delay
        setTimeout(loadReviews, 200);
      }
    }
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

function createReviewCard(review) {
  const card = document.createElement("div");
  card.className = "review-card";

  const stars = "⭐".repeat(review.rating);

  card.innerHTML = `
    <div class="review-avatar">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="${review.avatar.fill}" />
        <circle cx="35" cy="40" r="5" fill="${review.avatar.eyes}" />
        <circle cx="65" cy="40" r="5" fill="${review.avatar.eyes}" />
        <path
          d="M 30 60 Q 50 70 70 60"
          stroke="${review.avatar.mouth}"
          stroke-width="3"
          fill="none"
        />
      </svg>
    </div>
    <div class="review-content">
      <h4>${review.name}</h4>
      <p>"${review.text}"</p>
      <div class="review-stars">${stars}</div>
    </div>
  `;

  return card;
}

// Load reviews when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Wait for sections to load first, then load reviews
  setTimeout(loadReviews, 1000);
});

// Also try to load reviews when sections are loaded
document.addEventListener("sectionsLoaded", function () {
  loadReviews();
});
