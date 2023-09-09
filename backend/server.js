require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const appRoutes = require('./routes/approutes')
var bodyParser = require('body-parser')
const cors = require('cors');


// express app
const app = express();
//initiize session and authenticate passport
app.use(cors());





// middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//routes
app.use('/', appRoutes)

//connect to databse
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
