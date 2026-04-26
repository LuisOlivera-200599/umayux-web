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
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll("[data-counter]");
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
    const whatsappMessage = `Hola UMAYUX ASOCIADOS SAC, deseo solicitar una cotización.%0A%0A` +
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
