const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const device = form.querySelector('#device');
    const message = form.querySelector('#message');

    const inputs = [name, phone, device, message];
    const isValid = inputs.every((input) => input.value.trim());

    if (!isValid) {
      status.textContent = 'Please fill in all the required fields so we can help you properly.';
      status.className = 'form-status error';
      return;
    }

    status.textContent = 'Thanks! Your message has been received. We will get back to you shortly.';
    status.className = 'form-status success';
    form.reset();
  });
}
