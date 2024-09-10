// This file contains all over the portal work which will be shown to user.

import inquirer from "inquirer";
import { main } from "./main.js";
import boxen from "boxen";
import chalk from "chalk";
import chlakAnimation from "chalk-animation";

// Interface for clients details
export interface Clients {
  name: string;
  id: string;
  email: string;
  gender: string;
  mobileNumber: string;
  password: string; 
  chosenPlace: string;
  groupName: string;
  discountedOffer: boolean;
  duration: string;
  validity: string;
  payment: PaymentDetails
  postponed: string;
  cancel: string;
}

// Interface for payment details
export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cardHolderName: string;
  amount: number;
}

// Array to store all client details
export let allClients: Clients[] = [];

//Function to show different places and offers
export function showPlaces(): void {
  inquirer.prompt([
      {
        type: "list",
        name: "menuOption",
        message: chalk.green("\nPlease choose an option:\n"),
        choices: [
          "Offers",
          "Trending destinations",
          "Other places and foreign tours",
        ],
      },
    ])
    .then((answers: { menuOption: string }) => {
      if (answers.menuOption === "Offers") {
        offers();
      } else if (answers.menuOption === "Trending destinations") {
        trendingDestinations();
      } else {
        foreignCountriesAndOtherPlaces();
      }
    });
}

// Interface for offer details
 export type Offer = {
  name: string;
  value: string;
  price: number;
  discountedPrice: number| string;
  duration: string;
  validity: string;
  groupName: string;
};

// Array of available offers
export let offerOptions: Offer[] = [
  {
    name: "Hunza Valley",
    value: "Hunza Valley",
    price: 38000,
    discountedPrice: 34000,
    duration: "6 Days and 5 nights",
    validity: "2024-06-22",
    groupName: "offerHunza",
  },
  {
    name: "Kalam Valley",
    value: "Kalam Valley",
    price: 25000,
    discountedPrice: 22500,
    duration: "4 Days and 3 nights",
    validity: "2024-06-25",
    groupName: "offerKalam",
  },

  {
    name: "Skardu Valley",
    value: "Skardu Valley",
    price: 40000,
    discountedPrice: 36500,
    duration: "7 Days and 6 nights",
    validity: "2024-06-30",
    groupName: "offerSkardu",
  },

  {
    name: "Neelum Valley",
    value: "Neelum Valley",
    price: 32500,
    discountedPrice: 28000,
    duration: "7 Days and 6 nights",
    validity: "2024-06-30",
    groupName: "offerNeelum",
  },

  {
    name: "Kashmir",
    value: "Kashmir",
    price: 27000,
    discountedPrice: 23000,
    duration: "4 Days and 3 nights",
    validity: "2024-06-27",
    groupName: "offerKashmir",
  },

  {
    name: "Murree",
    value: "Murree",
    price: 56000,
    discountedPrice: 52000,
    duration: "4 Days and 3 nights",
    validity: "2024-06-30",
    groupName: "offerMurree",
  },
];

// Create choices for offers
let offerOptionsForChocies = offerOptions.map((option) => ({
  name: `\n• ${option.name}:
Original Price: Rs/-${option.price} --- Discounted Price: Rs/-${option.discountedPrice}
Tour's Duration: ${option.duration}
Last Date Of Booking ${option.validity}`,
  value: option.value,
}));

// Function to show available offers
async function offers(): Promise<void> {
  const {offers} = await inquirer.prompt([
      {
        type: "list",
        name: "offers",
        message: chalk.green("\nWhere do you want to go?\n"),
        choices: offerOptionsForChocies,
      },
    ])
      const selectedOffer = offerOptions.find(
        (offer) => offer.value === offers
      );
      if (selectedOffer) {

        const currentDate = new Date();
        const offerValidity = new Date(selectedOffer.validity);

        if (currentDate <= offerValidity) {
          console.log(
            chalk.magenta.bold("\nThis offer is still available. You can proceed with booking.\n")
          );
          bookNowOrVisitUs();
        } else {
          console.log(chalk.red.bold("\nSorry, this offer is no longer available."));
        }
      } else {
        console.log(chalk.red.bold("\nInvalid selection. Please try again."));
      }
    };


// Array of trending destinations
export let trendingOptions: Offer[] = [
  {
    name: "Lahore",
    value: "Lahore",
    price: 40000,
    discountedPrice: "---",
    duration: "5 Days and 4 nights",
    validity: "2024-07-17",
    groupName: "trendLahore",
  },
  {
    name: "Islamabad",
    value: "Islamabad",
    price: 45000,
    discountedPrice: "---",
    duration: "6 Days and 5 nights",
    validity: "2024-07-15",
    groupName: "trendIslamabad",
  },

  {
    name: "Balochistan",
    value: "Balochistan",
    price: 47000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-07-15",
    groupName: "trendBalochistan",
  },
  {
    name: "Peshawar",
    value: "Peshawar",
    price: 45000,
    discountedPrice: "---",
    duration: "6 Days and 5 nights",
    validity: "2024-07-10",
    groupName: "trendPeshawar",
  },
  {
    name: "Sawat",
    value: "Sawat",
    price: 50000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-07-05",
    groupName: "trendSawat",
  },
  {
    name: "Naran Kaghan",
    value: "Naran Kaghan",
    price: 55000,
    discountedPrice: "---",
    duration: "6 days and 5 nights",
    validity: "2024-06-30",
    groupName: "trendNaranKaghan",
  },
  {
    name: "Karachi",
    value: "Karachi",
    price: 45000,
    discountedPrice: "---",
    duration: "6 Days and 5 nights",
    validity: "2024-07-10",
    groupName: "trendKarachi",
  },
];

// Create choices for trending destinations
let trendingDestinationOptionsForChocies = trendingOptions.map((option) => ({ name: `\n• ${option.name}:
Package Price: Rs/-${option.price}
Tour's Duration: ${option.duration}
Last Date Of Booking ${option.validity}`,
  value: option.value,
}));

// Function to show trending destinations
async function trendingDestinations(): Promise<void> {
  const {trendingDestination} = await inquirer.prompt([
      {
        type: "list",
        name: "trendingDestination",
        message: chalk.green("\nWhat would you like to explore?\n"),
        choices: trendingDestinationOptionsForChocies,
      },
    ]) 
      const selectedDestination = trendingOptions.find(
        (destination) => destination.value === trendingDestination
      );
      if (selectedDestination) {

        const currentDateForDestination = new Date();
        const destinationValidity = new Date(selectedDestination.validity);

        if (currentDateForDestination <= destinationValidity) {
          console.log(
            chalk.magenta.bold("\nThis offer is still available. You can proceed with booking.\n")
          );
          bookNowOrVisitUs();
        } else {
          console.log(chalk.red.bold("\nSorry, this offer is no longer available."));
        }
      } else {
        console.log(chalk.red.bold("\nInvalid selection. Please try again."));
      }
    };

// Arrays of other places and foreign tours
export let otherOptions: Offer[] = [
  {
    name: "Dubai",
    value: "Dubai",
    price: 150000,
    discountedPrice: "---",
    duration: "3 Days and 2 nights",
    validity: "2024-06-25",
    groupName: "othDubai",
  },
  {
    name: "Istanbul",
    value: "Istanbul",
    price: 250000,
    discountedPrice: "---",
    duration: "5 Days and 4 nights",
    validity: "2024-06-30",
    groupName: "othIstanbul",
  },
  {
    name: "Paris",
    value: "Paris",
    price: 270000,
    discountedPrice: "---",
    duration: "6 Days and 5 nights",
    validity: "2024-07-10",
    groupName: "othParis",
  },
  {
    name: "New York",
    value: "New York",
    price: 250000,
    discountedPrice: "---",
    duration: "4 Days and 3 nights",
    validity: "2024-07-05",
    groupName: "othNewYork",
  },
  {
    name: "Bangkok",
    value: "Bangkok",
    price: 200000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-07-15",
    groupName: "othBangkok",
  },
  {
    name: "Multan",
    value: "Multan",
    price: 50000,
    discountedPrice: "---",
    duration: "8 Days and 7 nights",
    validity: "2024-07-10",
    groupName: "othMultan",
  },
  {
    name: "Rawalpindi",
    value: "Rawalpindi",
    price: 54000,
    discountedPrice: "---",
    duration: "8 Days and 6 nights",
    validity: "2024-07-15",
    groupName: "othRawalpindi",
  },
  {
    name: "Taj Mehal",
    value: "Taj Mehal",
    price: 150000,
    discountedPrice: "---",
    duration: "5 Days and 4 nights",
    validity: "2024-07-12",
    groupName: "othTajMehal",
  },
  {
    name: "London",
    value: "London",
    price: 265000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-07-07",
    groupName: "othLondon",
  },
  {
    name: "Canada",
    value: "Canada",
    price: 295000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-06-25",
    groupName: "othCanada",
  },
  {
    name: "South Korea",
    value: "South Korea",
    price: 300000,
    discountedPrice: "---",
    duration: "7 Days and 6 nights",
    validity: "2024-06-27",
    groupName: "othSouthKorea",
  },
  {
    name: "Switzerland",
    value: "Switzerland",
    price: 350000,
    discountedPrice: "---",
    duration: "6 Days and 5 nights",
    validity: "2024-07-01",
    groupName: "othSwitzerland",
  },
];

// Create choices for other places and foreign tours
let OtherPlacesForChoices = otherOptions.map((option) => ({ name: `\n• ${option.name}:
Package Price: Rs/-${option.price}
Tour's Duration: ${option.duration}
Last Date Of Booking ${option.validity}`,
  value: option.value,
}));

// Function to display foreign and other places
async function foreignCountriesAndOtherPlaces(): Promise<void> {
  const {otherPlaces} = await inquirer.prompt([
      {
        type: "list",
        name: "otherPlaces",
        message: chalk.green("\nWhich place would you like to visit?\n"),
        choices: OtherPlacesForChoices,
      },
    ])
        const selectedPlace = otherOptions.find(
        (place) => place.value === otherPlaces
      )
      if (selectedPlace) {
        const currentDateForPlace = new Date();
        const placeValidity = new Date(selectedPlace.validity);

        if (currentDateForPlace <= placeValidity) {
          console.log(
           chalk.magenta.bold("\nThis offer is still available. You can proceed with booking.")
          );
           bookNowOrVisitUs();
        } else {
          console.log(chalk.red.bold("\nSorry, this offer is no longer available."));
        }
      } else {
        console.log(chalk.red.bold("\nInvalid selection. Please try again."));
      }
      return otherPlaces;
    };

// Function to handle booking and visiting
async function bookNowOrVisitUs(): Promise<void> {
  const {bookNowOrVisitUs} = await inquirer.prompt([
    {
      type: "list",
      name: "bookNowOrVisitUs",
      message: chalk.green("\nDo you want to make a booking or visit us?\n"),
      choices: ["Book Now", "Visit Us", "Exit"],
    }
  ])
  if (bookNowOrVisitUs === "Book Now") {
    bookNow();

  } else if (bookNowOrVisitUs === "Visit Us") {
    console.log(chalk.yellow.bold(`\nAddress: Street No 123, Gulistan-e-Johar, Karachi
    Visiting Hours: 9AM to 5PM
    Phone: +923625432523 -- Email: sarazafar453@gmail.com\n`));
    console.log(chalk.magenta.bold(`Discover our amazing tours and create lasting memories!\n`));
    bookingConfirmation();
  } else {
    const rainbowAnimation = chlakAnimation.rainbow("\nThank You for Visiting Us. Come again!\n");
    setTimeout(() => {
      rainbowAnimation.stop();
      process.exit(0);
    }, 2000)
  }
}

// Concatenation of separate array of places in one array
let allPlaces: Offer[] = offerOptions.concat(trendingOptions).concat(otherOptions);

// Create choices for all places
export let allPlacesForChoice = allPlaces.map((option) => ({
  name: `\n• ${option.name}:
Original Price: Rs/-${option.price} --- Discounted Price : Rs/-${option.discountedPrice}
Tour's Duration: ${option.duration}
Last Date Of Booking ${option.validity}`,
  value: option.value,
}));

// This function generates a unique id for every tour client
export function generateJourneyJoyId(): string {
  const prefix = "JourneyJoy";
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit nimber
  return `${prefix}${randomNumber}`;

}

// Function to handle the booking process
async function bookNow(): Promise<void> {
  const {userName, email, gender, mobileNumber, password, chosenplace, payment, discountOffer, confirmPayment} =
   await inquirer.prompt([
    {
      type: "input",
      name: "userName",
      message: chalk.cyan("\nEnter your name:"),
    },
    {
      type: "input",
      name: "email",
      message: chalk.cyan("Enter your email here:"),
      validate: (input: string): boolean | string => {
        const emailRegex = /^[^\s@]{1,64}@gmail\.com$/;
        if (!emailRegex.test(input)) {
          return chalk.red.bold("\nPlease enter a valid email address.");
        }
        // Verify total length of email address
        if (input.length > 254) {
          return chalk.red.bold("\nEmail address length cannot exceed 254 characters.");
        }
        return true;
      },
    },
    {
      type: "list",
      name: "gender",
      message: chalk.cyan("Enter your gender:"),
      choices: ["Male", "Female", "Other"],
    },
    {
      type: "password",
      name: "password",
      message: chalk.cyan("Create a strong password:"),
      mask: "•",
    },
    {
      type: "input",
      name: "mobileNumber",
      message: chalk.cyan("Please enter your mobile number (optional, 11 digits):"),
      validate: (input: string): boolean | string => {
        // Allow empty input for optional field
        if (input.trim() === "") {
          return true;
        }
        // Regular expressionto match a valid mobile number (11 digits)
        const mobileNumber = parseInt(input);
        if (isNaN(mobileNumber) || !/^\d{11}$/.test(input)) {
          return chalk.red.bold("\nPlease enter a valid 11-digit mobile number or leave it blank.");
        }
        return true;
      },
    },
    {
      type: "list",
      name: "chosenplace",
      message: chalk.cyan("Choose an option. Which place would you want to explore?\n"),
      choices: allPlacesForChoice,
      },
      {
        type: "list",
        name: "discountOffer",
        message: chalk.cyan("Have you choosen the discount offer?"),
        choices: ["Yes", "No"],
      },
    {
      type: "list",
      name: "payment",
      message: chalk.cyan("Would you like to pay by credit card or debit card?"),
      choices: ["Credit Card", "Debit Card"],
    },
    {
      type: "list",
      name: "confirmPayment",
      message: chalk.yellow("\nConfirm payment?"),
      choices: ["Yes", "No"],
    },
  ])
  if (confirmPayment === "Yes") {
    const clientCardDetails = await getCardDetails();

    console.log(chalk.bold.yellow("\nProcessing Payment......"));
    setTimeout(() => {
      console.log(chalk.bold.green("Payment successfully processed!"));
      console.log(chalk.bold.blue("\nThank you for registering!\n"));
      const clientId = generateJourneyJoyId();

  const selectedPlaceByUser = allPlaces.find((place) => place.value === chosenplace);
  if (selectedPlaceByUser) {
   const clients : Clients = {
      name: userName,
    id: clientId,
    email: email,
    gender: gender,
    mobileNumber: mobileNumber,
    password: password,
    chosenPlace: chosenplace,
    groupName: selectedPlaceByUser.groupName,
    discountedOffer: discountOffer,
    duration: selectedPlaceByUser.duration,
    validity: selectedPlaceByUser.validity,
    payment: clientCardDetails,
    postponed: "Not Postponed",
    cancel: "Not Cancelled",
    };

    allClients.push(clients);
   showTicket(clients);
   main();
  } else {
    console.log(chalk.red.bold("\nInvalid place selection. Please try again."));
    bookNow();
  }
    }, 3000)
  } else {
    console.log(chalk.red.bold("\nPayment cancelled."));
    bookNowOrVisitUs();
  }
}  

// Function to show ticket details to the client
 function showTicket(obj: Clients): void {

  const ticketDetails = `
  Place: ${obj.chosenPlace}
  Client Name: ${obj.name}
  Client ID: ${obj.id}
  Password: ${obj.password}
  Mobile Number: ${obj.mobileNumber}
  Group Name: ${obj.groupName}
  Payment: Rs/- ${obj.payment.amount}
  Discounted Offer: ${obj.discountedOffer}
  Last date of booking: ${obj.validity}
  Tours Duration: ${obj.duration}
  
  Please remember your Client ID and Ticket Password.
  You can open your ticket purchasing portal only with it.
  ------------------------------------`;

   console.log("\n");

   const formattedTicket = boxen(ticketDetails, {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    title: "JourneyJoy Ticket",
    titleAlignment: "center",
    backgroundColor: "cyan",
    borderColor: "yellow",
  });

  console.log(chalk.bold.black(formattedTicket));
}

// Function to get card details for payment
async function getCardDetails(): Promise<Clients["payment"]> {
  const {cardNumber, expiryDate, cardHolderName, amount} = await inquirer.prompt([
    {
      type: "input",
      name: "cardNumber",
      message: chalk.cyan("\nEnter your 16-digit card number:"),
      validate: (value: string): boolean | string => {
        const cardRegex = /^\d{16}$/;
        if (!cardRegex.test(value)) {
          return chalk.red.bold("\nPlease enter a valid 16-digit card number.");
        }
        return true;
      }
    },
    {
      type: "input",
      name: "expiryDate",
      message: chalk.cyan("Enter expiry date (MM/YY):"),
      validate: (value: string): boolean | string => {
        const expiryRegex = /^\d{2}\/\d{2}$/;
        if (!expiryRegex.test(value)) {
          return chalk.red.bold("Please enter a valid expiry date in MM/YY format.");
        }
        return true;
      }
    },
    {
      type: "input",
      name: "cardHolderName",
      message: chalk.cyan("Enter cardholder's name (max 20 characters):"),
      validate: (value: string): boolean | string => {
        if (value.length > 20) {
          return chalk.red.bold("Cardholder's name must be 20 characters or less.");
        }
        return true;
    },
  },
  {
    type: "number",
    name: "amount",
    message: chalk.cyan("Enter the payment amount (Make sure to pay in full and accurately):"),
    validate: (amt: number):  boolean | string => {
      const clientOfferAmount = offerOptions.find((value) => value.discountedPrice === amt);
        const clientTrendingOptionsAmount = trendingOptions.find((value) => value.price === amt);
          const clientOtherPlaceAmount = otherOptions.find((value) => value.price === amt);

            if (clientOfferAmount || clientTrendingOptionsAmount || clientOtherPlaceAmount) {
                return true;
      
              } else {
                return chalk.red.bold("Invalid amount. Please choose a valid amount or procceed with full-payment.");
              }
  },
},
])
const cardDetails = {cardNumber, expiryDate, cardHolderName, amount};
return cardDetails;

  }
  
// Function to confirm the user's intention to take a tour
 function bookingConfirmation(): void {
   inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message: chalk.green("Do you want to take a tour"),
    default: false,
  })
  .then((answers: {confirm: boolean}) => {

    if (answers.confirm) {
      showPlaces();
    } else {
      const exitAnimation = chlakAnimation.rainbow("\nThank You for Visiting Us. Come again!\n");
    setTimeout(() => {
      exitAnimation.stop();
      process.exit(0);
    }, 2000)
    }
  })
}

