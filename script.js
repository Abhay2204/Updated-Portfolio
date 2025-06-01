window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".journey-step");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  steps.forEach(step => observer.observe(step));
});




const dynamicTexts = [
  "I deliver clean, maintainable, and efficient code tailored to your needs.",
  "I thrive in fast-paced environments and adapt quickly to new challenges.",
  "My strong foundation in both frontend and backend ensures seamless integration.",
  "I am passionate about continuous learning and leveraging new technologies.",
  "I prioritize performance, usability, and user experience in every project."
];

const dynamicTextElement = document.getElementById("dynamic-text");
let index = 0;

// Start hidden, no animation
dynamicTextElement.style.opacity = 0;

function flipText() {
  dynamicTextElement.classList.add('flip-out');

  setTimeout(() => {
    dynamicTextElement.textContent = dynamicTexts[index];
    index = (index + 1) % dynamicTexts.length;

    dynamicTextElement.classList.remove('flip-out');
    dynamicTextElement.classList.add('flip-in');
  }, 600);

  setTimeout(() => {
    dynamicTextElement.classList.remove('flip-in');
  }, 1200);
}

// Initialize after short delay to let browser register styles
setTimeout(() => {
  dynamicTextElement.textContent = dynamicTexts[0];
  dynamicTextElement.classList.add('flip-in');
  dynamicTextElement.style.opacity = 1;  // show text now
  index = 1;

  setInterval(flipText, 4000);
}, 100);


function typeCode(element, text, speed = 40, callback) {
    let i = 0;
    element.textContent = ''; // Clear existing
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        i++;
        setTimeout(type, speed);
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  // Initialize all skill cards
  document.querySelectorAll('.skill-card').forEach(card => {
    const codeSnippet = card.querySelector('.code-snippet');
    const codeText = card.getAttribute('data-code');

    // On hover: show and type code
    card.addEventListener('mouseenter', () => {
      card.classList.add('active');
      typeCode(codeSnippet, codeText);
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('active');
      codeSnippet.textContent = '';
    });

    // For mobile/touch devices: toggle on tap/click
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) {
        card.classList.remove('active');
        codeSnippet.textContent = '';
      } else {
        // Remove active from all cards to allow only one open
        document.querySelectorAll('.skill-card.active').forEach(activeCard => {
          activeCard.classList.remove('active');
          activeCard.querySelector('.code-snippet').textContent = '';
        });
        card.classList.add('active');
        typeCode(codeSnippet, codeText);
      }
    });

    // Accessibility: toggle on Enter key
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });



  

    document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      if(card.classList.contains('active')) {
        card.classList.remove('active');
      } else {
        // Close others
        document.querySelectorAll('.project-card.active').forEach(activeCard => {
          activeCard.classList.remove('active');
        });
        card.classList.add('active');
      }
    });

    // Keyboard accessibility (Enter/Space toggles)
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

   document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });

  


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("lightboxModal");
  const mainImg = document.getElementById("lightbox-main");
  const thumbs = document.getElementById("lightbox-thumbs");
  const closeBtn = document.querySelector(".lightbox-close");
  const fullscreenBtn = document.getElementById("fullscreenToggle");

  let images = [];
  let index = 0;
  let zoom = 1;
  let startX = 0;
  let endX = 0;

  // Existing code (modal open, image change, etc.) goes here...

  // === Touch/Swipe Support ===
  mainImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  mainImg.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      if (endX < startX) {
        index = (index + 1) % images.length;
      } else {
        index = (index - 1 + images.length) % images.length;
      }
      zoom = 1;
      setMainImage(index);
    }
  });

  // === Fullscreen Toggle ===
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      modal.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  });

  // Optional: Exit fullscreen on modal close
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    if (document.fullscreenElement) document.exitFullscreen();
  });

  // Optional: Escape exits fullscreen too
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.fullscreenElement) {
      document.exitFullscreen();
    }
  });
});






const cursor = document.querySelector('.custom-cursor');
const trail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

// Update cursor position instantly
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.setProperty('--tx', `${mouseX - 12}px`);
  cursor.style.setProperty('--ty', `${mouseY - 12}px`);
  cursor.style.transform = `translate(${mouseX - 12}px, ${mouseY - 12}px)`;
});

// Animate trailing circle smoothly
function animate() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;

  const waveX = Math.sin(Date.now() * 0.02) * 2;
  const waveY = Math.cos(Date.now() * 0.02) * 2;

  trail.style.transform = `translate(${trailX - 8 + waveX}px, ${trailY - 8 + waveY}px)`;

  requestAnimationFrame(animate);
}

animate();

// Hover effect on links and buttons
const hoverTargets = document.querySelectorAll('a, button, input[type="button"], input[type="submit"]');

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovered');
  });
});

// Click animation
document.addEventListener('mousedown', () => {
  cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('clicking');
});


