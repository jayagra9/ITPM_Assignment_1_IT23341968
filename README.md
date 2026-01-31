# ITPM Assignment 1 – Playwright Automation Testing

Student ID: IT23341968
Module: ITPM
Tool: Playwright
Application Under Test: SwiftTranslator

##📌 Project Description

This repository contains an automated test suite developed using Playwright to test the SwiftTranslator web application.

The test suite covers:

✅ Positive Functional Test Cases (valid Singlish inputs should translate correctly)

❌ Negative Functional Test Cases (invalid / noisy inputs should not match clean outputs)

🖥️ UI Test Cases (input/output behavior)

The objective of this assignment is to demonstrate functional correctness, robustness, and UI behavior using automated testing.

🌐 Application URL
https://www.swifttranslator.com/

🛠️ Technologies Used

Node.js

Playwright Test Framework

JavaScript

Git & GitHub

📁 Project Structure
ITPM_Assignment_1_Playwright/
│
├── tests/
│   └── example.spec.js        # All test cases (Positive, Negative, UI)
│
├── playwright.config.js       # Playwright configuration
├── package.json               # Project dependencies
├── package-lock.json
└── README.md                  # Project documentation

⚙️ Prerequisites

Before running the project, ensure you have:

Node.js (version 18 or higher)
👉 https://nodejs.org/

Git
👉 https://git-scm.com/

Check installation:

node -v
git --version

📥 Installation Steps

Clone the repository

git clone https://github.com/jayagra9/ITPM_Assignment_1_Playwright.git


# Navigate into the project folder

cd ITPM_Assignment_1_Playwright


# Install dependencies

npm install


# Install Playwright browsers

npx playwright install

  How to Run the Tests
  Run all tests (Chromium only – recommended)
npx playwright test --project=chromium

  Run all tests (all browsers)
npx playwright test

🖥️ Run tests with UI (headed mode)
npx playwright test --project=chromium --headed

📊 View test report
npx playwright show-report
