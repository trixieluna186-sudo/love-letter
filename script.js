const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const modal = document.getElementById('successModal');
const closeBtn = document.getElementById('closeBtn');

// Playful phrases when trying to click No
const phrases = [
  "Are you sure?",
  "Think again! 😉",
  "Nice try! 😜",
  "Nope, can't click me!",
  "Try again! ❤️",
  "You love me! 🥰",
  "Almost got it!"
];

// Move the "No" button when hovered or touched
function moveNoButton() {
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate random position inside the screen
  const maxX = window.innerWidth - btnRect.width - 20;
  const maxY = window.innerHeight - btnRect.height - 20;

  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Change button text playfully
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  noBtn.innerText = randomPhrase;
}

// Event listeners for No button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

// Click event for Yes button
yesBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  createHeartExplosion();
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Create floating hearts periodically
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerText = ['💖', '💕', '🌸', '✨', '💗'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createFloatingHeart, 400);

// Burst of hearts when clicking Yes
function createHeartExplosion() {
  for (let i = 0; i < 30; i++) {
    setTimeout(createFloatingHeart, i * 50);
  }
}

/* =========================================================
   ANTI-INSPECT & NO-BUTTON REMOVAL GUARD
   ========================================================= */

// 1. Disable Right-Click (Prevents Inspect Element context menu)
document.addEventListener('contextmenu', (e) => e.preventDefault());

// 2. Disable Keyboard Shortcuts for Developer Tools (F12, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
  ) {
    e.preventDefault();
  }
});

// 3. Detect if "Yes" button is deleted or hidden via Developer Tools
const observer = new MutationObserver(() => {
  const currentYesBtn = document.getElementById('yesBtn');
  if (
    !currentYesBtn ||
    currentYesBtn.style.display === 'none' ||
    currentYesBtn.style.visibility === 'hidden' ||
    currentYesBtn.style.opacity === '0'
  ) {
    alert("Nice try! You can't delete or hide the Yes button! 😉❤️");
    location.reload(); // Instantly restores the page
  }
});

// Start watching the page body for changes
observer.observe(document.body, { childList: true, subtree: true, attributes: true });