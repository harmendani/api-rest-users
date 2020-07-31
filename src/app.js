'use-strict';
const loader = require('./loaders/express');
const express = require('express'); 
const config = require('./config');
const database = require('./db/connection');

async function startServer() {
  const app = express(); // Create an app from Express  
  try {
    await database.connect() // Create a connection with MongoDB
    await loader(app); // Load Express app
    app.listen(config.port, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);      
      }
      console.log(` \n
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
    });
  } catch (err) {
    console.log(err);
  }
}

/* Start App */
startServer();