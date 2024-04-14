const http = require("http");
const app = require("./app");
const { PORT } = require("./config/config");
const db = require("./models/index.js");


/*** CREATE SERVER ***/
const server = http.createServer(app);
/*** SERVER LISTENING ON PORT  ***/
server.listen(PORT, ()=>{
    console.log(`Server is running on  http://localhost:${PORT}`);
});

// db.databaseConf.sync();

