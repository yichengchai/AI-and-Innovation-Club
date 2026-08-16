/* ==========================================
   AI BENEFITS SLIDER
========================================== */
const track = document.querySelector(".benefitTrack");
const benefitCards = document.querySelectorAll(".benefit");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const dots = document.querySelectorAll(".dots span");
let currentPage = 0;
function getCardsPerPage() {
    return window.innerWidth <= 900 ? 1 : 3;
}

function getTotalPages() {
    return Math.ceil(benefitCards.length / getCardsPerPage());
}

function updateSlider() {
    if (!track) return;
    const firstCard = benefitCards[0];
    const cardsPerPage = getCardsPerPage();
    let stepWidth = 930;
    if (firstCard) {
        const style = getComputedStyle(firstCard);
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        stepWidth = (firstCard.offsetWidth + marginLeft + marginRight) * cardsPerPage;
    }
    let moveAmount = currentPage * stepWidth;
    track.style.transform =
        `translateX(-${moveAmount}px)`;
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
    if (dots[currentPage]) {
        dots[currentPage].classList.add("active");
    }
}

/* NEXT BUTTON */
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentPage++;
        if (currentPage >= getTotalPages()) {
            currentPage = 0;
        }
        updateSlider();
    });
}

/* PREVIOUS BUTTON */
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentPage--;
        if (currentPage < 0) {
            currentPage = getTotalPages() - 1;
        }
        updateSlider();
    });
}

/* ==========================================
   AUTO SLIDE
========================================== */
let autoSlide;
function startSlider() {
    autoSlide = setInterval(() => {
        currentPage++;
        if (currentPage >= getTotalPages()) {
            currentPage = 0;
        }
        updateSlider();
    }, 6000);
}

function stopSlider() {
    clearInterval(autoSlide);
}
startSlider();

const slider = document.querySelector(".benefitSlider");

if (slider) {
    slider.addEventListener("mouseenter", () => {
        stopSlider();
    });
    slider.addEventListener("mouseleave", () => {
        startSlider();
    });
}

/* ==========================================
   AI INNOVATORS SCROLL ANIMATION
========================================== */
const innovatorCards =
    document.querySelectorAll(".innovator");
const innovatorObserver =
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

innovatorCards.forEach(card => {
    innovatorObserver.observe(card);
});

/* =====================================
   FUTURE AI TIMELINE ANIMATION
===================================== */
const futureCards = document.querySelectorAll(".future");
const futureObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

futureCards.forEach(card => {
    futureObserver.observe(card);
});

/* ==========================================
   AI LEARNING PROGRESS TRACKER
========================================== */
const learningSections = [
    {
        id: "aiImpact",
        name: "Benefits of AI",
        tracker: "stepIntro"
    },

    {
        id: "innovators",
        name: "AI Innovators",
        tracker: "stepCompare"
    },

    {
        id: "future",
        name: "Future of AI",
        tracker: "stepBranch"
    }];

/*
   PAGE 2 STORAGE
   Different from page 1
*/
let completedSections =
    JSON.parse(
        localStorage.getItem("AIProgressPage2")) || [];
const progressObserver =
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let sectionID =
                    entry.target.id;
                if (!completedSections.includes(sectionID)) {
                    completedSections.push(sectionID);
                    localStorage.setItem(
                        "AIProgressPage2",
                        JSON.stringify(completedSections));
                }
                updateTracker();
            }
        });
    }, {
        threshold: 0.3
    });

learningSections.forEach(section => {
    let element =
        document.getElementById(section.id);
    if (element) {
        progressObserver.observe(element);
    }
});

function updateTracker() {
    learningSections.forEach(section => {
        let tracker =
            document.getElementById(section.tracker);
        if (tracker) {
            if (completedSections.includes(section.id)) {
                tracker.innerHTML =
                    "✓ " + section.name
                tracker.classList.add("completed");
            }
            else {
                tracker.innerHTML =
                    "○ " + section.name;
            }
        }
    });
    let percentage =
        (completedSections.length /
            learningSections.length) * 100;
    let progressDisplay =
        document.querySelector(".progressPercent");
    if (progressDisplay) {
        progressDisplay.innerHTML =
            Math.round(percentage)
            + "% Completed";
    }
}

updateTracker();
const quizSection = document.querySelector("#quizCTA");
const quizObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

quizObserver.observe(quizSection);