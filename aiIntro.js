//================================================
// INTRO CARD SCROLL ANIMATION
//================================================
const introCards = document.querySelectorAll(
    ".introCard, .compareReveal");

const intoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");}
        else {
            entry.target.classList.remove("show");}});
}, {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"});

introCards.forEach(card => {
    intoObserver.observe(card);});

//================================================
// AI LEARNING PROGRESS TRACKER
//================================================
const learningSections = [
    {
        id: "intro",
        name: "AI Introduction",
        tracker: "stepIntro"},

    {
        id: "compare",
        name: "AI VS Human",
        tracker: "stepCompare"},

    {
        id: "branchesOfAi",
        name: "AI Branches",
        tracker: "stepBranch"},];

// Load saved progress
let completedSections =
    JSON.parse(localStorage.getItem("AIProgress")) || [];

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let currentSection = entry.target.id;
            // Check detected section
            console.log("Completed:", currentSection);
            if (!completedSections.includes(currentSection)) {
                completedSections.push(currentSection);
                localStorage.setItem(
                    "AIProgress",
                    JSON.stringify(completedSections));}
            updateTracker();}});

}, {
// Changed from 0.5 to 0.2
    threshold: 0.2});

// Observe all sections
learningSections.forEach(section => {
    let element =
        document.getElementById(section.id);
    if (element) {
        progressObserver.observe(element);}});

function updateTracker() {
    learningSections.forEach(section => {
        let tracker =
            document.getElementById(section.tracker);
        if (tracker &&
            completedSections.includes(section.id)) {
            tracker.innerHTML =
                "✓ " + section.name;
            tracker.classList.add("completed");}});
    let percentage =
        (completedSections.length /
            learningSections.length) * 100;
    let progressDisplay =
        document.querySelector(".progressPercent");
    if (progressDisplay) {
        progressDisplay.innerHTML =
            Math.round(percentage)
            + "% Completed";}}

// Restore saved progress
updateTracker();











