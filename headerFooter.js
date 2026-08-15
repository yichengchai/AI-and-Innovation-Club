window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    if(loader){
        setTimeout(function(){
            loader.style.opacity = "0";
            setTimeout(function(){
                loader.style.display = "none";
            }, 800);
        }, 2000);
    }
});

const navbar = document.querySelector(".navbar");

let lastScroll = 0;

window.addEventListener("scroll", () => {
    if(!navbar) return;

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

if(menuToggle && navLinks){
    menuToggle.addEventListener("click", function(){
        navLinks.classList.toggle("active");
    });
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

//fadeup animation:
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

