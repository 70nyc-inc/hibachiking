const header = document.querySelector(".site-header");
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const toggle = document.querySelector(".nav-toggle");
if (toggle && header) {
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  header.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => header.classList.remove("open"));
  });
}

document.querySelectorAll(".faq-q").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const img = lightbox.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      img.src = el.dataset.lightbox;
      img.alt = el.dataset.alt || "";
      lightbox.classList.add("open");
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const body = `Name: ${data.get("name") || ""}\nPhone: ${data.get("phone") || ""}\nCity: ${data.get("city") || ""}\n\n${data.get("message") || ""}`;
    window.location.href = `mailto:Hibachikingus@gmail.com?subject=${encodeURIComponent("Hibachi King party inquiry")}&body=${encodeURIComponent(body)}`;
  });
}

function initEstimate() {
  const page = document.querySelector(".estimate");
  if (!page) return;
  const fields = ["est-adults", "est-kids", "est-scallop", "est-filet", "est-lobster", "est-extra-protein", "est-noodles", "est-edamame", "est-gyoza", "est-travel"]
    .reduce((acc, id) => { acc[id] = document.getElementById(id); return acc; }, {});
  const receipt = document.getElementById("est-receipt");
  const rates = { adult: 50, kid: 25, minFood: 500, scallop: 5, filet: 5, lobster: 15, extra: 10, noodles: 4, edamame: 5, gyoza: 10 };
  const money = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const val = (el) => Math.max(0, Math.floor(Number(el?.value) || 0));

  function calculate() {
    const adults = val(fields["est-adults"]);
    const kids = val(fields["est-kids"]);
    const scallop = val(fields["est-scallop"]);
    const filet = val(fields["est-filet"]);
    const lobster = val(fields["est-lobster"]);
    const extra = val(fields["est-extra-protein"]);
    const noodles = val(fields["est-noodles"]);
    const edamame = val(fields["est-edamame"]);
    const gyoza = val(fields["est-gyoza"]);
    const travel = Math.max(0, Number(fields["est-travel"]?.value) || 0);
    const food = adults * rates.adult + kids * rates.kid + scallop * rates.scallop + filet * rates.filet + lobster * rates.lobster + extra * rates.extra + noodles * rates.noodles + edamame * rates.edamame + gyoza * rates.gyoza;
    const below = adults + kids > 0 && food < rates.minFood;
    const total = food + travel;
    const tips = [20, 25, 30].map((pct) => `<li>${pct}% gratuity: ${money(total * pct / 100)}</li>`).join("");
    receipt.innerHTML = `<h2>Estimate</h2>
      <p>${adults} adults · ${kids} kids 12 and under</p>
      <ul>
        <li>Adults: ${adults} × $50 = ${money(adults * rates.adult)}</li>
        <li>Kids: ${kids} × $25 = ${money(kids * rates.kid)}</li>
        <li>Upgrades and extras: ${money(food - adults * rates.adult - kids * rates.kid)}</li>
        <li>Travel: ${money(travel)}</li>
      </ul>
      <p class="total">Cash total ${money(total)}</p>
      ${below ? `<p class="note">A $${rates.minFood} minimum applies to every party.</p>` : ""}
      <p>Suggested gratuity</p>
      <ul>${tips}</ul>
      <p class="note">Gratuity is not included. Price may vary by location.</p>`;
    return `Hibachi King estimate\n${adults} adults, ${kids} kids\nFood ${money(food)}\nTravel ${money(travel)}\nCash total ${money(total)}\nGratuity not included.`;
  }

  page.querySelectorAll("[data-step-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.stepTarget);
      input.value = String(Math.max(0, val(input) + Number(button.dataset.stepDelta)));
      calculate();
    });
  });
  Object.values(fields).forEach((el) => el?.addEventListener("input", calculate));
  page.querySelectorAll("[data-travel-preset]").forEach((chip) => {
    chip.addEventListener("click", () => {
      fields["est-travel"].value = chip.dataset.travelPreset;
      page.querySelectorAll("[data-travel-preset]").forEach((item) => item.classList.toggle("is-active", item === chip));
      calculate();
    });
  });
  document.getElementById("est-reset")?.addEventListener("click", () => {
    Object.values(fields).forEach((el) => { if (el) el.value = "0"; });
    page.querySelectorAll("[data-travel-preset]").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.travelPreset === "0"));
    calculate();
  });
  document.getElementById("est-copy")?.addEventListener("click", async (event) => {
    const text = calculate();
    await navigator.clipboard?.writeText(text);
    event.currentTarget.textContent = "Copied";
  });
  calculate();
}
initEstimate();

function initMotion() {
  const line = document.querySelector(".scroll-line");
  if (line && motionOK) {
    const paintLine = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      line.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    paintLine();
    window.addEventListener("scroll", paintLine, { passive: true });
  }

  const stage = document.querySelector(".stage");
  if (stage) document.body.classList.add("has-stage");
  if (stage && motionOK) {
    const sparks = stage.querySelector(".sparks");
    if (sparks) for (let i = 0; i < 28; i++) {
      const spark = document.createElement("span");
      spark.className = "spark";
      const size = Math.random() * 7 + 3;
      spark.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${(Math.random() * 3.2 + 2.6).toFixed(2)}s;animation-delay:${(Math.random() * 4.2).toFixed(2)}s;`;
      sparks.appendChild(spark);
    }
    const photo = stage.querySelector(".stage-photo");
    const copy = stage.querySelector(".stage-inner");
    window.addEventListener("scroll", () => {
      photo.style.translate = `0 ${Math.min(window.scrollY, 800) * 0.22}px`;
    }, { passive: true });
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      copy.style.translate = `${(x * -16).toFixed(1)}px ${(y * -10).toFixed(1)}px`;
    });
  }

  const figure = document.querySelector(".splash-figure");
  if (figure && motionOK) {
    const frame = document.createElement("div");
    frame.className = "photo-frame";
    const photo = figure.querySelector("img");
    figure.insertBefore(frame, photo);
    frame.appendChild(photo);
    const motes = document.createElement("div");
    motes.className = "motes";
    frame.appendChild(motes);
    for (let i = 0; i < 16; i++) {
      const mote = document.createElement("span");
      mote.className = "mote";
      const size = Math.random() * 4 + 2;
      mote.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${(Math.random() * 3 + 3.2).toFixed(2)}s;animation-delay:${(Math.random() * 4).toFixed(2)}s;`;
      motes.appendChild(mote);
    }
    window.addEventListener("scroll", () => {
      figure.style.translate = `0 ${Math.min(window.scrollY, 700) * 0.08}px`;
    }, { passive: true });
  }

  const reveal = document.querySelectorAll(".band-head, .timeline li, .board, .place-index li, .faq-item, .sheet, .frames button, .book-panel, .footer-grid > *, .prose > *, .receipt, .est-line, .side-photo, .reel a, .city-photo, .state-card, .price-card, .menu-section-card, .blog-card");
  if (!motionOK || !("IntersectionObserver" in window)) {
    reveal.forEach((el) => el.classList.add("is-in"));
    return;
  }
  reveal.forEach((el) => {
    const siblings = el.parentElement ? [...el.parentElement.children].filter((node) => node.matches && node.matches(el.tagName)) : [];
    const index = Math.max(0, siblings.indexOf(el));
    el.style.setProperty("--d", `${Math.min(index, 6) * 0.08}s`);
    el.classList.add("will-rise");
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
  reveal.forEach((el) => observer.observe(el));

  document.querySelectorAll(".facts b").forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    const end = Number(match[2]);
    const paint = (value) => { el.textContent = `${match[1]}${value}${match[3]}`; };
    if (!motionOK) return;
    paint(0);
    const counter = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      counter.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 1200);
        paint(Math.round(end * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    counter.observe(el);
  });
}
initMotion();
