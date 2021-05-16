const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user");

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
	next();
});

app.use('/user', userRoutes);

mongoose.connect(
  "mongodb+srv://node-storage:node-storage@node-storage.i6thr.mongodb.net/node-storage?retryWrites=true&w=majority",
).then( result => {
    app.listen(3000, () => {
        console.log("Server is running...: 3000");
    });
}).catch( error => {
    console.log(error);
});
