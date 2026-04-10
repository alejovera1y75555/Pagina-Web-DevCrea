/* ================================
   DevCrea — JavaScript principal
   main.js
   ================================ */

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.service-card, .portfolio-card, .code-block, .contact-wrap').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ${i * 0.07}s ease, transform 0.55s ${i * 0.07}s ease`;
  observer.observe(el);
});

// Formulario de contacto
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✅ ¡Mensaje enviado!';
  btn.style.background = '#22d3a5';
  btn.style.color = '#060910';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje →';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}
