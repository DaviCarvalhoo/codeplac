// Codeplac - JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initContactForm();
  initProgressAnimations();
  initTooltips();
});

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleContactSubmit();
    });
  }
}

function handleContactSubmit() {
  const submitBtn = document.getElementById("submitBtn");
  const successToast = document.getElementById("successToast");

  // Show loading state
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `
        <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
        Enviando...
    `;
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Reset form
    document.getElementById("contactForm").reset();

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Show success toast
    if (successToast) {
      const toast = new bootstrap.Toast(successToast);
      toast.show();
    }
  }, 2000);
}

// Progress Bar Animations
function initProgressAnimations() {
  const progressBars = document.querySelectorAll(".progress-bar");

  // Animate progress bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width;

          // Reset and animate
          progressBar.style.width = "0%";
          setTimeout(() => {
            progressBar.style.transition = "width 1s ease-in-out";
            progressBar.style.width = width;
          }, 100);

          observer.unobserve(progressBar);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  progressBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Initialize Bootstrap Tooltips
function initTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add hover effects to cards
document.querySelectorAll(".game-card, .feature-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Navigation active state
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Call on page load
setActiveNavLink();

// Game interaction handlers
document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-primary") && e.target.closest(".game-card")) {
    const gameCard = e.target.closest(".game-card");
    const gameTitle = gameCard.querySelector(".card-title").textContent;

    // Simulate game start
    console.log(`Iniciando jogo: ${gameTitle}`);

    // Add loading animation
    const btn = e.target.closest(".btn-primary");
    const originalText = btn.innerHTML;

    btn.innerHTML = `
            <div class="spinner-border spinner-border-sm me-1" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
            Carregando...
        `;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      alert(`Jogo "${gameTitle}" iniciado! (Demo)`);
    }, 1500);
  }
});

// Add loading animations
function addLoadingAnimation(element) {
  element.classList.add("loading-animation");
  setTimeout(() => {
    element.classList.remove("loading-animation");
  }, 1000);
}

// Intersection Observer for animations
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Add fadeInUp animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.querySelectorAll(".card, .badge, h1, h2, h3").forEach((el) => {
  animationObserver.observe(el);
});
