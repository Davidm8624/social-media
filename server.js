const app = require("express")();
const express = require("express");
const next = require("next");
const { connectDB } = require("./DB/connect");
require('dotenv').config()

//create a check for dev vs production
const dev = process.env.NODE_ENV !== "production";

const PORT = process.env.PORT || 3000;

//there are giant error warning that pop up when in dev, production will just hide them, we should see them if we want to fix them
const nextApp = next({ dev });

//this is a built in next router that will handle All the request made to the server
const handler = nextApp.getRequestHandler();

app.use(express.json());
connectDB();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handler(req, res));
  app.listen(PORT, (err) => {
    if(err){
      console.log(err);
    }else{
      console.log(`server listining on ${PORT}`);
    }
  })
});
