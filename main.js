
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const revealTargets = document.querySelectorAll(
  ".hero__text, .section-header, .card, .about-text, .founder-card, .contact-form"
);

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");
  target.style.setProperty("--reveal-delay", `${Math.min(index * 80, 400)}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const swiper = new Swiper(".swiper", {
  loop: true,

  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission for debugging

  const formData = new FormData(this); // Collect form data

  fetch(this.action, {
    method: "POST",
    body: formData,
  })
  .then(response => {
    // Check if the response is JSON
    return response.json().catch(() => {
      throw new Error("Invalid JSON response");
    });
  })
  .then(data => {
    if (data.success) {
      alert("Form submitted successfully!");
    } else {
      console.error("Error Message: ", data.message);
      alert("Error: " + data.message);
    }
  })
  .catch(error => {
    console.error("Form submission failed: ", error);
    alert("Form submission failed: " + error.message);
  });
});
