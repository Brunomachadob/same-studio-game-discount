# smart-game-discounts

Smart game discount rules based on other games you already own.

By default, only one rule will be applied, being the one with higher discount rate, but discount can be staked upon configuration.

## Discount Rules

#### Same studio discont

* For each game you have in your library from that same studio, you get X% discount, up to Y%.

#### Franchise discounts

* If you have the previous game from that franchise in your library, you get X% discount for the sequel
* If you have any other game from this same franchise in your library, you get X% per game, up to Y%

## Todo

[x] Same studio rule
[x] Same franchise rule
[ ] Rule edition
[ ] Game edition
[ ] Sequel rule

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
