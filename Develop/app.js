const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

function teamBuilder() {

    inquirer.prompt([
        {
            type: "list",
            choices: ["Add Employee", "Finish Team"],
            message: "What would you like to do?",
            name: "userChoice"
        }
    ]).then(function (response) {

        const userChoice = response.userChoice;
        switch (userChoice) {
            case "Add Employee":
                inquirer.prompt([
                    {
                        type: "list",
                        choices: ["Manager", "Engineer", "Intern"],
                        message: "Select the employee role:",
                        name: "role"
                    }
                ]).then(function (response) {
                    const role = response.role;
                    switch (role) {
                        case "Manager":
                            createManager();
                            break;
                        case "Engineer":
                            createEngineer();
                            break;
                        case "Intern":
                            createIntern();
                            break;
                        default:
                            break;
                    }
                })
                break;
            case "Finish Team":
                if (team.length > 0) {
                    writeTeam(render(team));
                    console.log(team);
                    console.log("Success!")
                } else {
                    console.log("You need to add team members!")
                    teamBuilder();
                }
                break;
            default:
                break;
        }
    })
}
teamBuilder();

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter manager's full name.",
            name: "managerName"

        },

        {
            type: "input",
            message: "Please enter manager's email address.",
            name: "managerEmail"

        },

        {
            type: "input",
            message: "Please enter manager's employee ID.",
            name: "managerId"

        },

        {
            type: "input",
            message: "Please enter manager's office number.",
            name: "managerOffice"

        }

    ]).then(function (response) {

        let newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice);

        team.push(newManager);
        teamBuilder();
    })

}



function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter engineer's full name.",
            name: "engineerName"

        },

        {
            type: "input",
            message: "Please enter engineer's email address.",
            name: "engineerEmail"

        },

        {
            type: "input",
            message: "Please enter engineer's employee ID.",
            name: "engineerId"

        },

        {
            type: "input",
            message: "Please enter engineer's Github UN.",
            name: "engineerUser"

        }

    ]).then(function (response) {

        let newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerUser);

        team.push(newEngineer);
        teamBuilder();
    })

}


function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter intern's full name.",
            name: "internName"

        },

        {
            type: "input",
            message: "Please enter intern's email address.",
            name: "internEmail"

        },

        {
            type: "input",
            message: "Please enter intern's employee ID.",
            name: "internId"

        },

        {
            type: "input",
            message: "Please enter intern's school.",
            name: "internSchool"

        }

    ]).then(function (response) {

        let newIntern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);

        team.push(newIntern);
        teamBuilder();
    })

}

function writeTeam() {
    fs.writeFileSync(outputPath, render(team), function (err) {

        if (err) {
            return console.log(err);

        }
        console.log(success);
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
