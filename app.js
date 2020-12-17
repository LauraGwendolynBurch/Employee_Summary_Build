const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

function askUserForManagerInfo(){

    return inquirer.prompt([
    {
    type:'input',
    message: "What is your manger's name?",
    name: "name",
    },

    {
    type:'input',
    message: "What is your manger's id?",
    name: "id",
    },

    {
    type:'input',
    message: "What is your manger's email?",
    name: "email",
    },

    {
    type:'input',
    message: "What is your manger's office number?",
    name: "officeNumber",
    },



    ]).then ((managerData) => {

    const newManager = new Manager( managerData.name, managerData.email, managerData.id, managerData.officeNumber)

    employeeList.push(newManager);

    askUserForEmployeeType()

    })
}

function askUserForEmployeeType(){

    return inquirer.prompt([
        {
        type:'list',
        message: "What type of employee do you want to add",
        choices: [
            Manager,
            Engineer,
            Intern,
            "I do not want to add any more members",
        ],
        name: "typeOfEmployee",
        }

     ]).then ((newEmployeeChoices) => {

        switch(newEmployeeChoices.typeOfEmployee){
            case "Manager":
            askUserForManagerInfo()
            break;

            // if the selected a new engineer
            case "Engineer":
            askUserForEngineerInfo ()
            break;

            // else if the user 
            case "Intern":
            askUserForInternInfo()
            break;
    
            // exit app else
            case "I do not want to add any more members":
            createHtmlFile()

        }

    })

    
};



function askUserForEngineerInfo (){

    return inquirer.prompt([
    {
    type:'input',
    message: "What is your Engineer's name?",
    name: "name",
    },

    {
    type:'input',
    message: "What is your Engineer's id?",
    name: "id",
    },

    {
    type:'input',
    message: "What is your Engineer's email?",
    name: "email",
    },

    {   
    type:'input',
    message: "What is your Engineer's Github username?",
    name: "github",
    },

    ]).then ((engineerData) => {

    const newEngineer = new Engineer (engineerData.name, engineerData.id, engineerData.email, engineerData.github)

    employeeList.push(newEngineer);

    askUserForEmployeeType()

    })

    
}

function askUserForInternInfo(){

    return inquirer.prompt([
    {
    type:'input',
    message: "What is your Intern's name?",
    name: "name",
    },

    {
    type:'input',
    message: "What is your Intern's email?",
    name: "email",
    },

    {
    type:'input',
    message: "What is your Intern's id?",
    name: "id",
    },

    {
    type:'input',
    message: "What is your Intern's school?",
    name: "school",
    },

    ]).then ((internData) => {

    const newIntern = new Intern( internData.name, internData.email, internData.id, internData.school,)

    employeeList.push(newIntern);

    askUserForEmployeeType()

    })

};

function createHtmlFile(){

    const htmlContnt = render ( employeeList);
    // use the fs moduel to create the output file
    fs.writeFile(outputPath, htmlContnt, (err) => {
        if (err) throw err;
        console.log(`File added to ${OUTPUT_DIR}`)

    })
} 

function init(){
    askUserForManagerInfo()
}

init();


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
// for the provided `render` function to work! ```
