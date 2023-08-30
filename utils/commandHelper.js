// Defining the commands array
const COMMANDS = [
    { command: "about", description: "About Me" },
    { command: "education", description: "University Of Ghana, Legon" },
    { command: "interests", description: "Video Games, movies" }, // Fixed typo "intersts"
    { command: "projects", description: "My Projects" },
    { command: "contact", description: "Contact Me" },
    { command: "blog", description: "Visit my blog" },
    { command: "resume", description: "Open my resume" },
    { command: "clear", description: "clear terminal" },
   
];

// Asynchronous function to fetch project data from API endpoint
const getProjects = async () => {
    const projects = await (await fetch("/api/projects")).json();
    return `
        <h3>My Projects</h3>
        ${projects.map(project => `
            <div class="command">
                <a href="${project.link}" target="_blank">
                    <b class="command">${project.name}</b>
                </a>
                - <b>${project.stack.join(", ")}</b>
                <p class="meaning">${project.description}</p>
            </div>
        `).join("")}
    `;
};

// Asynchronous function to fetch contacts
const getContacts = async () => {
    const contactMediums = await (await fetch("/api/contacts")).json();
    return contactMediums.map(contact => `
        <div style="display: flex; justify-content: space-between;">
            <p style="font-size: 15px">${contact.medium}</p>
            <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
        </div>
    `).join("");
};

// Function to calculate age
const getAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const CONTENTS = {
    help: () => `
        ${COMMANDS.map(command => `
            <div style="display: flex; justify-content: space-between;">
                <p style="font-size: 15px">${command.command}</p>
            </div>
        `).join("")}
        <br/>
        <div class="command"> 
            Type one of the above to view. e.g <span style="color: var(--secondary)">about</span>
        </div>
    `,
    about: () => `My name is Ryan Michael (Deathstroke). I kinda hack stuff. I am ${getAge("May 28, 1999")} and I love computers!`,
    education: () => `University of Ghana, Legon BSc IT Honours`,
    interests: () => `I am experienced with Python and building websites with WordPress`,
    projects: getProjects,
    contact: getContacts,
    error: input => `
        <div class="help-command"> sh: Unknown command: ${input}</div> 
        <div class="help-command"> See 'help' for info</div>
    `,
    blog: () => {
        window.open("https://dev.to", "_blank");  // Added missing slash
        return "";
    },
    resume: () => {
        const cvLink = "https://docs.google.com/document/your_cv_link_here"; // replace 'your_cv_link_here' with your actual Google Docs link
        window.open(cvLink, "_blank");
        return "Opening CV..."; // This is the message that will be shown on the terminal after the command is executed
    },
};
