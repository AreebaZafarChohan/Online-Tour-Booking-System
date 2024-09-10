// This is the main file of project
import inquirer from "inquirer";
import { showPlaces } from "./displayTours.js";
import { clientSignIn } from "./user-curd.js";
import { adminLogin } from "./admin.js";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// Function to show various options for admin and user's 
export async function main() {
    const { main } = await inquirer.prompt({
        type: "list",
        name: "main",
        message: chalk.green.bold("What would you like to do?\n"),
        choices: [
            "Explore Tour Packages",
            "Access User Portal",
            "Access Admin Portal",
            "Exit",
        ]
    });
    switch (main) {
        case "Explore Tour Packages":
            console.log(chalk.bold.underline.yellow("\nWelcome to the JourneyJoy Tour Portal!"));
            showPlaces();
            break;
        case "Access User Portal":
            console.log(chalk.bold.underline.magenta("\nWelcome to the JourneyJoy User Portal!"));
            clientSignIn();
            break;
        case "Access Admin Portal":
            adminLogin();
            break;
        case "Exit":
            const rainbowAnimation = chalkAnimation.rainbow("\nThank you for using the JourneyJoy. Goodbye!");
            setTimeout(() => {
                rainbowAnimation.stop();
                process.exit(0);
            }, 2000);
            break;
    }
}
// Start the application
const welcomAnimation = chalkAnimation.rainbow("\n\tWelcome to the JourneyJoy\t\n");
setTimeout(() => {
    welcomAnimation.stop();
    main();
}, 2000);
