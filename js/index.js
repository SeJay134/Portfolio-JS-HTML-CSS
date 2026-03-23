// footer div
const footer = document.querySelector(".container_footer");
const div = document.createElement("div");
div.classList.add("footer_box");
footer.appendChild(div);

// date
const today = new Date().getFullYear();
// name
const copyright = "Sergei Patrushev";

// copyright
const find_footer_box = document.querySelector(".footer_box");
const footer_box_p = document.createElement("p");
footer_box_p.classList.add("footer_box_p");
footer_box_p.textContent = copyright + " " + "©" + " " + today;
find_footer_box.appendChild(footer_box_p);

// Create List of Skills
// Technical skills
let skills = ["JavaScript", "HTML", "CSS", "Git", "GitHub", "DevTool", "Python"];
// SkillsSection
const skillsSection = document.getElementById("Skills");
// SkillsList
let skillsList = skillsSection.querySelector("ul");

// Skills to Array skillsList
for (let i = 0; i < skills.length; i++) {
        let skill = document.createElement("li");
        skill.innerHTML = skills[i];
        skillsList.appendChild(skill);
}

// Leave message
let messageForm = document.querySelector(".leave_message");
    messageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let usersName = event.target.usersName.value;
        let usersEmail = event.target.usersEmail.value;
        let usersMessage = event.target.usersMessage.value;
    
    console.log("Name:", usersName);
    console.log("Email:", usersEmail);
    console.log("Message:", usersMessage);

    // messageSection
    let messageSection = document.getElementById("messages");
    console.log("messageSection", messageSection); // for checking
    let messageList = messageSection.querySelector(".messages_ul");
    let newMessage = document.createElement("li");
    messageList.appendChild(newMessage);
    
    // Clickable link "usersEmail"
    newMessage.innerHTML = `<a href = "mailto:${usersEmail}">${usersName}</a>&nbsp;&nbsp;<span>${usersMessage}</span>`
    
    // removeButton
    let removeButton = document.createElement("button");
    console.log("button", removeButton);  // for checking
    removeButton.innerText = "Remove";
    removeButton.type = "button";
    removeButton.classList.add("remove_button");

    // edit button
    let edit_button = document.createElement("button"); // create button
    edit_button.innerText = "Edit"; // text
    edit_button.type = "button"; // type
    edit_button.classList.add("edit_button"); // class

    edit_button.addEventListener("click", (event) => { // get click
        let li = event.target.parentNode; // get element li
        let message_span = li.querySelector("span"); // get element span
        let curent_text = message_span.textContent; // save a message
        let input = document.createElement("input"); // create input
        input.value = curent_text;
        edit_button.innerText = "Submit"; // rename Edit to Submit

        input.addEventListener("blur", () => { // out field or enter
            let span = document.createElement("span");
            span.textContent = input.value;
            li.replaceChild(span, input); // replace values
            edit_button.innerText = "Edit"; // rename Submit to Edit
        });

        li.replaceChild(input, message_span); // replace new to old parentNode.replaceChild(new, old)
        input.focus();
    })

    // removeButton
    removeButton.addEventListener("click", function(event){
        let entry = event.target.parentNode;
        console.log("del", entry)  /* for checking */
        entry.remove();
    });
    
    newMessage.appendChild(edit_button);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

// add hide elements after submit
let span = messageList.querySelector("span");
console.log("span", span);
    if (span && span.textContent.trim() !== "") {
        console.log("span not empty", span.textContent);
        emailInput.style.display = "none"; // email form haded
        messageInput.style.display = "none"; // message form hided
    } else if (span) {
        console.log("span empty", span.textContent);
    } else {
        console.log("span not finded");
    }
    this.reset();
});


/* hided elements */
const emailInput = document.querySelector(".input_email");
const messageInput = document.querySelector(".users_message");
// not hided
const textInput = document.querySelector(".input_text");
const buttonSubmitInput = document.querySelector(".button_submit");

textInput.addEventListener("input", function() { // listener input form .input_text
    if (this.value.trim() !== "") { // not empty
        emailInput.style.display = "block"; // will see email form
    } else {
        messageInput.style.display = "none"; // hided
        buttonSubmitInput.style.display = "none"; // hided
    }
});

emailInput.addEventListener("input", function() { // listener email form .input_email
    if (this.value.trim() !== "") {
        messageInput.style.display = "block"; // will see form
        buttonSubmitInput.style.display = "block"; // will see form
    }
});


/* projectSection */
let projectSection = document.getElementById("Projects");
console.log("projectSection", projectSection);
let projectList = projectSection.querySelector(".elementUl");
let repositories;


fetch('https://api.github.com/users/sejay134/repos')
    .then(respond => {
        console.log("respond", respond)
        if (respond.ok === false) {
            throw new Error(`Error: ${respond.status} ${respond.text}`);
        }
        return respond.json();
    })
    .then(data => {
        console.log("myData", data)
        repositories = data;
        console.log("repo", repositories);
        
        if (repositories.length === 0) {
            let noItem = document.createElement("li");
            noItem.innerHTML = "No added Projects";
            projectList.appendChild(noItem);
        }

        for (let x = 0; x < repositories.length; x++) {
            let project = document.createElement("li");
            console.log("project_li", project);
            let url = document.createElement("a");
            url.href = repositories[x].html_url;
            url.target = "_blank";
            url.classList.add("project_link");
            url.textContent = repositories[x].name;
            
            // tooltip
            let tooltip = document.createElement('span');
            tooltip.classList.add('tooltip');
            tooltip.textContent = repositories[x].description || "No description available.";

            // preview
            let a_link_preview = document.createElement('a');
            a_link_preview.classList.add('link_preview');
            a_link_preview.href = repositories[x].homepage || "No website available.";
            let img = document.createElement('img');
            img.alt = "picture";
            img.src = `https://raw.githubusercontent.com/SeJay134/${repositories[x].name}/main/preview.png`;
            // <img src="https://image.thum.io/get/width/300/crop/200/https://your-site.com"></img>
            // const preview = `https://image.thum.io/get/width/150/crop/90/${a_link_preview.href}`;
            // document.querySelector(".link_preview img").src = preview;

            project.appendChild(url);
            project.appendChild(tooltip);
            project.appendChild(a_link_preview);
            a_link_preview.appendChild(img)
            projectList.appendChild(project);
            
        }
        return data; // return data from GitHub
    })
    .then(repo_url => {
        repo_url.forEach(data_url => {
            console.log("repos_url", data_url.html_url); // take URL, checker
        })
    })
    .catch(error => {
        console.log("error", error)
        let noproject = document.createElement("li");
        noproject.textContent = "error";
        projectList.appendChild(noproject);
    })

// Dark mode .button_dark_mode
let d = document.querySelector(".button_dark_mode"); // get the selector of button
d.addEventListener("click", () => { // lisen a click of button
document.body.classList.toggle("dark"); // add the class to body body.dark
})
/*
    const container = tsParticles.domItem(0);
    if (!container) return;

    if (document.body.classList.contains("dark")) {
        container.load({
            background: { color: "#272727" },
            particles: {
                color: { value: "#ffffff" },
                links: { color: "#ffffff" },
                move: { enable: true }
            }
        });
    } else {
        container.load( {
            background: { color: "#f7f9fc" },
            particles: {
                color: { value: "#4a6fa5" },
                links: { color: "#6fa8dc" },
                move: { enable: true }
            }
        });
    }

})
*/