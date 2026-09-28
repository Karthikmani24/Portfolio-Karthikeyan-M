document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     CONTACT DATA
     Change ONLY these two values.
     ================================ */
  const CONTACT = {
    email: ["karthimichel", "gmail.com"].join("@"),
    phone: ["+91", "99418", "75820"].join(" ")
  };

  /* ================================
     YEAR
     ================================ */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ================================
     MOBILE MENU
     ================================ */
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  menuToggle?.addEventListener("click", () => {
    const open = siteNav?.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(!!open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  });

  siteNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open menu");
      const icon = menuToggle?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });

  /* ================================
     ACTIVE NAVIGATION
     ================================ */
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => navObserver.observe(section));

  /* ================================
     SCROLL REVEAL
     ================================ */
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ================================
     CONTACT REVEAL
     ================================ */
  const revealButtons = [
    document.getElementById("revealContactTop"),
    document.getElementById("revealContact")
  ].filter(Boolean);

  const privateContact = document.getElementById("privateContact");
  const emailLink = document.getElementById("emailLink");
  const phoneLink = document.getElementById("phoneLink");

  function revealContactDetails() {
    if (!privateContact || !emailLink || !phoneLink) return;

    emailLink.textContent = CONTACT.email;
    emailLink.href = `mailto:${CONTACT.email}`;

    const phoneHref = CONTACT.phone.replace(/\s/g, "");
    phoneLink.textContent = CONTACT.phone;
    phoneLink.href = `tel:${phoneHref}`;

    privateContact.hidden = false;

    revealButtons.forEach(button => {
      button.innerHTML = '<i class="fa-solid fa-unlock"></i> Contact Details Revealed';
      button.disabled = true;
      button.style.opacity = "0.75";
      button.style.cursor = "default";
    });
  }

  revealButtons.forEach(button => {
    button.addEventListener("click", revealContactDetails);
  });

  /* ================================
     FORUM SEARCH + FILTER
     ================================ */
  const forumSearch = document.getElementById("forumSearch");
  const forumCategory = document.getElementById("forumCategory");
  const forumCards = [...document.querySelectorAll(".forum-card")];
  const forumEmpty = document.getElementById("forumEmpty");

  function filterForum() {
    const term = (forumSearch?.value || "").toLowerCase().trim();
    const category = forumCategory?.value || "all";
    let visibleCount = 0;

    forumCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const matchesText = !term || text.includes(term);
      const matchesCategory =
        category === "all" || card.dataset.category === category;

      const visible = matchesText && matchesCategory;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    if (forumEmpty) forumEmpty.hidden = visibleCount !== 0;
  }

  forumSearch?.addEventListener("input", filterForum);
  forumCategory?.addEventListener("change", filterForum);

  /* ================================
     FORUM MODAL
     ================================ */
  const forumModal = document.getElementById("forumModal");
  const forumModalTitle = document.getElementById("forumModalTitle");
  const forumModalContent = document.getElementById("forumModalContent");
  const forumClose = document.getElementById("forumClose");

  function openForumModal(button) {
    if (!forumModal) return;

    if (forumModalTitle) {
      forumModalTitle.textContent =
        button.dataset.title || "Discussion";
    }

    if (forumModalContent) {
      forumModalContent.textContent =
        button.dataset.content || "Discussion details coming soon.";
    }

    forumModal.hidden = false;
    document.body.classList.add("modal-open");
    forumClose?.focus();
  }

  function closeForumModal() {
    if (!forumModal) return;
    forumModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".forum-open").forEach(button => {
    button.addEventListener("click", () => openForumModal(button));
  });

  forumClose?.addEventListener("click", closeForumModal);

  forumModal?.addEventListener("click", event => {
    if (event.target === forumModal) closeForumModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && forumModal && !forumModal.hidden) {
      closeForumModal();
    }
  });

});
