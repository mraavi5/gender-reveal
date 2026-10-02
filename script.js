// ====== CUSTOMIZE YOUR EVENT HERE ======
const revealDate = new Date("2026-11-07T15:00:00-05:00");
// Event date: November 7, 2026 at 3:00 PM Eastern Time.
// ========================================

function updateCountdown() {
  const now = new Date();
  const distance = revealDate - now;

  if (isNaN(revealDate.getTime())) {
    document.getElementById("countdown").innerHTML =
      '<p style="grid-column:1/-1">Set your reveal date in script.js to start the countdown.</p>';
    return;
  }

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      '<p style="grid-column:1/-1;font-weight:700;font-size:1.2rem">The big reveal is here! 🎉💗💙</p>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Team vote is intentionally stored only in the visitor's browser.
// It does not collect or transmit personal information.
document.querySelectorAll(".team-button").forEach(button => {
  button.addEventListener("click", () => {
    const team = button.dataset.team;
    localStorage.setItem("babyRevealGuess", team);

    const message = document.getElementById("vote-message");
    message.textContent = team === "girl"
      ? "💗 Your guess is Team Girl!"
      : "💙 Your guess is Team Boy!";

    document.querySelectorAll(".team-button").forEach(b => b.style.boxShadow = "none");
    button.style.boxShadow = "0 0 0 4px rgba(100,100,100,.10)";
  });
});

const savedGuess = localStorage.getItem("babyRevealGuess");
if (savedGuess) {
  const button = document.querySelector(`[data-team="${savedGuess}"]`);
  if (button) {
    button.click();
  }
}
