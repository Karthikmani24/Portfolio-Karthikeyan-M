const roles = [
  "Cybersecurity Professional",
  "GRC & Information Security",
  "Security Operations Leader",
  "Risk & Compliance Specialist"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeRole() {
  const role = roles[roleIndex];

  if (!typing) return;

  typing.textContent = deleting
    ? role.slice(0, charIndex--)
    : role.slice(0, charIndex++);

  if (!deleting && charIndex > role.length) {
    deleting = true;
    setTimeout(typeRole, 1200);
    return;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
  }

  setTimeout(typeRole, deleting ? 45 : 70);
}

typeRole();

const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}
