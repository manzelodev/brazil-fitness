
/* =========================================
   BRASIL FITNESS — MAIN.JS
   Lucide Icons + GSAP + ScrollTrigger
========================================= */

function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navegacao");
  if (!toggle || !nav) return;

  const desktop = window.matchMedia("(min-width: 62rem)");

  function setExpanded(expanded) {
    toggle.setAttribute("aria-expanded", String(expanded));
    nav.hidden = !desktop.matches && !expanded;
  }

  function syncViewport() {
    const focusInNav = nav.contains(document.activeElement);
    toggle.hidden = desktop.matches;
    setExpanded(false);
    if (focusInNav && nav.hidden) toggle.focus();
  }

  toggle.addEventListener("click", () => setExpanded(nav.hidden));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setExpanded(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !toggle.hidden && !nav.hidden) {
      setExpanded(false);
      toggle.focus();
    }
  });
  desktop.addEventListener("change", syncViewport);
  syncViewport();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();

  const mapPreview = document.querySelector(".map__preview");
  const mapFrame = document.querySelector(".map iframe");
  if (mapPreview && mapFrame) {
    mapPreview.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      mapFrame.src = mapFrame.dataset.src;
      mapFrame.hidden = false;
      mapPreview.hidden = true;
      mapFrame.focus();
    });
  }

  /* =========================================
     1. LUCIDE ICONS
  ========================================= */

  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        "stroke-width": 2
      }
    });
  } else {
    console.warn("Lucide Icons não carregou.");
  }


  /* =========================================
     2. ACESSIBILIDADE
     Respeitar preferência de movimento reduzido
  ========================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;


  /* =========================================
     3. GSAP + SCROLLTRIGGER
  ========================================= */

  if (!window.gsap || !window.ScrollTrigger) {
    console.warn(
      "GSAP ou ScrollTrigger não carregou."
    );
    return;
  }

  gsap.registerPlugin(ScrollTrigger);


  /* =========================================
     4. ANIMAÇÃO DA HERO SECTION
  ========================================= */

  const heroItems = gsap.utils.toArray(
    '[data-animate="hero"]'
  );

  if (heroItems.length) {
    gsap.from(heroItems, {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      clearProps: "all"
    });
  }


  /* =========================================
     5. ANIMAÇÕES DE ENTRADA NO SCROLL
  ========================================= */

  const scrollItems = gsap.utils.toArray(
    '[data-animate="fade-up"], [data-animate="fade-in"], [data-animate="stagger"]'
  );

  scrollItems.forEach((element) => {

    const fadeOnly =
      element.dataset.animate === "fade-in";

    const grouped = element.dataset.animate === "stagger";
    gsap.from(grouped ? element.children : element, {
      opacity: 0,
      y: fadeOnly ? 0 : 24,
      stagger: grouped ? 0.09 : 0,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",

      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      }
    });

  });

});
