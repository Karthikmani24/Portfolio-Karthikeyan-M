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

const PROFILE_URLS={
  linkedin:"https://www.linkedin.com/",
  bayt:"https://www.bayt.com/",
  gulftalent:"https://www.gulftalent.com/",
  naukri:"https://www.naukri.com/",
  naukrigulf:"https://www.naukrigulf.com/",
  gulfcareers:"https://gulfcareers.com/",
  gulfjobs:"https://www.gulfjobs.com/"
};
document.querySelectorAll("[data-profile]").forEach(a=>{const k=a.dataset.profile;if(PROFILE_URLS[k])a.href=PROFILE_URLS[k]});

const recruiterData={
 linkedin:{title:"LinkedIn",description:"Professional profile, cybersecurity experience, certifications and recruiter networking.",url:PROFILE_URLS.linkedin},
 bayt:{title:"Bayt",description:"Middle East career platform for information security, cybersecurity and GRC opportunities.",url:PROFILE_URLS.bayt},
 gulftalent:{title:"GulfTalent",description:"GCC-focused career channel for cybersecurity, GRC, compliance and security leadership opportunities.",url:PROFILE_URLS.gulftalent},
 naukrigulf:{title:"Naukri Gulf",description:"Gulf-focused career channel covering UAE, Saudi Arabia, Qatar, Oman, Bahrain and Kuwait opportunities.",url:PROFILE_URLS.naukrigulf},
 naukri:{title:"Naukri",description:"India-focused career platform for cybersecurity, GRC, compliance and information security opportunities.",url:PROFILE_URLS.naukri},
 gulfcareers:{title:"Gulf Careers",description:"Gulf-region job platform for exploring career opportunities and maintaining a Gulf-focused professional presence.",url:PROFILE_URLS.gulfcareers},
 gulfjobs:{title:"GulfJobs",description:"Gulf-region job platform covering opportunities across UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain.",url:PROFILE_URLS.gulfjobs}
};
const preview=document.getElementById("recruiterPreview");
const previewLink=document.getElementById("recruiterPreviewLink");
if(preview&&previewLink){
 document.querySelectorAll(".recruiter-tab-v9").forEach(tab=>tab.addEventListener("click",()=>{
   document.querySelectorAll(".recruiter-tab-v9").forEach(x=>x.classList.remove("active"));
   tab.classList.add("active");
   const d=recruiterData[tab.dataset.profile]; if(!d)return;
   preview.classList.remove("channel-flash"); void preview.offsetWidth; preview.classList.add("channel-flash");
   preview.querySelector("h4").textContent=d.title; preview.querySelector("p").textContent=d.description;
   previewLink.href=d.url;
 }));
}
const progress=document.getElementById("scrollProgress"),backTop=document.getElementById("backTop");
const scrollUI=()=>{const m=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(m?(scrollY/m)*100:0)+"%";if(backTop)backTop.style.opacity=scrollY>500?"1":".45"};addEventListener("scroll",scrollUI,{passive:true});scrollUI();backTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".skill-card,.project-card,.cert-card,.career-card,.timeline article,.glass,.signal-list>div").forEach(e=>{e.classList.add("reveal-on-scroll");observer.observe(e)});
const tel=document.querySelector(".telemetry");if(tel){const o=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;tel.querySelectorAll(".bar i").forEach(b=>b.style.width=getComputedStyle(b).getPropertyValue("--value"));tel.querySelectorAll("[data-counter]").forEach(c=>{const t=+c.dataset.counter;let v=0;const z=setInterval(()=>{v+=Math.ceil(t/30);if(v>=t){v=t;clearInterval(z)}c.textContent=v+"%"},30)});o.disconnect()},{threshold:.25});o.observe(tel)}
const glow=document.getElementById("cursorGlow");if(glow&&matchMedia("(pointer:fine)").matches)addEventListener("pointermove",e=>{glow.style.opacity=".9";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
const theme=document.getElementById("themeToggle");if(theme){if(localStorage.getItem("km-theme")==="light")document.body.classList.add("light-mode");const icon=()=>theme.innerHTML=document.body.classList.contains("light-mode")?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';icon();theme.addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("km-theme",document.body.classList.contains("light-mode")?"light":"dark");icon()})}


/* V5 motion layer: subtle pointer tilt for capability/work/credential cards. */
if (matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".capability-card,.work-card,.credential-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.setProperty("--rx", `${(-y*3).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(x*3).toFixed(2)}deg`);
      card.style.transform = `perspective(700px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* V5 animated section labels — keeps the interface alive without excessive motion. */
document.querySelectorAll(".section-heading h2").forEach((heading, idx) => {
  heading.style.setProperty("--heading-delay", `${idx * 90}ms`);
});

/* Career Hub nodes get a soft pulse when the section enters the viewport. */
const careerHub = document.getElementById("career");
if (careerHub) {
  const hubObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      careerHub.classList.add("career-live");
      hubObserver.disconnect();
    }
  }, {threshold:.2});
  hubObserver.observe(careerHub);
}

/* V5-2 ambient security field pointer parallax */
if (matchMedia("(pointer:fine)").matches) {
  const ambient = document.querySelector(".ambient-field");
  if (ambient) window.addEventListener("pointermove", e => {
    const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
    ambient.style.transform=`translate3d(${(x*10).toFixed(1)}px,${(y*7).toFixed(1)}px,0)`;
  },{passive:true});
}


/* ============================================================
   V7 interaction layer — professional/fun profile animation
   ============================================================ */
const funAnim = document.querySelector('.fun-security-animation');
if (funAnim) {
  const messages = [
    'Exception detected…',
    'KM bot chasing risk…',
    'Control verified ✓',
    'Back to monitoring…'
  ];
  let msgIndex = 0;
  const msg = funAnim.querySelector('.fun-message');
  if (msg) {
    setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      msg.textContent = messages[msgIndex];
    }, 1750);
  }
}

/* Small visual "audit stamp" interaction on capability/project cards. */
document.querySelectorAll('.capability-card,.work-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('v7-inspected'));
  card.addEventListener('mouseleave', () => card.classList.remove('v7-inspected'));
});


/* V9 fresh interaction layer — playful cyber ambience, recruiter tabs and richer section motion. */
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const buddy=document.querySelector('.v9-cyber-buddy');
 if(buddy&&!reduce){
   const lines=['risk spotted!','control verified ✓','audit mode: ON','KM bot: scanning…','back to GRC!'];
   let n=0; const bubble=buddy.querySelector('.buddy-bubble');
   setInterval(()=>{n=(n+1)%lines.length;if(bubble){bubble.classList.remove('bubble-pop');void bubble.offsetWidth;bubble.textContent=lines[n];bubble.classList.add('bubble-pop')}},2600);
 }
 document.querySelectorAll('.v9-about,.v9-experience,.v9-credentials,.v9-career').forEach(section=>{
   const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){section.classList.add('section-live-v9');io.disconnect()}},{threshold:.15}); io.observe(section);
 });
})();
