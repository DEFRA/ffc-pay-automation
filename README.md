# ffc-pay-automation

## Installation

### Prerequisites

With the exception of Visual Studio Code, these prerequisites should be installed on Linux (NOT Windows)

1. Visual Studio Code (https://code.visualstudio.com/)
2. NVM (Node Version Manager) (https://github.com/nvm-sh/nvm)
3. Node.js - run `nvm install --lts` from Linux terminal
4. Google Chrome - run `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb` from Linux terminal, and then `sudo apt -y install ./google-chrome-stable_current_amd64.deb` to install

### Setup

1. Clone this Git repository to your local directory (within Linux)
2. Open up this local instance of the project in Visual Studio Code
3. Install the recommended extensions from Visual Studio Code Extensions.
4. Open Terminal within Visual Studio Code and install Yarn by running `npm install --global yarn` from the terminal
5. Open Terminal within Visual Studio Code and install the dependencies by running `npm install` from the terminal
6. Open Terminal within Visual Studio Code and install the dependencies by running `sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb` from the terminal

## Running Tests

The file 'package.json' contains the commands to run scripts, and these are all declared in 'scripts' object. The tests are executed in a Chrome browser with the tag filter `not @ignore`.

### Running Cypress Tests in Interactive Mode

In this mode, Cypress opens the interactive Test Runner, allowing you to manually run and observe tests in the browser. 

1. `npm run cypress:local` - Opens the Test Runner for the Local environment.
2. `npm run cypress:dev` - Opens the Test Runner for the Dev Environment.
3. `npm run cypress:test` - Opens the Test Runner for the Test Environment.

### Running Cypress Tests in Headless Mode (cypress run)

In this mode, Cypress runs tests all tests at once and generates a HTML report after.

1. `npm run cypress:local:all` Runs all tests for the Local environment.
2. `npm run cypress:dev:all` Runs all tests for the Dev environment.
3. `npm run cypress:test:all` Runs all tests for the Test environment.
<br>
<br>
<br>
*Last updated: 9th September 2024*
