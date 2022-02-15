//express app setup
const app = require("express")();
const express = require("express");
const { connectDB } = require("./server/util/connect");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// const app = express();
const PORT = process.env.PORT || 3000;

//next app setup
//create a check for dev vs production
const dev = process.env.NODE_ENV !== "production";
const next = require("next");

//there are giant error warning that pop up when in dev, production will just hide them, we should see them if we want to fix them
const nextApp = next({ dev });

//this is a built in next router that will handle All the request made to the server
const handler = nextApp.getRequestHandler();

//middlewares
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

//routers
const userRoute = require("./server/routes/userRoutes");
const authRoute = require("./server/routes/authRoutes");
const searchRoute = require('./server/routes/search')
const uploadRoute = require("./server/routes/uploadPicRoute");
app.use('/api/v1/search', searchRoute)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/uploads", uploadRoute);

connectDB();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handler(req, res));
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`server listining on ${PORT}`);
    }
  });
});
