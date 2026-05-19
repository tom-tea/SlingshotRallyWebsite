const gallery = document.getElementById("gallery");
const move = document.getElementById("gallery-blob");

// Initialize as null so we can check if the mouse has actually entered the page yet
let lastClientX = null;
let lastClientY = null;

function updateBlobPosition() {
    // If the mouse hasn't moved onto the screen yet, do nothing on scroll
    if (lastClientX === null || lastClientY === null) return;

    const rect = gallery.getBoundingClientRect();

    const x = lastClientX - rect.left;
    const y = lastClientY - rect.top;

    move.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 15000, fill: "forwards" });
}

// Track mouse movement and capture initial coordinates immediately
document.addEventListener("pointermove", event => {
    lastClientX = event.clientX;
    lastClientY = event.clientY;
    
    updateBlobPosition();
}, { passive: true });

// Handle the scroll event safely
window.addEventListener("scroll", () => {
    updateBlobPosition();
}, { passive: true });

// Run this right before observing the containers
document.querySelectorAll('.stagger-container').forEach(container => {
  const items = container.querySelectorAll('.stagger-item');
  items.forEach((item, index) => {
    item.style.setProperty('--i', index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('.stagger-container');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the container is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the class to the container, which kicks off the CSS transitions
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  containers.forEach(container => {
    observer.observe(container);
  });
});