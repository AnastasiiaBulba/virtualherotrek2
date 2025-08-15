// Header Builder for Lafufu Typer website
document.addEventListener("DOMContentLoaded", function () {
  buildHeader();
});

function buildHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) {
    console.error("Header placeholder not found");
    return;
  }

  const header = document.createElement("header");
  header.className = "main-header";
  header.innerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="./" class="logo-link">
                        <img src="./pict/icon.jpg" alt="Lafufu Typer Logo" class="logo-image">
                        <span class="logo-text">VirtualHeroTrek.com</span>
                    </a>
                </div>
                
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="./" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="./news.html" class="nav-link">Game News</a>
                        </li>
                        <li class="nav-item">
                            <a href="./contacts.html" class="nav-link">Contact</a>
                        </li>
                    </ul>
                </div>
                
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    `;

  headerPlaceholder.appendChild(header);

  // Add header styles
  addHeaderStyles();

  // Initialize mobile menu
  initializeMobileMenu();

  // Initialize scroll effects
  initializeHeaderScrollEffects();
}

function addHeaderStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .main-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(75, 0, 130, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: all 0.3s ease;
            border-bottom: 2px solid var(--accent-color);
        }
        
        .main-header.scrolled {
            background: rgba(75, 0, 130, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        
        .navbar {
            padding: 0;
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 var(--spacing-sm);
        }
        
        .nav-logo {
            display: flex;
            align-items: center;
        }
        
        .logo-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--text-light);
            transition: all 0.3s ease;
        }
        
        .logo-link:hover {
            transform: scale(1.05);
        }
        
        .logo-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: var(--spacing-sm);
            border: 2px solid var(--accent-color);
        }
        
        .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-light);
            font-family: var(--font-secondary);
        }
        
        .nav-menu {
            display: flex;
            align-items: center;
        }
        
        .nav-list {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: var(--spacing-lg);
        }
        
        .nav-item {
            margin: 0;
        }
        
        .nav-link {
            color: var(--text-light);
            text-decoration: none;
            font-weight: 500;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-sm);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-link:hover {
            color: var(--accent-color);
            background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: var(--accent-color);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        .nav-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            padding: var(--spacing-xs);
        }
        
        .bar {
            width: 25px;
            height: 3px;
            background: var(--text-light);
            margin: 3px 0;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-container {
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: var(--spacing-sm) var(--spacing-sm);
                position: relative;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(75, 0, 130, 0.98);
                backdrop-filter: blur(10px);
                border: 2px solid var(--accent-color);
                border-top: none;
                border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 999;
            }
            
            .nav-menu.active {
                display: block;
                animation: slideDown 0.3s ease;
            }
            
            .nav-list {
                flex-direction: column;
                padding: var(--spacing-sm) 0;
            }
            
            .nav-item {
                margin: 0;
                border-bottom: 1px solid rgba(255, 215, 0, 0.3);
            }
            
            .nav-item:last-child {
                border-bottom: none;
            }
            
            .nav-link {
                padding: var(--spacing-sm) var(--spacing-md);
                display: block;
                text-align: center;
                font-size: 1.1rem;
            }
            
            .nav-toggle {
                display: flex;
            }
            
            .logo-text {
                font-size: 1.25rem;
            }
            
            .logo-image {
                width: 35px;
                height: 35px;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 360px) {
            .nav-container {
                padding: 0 var(--spacing-xs);
            }
            
            .logo-text {
                font-size: 1.125rem;
            }
            
            .logo-image {
                width: 30px;
                height: 30px;
                margin-right: var(--spacing-xs);
            }
            
            .nav-link {
                padding: var(--spacing-xs) var(--spacing-sm);
                font-size: 0.9rem;
            }
        }
    `;

  document.head.appendChild(style);
}

function initializeMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent scrolling when mobile menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navToggle.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

function initializeHeaderScrollEffects() {
  const header = document.querySelector(".main-header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// Add body padding to account for fixed header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".main-header");
  if (header) {
    const updatePadding = () => {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = headerHeight + "px";
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
  }
});
