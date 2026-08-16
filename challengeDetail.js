document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".dropTitle");
  const letters = title.querySelectorAll("span");
  const paragraph = document.querySelector(".detailHero p");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.08}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          title.classList.add("show");

          setTimeout(() => {
            paragraph.classList.add("show");
          }, 300);

          observer.unobserve(title);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );
  observer.observe(title);

  //Change Welcome Message
  const num_submit = document.getElementById("submit");
  const message = document.getElementById("num");
  const teamInput = document.getElementById("teamName");
  const s_challenge = document.getElementById("select");

  let submitCnt = parseInt(localStorage.getItem("formSubmitCnt")) || 0;
  let savedTeam = localStorage.getItem("savedTeamName") || "";
  let savedChallenge = localStorage.getItem("savedChallengeName") || "";

  let sessionTeam = sessionStorage.getItem("sessionTeamName") || "";
  let sessionChallenge = sessionStorage.getItem("sessionChallenge") || "";
  let sessionTime = sessionStorage.getItem("sessionSubmitTime") || "";

  if (savedChallenge && s_challenge) s_challenge.value = savedChallenge;

  if (s_challenge) {
    s_challenge.addEventListener("change", function () {
      localStorage.setItem("savedChallengeName", s_challenge.value);
    });
  }

  if (savedTeam && teamInput) {
    teamInput.value = savedTeam;
  }
  else if (sessionTeam && teamInput) {
    teamInput.value = sessionTeam;
    console.log('Recovery from session storage: ', sessionTeam);
  }

  if (sessionTime) {
      console.log('Last submission time: ', sessionTime);
    }

  function callAPI(teamName, challenge, fileCount) {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        title: teamName,
        body: `Challenge: ${challenge}\nFiles:${fileCount} file(s) uploaded`,
        userId: 1
      }),

      success: function (response) {
        console.log('API SUCCESS!');
        console.log('SERVER RESPONSE: ', response);
        console.log(`DATA SAVED, ID: ${response.id}`);
      },

      error: function (xhr, status, error) {
        console.error('API FAILED: ', error);
        console.log('DATA SAVED, BUT API FAILED');
      }
    })
  }

  function updateMsg(count) {
    const currentTeam = localStorage.getItem("savedTeamName") || "";
    if (count == 1) {
      message.textContent = `Welcome Back ${currentTeam}, Ready for Your Second Project!`;
    } else if (count > 1 && count < 5) {
      message.textContent = `Welcome Back ${currentTeam}, Your Career Success Start from Here!`;
    } else {
      const funMessages = [
        "Unstoppable momentum!",
        "Are we launching a rocket next?",
        `Welcome Back ${currentTeam}! Your determination is inspiring!`,
        `Welcome Back ${currentTeam}, you are officially ready for anything!`,
        `Welcome Back ${currentTeam}! Nothing can stop you now. Infinite potential awaits!`,
      ];

      const randomIndex = Math.floor(Math.random() * funMessages.length);
      message.textContent = funMessages[randomIndex];
    }
  }
  if (submitCnt > 0) updateMsg(submitCnt);

  num_submit.addEventListener("click", function (event) {
    event.preventDefault();

    if (!teamInput.value.trim()) {
      alert("Please enter you team name!");
      return;
    }

    submitCnt++;
    localStorage.setItem("formSubmitCnt", submitCnt);

    if (teamInput) {
      let formattedName = teamInput.value.trim().toUpperCase();
      teamInput.value = formattedName;
      //local Storage
      localStorage.setItem("savedTeamName", teamInput.value);
      //session Storage
      sessionStorage.setItem("sessionTeamName", teamInput.value);
      sessionStorage.setItem("sessionSubmitTime", new Date().toLocaleString());
    }

    if (s_challenge) {
      localStorage.setItem("savedChallengeName", s_challenge.value);

      sessionStorage.setItem("sessionChallenge", s_challenge.value);
    }

    const fileInputs = document.querySelectorAll('input[type="file"]');
    let fileNames = [];

    fileInputs.forEach((input) => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        fileNames.push({
          name: file.name,
          size: file.size,
          type: file.type,
          inputId: input.id || "unknown",
        });
      }
    });

    if (fileNames.length > 0) {
      localStorage.setItem("uploadedFiles", JSON.stringify(fileNames));
      console.log("Files saved:", fileNames);
    }

    callAPI(
      teamInput.value,
      s_challenge.value,
      fileNames.length
    );

    updateMsg(submitCnt);
    const fileCount = fileNames.length;

    alert(
      `Submission #${submitCnt} Successful!\nTeam:${teamInput.value}\nFiles: ${fileCount} file(s) uploaded`
      );
      
      if (teamInput) {
          teamInput.value = "";
      }

      if (s_challenge) {
          s_challenge.selectedIndex = 0;
      }

      fileInputs.forEach(input => {
          input.value = '';
      });
  });
});
