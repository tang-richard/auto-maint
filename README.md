Auto Maintenance Tracker
========================

A Node.js project to implement a basic auto maintenance tracker. 

Installation
------------

The project requires mongodb running locally. This database can be changed in the mongoose connection string in ```bin/www```

After, install dependencies:

```
npm install
```

Run the app:

```
node ./bin/www
```

Alternatively, if nodemon is installed, run ```nodemon``` instead.

Navigate to ```http://localhost:3000```

Data Model
----------

This project uses three models to represent cars and their maintenance tasks: Cars, Engine Type, and Maintenance Tasks (shortened to 'MaintTasks' for ease of writing).

Cars contain a make (e.g., "Toyota"), model (e.g., "4runner"), year of 