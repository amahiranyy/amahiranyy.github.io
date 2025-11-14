// --- SCROLL SUAVE EN ENLACES ---
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// --- EFECTO PARALLAX EN EL HERO ---
document.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero__fondo');
  if (!bg) return;
  const y = window.scrollY * 0.2;
  bg.style.transform = `translateY(${y}px)`;
});

// --- ALERTA DE FORMULARIO DE CONTACTO ---
const formulario = document.querySelector('#formularioContacto');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  alertPlaceholder.innerHTML = '';
  alertPlaceholder.append(wrapper);
};

if (formulario) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    if (formulario.checkValidity()) {
      appendAlert('Mensaje enviado correctamente.', 'success');
      formulario.reset();
    } else {
      formulario.reportValidity();
    }
  });
}

// --- NAVBAR: OCULTAR AL HACER SCROLL HACIA ABAJO Y MOSTRAR AL SUBIR ---
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastY = window.pageYOffset || document.documentElement.scrollTop;

  window.addEventListener('scroll', () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (y > lastY && y > 120) {
      // Bajando: ocultar navbar
      navbar.classList.add('hide');
    } else {
      // Subiendo: mostrar navbar
      navbar.classList.remove('hide');
    }

    lastY = y;
  }, { passive: true });
})();


// Carrousel
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;
const cards = document.querySelectorAll(".carousel-card");
const visibleCards = 3;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index > cards.length - visibleCards) {
    index = 0; // Loop al inicio
  }
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = cards.length - visibleCards; // Loop al final
  }
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);