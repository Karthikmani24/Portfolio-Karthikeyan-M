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
    // Contact data is intentionally not rendered in the initial HTML.
    // It is assembled only after the visitor clicks the reveal control.
    const decode = value => atob(value);
    const email = decode("a2FydGhpbWljaGVsQGdtYWlsLmNvbQ==");
    const phone = decode("KzkxLTk5NDE4NzU4MjA=");

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
  naukrigulf:"https://www.naukrigulf.com/"
};
document.querySelectorAll("[data-profile]").forEach(a=>{const k=a.dataset.profile;if(PROFILE_URLS[k])a.href=PROFILE_URLS[k]});
const progress=document.getElementById("scrollProgress"),backTop=document.getElementById("backTop");
const scrollUI=()=>{const m=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(m?(scrollY/m)*100:0)+"%";if(backTop)backTop.style.opacity=scrollY>500?"1":".45"};addEventListener("scroll",scrollUI,{passive:true});scrollUI();backTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".skill-card,.project-card,.cert-card,.career-card,.timeline article,.glass,.signal-list>div").forEach(e=>{e.classList.add("reveal-on-scroll");observer.observe(e)});
const tel=document.querySelector(".telemetry");if(tel){const o=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;tel.querySelectorAll(".bar i").forEach(b=>b.style.width=getComputedStyle(b).getPropertyValue("--value"));tel.querySelectorAll("[data-counter]").forEach(c=>{const t=+c.dataset.counter;let v=0;const z=setInterval(()=>{v+=Math.ceil(t/30);if(v>=t){v=t;clearInterval(z)}c.textContent=v+"%"},30)});o.disconnect()},{threshold:.25});o.observe(tel)}
const glow=document.getElementById("cursorGlow");if(glow&&matchMedia("(pointer:fine)").matches)addEventListener("pointermove",e=>{glow.style.opacity=".9";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
const theme=document.getElementById("themeToggle");
if(theme){
  const saved=localStorage.getItem("km-theme");
  if(saved==="dark")document.body.classList.add("dark-mode");
  const icon=()=>theme.innerHTML=document.body.classList.contains("dark-mode")?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
  icon();
  theme.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("km-theme",document.body.classList.contains("dark-mode")?"dark":"light");
    icon();
  });
}


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


/* ============================================================
   V8 motion layer — extra profile animation
   ============================================================ */
const v8Status = document.querySelector("[data-security-status]");
if(v8Status){
  const v8States=[
    "SOC STATUS: ONLINE",
    "GRC STATUS: ACTIVE",
    "RISK REGISTER: TRACKED",
    "CONTROL ASSURANCE: READY",
    "AUDIT MODE: ENGAGED",
    "KM SECURITY CORE: ONLINE"
  ];
  let v8i=0;
  setInterval(()=>{
    v8i=(v8i+1)%v8States.length;
    v8Status.animate([{opacity:.2,transform:"translateY(5px)"},{opacity:1,transform:"translateY(0)"}],{duration:380,easing:"ease-out"});
    v8Status.textContent=v8States[v8i];
  },3300);
}

/* Rotating professional headline phrases — visual only. */
const heroTitle=document.querySelector("h1 span");
if(heroTitle){
  const phrases=["governed, monitored and resilient.","risk-aware and audit-ready.","built around strong controls.","ready for security leadership."];
  let hi=0;
  setInterval(()=>{
    hi=(hi+1)%phrases.length;
    heroTitle.animate([{opacity:.15,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:520,easing:"ease-out"});
    heroTitle.textContent=phrases[hi];
  },4800);
}

/* Certification cards get a sequential spotlight sweep. */
const certCards=[...document.querySelectorAll(".credential-card")];
if(certCards.length){
  let ci=0;
  setInterval(()=>{
    certCards.forEach(c=>c.classList.remove("v8-spotlight"));
    certCards[ci%certCards.length].classList.add("v8-spotlight");
    ci++;
  },1900);
}

/* Gentle mouse depth for the light executive UI. */
if(matchMedia("(pointer:fine)").matches){
  const hero=document.querySelector(".hero");
  if(hero){
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      document.documentElement.style.setProperty("--v8-mx",`${(x*6).toFixed(2)}px`);
      document.documentElement.style.setProperty("--v8-my",`${(y*5).toFixed(2)}px`);
    },{passive:true});
  }
}

/* Small KM greeting when the visitor reaches Career Hub. */
const v8Career=document.getElementById("career");
if(v8Career){
  const v8CareerObserver=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      v8Career.classList.add("v8-career-arrived");
      v8CareerObserver.disconnect();
    }
  },{threshold:.25});
  v8CareerObserver.observe(v8Career);
}


/* ============================================================
   V8.1 RESUME-SYNC MOTION LAYER
   ============================================================ */
const v81Impact=document.querySelectorAll('.impact-card,.education-card');
if(v81Impact.length && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach((entry,index)=>{
      if(entry.isIntersecting){
        entry.target.classList.add('v81-visible');
        entry.target.style.setProperty('--v81-delay', `${Math.min(index,5)*90}ms`);
        io.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  v81Impact.forEach(card=>io.observe(card));
}

/* Rotating role signals based on the resume's core profile. */
const v81Kicker=document.querySelector('.hero-kicker');
if(v81Kicker){
  const roleSignals=[
    'CYBERSECURITY • GRC • SECURITY OPERATIONS',
    'INFORMATION SECURITY • RISK • COMPLIANCE',
    'SIEM • INCIDENT RESPONSE • THREAT MANAGEMENT',
    'ISO 27001 • PCI DSS • NPCI • GSMA'
  ];
  let ri=0;
  setInterval(()=>{
    ri=(ri+1)%roleSignals.length;
    v81Kicker.animate([{opacity:.25,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,easing:'ease-out'});
    v81Kicker.textContent=roleSignals[ri];
  },4200);
}

/* Tiny control-packet trail follows pointer on desktop — decorative only. */
if(matchMedia('(pointer:fine)').matches){
  let last=0;
  document.addEventListener('pointermove',e=>{
    const now=performance.now();
    if(now-last<110) return;
    last=now;
    const dot=document.createElement('span');
    dot.className='v81-pointer-packet';
    dot.style.left=`${e.clientX}px`; dot.style.top=`${e.clientY}px`;
    document.body.appendChild(dot);
    setTimeout(()=>dot.remove(),850);
  },{passive:true});
}

/* ============================================================
   V8.2 — EXTRA PROFILE MOTION LAYER
   ============================================================ */
// Keep V7 wording/content; this layer only adds visual motion.
const v82Sections=document.querySelectorAll('.section');
if('IntersectionObserver' in window && v82Sections.length){
  const v82Observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('v82-section-visible');
        v82Observer.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  v82Sections.forEach((section,index)=>{
    section.style.setProperty('--v82-section-delay',`${Math.min(index,8)*70}ms`);
    v82Observer.observe(section);
  });
}

// Small professional security glyphs float in the background.
const v82Glyphs=['<i class="fa-solid fa-shield-halved"></i>','<i class="fa-solid fa-scale-balanced"></i>','<i class="fa-solid fa-certificate"></i>'];
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const field=document.createElement('div');
  field.className='v82-glyph-field';
  field.setAttribute('aria-hidden','true');
  v82Glyphs.forEach((glyph,i)=>{
    const el=document.createElement('span');
    el.className=`v82-glyph g${i+1}`;
    el.innerHTML=glyph;
    field.appendChild(el);
  });
  document.body.appendChild(field);
}

// Project cards briefly show an "audited" visual state on hover.
document.querySelectorAll('.flagship-project,.impact-card,.work-card').forEach(card=>{
  card.addEventListener('pointerenter',()=>card.classList.add('v82-audited'));
  card.addEventListener('pointerleave',()=>card.classList.remove('v82-audited'));
});
