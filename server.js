const http = require("http");
const app = require("./app");
const { PORT } = require("./config/config");
const db = require("./models/index.js");
const { faker } = require('@faker-js/faker');
const availableProvince = require("./const/availableProvince.js");
const generateRandomUser = require("./lib/faker/generateRandomUser.js");
require("dotenv").config();


/*** CREATE SERVER ***/
const server = http.createServer(app);

/*** SERVER LISTENING ON PORT  ***/
server.listen(PORT, ()=>{
    console.log(`Server is running on  http://localhost:${PORT}`);
});



// db.databaseConf.sync();
// generateRandomUser(100);
// db.dropRideShareTable();



