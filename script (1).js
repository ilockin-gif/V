// ---- Edit these to make the page yours ----
const DISCORD_TAG = "victoria#0000"; // swap in your real Discord username
const GAMES = [
  { name: "Obby but it's actually fair", status: "in progress" },
  { name: "Skate Park Tycoon", status: "live" },
  { name: "Untitled dance game", status: "planning" },
];
// --------------------------------------------

document.getElementById("year").textContent = new Date().getFullYear();

// Build the games list from the array above
const gameList = document.getElementById("game-list");
GAMES.forEach((game) => {
  const li = document.createElement("li");

  const name = document.createElement("span");
  name.textContent = game.name;

  const status = document.createElement("span");
  status.className = "status" + (game.status === "live" ? " status--live" : "");
  status.textContent = game.status;

  li.append(name, status);
  gameList.appendChild(li);
});

// Copy Discord tag to clipboard
const copyBtn = document.getElementById("copy-btn");
const copyMsg = document.getElementById("copy-msg");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(DISCORD_TAG);
    copyMsg.textContent = `copied "${DISCORD_TAG}" to your clipboard`;
  } catch {
    copyMsg.textContent = `my discord tag is ${DISCORD_TAG}`;
  }
});

// One entrance moment for the hero, respecting reduced-motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const heroEls = document.querySelectorAll(".hero__eyebrow, .hero__name, .hero__line");
  heroEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  });
}
