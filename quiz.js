const questions = [
    {
        question: "What does AI stand for?",
        options: [
            "Automated Information",
            "Artificial Intelligence",
            "Advanced Internet",
            "Artificial Interface"],
        answer: "Artificial Intelligence"},

    {
        question: "Which of the following is an example of AI used in daily life?",
        options: [
            "Paper documents",
            "Traditional clocks",
            "Voice assistants",
            "Calculator"],
        answer: "Voice assistants"},

    {
        question: "What is the main purpose of Artificial Intelligence?",
        options: [
            "Replace all humans",
            "Make machines perform tasks that normally require human intelligence",
            "Create only entertainment software",
            "Store files permanently"],
        answer: "Make machines perform tasks that normally require human intelligence"},

    {
        question: "Which field allows computers to learn from data?",
        options: [
            "Machine Learning",
            "Web Design",
            "Computer Hardware",
            "Networking"],
        answer: "Machine Learning"},

    {
        question: "Which industry can benefit from AI technology?",
        options: [
            "Healthcare",
            "Education",
            "Transportation",
            "All of the above"],
        answer: "All of the above"},

    {
        question: "What is one benefit of AI?",
        options: [
            "Increasing repetitive manual work",
            "Improving decision-making through data analysis",
            "Preventing all human errors",
            "Removing the need for learning"],
        answer: "Improving decision-making through data analysis"},

    {
        question: "Who is the co-founder of DeepMind?",
        options: [
            "Elon Musk",
            "Demis Hassabis",
            "Alan Turing",
            "Steve Jobs"],
        answer: "Demis Hassabis"},

    {
        question: "Which technology helps AI understand human language?",
        options: [
            "Natural Language Processing",
            "Database Management",
            "Computer Assembly",
            "Network Security"],
        answer: "Natural Language Processing"},

    {
        question: "What is important when developing AI?",
        options: [
            "Making AI as expensive as possible",
            "Responsible and ethical AI development",
            "Removing human control",
            "Stopping improvements"],
        answer: "Responsible and ethical AI development"},

    {
        question: "What is a possible future development of AI?",
        options: [
            "Smarter AI assistants and human-AI collaboration",
            "The end of all technology",
            "Computers becoming unnecessary",
            "AI stopping development"],
        answer: "Smarter AI assistants and human-AI collaboration"}];

// ==============================
// VARIABLES
// ==============================
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";

// ==============================
// HTML ELEMENTS
// ==============================
const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answerButtons = document.querySelectorAll(".answer");
const nextButton = document.getElementById("nextButton");
const resultContainer = document.querySelector(".resultContainer");
const quizContainer = document.querySelector(".quizContainer");
const scoreDisplay = document.getElementById("score");
const highestScoreDisplay = document.getElementById("highestScore");
const attemptsDisplay = document.getElementById("attempts");
const badgeDisplay = document.getElementById("badge");
const retryButton = document.getElementById("retryButton");

// ==============================
// LOAD QUESTION
// ==============================
function loadQuestion(){
    let current = questions[currentQuestion];
    questionNumber.innerHTML = currentQuestion + 1;
    questionText.innerHTML = current.question;
    selectedAnswer = "";
    answerButtons.forEach((button,index)=>{
        button.innerHTML = current.options[index];
        button.style.background = "";});}

// ==============================
// SELECT ANSWER
// ==============================
answerButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        selectedAnswer = button.innerHTML;
        answerButtons.forEach(btn=>{
            btn.style.background = "";});
        button.style.background = "#8B5CF6";});});

// ==============================
// NEXT BUTTON
// ==============================
nextButton.addEventListener("click",()=>{
    if(selectedAnswer === ""){
        alert("Please select an answer!");
        return;}
    if(selectedAnswer === questions[currentQuestion].answer){
        score++;}
    currentQuestion++;
    if(currentQuestion < questions.length){
        loadQuestion();}
    else{
        showResult();}});

// ==============================
// SHOW RESULT
// ==============================
function showResult(){
    quizContainer.style.display="none";
    resultContainer.style.display="block";
    scoreDisplay.innerHTML = score;
    let highestScore = localStorage.getItem("highestScore") || 0;
    if(score > highestScore){
        highestScore = score;
        localStorage.setItem("highestScore", highestScore)}
    highestScoreDisplay.innerHTML = highestScore;
    let attempts = localStorage.getItem("attempts") || 0;
    attempts++;
    localStorage.setItem("attempts", attempts);
    attemptsDisplay.innerHTML = attempts;
    if(score <= 3){
        badgeDisplay.innerHTML="AI Beginner";}
    else if(score <= 6){
        badgeDisplay.innerHTML="AI Learner";}
    else if(score <= 8){
        badgeDisplay.innerHTML="AI Explorer";}
    else{
        badgeDisplay.innerHTML="AI Expert";}}

// ==============================
// RETRY QUIZ
// ==============================
retryButton.addEventListener("click",()=>{
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display="block";
    resultContainer.style.display="none";
    loadQuestion();});

// START QUIZ
loadQuestion();