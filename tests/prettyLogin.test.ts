import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

//For credentials stored in a separate env file for security
const username = process.env.APP_USERNAME!;
const password = process.env.APP_PASSWORD!;

//Test startup to login for each task
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button:text("Sign In")');
  await expect(page.getByText("Logout")).toBeVisible();
});

//Logout after each test for security and no hanging sessions
test.afterEach(async ({ page }) => {
  await page.click('button:text("Logout")');
});


//Parameterized test cases
const tasks = [
  {
    app: 'Web Application',
    expectation: ['To Do', 'Implement user authentication', 'Feature', 'High Priority'],
    description: 'Confirm user authentication task in the Web app project',
  },
  {
    app: 'Web Application',
    expectation: ['To Do', 'Fix navigation bug', 'Bug'],
    description: 'Confirm Fix navigation bug task in Web app project',
  },
  {
    app: 'Web Application',
    expectation: ['In Progress', 'Design system updates', 'Design'],
    description: 'Confirm Design system updates task in Web app project',
  },
  {
    app: 'Mobile Application',
    expectation: ['To Do', 'Push notification system', 'Feature'],
    description: 'Confirm Push notification system task in Mobile app project',
  },
  {
    app: 'Mobile Application',
    expectation: ['In Progress', 'Offline mode', 'Feature', 'High Priority'],
    description: 'Confirm Offline mode task in Mobile app project',
  },
  {
    app: 'Mobile Application',
    expectation: ['Done', 'App icon design', 'Design'],
    description: 'Confirm App icon task in Mobile app project',
  }
].forEach(({ app, expectation, description }) => {
    
    test(description, async ({ page }) => {
        await page.getByRole('button', { name: app }).click();
        const parentDiv = page.locator('div.flex');
        //Looks for the div containing all the required nested phrases and confirms they are together in one space
        await expect(parentDiv).toContainText(expectation);
      });

});
