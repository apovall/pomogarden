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

## Current Objectives
 - Develop MVP
    - [x] Get example code running
    - Implementation of isometric engine
    - Get isometric engine to access json file remotely
    - Get isometric engine to populate assets
    - Implement dynamic map seeding 
    - Implement system for placing assets dynamically 

 - Host on AWS S3
    - Get Github actions working to automate the deploy process

# Resources:
 - https://www.npmjs.com/package/phaser

## Resources: Getting started:
 - https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
 - https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/
 - https://tnodes.medium.com/creating-an-isometric-view-in-phaser-3-fada95927835 
 - Phaser + React examples: https://github.com/nodes777/flower-game-phaser3