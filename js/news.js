// News functionality for Lafufu Typer website
document.addEventListener("DOMContentLoaded", function () {
  initializeNews();
});

function initializeNews() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  const modal = document.getElementById("news-modal");
  const closeModal = document.querySelector(".close-modal");

  if (!modal || !closeModal) {
    console.error("News modal elements not found");
    return;
  }

  // Add click event to all read more buttons
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category;
      const id = this.dataset.id;
      showArticle(category, id);
    });
  });

  // Close modal when clicking the close button
  closeModal.addEventListener("click", function () {
    hideModal();
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      hideModal();
    }
  });

  // News data is loaded dynamically when needed
}

function showArticle(category, id) {
  const modal = document.getElementById("news-modal");
  const modalContent = document.getElementById("modal-content");

  if (!modal || !modalContent) return;

  // Get article data
  const article = getArticleData(category, id);

  if (!article) {
    showError("Article not found");
    return;
  }

  // Populate modal content
  modalContent.innerHTML = `
        <h2>${article.title}</h2>
        <div class="article-meta">
            <p>Published: <time datetime="${article.date}">${formatDate(
    article.date
  )}</time></p>
            <p>Category: ${article.category}</p>
        </div>
        <div class="article-content">
            ${article.content}
        </div>
    `;

  // Show modal
  modal.style.display = "block";

  // Add animation class
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  // Focus management for accessibility
  modal.focus();

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function hideModal() {
  const modal = document.getElementById("news-modal");

  if (!modal) return;

  // Remove animation class
  modal.classList.remove("show");

  // Hide modal after animation
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  // Restore body scroll
  document.body.style.overflow = "";

  // Return focus to the page
  document.querySelector(".news-hero").focus();
}

function getArticleData(category, id) {
  const articles = {
    updates: {
      1: {
        title: "New Speed Levels Released!",
        date: "2025-01-15",
        category: "Game Updates",
        content: `
                    <p>We're thrilled to announce the release of exciting new speed challenges that will test your typing skills like never before!</p>
                    
                    <h3>New Speed Challenges</h3>
                    <p>Introducing three brand new speed levels that will push your reflexes to the limit:</p>
                    <ul>
                        <li><strong>Lightning Fast:</strong> Letters appear at double speed for ultimate challenge</li>
                        <li><strong>Blitz Mode:</strong> 30-second sprint with rapidly changing letters</li>
                        <li><strong>Speed Master:</strong> Progressive difficulty that increases with each level</li>
                    </ul>
                    
                    <h3>Enhanced Power-ups</h3>
                    <p>We've upgraded the existing power-ups and added new ones:</p>
                    <ul>
                        <li><strong>Time Freeze:</strong> Pauses the timer for 5 seconds</li>
                        <li><strong>Letter Reveal:</strong> Shows the next letter in sequence</li>
                        <li><strong>Speed Boost:</strong> Increases your typing speed temporarily</li>
                    </ul>
                    
                    <h3>Improved Visuals</h3>
                    <p>The typing experience has been significantly enhanced with:</p>
                    <ul>
                        <li>Higher resolution letter animations</li>
                        <li>Improved particle effects for successful matches</li>
                        <li>Enhanced background transitions</li>
                        <li>Better color schemes for different difficulty levels</li>
                    </ul>
                    
                    <h3>Performance Improvements</h3>
                    <p>We've also made several under-the-hood improvements:</p>
                    <ul>
                        <li>Faster letter generation</li>
                        <li>Reduced input lag</li>
                        <li>Better frame rate on all devices</li>
                        <li>Improved keyboard responsiveness</li>
                    </ul>
                    
                    <p>These new features are available immediately for all players. We hope you enjoy the enhanced Lafufu Typer experience!</p>
                `,
      },
      2: {
        title: "50+ New Letter Challenges!",
        date: "2025-01-10",
        category: "Game Updates",
        content: `
                    <p>Get ready for an even bigger typing adventure! We've added over 50 new challenging levels that will test your letter matching skills and push your reflexes to new heights.</p>
                    
                    <h3>New Challenge Types</h3>
                    <p>Each new level introduces unique typing challenges and mechanics:</p>
                    <ul>
                        <li><strong>Speed Challenges:</strong> Letters appear faster with each successful match</li>
                        <li><strong>Pattern Recognition:</strong> Identify letter sequences and type them quickly</li>
                        <li><strong>Mixed Case:</strong> Switch between uppercase and lowercase letters</li>
                        <li><strong>Special Characters:</strong> Include numbers and symbols in your typing</li>
                    </ul>
                    
                    <h3>Advanced Objectives</h3>
                    <p>The new levels feature more complex goals:</p>
                    <ul>
                        <li>Multi-step typing sequences that require strategic planning</li>
                        <li>Time-based challenges for speed demons</li>
                        <li>Limited mistake allowances that test accuracy</li>
                        <li>Hidden bonus words throughout the levels</li>
                    </ul>
                    
                    <h3>New Obstacles</h3>
                    <p>Face fresh challenges with innovative typing obstacles:</p>
                    <ul>
                        <li><strong>Fading Letters:</strong> Letters disappear if not typed quickly enough</li>
                        <li><strong>Moving Targets:</strong> Letters that shift position on screen</li>
                        <li><strong>Color Changes:</strong> Letters that change color to indicate priority</li>
                        <li><strong>Sound Challenges:</strong> Type letters based on audio cues</li>
                    </ul>
                    
                    <h3>Reward System</h3>
                    <p>Complete the new levels to earn exclusive rewards:</p>
                    <ul>
                        <li>Special keyboard themes and color schemes</li>
                        <li>Unique power-up combinations</li>
                        <li>Hidden typing modes to unlock</li>
                        <li>Achievement badges for completion</li>
                    </ul>
                    
                    <p>Start your journey through these new challenges today and discover what secrets the expanded typing world holds!</p>
                `,
      },
    },
    diaries: {
      1: {
        title: "Behind the Scenes: Creating the Colorful World",
        date: "2025-01-08",
        category: "Developer Diaries",
        content: `
                    <p>Welcome to our first behind-the-scenes look at the creation of Lafufu Typer! Today, we'll take you through the journey of how our team brought this colorful typing adventure to life.</p>
                    
                    <h3>The Inspiration</h3>
                    <p>Our journey began with a simple question: "What if we could make typing practice fun and engaging?" The idea came to our lead designer, Sarah, during a coding session. Watching letters appear on screen, she realized that the alphabet held endless possibilities for game mechanics.</p>
                    
                    <h3>The Design Process</h3>
                    <p>Creating Lafufu Typer was a collaborative effort that spanned over 18 months:</p>
                    <ul>
                        <li><strong>Research Phase:</strong> Our team spent months studying typing mechanics, user experience, and educational gaming</li>
                        <li><strong>Concept Development:</strong> We created hundreds of sketches and prototypes</li>
                        <li><strong>Art Direction:</strong> Finding the perfect balance between cute and functional graphics</li>
                        <li><strong>Sound Design:</strong> Creating satisfying audio feedback for successful typing</li>
                    </ul>
                    
                    <h3>Technical Challenges</h3>
                    <p>We faced several technical hurdles during development:</p>
                    <ul>
                        <li>Optimizing letter generation for smooth gameplay</li>
                        <li>Creating responsive input handling across different devices</li>
                        <li>Implementing the typing mechanics with engaging visual feedback</li>
                        <li>Ensuring cross-platform compatibility</li>
                    </ul>
                    
                    <h3>Community Involvement</h3>
                    <p>Throughout development, we involved our community in key decisions:</p>
                    <ul>
                        <li>Beta testing with over 1,000 players</li>
                        <li>Community polls for feature prioritization</li>
                        <li>Regular feedback sessions and surveys</li>
                        <li>Player suggestion implementation</li>
                    </ul>
                    
                    <h3>Looking Forward</h3>
                    <p>This is just the beginning of our typing adventure. We have many more features, challenges, and experiences planned. Our team is constantly inspired by the alphabet and our amazing community of players.</p>
                    
                    <p>Thank you for joining us on this journey through the colorful world of letters!</p>
                `,
      },
      2: {
        title: "Community Spotlight: Player Achievements",
        date: "2025-01-05",
        category: "Developer Diaries",
        content: `
                    <p>One of the most rewarding aspects of creating Lafufu Typer has been getting to know our incredible community of players. Today, we want to share some of their inspiring stories with you.</p>
                    
                    <h3>Emma's Story: Finding Joy in Difficult Times</h3>
                    <p>Emma, a 34-year-old teacher from Manchester, discovered Lafufu Typer during a particularly challenging period in her life. "I was going through a difficult divorce and struggling with anxiety," she shares. "The peaceful typing environment and engaging letter challenges became my daily escape. I'd practice for an hour each evening, and it helped me find moments of calm and joy."</p>
                    
                    <p>Emma has now completed over 500 levels and credits the game with helping her develop better typing skills. "It's amazing how a simple typing game can teach you to approach life's challenges differently," she says.</p>
                    
                    <h3>David's Journey: From Casual to Competitive</h3>
                    <p>David, a 28-year-old software developer from London, started playing Lafufu Typer casually but quickly became hooked on the competitive aspects. "I love trying to beat my own high scores and discovering new typing techniques," he explains. "The game has a perfect balance of accessibility and depth."</p>
                    
                    <p>David has created several typing guides for the community and regularly participates in our weekly challenges. "The community aspect is fantastic. I've made friends with players from around the world who share my passion for typing games."</p>
                    
                    <h3>Family Fun: The Thompson Family</h3>
                    <p>The Thompson family from Birmingham has made Lafufu Typer a part of their daily routine. Parents James and Lisa play alongside their 8-year-old daughter, Mia, and 12-year-old son, Tom. "It's wonderful to have a game that we can all enjoy together," says Lisa. "Mia loves the cute letters, Tom enjoys the strategic challenges, and James and I appreciate the educational aspect."</p>
                    
                    <p>They've even created their own family tournament system, keeping score of who can type the fastest. "It's become a fun way to spend quality time together while improving our typing skills," James adds.</p>
                    
                    <h3>Accessibility Champion: Maria's Mission</h3>
                    <p>Maria, a 42-year-old accessibility advocate from Glasgow, has been instrumental in helping us improve Lafufu Typer for players with different needs. "As someone with limited mobility, I appreciate games that are accessible and inclusive," she explains. "The team has been incredibly responsive to feedback about accessibility features."</p>
                    
                    <p>Thanks to Maria's input, we've added features like customizable keyboard sensitivity, high contrast mode, and voice navigation support. "It's heartwarming to see developers who genuinely care about making their games accessible to everyone," she says.</p>
                    
                    <h3>Join the Community</h3>
                    <p>These stories represent just a small sample of our amazing community. Whether you're a casual player looking for relaxation or a competitive gamer seeking challenges, there's a place for you in the Lafufu Typer family.</p>
                    
                    <p>Share your own story with us on our community forums, and who knows? You might be featured in our next community spotlight!</p>
                `,
      },
    },
  };

  return articles[category]?.[id] || null;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showError(message) {
  const modal = document.getElementById("news-modal");
  const modalContent = document.getElementById("modal-content");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
        <h2>Error</h2>
        <p>${message}</p>
        <button onclick="hideModal()" class="cta-button">Close</button>
    `;

  modal.style.display = "block";
}

// Add smooth scrolling for news page navigation
function initializeNewsNavigation() {
  const newsLinks = document.querySelectorAll('a[href^="#"]');

  newsLinks.forEach((link) => {
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

// Initialize news navigation
document.addEventListener("DOMContentLoaded", initializeNewsNavigation);

// Performance monitoring for news page
if ("performance" in window) {
  window.addEventListener("load", function () {
    const perfData = performance.getEntriesByType("navigation")[0];
    if (perfData) {
      console.log(
        "News page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }
  });
}

// Export functions for use in other modules
window.NewsManager = {
  showArticle,
  hideModal,
  getArticleData,
};
