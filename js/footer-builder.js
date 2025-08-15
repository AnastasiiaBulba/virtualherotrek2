// Footer Builder for Lafufu Typer website
document.addEventListener("DOMContentLoaded", function () {
  buildFooter();
});

function buildFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (!footerPlaceholder) {
    console.error("Footer placeholder not found");
    return;
  }

  const currentYear = new Date().getFullYear();

  const footer = document.createElement("footer");
  footer.className = "main-footer";
  footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Legal</h3>
                <ul class="footer-links">
                    <li><a href="./privacy.html">Privacy Policy</a></li>
                    <li><a href="./cookies.html">Cookie Policy</a></li>
                    <li><a href="./disclaimer.html">Disclaimer</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Contact Information</h3>
                <div class="contact-info">
                    <p><strong>Email:</strong> <a href="mailto:contact@virtualherotrek.com" class="contact-link">contact@virtualherotrek.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+44331214567" class="contact-link">+44 33 121 4567</a></p>
                    <p><strong>Address:</strong> <span class="address-text contact-link">30 St Mary Axe, London EC3A 8BF, United Kingdom</span></p>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="https://facebook.com" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="https://twitter.com" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-bottom-content">
                <p class="copyright">&copy; ${currentYear} VirtualHeroTrek.com. All rights reserved.</p>
            </div>
        </div>
    `;

  footerPlaceholder.appendChild(footer);

  // Add footer styles
  addFooterStyles();

  // Initialize footer interactions
  initializeFooterInteractions();
}

function addFooterStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .main-footer {
            background: linear-gradient(135deg, var(--bg-dark) 0%, var(--primary-color) 100%);
            color: var(--text-light);
            padding: 0;
            margin-top: var(--spacing-xl);
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: var(--spacing-xl) var(--spacing-sm);
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-lg);
        }
        
        .footer-section {
            flex: 1;
            min-width: 250px;
        }
        
        .footer-section h3 {
            color: var(--accent-color);
            margin-bottom: var(--spacing-md);
            font-size: 1.25rem;
            font-weight: 600;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: var(--spacing-xs);
        }
        
        .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .footer-links li {
            margin-bottom: var(--spacing-xs);
        }
        
        .footer-links a {
            color: var(--text-light);
            text-decoration: none;
            transition: color var(--transition-fast);
            display: inline-block;
            padding: var(--spacing-xs) 0;
        }
        
        .footer-links a:hover {
            color: var(--accent-color);
            transform: translateX(5px);
            transition: all var(--transition-fast);
        }
        
        .contact-info p {
            margin-bottom: var(--spacing-xs);
            line-height: 1.5;
        }
        
        .contact-info a {
            color: white;
            text-decoration: none;
            transition: color var(--transition-fast);
        }
        
        .contact-info a:hover {
            color: var(--accent-color);
        }
        
        .address-text {
            color: white;
        }
        
        /* Footer-specific contact styles */
        .main-footer .contact-info p {
            color: white;
        }
        
        .main-footer .contact-info strong {
            color: white;
        }
        
        .main-footer .contact-info a {
            color: white !important;
        }
        
        .main-footer .contact-info a:hover {
            color: var(--accent-color) !important;
        }
        
        .social-links {
            display: flex;
            gap: var(--spacing-md);
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            color: var(--text-light);
            text-decoration: none;
            transition: all var(--transition-normal);
            border: 2px solid transparent;
        }
        
        .social-link:hover {
            background: var(--accent-color);
            color: var(--text-primary);
            transform: translateY(-3px);
            border-color: var(--text-light);
        }
        
        .footer-bottom {
            background: rgba(0, 0, 0, 0.3);
            border-top: 1px solid var(--accent-color);
            padding: var(--spacing-md) 0;
        }
        
        .footer-bottom-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-sm);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
            text-align: center;
        }
        
        .copyright {
            margin: 0;
            color: var(--text-light);
            font-size: 0.9rem;
        }
        

        
        /* Responsive Design */
        @media (max-width: 1280px) {
            .footer-content {
                gap: var(--spacing-md);
            }
            
            .footer-section {
                min-width: 220px;
            }
        }
        
        @media (max-width: 768px) {
            .footer-content {
                padding: var(--spacing-lg) var(--spacing-sm);
                gap: var(--spacing-md);
            }
            
            .footer-section {
                min-width: 200px;
                flex: 1 1 calc(50% - var(--spacing-md));
            }
            
            .footer-section h3 {
                font-size: 1.125rem;
                margin-bottom: var(--spacing-sm);
            }
            
            .footer-bottom-content {
                flex-direction: column;
                text-align: center;
                gap: var(--spacing-xs);
            }
        }
        
        @media (max-width: 360px) {
            .footer-content {
                padding: var(--spacing-md) var(--spacing-sm);
                gap: var(--spacing-sm);
            }
            
            .footer-section {
                min-width: 180px;
                flex: 1 1 100%;
            }
            
            .footer-section h3 {
                font-size: 1rem;
                margin-bottom: var(--spacing-xs);
            }
            
            .footer-links a {
                font-size: 0.9rem;
                padding: var(--spacing-xs) 0;
            }
            
            .contact-info p {
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .social-link {
                width: 35px;
                height: 35px;
            }
            
            .copyright,
            .powered-by {
                font-size: 0.85rem;
            }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .social-link {
                border-width: 1px;
            }
        }
        
        /* Focus states for accessibility */
        .footer-links a:focus,
        .contact-info a:focus,
        .social-link:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: 2px;
        }
        
        /* Print styles */
        @media print {
            .main-footer {
                background: white !important;
                color: black !important;
                border-top: 2px solid #ccc;
            }
            
            .footer-section h3 {
                color: black !important;
                border-bottom-color: #ccc;
            }
            
            .footer-links a,
            .contact-info a {
                color: black !important;
            }
            
            .social-links {
                display: none;
            }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            .footer-links a,
            .social-link {
                transition: none;
            }
            
            .footer-links a:hover {
                transform: none;
            }
            
            .social-link:hover {
                transform: none;
            }
        }
    `;

  document.head.appendChild(style);
}

function initializeFooterInteractions() {
  // Add smooth scrolling for footer links
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');

  footerLinks.forEach((link) => {
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

  // Add hover effects for social links
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.1)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Update copyright year automatically
function updateCopyrightYear() {
  const copyrightElement = document.querySelector(".copyright");
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `&copy; ${currentYear} VirtualHeroTrek.com. All rights reserved.`;
  }
}

// Call update function on page load
document.addEventListener("DOMContentLoaded", updateCopyrightYear);
