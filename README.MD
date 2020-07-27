# AGL Coding Challenge

A json web service has been set up at the url: http://agl-developer-test.azurewebsites.net/people.json

You need to write some code to consume the json and output a list of all the cats in alphabetical order under a heading of the gender of their owner.

You can write it in any language you like. You can use any libraries/frameworks/SDKs you choose.

## Getting Started

This NodeJS application uses the following
* Express JS for receiving API requests
* InversifyJS for dependency injection
* Jest for testing
* Lodash for simple group by lookups

Once the NodeJS server runs, the persons API can be dynamically looked up 

e.g. 
* http://localhost:3000/person/gender/pets/type/Cat/name - to get Cats owned by each gender
* http://localhost:3000/person/gender/pets/type/Dog/name - to get Dogs owned by each gender
* http://localhost:3000/person/gender/pets/name/Garfield/type - to get pet type with name Garfield
* http://localhost:3000/person/gender/pets - to get pets by gender



### Prerequisites

NPM > 6

Node > 12.13


### Build

open a command console into the current folder and run the following to download dependencies
```
npm install
```



### Running the tests

All test can be run using 
```
npm run test
```

## Running the application

Check the .env file for the correct person url

Run the following

```
npm run dev
```


## Improvements

* Improved error handling with API requests especially timeouts and parsing
* Setup proper swagger documentation and rest client file
* Add indexing to improve speed for large and complex group lookups


