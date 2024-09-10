// This file contains all CURD options for our tour clients
import inquirer from "inquirer";
import boxen from "boxen";
import { showPlaces, allClients } from "./displayTours.js";
import { main } from "./main.js";
import chalk from "chalk";
// This login function is for those pepole who have booked a tour
export async function clientSignIn() {
    const { clientName, id, password } = await inquirer.prompt([
        {
            type: "input",
            name: "clientName",
            message: chalk.yellow("Enter your username:"),
        },
        {
            type: "input",
            name: "id",
            message: chalk.yellow("Enter your ID:"),
        },
        {
            type: "password",
            name: "password",
            message: chalk.yellow("Enter your password:"),
            mask: "•",
        }
    ]);
    const signInClient = allClients.find((user) => user.id === id && user.password === password);
    if (signInClient) {
        console.log(chalk.green.bold("\nLogin successfull!\n"));
        displayOptions(id);
    }
    else {
        console.log(chalk.red.bold("\nInvalid userID or password. Please try again"));
        main();
    }
}
// Function to display various options for the logged-in client
function displayOptions(id) {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: chalk.green("What do you want to do?"),
            choices: ["View Purchase Tour", "Postpone Tour", "Cancel Tour", "Book More Tours", "Exit"],
        },
    ])
        .then((answers) => {
        switch (answers.option) {
            case "View Purchase Tour":
                displayUserTourInfo(id);
                break;
            case "Postpone Tour":
                postponeTour(id);
                break;
            case "Cancel Tour":
                cancelTour(id);
                break;
            case "Book More Tours":
                bookMoreTours(id);
                break;
            case "Exit":
                console.log(chalk.blue.bold("\nThank You for using our service. Come again! Goodbye!\n"));
                return main();
            default:
                console.log(chalk.red.bold("Invalid Option"));
        }
    });
}
// Helper funtion to find a client by ID
function findUserById(id) {
    return allClients.find((client) => client.id === id);
}
// Function to display user's tour information
function displayUserTourInfo(id) {
    const user = findUserById(id);
    if (user) {
        const userInfo = `
${user.name} Tour Details:
••••••••••••••••••••••••••
Client ID: ${user.id}
Client Name: ${user.name}
Password: ${user.password}
Mobile Number: ${user.mobileNumber}
Group Name: ${user.groupName}
Payment: ${user.payment.amount}
Discounted Offer: ${user.discountedOffer}
Last date of booking: ${user.validity}
Tours Duration: ${user.duration}
Postponed Tour: ${user.postponed}
Cancel Tour: ${user.cancel}

Please remember your Client ID and Ticket Password.
You can open your ticket purchasing portal only with it.
------------------------------------`;
        const boxedUserInfo = boxen(userInfo, { padding: 1, margin: 1, borderStyle: 'double',
            backgroundColor: "cyan", borderColor: "yellow", title: "JourneyJoy Ticket", titleAlignment: "center" });
        console.log(chalk.bold.black(boxedUserInfo));
        displayOptions(id);
    }
    else {
        console.log(chalk.bold.red("User not found!"));
        displayOptions(id);
    }
}
// Function to postponed a tour for user
function postponeTour(id) {
    const user = findUserById(id);
    if (!user) {
        console.log(chalk.red.bold("User not found!"));
        displayOptions(id);
        return;
    }
    inquirer.prompt({
        type: "confirm",
        name: "postponed",
        message: chalk.cyan("\nDo you want to postponed your tour? Your payment will be deducted by 30%."),
        default: false,
    })
        .then((answers) => {
        if (answers.postponed) {
            console.log(chalk.yellow.bold(`\nCurrent payment: Rs/-${user.payment.amount}\n`));
            const returnAmount = user.payment.amount * 0.7;
            const deductAmount = user.payment.amount * 0.3;
            console.log(chalk.yellow.bold(`\n30% of the payment (Rs/-${deductAmount})has been
             deducted from your payment due to postponment.\n`));
            console.log(chalk.yellow.bold(`\nReturn payment: Rs/-${returnAmount}\n`));
            user.payment.amount -= returnAmount;
            user.postponed = "Postponed";
            console.log(chalk.green.bold("\nTour has been postponed successfully!"));
            displayOptions(id);
        }
        else {
            console.log(chalk.red.bold("\nTour postponement cancelled.\n"));
            displayOptions(id);
        }
    });
}
// Function to cancel a tour for the user
function cancelTour(id) {
    const user = findUserById(id);
    if (!user) {
        console.log(chalk.red.bold("User not found!"));
        displayOptions(id);
        return;
    }
    inquirer.prompt({
        type: "confirm",
        name: "cancel",
        message: chalk.cyan("\nDo you want to cancel your tour? Please note that 50% of your payment will be detucted."),
        default: false,
    })
        .then((answers) => {
        if (answers.cancel) {
            console.log(chalk.yellow.bold(`\nCurrent payment: Rs/-${user.payment.amount}\n`));
            const deductedAmount = user.payment.amount * 0.5;
            console.log(chalk.yellow.bold(`\n50% of the payment (Rs/-${deductedAmount})has been
                deducted from your payment due to cancellation.\n`));
            user.payment.amount -= deductedAmount;
            user.cancel = "Cancelled";
            console.log(chalk.green.bold("\nTour has been cancelled successfully!\n"));
            displayOptions(id);
        }
        else {
            console.log(chalk.red.bold("\nTour cancellation cancelled.\n"));
            displayOptions(id);
            const userIndex = allClients.findIndex(user => user.id === id);
            /* if (userIndex !== -1) {
                allClients.splice(userIndex, 1);
                console.log(
                    chalk.yellow.bold("\nNow you need to register again if if you want to book another tour.\n"));
                displayOptions(id);
                return;
            } else {
                console.log(chalk.red.bold("User not found!"));
                displayOptions(id);
            } */
        }
    });
}
// Function to book more tours for the user
function bookMoreTours(id) {
    const user = findUserById(id);
    if (!user) {
        console.log(chalk.red.bold("User not found!"));
        displayOptions(id);
        return;
    }
    inquirer.prompt({
        type: "confirm",
        name: "bookMore",
        message: chalk.green("\nDo you want to book more tours?"),
        default: false,
    })
        .then((answer) => {
        if (answer.bookMore) {
            showPlaces();
        }
        else {
            console.log(chalk.magenta.bold("\nThank you for booking with us! We hope you have a great time on your tours!\n"));
            displayOptions(id);
        }
    });
}
