# Postgraphile Example

This is an example on how to use postgraphile to generate a GraphQL endpoint from a PostgreSQL database.

This tutorial is mostly cribbed from the fantastic tutorial at https://www.graphile.org/postgraphile/postgresql-schema-design/

There are four folders inside this repo. They are Slides, Code, Postgraphile Example and App.

## Slides:

The slides were originally made for ACCU York, and serve as a starting point to the talk.
You should be able to view the talk by clicking the index.html file. Using a static server
like https://www.npmjs.com/package/serve could help if things look broken.

## Code:

Code contains a mixture of SQL, GraphQL and bash scripts used to create the app. The code is commented, and are named
with a numbered prefix, which lets you know which order I will run each of the scripts.

## Postgraphile Example:

For the most part, we will be using postgraphile in the command line while developing. The developers of postgraphile
recommend using it as a nodejs dependency. This is an example of how to do so.

## App:

This is an example app written in React. This shows you how to use postgres as an API.
