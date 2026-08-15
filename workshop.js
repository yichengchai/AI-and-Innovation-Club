/*scroll*/ 
const workshopAnchors = document.querySelectorAll('a[href^="#"]');
workshopAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") {
            return;
        }
        let target;
        target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/*view more*/
const viewButtons = document.querySelectorAll(".view-btn");
viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = this.closest(".workshop-card");
        card.classList.toggle("active");
        if (card.classList.contains("active")) {
            this.textContent = "Show Less";
        } else {
            this.textContent = "View More";
        }
    });
});

/*AI Practice*/
function showPractice(button) {
    let card = button.closest(".workshop-card");
    let box = card.querySelector(".practice-box");
    if (box.style.display === "block") {
        box.style.display = "none";
        button.textContent = "🤖 Practice AI";
    } else {
        box.style.display = "block";
        button.textContent = "Hide Practice";
    }
}

function setPrompt(text) {
    document.getElementById("promptInput").value = text;
}

function generateResponse() {
    let input = document
        .getElementById("promptInput")
        .value
        .toLowerCase();
    let output = document
        .getElementById("aiOutput");
    if (input.trim() === "") {
        output.innerHTML =
            "Please enter a prompt.";
        return;
    }
    let response = "";
    if (input.includes("machine learning")) {
        response = "Machine Learning is a type of Artificial Intelligence that allows computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every task.";

    }

    else if (input.includes("ai") || input.includes("artificial intelligence")) {
        response = "Artificial Intelligence (AI) is a technology that allows machines to simulate human intelligence, including learning, problem solving and decision making.";

    }

    else if (input.includes("story") || input.includes("write")) {
        response =
            "To create a better story, your prompt should include:<br><br>" +
            "✓ Character<br>" +
            "✓ Setting<br>" +
            "✓ Writing style<br>" +
            "✓ Story requirements";
    }

    else if (input.includes("image") || input.includes("draw")) {
        response =
            "A good image prompt should describe:<br><br>" +
            "✓ Subject<br>" +
            "✓ Style<br>" +
            "✓ Colour<br>" +
            "✓ Lighting<br>" +
            "✓ Details";
    }

    else if (input.includes("explain")) {
        response =
            "Try making your prompt more specific by adding context, examples and expected output format.";
    }

    else {
        response =
            "This is a simulated AI response.<br><br>" +
            "Your prompt has been received.<br><br>" +
            "Tip: Improve your prompt by adding more details.";
    }
    output.innerHTML = response;
}

/*Resgistration Form*/
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name =
            registerForm.elements["fullName"].value;
        const email =
            registerForm.elements["email"].value;
        const workshop =
            registerForm.elements["workshop"].value;
        let registrationData = {
            name: name,
            email: email,
            workshop: workshop
        };
        localStorage.setItem(
            "workshopRegistration",
            JSON.stringify(registrationData)
        );
        sessionStorage.setItem(
            "selectedWorkshop", workshop
        );
        document.cookie =
            "workshopRegistered=true; max-age=604800; path=/";
        document.getElementById(
            "successMessage"
        ).textContent =
            "Registration submitted successfully!";
        document.getElementById("summaryName").textContent = name;
        document.getElementById("summaryEmail").textContent = email;
        document.getElementById("summaryWorkshop").textContent = workshop;
        document.getElementById("registrationSummary").style.display = "block";
        registerForm.reset();
    });

}

/*Scroll*/
const revealCards = document.querySelectorAll(
    ".featured-card, .workshop-card, .feature"
);

function revealVisibleCards() {
    revealCards.forEach(function (card) {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealVisibleCards);
window.addEventListener("load", function () {
    revealVisibleCards();
});
