// const express = require("express");
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const { version } = require("../package.json");


// const options = {
//     definition:{
//         openapi:"3.0.0",
//         info:{
//             title: "Express REST API for e-covoiturage",
//             version,
//         },
//         components:{
//             securitySchemas:{
//                 bearerAuth:{
//                     type:"http",
//                     schema: "bearer",
//                     bearerFormat: "JWT",
//                 },
//             },
//         },
//         security:[
//             {
//                 bearerAuth:[]
//             }
//         ]
//     },
//     apis:["./../routes/*.js", "./../models/*.js"]
// }

// const swaggerSpec = swaggerJSDoc(options);

// function swaggerDocs(app){
//     app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//     app.get("docs.json", (req,res)=>{
//         res.setHeader("Content-Type",'application/json');
//         res.send(swaggerSpec);
//     })
// }

// module.exports = swaggerDocs;

