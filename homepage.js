//hero page title
const title = document.getElementById("title");

if(title){
    title.style.color = "lightgrey";
    title.innerHTML = "Welcome to AI Lab";
}


window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    setTimeout(function(){
        loader.style.opacity = "0";
        setTimeout(function(){
            loader.style.display = "none";

        }, 800);
    }, 2000);
});

//navigation bar
const navbar = document.querySelector(".navbar");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    if(currentScroll <= 0){
        navbar.classList.remove("hide");
        return;
    }


    if(currentScroll > lastScroll){
        navbar.classList.add("hide");
    }

    else{
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;

});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function(){

    navLinks.classList.toggle("active");

});

//fadeup
const sections = document.querySelectorAll(".fadeSection");

function revealSections(){

    sections.forEach(section=>{

        const top = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(top < screenHeight - 150){

            section.classList.add("show");

        }
        else{
            section.classList.remove("show");
        }
    });

}

window.addEventListener("scroll", revealSections);
revealSections();

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }
        else{

            entry.target.classList.remove("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".fadeSection").forEach(section=>{

    observer.observe(section);

});


//ai quote
async function getQuote(){

    try{
        const response = await fetch("https://dummyjson.com/quotes/random");

        const data = await response.json();

        document.getElementById("quoteText").innerHTML =
            '"' + data.quote + '"';

        document.getElementById("quoteAuthor").innerHTML =
            "- " + data.author;

    }
    catch(error){

        document.getElementById("quoteText").innerHTML =
            "Unable to load quote.";

    }
}

getQuote();

document.getElementById("newQuoteBtn")
.addEventListener("click",getQuote);

const cards = document.querySelectorAll(".home-box");
const cardObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.2
});

cards.forEach((card,index)=>{

    card.style.transitionDelay = `${index*0.15}s`;

    cardObserver.observe(card);

});

//cookie... pop up message
document.addEventListener("DOMContentLoaded", function(){

    const overlay = document.getElementById("cookie-overlay");
    const expireText = document.getElementById("expire-date");
    const acceptBtn = document.getElementById("acceptCookie");

    //check id cookie already exists
    const accepted = getCookie("cookieAccepted");

    if(accepted == "true"){
        overlay.style.display = "none";
    }
    else{
        overlay.style.display = "flex";
    }
    //show expiry date if available
    const expiry = getCookie("cookieExpire");

    if(expiry){
        expireText.innerHTML = 
        "Your cookie expires on:<br>" + expiry;
    }
    //accept button
    acceptBtn.addEventListener("click", function(){

        const expireDate = new Date();

        //cookie valid for 5 days
        expireDate.setDate(expireDate.getDate() + 5);

        const expireUTC = expireDate.toUTCString();

        //consent cookie
        document.cookie = 
        `cookieAccepted=true; expires=${expireUTC};path=/`;

        //expiry cookie
        document.cookie = 
        `cookieExpire=${expireDate.toDateString()}; expires=${expireUTC};path=/`;

        overlay.style.display = "none";
    });
});

function getCookie(name){

    const cookies = document.cookie.split(";");
    for(let cookie of cookies){
        cookie = cookie.trim();
        if(cookie.startsWith(name + "=")){
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

//another type of writing link rather than <a href= "aiIntor.html"><button>EXploreMore</button></a>
const aboutButton = document.getElementById("aboutUs");

if(aboutButton){
    aboutButton.addEventListener("click",function(){
        window.location.href="aboutus.html";
    });
}

const aiButton = document.getElementById("exploreAi");
if(aiButton){
    aiButton.addEventListener("click",function(){
        window.location.href="aiIntro.html";
    });
}

const innoButton = document.getElementById("exploreInno");
if(innoButton){
    innoButton.addEventListener("click",function(){
        window.location.href="challenge.html";
    });
}

const mlButton = document.getElementById("exploreMl");
if(mlButton){
    mlButton.addEventListener("click",function(){
        window.location.href="machineLearning.html";
    });
}

const workshopButton = document.getElementById("exploreWorkshop");
if(workshopButton){
    workshopButton.addEventListener("click",function(){
        window.location.href="workshop.html";
    });
}


//pop up messages
const model = document.getElementById("policyModel");
const modelTitle = document.getElementById("modelTitle");
const modelContent = document.getElementById("modelBody");

function showModel(title, contentId){

    modelTitle.innerHTML = title;

    modelContent.innerHTML =
        document.getElementById(contentId).innerHTML;

    model.style.display = "flex";

}

document.getElementById("privacyLink").onclick = function(){

    showModel("Privacy Policy","privacyContent");

}

document.getElementById("termLink").onclick = function(){

    showModel("Term of Use","termContent");

}
document.querySelector(".close").onclick = function(){

    model.style.display = "none";

}
