
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn){
  menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
}




const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if(dot && ring && window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',(e)=>{
    dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px';
    ring.style.left=e.clientX+'px'; ring.style.top=e.clientY+'px';
  });
  document.querySelectorAll('a,button,.filter-btn,input,select,textarea').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('active'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('active'));
  });
}

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const value=btn.dataset.filter;
    document.querySelectorAll('.property-card').forEach(card=>{
      card.style.display = value==='all'||card.dataset.type===value ? '' : 'none';
    });
  });
});

document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const status=form.querySelector('.form-status');
    if(status){
      status.textContent='Thank you. Your enquiry has been received. Our team will contact you shortly.';
      status.style.marginTop='14px';
    }
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const stats = document.querySelector(".stats");
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    let current = 0;
    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth easing
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      current = Math.floor(easedProgress * target);

      counter.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          stats.classList.add("show");

          counters.forEach(counter => {
            animateCounter(counter);
          });

          observer.unobserve(stats);
        }

      });
    },
    {
      threshold: 0.3
    }
  );

  if (stats) {
    observer.observe(stats);
  }

});

