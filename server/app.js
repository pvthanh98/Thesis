require("dotenv").config();
require("./db/connect");
const jwt = require("jsonwebtoken");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const path = require("path");
const bodyParser = require("body-parser");
const validator = require("./validator/validator");
const passport = require("./config/passport");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "images"));
  },
  filename: async function (req, file, cb) {
    const name = req.user.id + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });

app.use(passport.initialize());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//controller
const storeCtl = require("./controller/store");
const categoryCtl = require('./controller/category')
const serviceCtl = require("./controller/service");
const authCtl = require("./controller/auth");
const userCtl = require("./controller/user");
//login
app.post("/api/store/login", authCtl.login);
app.post("/api/user/login", authCtl.userLogin);
//store
app.post("/api/store", validator.createStore(), storeCtl.createStore);
app.get("/api/store", storeCtl.getStore);
app.get("/api/store/id/:id", storeCtl.getStoreById)
app.post("/api/store/modify", passport.authenticate("jwt", { session: false }), upload.single("file_store"), storeCtl.modifyStore);
app.post("/api/store/me", passport.authenticate("jwt", { session: false }), storeCtl.getStoreInfo);

//Service category
app.post('/api/category', categoryCtl.postCategory);
app.get('/api/category',categoryCtl.getCategory)

//service
app.get("/api/service", serviceCtl.getService);
app.get("/api/service/outstanding", serviceCtl.getOutStandingService);
app.get("/api/service/id/:id", serviceCtl.getServiceById);
app.get("/api/service/category/:id", serviceCtl.getServiceByCategoryID);

app.post( "/api/service", passport.authenticate("jwt", { session: false }), upload.single("file"), serviceCtl.postService);
app.put("/api/service/", passport.authenticate("jwt", { session: false }), upload.single("file"), serviceCtl.modifyService);
app.post("/api/service/delete",passport.authenticate("jwt", { session: false }), serviceCtl.deleteServices);
//get service of a store
app.get("/api/service/store/:id", serviceCtl.getMyService);

//USER
app.post("/api/user", userCtl.createUser);
app.get('/test', passport.authenticate('jwt', { session:false }) , function(req,res){
  res.send(req.user)
})
server.listen(port, () => console.log(`server is running on ${port}`));

