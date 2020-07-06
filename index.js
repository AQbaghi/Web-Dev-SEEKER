const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./src-server-side/DB/mongooseDB.js');
const userRouter = require('./src-server-side/routers/userAPI.js');

//setting up express
const port = process.env.PORT || 5000;
const app = express();

//body parsing express
app.use(bodyParser.json());
app.use(express.json());

//express route
app.use(userRouter);

//listening to server port
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
