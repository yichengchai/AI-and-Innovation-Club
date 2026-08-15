const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.target);

        if (counter.classList.contains("counted")) return;

        let count = 0;
        const increment = target / 100;
        let animationId = null;

        const updateCounter = () => {
          count += increment;

          if (count < target) {
            counter.textContent = Math.ceil(count);
            animationId = requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
            counter.classList.add("counted");
            if (animationId) {
              cancelAnimationFrame(animationId);
            }
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});