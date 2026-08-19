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
  form.addEventListener('invalid', () => {
    status.textContent = 'Please fill in all the required fields so we can help you properly.';
    status.className = 'form-status error';
  }, true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.classList.remove('is-submitted');
    submitButton.classList.add('is-sending');
    status.textContent = 'Sending your message…';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Message could not be sent');

      form.reset();
      submitButton.classList.remove('is-sending');
      submitButton.classList.add('is-submitted');
      status.textContent = 'Message submitted successfully.';
      status.className = 'form-status success';
    } catch (error) {
      submitButton.disabled = false;
      submitButton.classList.remove('is-sending');
      status.textContent = 'We could not send your message. Please try again or contact us by phone.';
      status.className = 'form-status error';
    }
  });
}
