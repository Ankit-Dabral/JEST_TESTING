# Bowling Score Counter

You have been given the code to calculate the score of a game of bowling. 
However, before using it, you need to validate that the code works as expected.
You are tasked to test the code as thoroughly as possible, using the jest framework.

Rules:

Bowling is a game where players roll a heavy ball down a lane to knock down pins.

1. The Objective is to knock down as many pins as possible over the course of ten frames.
2. In each frame, a player has 2 chances to knock down all 10 pins.
3. Scoring:
    - Strike: If a player knocks down all 10 pins with the first ball in a frame, it is called a strike
    The score of a strike is 10 plus the total number of pins knocked down in the next 2 rolls.
    - Spare: If a player knocks down all 10 pins with both balls in a frame (ie. after the second ball), it is called a spare
    The score of a spare is 10 plus the total number of pins knocked down in the next roll.
    - Open Frame: If a player doesn't knock down all the pins in a frame, they simply add the number of pins knocked down in the score
4. Final (10th) Frame : If a player rolls a strike in the 10th frame, they get 2 additional roles.
    If they roll a spare, they get 1 additional roll. This allows the player to potentially score up to 30 points in the 10th frame.
5. The perfect game of bowling consist of hitting 10 strikes, plus another 2 bonus strikes on the last frame. This nets the player 300 points.

## Installing dependencies

```bash
# Get Yarn
npm install -g yarn

# Install dependencies
yarn install
```

## Running tests

```bash
# Run tests once
yarn test

# Run tests with Jest-CLI custom arguments (https://jestjs.io/docs/en/cli.html)
yarn test --clearCache --debug

# Run tests for a specific file
yarn test MyFile.test.ts
```

A few other NPM scripts are provided for convenience, they all support custom arguments as described above.

```
# Run tests once with coverage
# Coverage report available in ./coverage/index.html
yarn test:cover

# Run all tests in watch mode without coverage
yarn test:watch

# Run the tests with watch mode only for files changed since the last Git commit
yarn test:changed

# Run tests for CI environment (optimized for TravisCI)
yarn test:ci
```
