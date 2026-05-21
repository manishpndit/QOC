// Set current year
document.addEventListener('DOMContentLoaded',()=>{
  const y = new Date().getFullYear();
  // populate year placeholders on every page
  document.querySelectorAll('[id^="year"]').forEach(el=>el.textContent=y);

  // Theme toggle with persistence
  const html = document.documentElement;
  const themeButtons = Array.from(document.querySelectorAll('[id^="themeToggle"]'));
  const stored = localStorage.getItem('qoc-theme');
  if(stored==='dark') html.setAttribute('data-theme','dark');
  themeButtons.forEach(btn=>{
    btn.textContent = html.getAttribute('data-theme')==='dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', String(html.getAttribute('data-theme')==='dark'));
    btn.addEventListener('click',()=>{
      const isDark = html.getAttribute('data-theme')==='dark';
      if(isDark){
        html.removeAttribute('data-theme');
        localStorage.setItem('qoc-theme','light');
      } else {
        html.setAttribute('data-theme','dark');
        localStorage.setItem('qoc-theme','dark');
      }
      themeButtons.forEach(button=>{
        button.textContent = isDark ? '🌙' : '☀️';
        button.setAttribute('aria-pressed', String(!isDark));
      });
    });
  });

  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click',()=>{
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click',()=>{
        if(nav.classList.contains('active')){
          nav.classList.remove('active');
          menuToggle.textContent='☰';
        }
      });
    });
  }

  // Modal behavior for Volunteer button
  const modal = document.getElementById('modal');
  const volunteerBtn = document.getElementById('volunteerBtn');
  const modalClose = document.getElementById('modalClose');

  function openModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  if(volunteerBtn && modal && modalClose){
    volunteerBtn.addEventListener('click',(e)=>{e.preventDefault();openModal();});
    modalClose.addEventListener('click',closeModal);
    modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
  }
  
  // Intersection observer for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){ ent.target.classList.add('visible'); obs.unobserve(ent.target); }
    });
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));

  // Gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  if(lb){
    document.querySelectorAll('.gallery-item').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const src = btn.getAttribute('data-src');
        lbImg.src = src; lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      });
    });
    lbClose && lbClose.addEventListener('click',()=>{ lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; });
    lb.addEventListener('click',e=>{ if(e.target===lb) { lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } });
  }

  // Smooth internal link behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{ e.preventDefault(); const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); });
  });

  // Page transitions
  document.body.classList.add('loaded');
  document.querySelectorAll('a[href$=".html"]').forEach(link=>{
    link.addEventListener('click',e=>{
      const url = link.getAttribute('href');
      if(!url || url === window.location.pathname.split('/').pop()) return;
      if(link.target === '_blank' || link.hostname !== window.location.hostname) return;
      e.preventDefault();
      document.body.classList.remove('loaded');
      setTimeout(()=>window.location.href = url, 280);
    });
  });

  // Contact form submission feedback
  const contactForm = document.getElementById('contactForm');
  const contactToast = document.getElementById('contactToast');
  if(contactForm && contactToast){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      contactToast.classList.add('show');
      setTimeout(()=>contactToast.classList.remove('show'),3600);
      contactForm.reset();
    });
  }
});
