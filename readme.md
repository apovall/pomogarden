# Pomogarden

## Concept
 - A world-building idler underpinned by Pomodoro / task based completion as a resource gathering mechanic.
 - User avatar creates a garden world automatically, based on resources provided by the 'player' / 'user'.
 - Resources are acquired via 'real world productivity'. In reality this (currently) revolves around:
    1. Completing to do list items.
    2. Completing pomodoro timer sequences.
 - As 'players' complete tasks / pomodoro sequences, they gain points that their avatar will use to transform their base world into a garden world
 - Concept is intended to (visually) reflect the power of doing 'small, consistent work over time' to achieve things, but also without being distracting / requiring user attention. 
 - Ideally, over the course of a few months, users will be able to reflect back on the overall progress they've made in a visual sense (given that it's easy to forget / difficult to reflect on the progress that's been made in a number of areas in the past).


## System Overview
 - Express.js backend, providing map generation services
 - React for UI components, encompassing,
 - Phaser for game aspect
 - All to be hosted on AWS
    - DynamoDB for storing map and game states for users
    - Cognito or JWT for user management
    - S3 for hosting 

## Core Requirements
 - Backend: Express
 - Frontend: React
 - Game Engine: Phaser


## Future ideas:
 - On hover, have each tile highlight the activity / task that went into creating it. 
 - Integration of other to do systems (as not to rely on an internal one)
 - Art / style packs available for purchase
 - Review everything and implement Typescript on backend and frontend.

## Current Objectives
 - Develop MVP
    - [x] Get example code running
    - [x] Implementation of isometric engine ('free' with phaser?)
    - Get a deeper understanding of how Phaser works.
    - Get isometric engine to access json file remotely
      - Get assets in rough Japanese style that I want
      - Load them into the backend
      - Get CORS working (might need to host backend separately?)
      - Get frontend to load assets
    - Get isometric engine to populate assets
      - Look into how tilemaps work in Phaser
    - Implement dynamic map seeding 
    - Implement system for placing assets dynamically 

 - Host on AWS S3
    - Get Github actions working to automate the deploy process![Alt text](https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png)

# Resources:
 - https://www.npmjs.com/package/phaser
 - [Rainbow Rex Plugins](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/plugin-list/)
 - [React useEffect clean up + aborting async await requests](https://dev.to/elijahtrillionz/cleaning-up-async-functions-in-reacts-useeffect-hook-unsubscribing-3dkk)
## Resources: Getting started:
 - https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
 - https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/
 - https://tnodes.medium.com/creating-an-isometric-view-in-phaser-3-fada95927835 
 - Phaser + React examples: https://github.com/nodes777/flower-game-phaser3
 - [Isometric example](http://labs.phaser.io/view.html?src=src\tilemap\isometric\isometric%20test.js&v=3.55.2)
 - [React + Phaser with comms](https://pablo.gg/en/blog/coding/i-made-a-top-down-game-version-of-my-blog-with-phaser-and-react/)