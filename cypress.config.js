const { defineConfig } = require('cypress')

const dotenv = require('dotenv');
require('dotenv').config();
require('cypress-mochawesome-reporter/plugin');


const fs = require('fs');
const path = require('path');

// Load the environment-specific .env file
dotenv.config({
  path: path.resolve(__dirname, `./.workspace/.env`),
});

// Function to get current date and time in UTC+7
const timestamp = () => {
  const now = new Date();
  const utc7 = new Date(now.getTime() + (7 * 60 * 60 * 1000)); // Convert to UTC+7
  const date = utc7.toISOString().split('T')[0];
  const time = utc7.toISOString().split('T')[1].split('.')[0].replace(/:/g, '-');
  return `${date}_${time}`;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qaplayground.dev/apps/', // Change this to your website URL

    //Cypress: Custom file paths
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",

    video: true,
    videoCompression: 16, // Medium compression (default is 16)
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,

    
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: `report_${timestamp()}`,
      reportPageTitle: `Cypress Test Report - ${timestamp()}`,
      overwrite: false,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      html: true,
      json: false,
      video: true,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
}) 