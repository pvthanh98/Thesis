require("dotenv").config();
require("./db/connect");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT;
const path = require("path");
const bodyParser = require("body-parser");
const validator = require("./validator/validator");
const passport = require("./config/passport");
const multer = require("multer");
const io = require("socket.io")(server);
const user_auth = require("./middleware/user_auth");
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
const messageCtl = require('./controller/message');
const BillCtl = require("./controller/bill");
//login
app.post("/api/store/login", authCtl.login);
app.post("/api/user/login", authCtl.userLogin);
//store
app.post("/api/store", validator.createStore(), storeCtl.createStore);
app.get("/api/store", storeCtl.getStore);
app.get("/api/store/id/:id", storeCtl.getStoreById)
app.post("/api/store/modify", passport.authenticate("jwt", { session: false }), upload.single("file_store"), storeCtl.modifyStore);
app.post("/api/store/me", passport.authenticate("jwt", { session: false }), storeCtl.getStoreInfo);
app.get("/api/store/search_customer/:id", passport.authenticate("jwt", { session: false }), storeCtl.searchCustomer);
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
app.get("/api/service/search/:name", passport.authenticate("jwt", { session: false }), serviceCtl.getSearchSS);

//BILL
app.get('/api/bill',passport.authenticate("jwt", { session: false }),BillCtl.getBill);
app.get('/api/bill/id/:id',passport.authenticate("jwt", { session: false }),BillCtl.getBillByID);
app.post('/api/bill',passport.authenticate("jwt", { session: false }),BillCtl.postBill);
app.post('/api/bill/delete', passport.authenticate("jwt", { session: false }), BillCtl.deleteBill);
app.put('/api/bill/provisional/:id', passport.authenticate("jwt", { session: false }), BillCtl.modifyBillTemp);
//USER
app.post("/api/user", userCtl.createUser);

//MESSAGES
app.get('/api/messages/customer_to/:store_id', user_auth , messageCtl.getCustomerStore);
app.get('/api/messages/store_list', passport.authenticate('jwt',{session:false}) , messageCtl.getStoreList);
app.get('/api/messages/store_to/:customer_id', passport.authenticate('jwt',{session:false}) , messageCtl.getStoreToCustomer)
app.post('/api/messages/read_message', messageCtl.readMessage)

//SOKET IO. CHAT
const Message = require('./db/message');
const auth_user = require("./middleware/user_auth");
const Customer = require('./db/customer');
const Store =  require('./db/store');
io.on("connection", (socket) => { 
  //authenticate for socket io
  socket.emit("socketID",{socket_id: socket.id})
  socket.auth = false;
  socket.on('authenticate', function(data){
    jwt.verify(data.token,process.env.SECRET_KEY,function(err, decoded){
      if (!err && decoded) {
        console.log(`Authenticated socket ${socket.id} type: ${data.type}`);
        socket.auth = true;
        socket.user_type=data.type;
        socket.user_id = decoded.id;
        if(data.type==="user") Customer.findByIdAndUpdate(decoded.id,{
          socket_id: socket.id
        })
        .then(()=>console.log("update USER socket_id "+ socket.id+" to dbs"))
        .catch(err=>console.log(err));
        if(data.type==="store") Store.findByIdAndUpdate(decoded.id,{
          socket_id: socket.id
        })
        .then(()=>console.log("update STORE socket_id to dbs"))
        .catch(err=>console.log(err));
      }
    })
  });
  
  setTimeout(function(){
    //sau 1s mà client vẫn chưa dc auth, lúc đấy disconnect.
    if (!socket.auth) {
      console.log("Authenticated failed disconnecting socket ", socket.id);
      socket.disconnect('unauthorized');
    }
  }, 1000);
  // end authenticating for socket.io
  socket.on("customer_send_msg", async (data)=>{
    const store_id = data.to;
    const {body} = data;
    await Message.create({
      store_id,
      customer_id: socket.user_type==="user"? socket.user_id: null,
      is_store: false,
      body
    }).then(()=>console.log("saved message"))
    .catch(err => console.log(err));
    const result = await Store.findById(store_id,"socket_id");
    console.log(`socketID to store (${result.socket_id})`)
    socket.to(result.socket_id).emit("customer_send_msg_to_you",{from_id:socket.user_id});
  });

  socket.on("store_send_msg", async (data)=>{
    const customer_id = data.to;
    const { body } = data;
    await Message.create({
      store_id: socket.user_type==="store"? socket.user_id: null,
      customer_id,
      is_store: true,
      body
    }).then(()=>{
      console.log("saved message");
    });
    const result = await Customer.findById(customer_id,"socket_id");
    console.log(`socketID to customer (${result.socket_id})`)
    socket.to(result.socket_id).emit("store_send_msg_to_you",{from_id:socket.user_id});
  })

  socket.on("store_read_message", async function({message_id}){
    try {
      console.log(message_id)
      const {customer_id} = await Message.findByIdAndUpdate(message_id, { is_read:true });
      socket.emit("refresh_message");
      Customer.findById(customer_id,"socket_id").then(customer=>{
        socket.to(customer.socket_id).emit("refresh_message");
      })
    } catch(err){
      console.log(err);
    }
  });


  

  socket.on("disconnect", function(){
    console.log("Disconnect "+ socket.id)
  })

})

server.listen(port, () => console.log(`server is running on ${port}`));

