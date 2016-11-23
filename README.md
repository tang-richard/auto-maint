Auto Maintenance Tracker
========================

A Node.js project to implement a basic automobile maintenance tracker. This project uses Node.js/Express.js, MongoDB and Mongoose, Knockout.js, and Mocha and supertest for testing. 

Installation
------------

This project was developed on Windows 10 with Node.js v7.1.0 and Chrome Version 54.0.2840.99m. It makes use of ```Array.prototype.includes()```, which requires at least Node v6. At the time of writing, Mocha appears to have issues with issues with Node 7.1.0 (```Error: write EINVAL``` after running the tests), but otherwise the tests are running and passing. 

First, install dependencies:

```
npm install
```

Before starting the application, run ```mongod```. The project requires mongodb running locally, and will connect to either ```auto_maintenance``` or ```auto_maintenance_test```. 

Then run the app:

```
npm start
```

Finally, navigate to ```http://localhost:3000```. If mongod is running, this will create and connect to ```auto_maintenance```.

To run tests: 
```
npm test
```

This will connect the application to  ```auto_maintenance_test``` to run the tests against. 

Data Model
----------

This project uses three models to represent cars and their maintenance tasks: Cars, Engine Type, and Maintenance Tasks (shortened to 'MaintTasks' for ease of writing). All interactions involve the creation, updating, and deletion of Cars and their properties. 

Cars contain a make (e.g., "Toyota"), model (e.g., "4runner"), and an Engine Type (one of "gas", "diesel", "electric", or "hybrid"). Cars may also include the year of model, odometer reading, and a list of assigned maintenance tasks being applied to it. 

MaintTasks are predefined in ```models/MaintTasks```. Each MaintTask contains a name, description, and a list of EngineTypes they cannot be applied to--for example, one does not need to change the engine oil for an electric car, or change sparkplugs for a diesel car. 

EngineTypes and MaintTasks cannot be created or modified within the application. This was done specifically to simplify the problem space for now, as there are only a few types of engines and only a certain number of maintenance tasks that could be done to cars. Ideally, there might be a feature to add or edit either of these, but this was beyond the current scope of this programming problem. 