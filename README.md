# Implementation Steps

## POC

I started with a proof of concept to make sure that I can have a working app:

* Setting up a backend nodejs with express
* Loading the data from a json file and serving it in a GET API
* Converting the flat data structure to a hierarchical structure
* Creating an index.html file and added D3js and loaded the data

Then, I tried to connect more pieces together.

## Challenges
* I had the following major challenges in the given assignment (mostly due to the fact that it was my first nodejs/neo4j application):
    * Learning how to work with Neo4j and writing a cypher query.
    * Comming up with a proepr cypher query to load data from Neo4j with the minimum effort to map to the desired schema.
    * Writing e2e tests that involves Neo4j as the data store.
    * Finding a way to debug my tests with jest where my application uses the type="module".
    

According to the assignment criteria, I assumed it is intended to load the entire graph in one go and not eager loading the leaves.
Unfortunately, I had no more time to create an Azure pipeline to get the application up and running easier.

# How To Run

Prerequisites:

* Install [Nodejs](https://nodejs.org/en/download)
* Install [Neo4j](https://neo4j.com/download) (Or run a docker container: `docker run -e "NEO4J_AUTH={USERNAME}/{PASSWORD}" -p 7474:7474 -p 7687:7687 -v neo4jdata:/data -v --name myneo4j -d neo4j`)
* Change the Neo4j configuration in the `config/credentials.json` file to match your desired neo4j server connection
* Run the command `npm install`
* Run the command `npm run test` to run the e2e tests
* Run the command `npm run migrate` to feed the database
* Run the command `npm run start` to run the application
* Browse to http://localhost:3000