# Celeste Manila Back-End API

<center>
<div align="center">
<img src="./assets/dlsu_logo.png" width="200"/>
<img src="./assets/ccs-logo.png" width="200"/>
<img src="./assets/celeste_logo.png" width="200"/>
</div>

<div>
<h2>Build Status</h2>

[![Netlify Status](https://api.netlify.com/api/v1/badges/34b1529e-1fd9-438d-812d-741deaa0b2d5/deploy-status)](https://app.netlify.com/sites/celestemanila-api/deploys)

</center>

## Glossary

The Celeste Manila back-end is a collection of lambda serverless functions that are intended to be hosted on Netlify. Because of the Netlify host, the main development runtime that is set up to run the development environment is netlify-lambda, which is part of the dependencies that will be installed when doing `npm install `.

### Netlify

Netlify will be the host of this repository with the serverless functions. This repository does not include CelesteManila's front-end, as that is in another repo and hence will be in a separate Netlify application. Netlify is installed into the back-end repository and will handle continuous integration and continuous deployment via the `production` branch.

### Celeste CMS

We will be writing our own CMS for this project. All the other headless CMS' do not currently offer what is needed by this web application. This CMS will be hosted on a separate Netlify Site Instance and is not directly coupled with either the front-end or the back-end. In a nutshell, it can be treated as an entirely different front-end that is made for the site administrators to manage content on the main site.

### FaunaDB

FaunaDB is the database that is being used by this serverlesss framework. It will be using GraphQL to optimize bandwidth and customizability. Interally, FaunaDB is a document style database similar to MongoDB.

## Setting Up the Development Environment

1. Install npm dependencies
   ```
   npm install
   ```
2. Set Up Environment variables
   ```
   # .env file
   FAUNA_SECRET_KEY=<FAUNA KEY HERE>
   ```

## Starting the Development Environment

1. Run the TypeScript Compiler in Watch Mode
   ```
   tsc -w
   # OR
   npx tsc -w
   ```
2. Start the Netlify Lambda Development Server
   ```
   npm start
   ```

## Running Unit Tests with JestJS

Check the [`__test__`](./__test__) folder for more information on testing using JestJS.

To run a JestJS test, run the following command:

```
npm test
```

This will run all of the available test suites in the `__test__` folder. The folder houses a test for each API endpoint created.
Test cases must follow the acceptance criteria as defined by the Quality Assurance officer.

## Deploying the Application

There isn't really a reason to build the application since Netlify will just compile it the same way it is compiled even in the develpoment environment. The process we should be concerned with is deploying the serverless functions to Netlify functions.

To deploy the application, all we need to do is push the branch that we want to deploy (typically this should be the `master` branch) to the production branch. Once

Deploying the master branch to production

```
# Switch to the production branch
git checkout production

# Merge main into production
git merge main

# Push changes to origin repository
git push -u origin main
git push -u origin production
```

With the code above, you can deploy any of the branches -- just replace `master` with the actual branch name.
