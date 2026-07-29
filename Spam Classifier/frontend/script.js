/* ============================================
   SPAM DETECTOR - JAVASCRIPT FUNCTIONALITY
   ============================================ */

console.log("JS loaded");

// ============================================
// Character Counter
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const textField = document.getElementById("text_field");
  const charCount = document.getElementById("charCount");

  if (textField && charCount) {
    textField.addEventListener("input", () => {
      charCount.textContent = textField.value.length;

      // Prevent exceeding 500 characters
      if (textField.value.length > 500) {
        textField.value = textField.value.substring(0, 500);
        charCount.textContent = "500";
      }
    });
  }
});

// ============================================
// Spam Detection Form Handler
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("predictForm");
  const textField = document.getElementById("text_field");
  const resultCard = document.getElementById("resultCard");
  const resultText = document.getElementById("result");
  const resultIcon = document.getElementById("resultIcon");
  const confidenceBadge = document.getElementById("confidence");
  const loadingSpinner = document.getElementById("loadingSpinner");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const text = textField.value.trim();

    if (!text) {
      alert("Please enter some text to analyze");
      return;
    }

    // Show loading state
    loadingSpinner.classList.remove("hidden");
    resultCard.classList.add("hidden");

    console.log("Sending request to backend...");

    try {
      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await response.json();

      console.log("Response received:", data);

      // Hide loading spinner
      loadingSpinner.classList.add("hidden");

      // Update result display
      if (data.prediction === 1) {
        // Spam detected
        resultText.textContent = "⚠️ Spam Detected";
        resultText.className = "result-text spam";
        resultIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        resultIcon.style.color = "#ef4444";
        confidenceBadge.textContent = "Spam Message";
        confidenceBadge.style.borderColor = "#ef4444";
        confidenceBadge.style.color = "#ef4444";
        confidenceBadge.style.background = "rgba(239, 68, 68, 0.1)";
      } else {
        // Safe message
        resultText.textContent = "✓ Safe Message";
        resultText.className = "result-text safe";
        resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        resultIcon.style.color = "#10b981";
        confidenceBadge.textContent = "Not Spam";
        confidenceBadge.style.borderColor = "#10b981";
        confidenceBadge.style.color = "#10b981";
        confidenceBadge.style.background = "rgba(16, 185, 129, 0.1)";
      }

      // Show result card with animation
      resultCard.classList.remove("hidden");
    } catch (error) {
      console.error("Error:", error);

      // Hide loading spinner
      loadingSpinner.classList.add("hidden");

      // Show error message
      resultText.textContent = "⚠️ Connection Error";
      resultText.className = "result-text warning";
      resultIcon.innerHTML = '<i class="fas fa-circle-exclamation"></i>';
      resultIcon.style.color = "#f59e0b";
      confidenceBadge.textContent = "Unable to connect to backend";

      resultCard.classList.remove("hidden");
    }
  });
});

// ============================================
// Close Prediction Result
// ============================================

function closePrediction() {
  const resultCard = document.getElementById("resultCard");
  resultCard.classList.add("hidden");
}

// ============================================
// Navigation Menu Toggle (Mobile)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");

  if (navbarToggle) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active");
      navbarToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll(".navbar-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("active");
        navbarToggle.classList.remove("active");
      });
    });
  }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href^='#']");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
});

// ============================================
// Active Navigation Link Detection
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  // Set active link based on current page
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ============================================
// Intersection Observer for Animations
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document
    .querySelectorAll(
      ".feature-card, .stat-card, .tech-card, .overview-card, .detail-item",
    )
    .forEach((el) => {
      observer.observe(el);
    });
});

console.log("All event listeners initialized");
