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

const PROFILE_URLS={naukri:"https://www.naukri.com/",naukrigulf:"https://www.naukrigulf.com/"};
document.querySelectorAll("[data-profile]").forEach(a=>{const k=a.dataset.profile;if(PROFILE_URLS[k])a.href=PROFILE_URLS[k]});
const progress=document.getElementById("scrollProgress"),backTop=document.getElementById("backTop");
const scrollUI=()=>{const m=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(m?(scrollY/m)*100:0)+"%";if(backTop)backTop.style.opacity=scrollY>500?"1":".45"};addEventListener("scroll",scrollUI,{passive:true});scrollUI();backTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".skill-card,.project-card,.cert-card,.career-card,.timeline article,.glass,.signal-list>div").forEach(e=>{e.classList.add("reveal-on-scroll");observer.observe(e)});
const tel=document.querySelector(".telemetry");if(tel){const o=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;tel.querySelectorAll(".bar i").forEach(b=>b.style.width=getComputedStyle(b).getPropertyValue("--value"));tel.querySelectorAll("[data-counter]").forEach(c=>{const t=+c.dataset.counter;let v=0;const z=setInterval(()=>{v+=Math.ceil(t/30);if(v>=t){v=t;clearInterval(z)}c.textContent=v+"%"},30)});o.disconnect()},{threshold:.25});o.observe(tel)}
const glow=document.getElementById("cursorGlow");if(glow&&matchMedia("(pointer:fine)").matches)addEventListener("pointermove",e=>{glow.style.opacity=".9";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
const theme=document.getElementById("themeToggle");if(theme){if(localStorage.getItem("km-theme")==="light")document.body.classList.add("light-mode");const icon=()=>theme.innerHTML=document.body.classList.contains("light-mode")?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';icon();theme.addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("km-theme",document.body.classList.contains("light-mode")?"light":"dark");icon()})}
