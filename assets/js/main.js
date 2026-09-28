const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* Contact details are intentionally assembled only after the visitor clicks. */
const reveal = document.getElementById("revealContact");
const privateContact = document.getElementById("privateContact");

if (reveal && privateContact) {
  reveal.addEventListener("click", () => {
    const email = ["YOUR_EMAIL_HERE"].join("");
    const phone = ["YOUR_PHONE_HERE"].join("");

    const emailLink = document.getElementById("emailLink");
    const phoneLink = document.getElementById("phoneLink");

    emailLink.textContent = email;
    emailLink.href = "mailto:" + email;
    phoneLink.textContent = phone;
    phoneLink.href = "tel:" + phone.replace(/[^\d+]/g, "");

    privateContact.hidden = false;
    reveal.innerHTML = '<i class="fa-solid fa-lock-open"></i> Contact Details Revealed';
    reveal.disabled = true;
  });
}

/* Rotating SOC/GRC status text — visual only, not a live monitoring feed. */
const status = document.querySelector("[data-security-status]");
if (status) {
  const states = [
    "SOC STATUS: ONLINE",
    "GRC STATUS: ACTIVE",
    "THREAT MONITORING: READY",
    "SECURITY POSTURE: ENGAGED"
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % states.length;
    status.textContent = states[i];
  }, 4200);
}
