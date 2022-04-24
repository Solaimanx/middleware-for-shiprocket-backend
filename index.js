if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors')
const  { GetToken } = require( "shiprocket-api")

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));




const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  };

  app.use(cors(corsOptions));


  const order = require('./order')

  

  app.get('/', (req, res) => {


      return res.json({
          server : 'running'
      })
  })



  app.post('/create', async (req, res) => {

    const token = await GetToken({
        email: process.env.EMAIL,
        password: process.env.PASS,
      });

      const data = req.body

      const result = await order.CreateOrder(token , data)
      console.log('result',result)

      return res.json(result)

  })

  app.get('/orderdetails' ,async (req, res) => {

    const token = await GetToken({
        email: process.env.EMAIL,
        password: process.env.PASS,
      });
      const data = req.body
      const result = await order.getDetails(token)

      return res.json(result)

  })



  app.listen(process.env.PORT , ()=>{
      console.log(`server is running ${process.env.PORT}`)
  })