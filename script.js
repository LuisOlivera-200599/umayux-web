const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    menuToggle.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}

const counters = document.querySelectorAll("[data-counter]");

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 60));

        const updateCounter = () => {
          current += increment;

          if (current >= target) {
            el.textContent = target + (target === 100 ? "%" : "+");
          } else {
            el.textContent = current;
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
} else {
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.counter, 10);
    counter.textContent = target + (target === 100 ? "%" : "+");
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "No especificado";
    const empresa = document.getElementById("empresa")?.value.trim() || "No especificado";
    const correo = document.getElementById("correo")?.value.trim() || "No especificado";
    const telefono = document.getElementById("telefono")?.value.trim() || "No especificado";
    const servicio = document.getElementById("servicio")?.value.trim() || "No especificado";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "No especificado";

    const whatsappNumber = "51955989952";
    const whatsappMessage =
      `Hola UMAYUX ASOCIADOS SAC, deseo solicitar una cotización.%0A%0A` +
      `*Datos del solicitante*%0A` +
      `Nombre: ${encodeURIComponent(nombre)}%0A` +
      `Empresa: ${encodeURIComponent(empresa)}%0A` +
      `Correo: ${encodeURIComponent(correo)}%0A` +
      `Teléfono: ${encodeURIComponent(telefono)}%0A%0A` +
      `*Servicio requerido*%0A` +
      `Tipo de servicio: ${encodeURIComponent(servicio)}%0A` +
      `Detalle del proyecto: ${encodeURIComponent(mensaje)}%0A%0A` +
      `Quedo atento(a) a su respuesta.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");
    contactForm.reset();
  });
}

/* =========================================================
   GALERÍA PRO DE CLIENTES
   ========================================================= */

const galleries = {
  lps: {
    title: "LPS GRUPO",
    images: [
      "media/lps-imagenes/lps-1.png",
      "media/lps-imagenes/lps-2.png",
      "media/lps-imagenes/lps-3.png"
    ]
  },
  yofc: {
    title: "YOFC",
    images: [
      "media/yofc-imagenes/yofc-1.png",
      "media/yofc-imagenes/yofc-2.png",
      "media/yofc-imagenes/yofc-3.png"
    ]
  },
  telrad: {
    title: "TELRAD NETWORKS",
    images: [
      "media/telrad-imagenes/telrad-1.png",
      "media/telrad-imagenes/telrad-2.png",
      "media/telrad-imagenes/telrad-3.png"
    ]
  },
  montemar: {
    title: "CONDOMINIO MONTEMAR",
    images: [
      "media/montemar-imagenes/montemar-1.png",
      "media/montemar-imagenes/montemar-2.png",
      "media/montemar-imagenes/montemar-3.png"
    ]
  }
};

const galleryModal = document.getElementById("clientGalleryModal");
const galleryTitle = document.getElementById("galleryTitle");
const galleryClose = document.getElementById("galleryClose");
const galleryMainImg = document.getElementById("galleryMainImg");
const galleryThumbs = document.getElementById("galleryThumbs");
const galleryCounter = document.getElementById("galleryCounter");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryProjectName = document.getElementById("galleryProjectName");

let activeImages = [];
let activeIndex = 0;
let activeTitle = "";

function renderGallery() {
  if (!galleryMainImg || !galleryCounter || !galleryThumbs) return;
  if (!activeImages.length) return;

  galleryMainImg.src = activeImages[activeIndex];
  galleryMainImg.alt = `${activeTitle} imagen ${activeIndex + 1}`;
  galleryCounter.textContent = `${activeIndex + 1} / ${activeImages.length}`;

  galleryThumbs.innerHTML = activeImages.map((src, i) => `
    <button class="gallery-thumb ${i === activeIndex ? "active" : ""}" type="button" data-index="${i}">
      <img src="${src}" alt="Miniatura ${i + 1}" loading="lazy">
    </button>
  `).join("");

  galleryThumbs.querySelectorAll(".gallery-thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      activeIndex = Number(btn.dataset.index);
      renderGallery();
    });
  });
}

function openGallery(key) {
  const item = galleries[key];
  if (!item || !galleryModal) return;

  activeImages = item.images;
  activeIndex = 0;
  activeTitle = item.title;

  if (galleryTitle) galleryTitle.textContent = item.title;
  if (galleryProjectName) galleryProjectName.textContent = `${item.title} · Proyecto visual`;

  renderGallery();

  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (!galleryModal) return;

  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (galleryMainImg) galleryMainImg.src = "";
  if (galleryThumbs) galleryThumbs.innerHTML = "";
}

function moveGallery(step) {
  if (!activeImages.length) return;

  activeIndex = (activeIndex + step + activeImages.length) % activeImages.length;
  renderGallery();
}

document.querySelectorAll("[data-gallery]").forEach(card => {
  card.addEventListener("click", () => {
    openGallery(card.dataset.gallery);
  });
});

if (galleryPrev) {
  galleryPrev.addEventListener("click", () => moveGallery(-1));
}

if (galleryNext) {
  galleryNext.addEventListener("click", () => moveGallery(1));
}

if (galleryClose) {
  galleryClose.addEventListener("click", closeGallery);
}

if (galleryModal) {
  galleryModal.addEventListener("click", e => {
    if (e.target === galleryModal) closeGallery();
  });
}

document.addEventListener("keydown", e => {
  if (!galleryModal || !galleryModal.classList.contains("open")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") moveGallery(-1);
  if (e.key === "ArrowRight") moveGallery(1);
});
