/* footer div */
const footer = document.querySelector(".container_footer");
const div = document.createElement("div");
div.classList.add("footer_box");
footer.appendChild(div);

/* date */
const today = new Date().getFullYear();
/* name */
const copyright = "Sergei Patrushev";

/* copyright */
const find_footer_box = document.querySelector(".footer_box");
const footer_box_p = document.createElement("p");
footer_box_p.classList.add("footer_box_p");
footer_box_p.textContent = copyright + " " + "©" + " " + today;
find_footer_box.appendChild(footer_box_p);


/* Create List of Skills */
let skills = ["JavaScript", "HTML", "CSS", "Git", "GitHub", "DevTool", "Python"];
const skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
        let skill = document.createElement("li");
        skill.innerHTML = skills[i];
        skillsList.appendChild(skill);
}


/* messageForm */
let messageForm = document.querySelector(".leave_message");
    messageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let usersName = event.target.usersName.value;
        let usersEmail = event.target.usersEmail.value;
        let usersMessage = event.target.usersMessage.value;

    console.log("Name:", usersName);
    console.log("Email:", usersEmail);
    console.log("Message:", usersMessage);

    let messageSection = document.getElementById("messages");
    console.log("messageSection", messageSection); /* for checking */
    let messageList = messageSection.querySelector(".messages_ul");
    let newMessage = document.createElement("li");
    messageList.appendChild(newMessage);
    
    /* On the next line, set the inner HTML of your newMessage element with the following information: */
    /* <a> element that displays the "usersName" and is a clickable link to the "usersEmail" (hint: use the mailto: prefix) */
    /* <span> element that displays the "usersMessage" */
    newMessage.innerHTML = `<a href = "mailto:${usersEmail}">${usersName}</a>&nbsp;&nbsp;<span>${usersMessage}</span>`
    
    /* Create a variable named removeButton that makes a new <button> element */
    let removeButton = document.createElement("button");
    console.log("button", removeButton);  /* for checking */
    /* Set the inner text to "remove" */
    removeButton.innerText = "Remove";
    /* Set the type attribute to "button" */
    removeButton.type = "button";
    removeButton.classList.add("remove_button");

    // add edit button
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

    /* an event listener to the removeButton element that handles the "click" event */
    removeButton.addEventListener("click", function(event){
        let entry = event.target.parentNode;
        console.log("del", entry)  /* for checking */
        /* Remove the entry element */
        entry.remove();
    });
    
    newMessage.appendChild(edit_button);
    /* Append the removeButton to the newMessage element */
    newMessage.appendChild(removeButton);
    /* Append the newMessage to the messageList element */
    messageList.appendChild(newMessage);

// hide elements after submit
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
        emailInput.style.display = "block"; // email form
    } else {
        messageInput.style.display = "none"; // hided
        buttonSubmitInput.style.display = "none"; // hided
    }
});

emailInput.addEventListener("input", function() { // listener email form .input_email
    if (this.value.trim() !== "") {
        messageInput.style.display = "block"; // form
        buttonSubmitInput.style.display = "block"; // form
    }
});


/* projectSection */
let projectSection = document.getElementById("Projects");
console.log("projectSection", projectSection);
/* projectList */
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
            tooltip.textContent = repositories[x].description ?? "No description available.";

            project.appendChild(url);
            project.appendChild(tooltip);
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
let d = document.querySelector(".button_dark_mode"); // get the selector of the button
d.addEventListener("click", () => { // listener a click of the button
document.body.classList.toggle("dark"); // add the class to body body.dark
})
    


