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
const categoryCtl = require("./controller/category");
const serviceCtl = require("./controller/service");
const authCtl = require("./controller/auth");
const userCtl = require("./controller/user");
const messageCtl = require("./controller/message");
const BillCtl = require("./controller/bill");
const RescueCtl = require("./controller/rescue");
const ProblemCtl = require("./controller/problem");
const commentCtl = require("./controller/comment");
const serviceCommentCtl = require("./controller/service_comment")

app.get("/api/welcome", (req, res) => res.send("welcome"));
//login
app.post("/api/store/login", authCtl.login);
app.post("/api/user/login", authCtl.userLogin);
//store
app.post("/api/store", validator.createStore(), storeCtl.createStore);
app.get("/api/store", storeCtl.getStore);
app.get("/api/store/id/:id", storeCtl.getStoreById);
app.post(
	"/api/store/modify",
	passport.authenticate("jwt", { session: false }),
	upload.single("file_store"),
	storeCtl.modifyStore
);
app.get(
	"/api/store/me",
	passport.authenticate("jwt", { session: false }),
	storeCtl.getStoreInfo
);
app.get(
	"/api/store/search_customer/:id",
	passport.authenticate("jwt", { session: false }),
	storeCtl.searchCustomer
);
app.get(
	"/api/store/rescue_location",
	passport.authenticate("jwt", { session: false }),
	storeCtl.getRescueLocation
);
//store filter
app.get("/api/store/rating", storeCtl.getStoreByRating);
app.get("/api/store/sell", storeCtl.getStoreBySale);
//Service category
app.post("/api/category", categoryCtl.postCategory);
app.get("/api/category", categoryCtl.getCategory);

//service
app.get("/api/service", serviceCtl.getService);
app.get("/api/service/outstanding", serviceCtl.getOutStandingService);
app.get("/api/service/id/:id", serviceCtl.getServiceById);
app.get("/api/service/category/:id", serviceCtl.getServiceByCategoryID);

app.post(
	"/api/service",
	passport.authenticate("jwt", { session: false }),
	upload.single("file"),
	serviceCtl.postService
);
app.put(
	"/api/service/",
	passport.authenticate("jwt", { session: false }),
	upload.single("file"),
	serviceCtl.modifyService
);
app.post(
	"/api/service/delete",
	passport.authenticate("jwt", { session: false }),
	serviceCtl.deleteServices
);
//get service of a store
app.get("/api/service/store/:id", serviceCtl.getMyService);
app.get(
	"/api/service/search/:name",
	passport.authenticate("jwt", { session: false }),
	serviceCtl.getSearchSS
);

//BILL
app.get(
	"/api/bill",
	passport.authenticate("jwt", { session: false }),
	BillCtl.getBill
);
app.get(
	"/api/bill/id/:id",
	passport.authenticate("jwt", { session: false }),
	BillCtl.getBillByID
);
app.get(
	"/api/user_bill/id/:id",
	user_auth,
	BillCtl.getUserBillByID
);
app.post(
	"/api/bill",
	passport.authenticate("jwt", { session: false }),
	BillCtl.postBill
);
app.post(
	"/api/bill/delete",
	passport.authenticate("jwt", { session: false }),
	BillCtl.deleteBill
);
app.post(
	"/api/bill/payment",
	passport.authenticate("jwt", { session: false }),
	BillCtl.confirmPayment
);
app.put(
	"/api/bill/provisional/:id",
	passport.authenticate("jwt", { session: false }),
	BillCtl.modifyBillTemp
);
//statistic on admin dashboard page
app.get('/api/bill/count/today', passport.authenticate("jwt", { session: false }), BillCtl.countBillToday);
app.get('/api/bill/count/week', passport.authenticate("jwt", { session: false }),  BillCtl.countBillWeek);
app.get('/api/bill/cost/today', passport.authenticate("jwt", { session: false }), BillCtl.billCostToday);
app.get('/api/bill/cost/week', passport.authenticate("jwt", { session: false }), BillCtl.billCostWeek);
app.get('/api/bill/chart/count/week', passport.authenticate("jwt", { session: false }), BillCtl.billChartCountWeek);
app.get('/api/bill/chart/cost/week', passport.authenticate("jwt", { session: false }), BillCtl.billChartCostWeek);
app.get(
	"/api/user_bill/confirm/:id",
	user_auth,
	BillCtl.confirmBillFromUser
);

app.get("/api/customer/bill", user_auth, BillCtl.getCustomerBill);
//


//USER
app.post("/api/user", userCtl.createUser);
app.get("/api/user", user_auth, userCtl.getUser);
app.post(
	"/api/user/update",
	user_auth,
	upload.single("file"),
	userCtl.updateUser
);
app.put("/api/user/update_location", user_auth, userCtl.updateLocation);

//MESSAGES
app.get(
	"/api/messages/customer_to/:store_id",
	user_auth,
	messageCtl.getCustomerStore
);
app.get(
	"/api/messages/store_list",
	passport.authenticate("jwt", { session: false }),
	messageCtl.getStoreList
);
app.get("/api/messages/user_list", user_auth, messageCtl.getUserList);
app.get(
	"/api/messages/store_to/:customer_id",
	passport.authenticate("jwt", { session: false }),
	messageCtl.getStoreToCustomer
);
app.post("/api/messages/read_message", messageCtl.readMessage);

//SOKET IO. CHAT
const Message = require("./db/message");
const auth_user = require("./middleware/user_auth");
const Customer = require("./db/customer");
const Store = require("./db/store");

//PAYPAL

app.get("/api/pay/:bill_id/:cost", BillCtl.payment);
app.get('/api/pay/success', BillCtl.handlePay)
app.get('/api/pay/cancel', (req, res) =>res.send("cancel"));


// RESCUE

app.post('/api/rescue', user_auth, RescueCtl.createRescue);
app.get('/api/rescue/page/:page', passport.authenticate("jwt", { session: false }), RescueCtl.getRescue);
app.put('/api/rescue', passport.authenticate("jwt", { session: false }), RescueCtl.modifyRescue);
app.get('/api/rescue/search/name/:name', passport.authenticate("jwt", { session: false }), RescueCtl.searchRescue);
app.get('/api/rescue/search/date/:date', passport.authenticate("jwt", { session: false }), RescueCtl.searchRescueByDate);

app.put('/api/rescue/id/:id', passport.authenticate("jwt", { session: false }), RescueCtl.modifyAllRescue);
//RESCUE FOR MOBILE
app.get('/api/rescue/mobile', passport.authenticate("jwt", { session: false }), RescueCtl.getRescueMobile);

// PROBLEM

app.post('/api/problem', passport.authenticate("jwt", { session: false }), ProblemCtl.create);
app.get('/api/problem', ProblemCtl.get);

//UPDATE STORE RATING
app.put('/api/store/rating',storeCtl.updateRating)
//COMMENT ON STORE (RATING)
app.post('/api/rating', user_auth, commentCtl.postComment);
app.get('/api/rating/store_id/:store_id', commentCtl.getComment);
//COMMENT ON SERVICE (RATING)
app.post('/api/service/rating', user_auth, serviceCommentCtl.postComment);
app.get('/api/service/rating/service_id/:service_id', serviceCommentCtl.getComment);

io.on("connection", (socket) => {
	//authenticate for socket io
	console.log("Client connecting....");
	socket.emit("socketID", { socket_id: socket.id });
	socket.auth = false;
	socket.on("authenticate", function (data) {
		jwt.verify(data.token, process.env.SECRET_KEY, function (err, decoded) {
			if (!err && decoded) {
				socket.auth = true;
				socket.user_type = data.type;
				socket.user_id = decoded.id;
				if (data.type === "user")
					Customer.findById(decoded.id)
						.then((customer) => {
							socket.join(customer._id);
							console.log(
								`join user socket to room ${customer._id}`
							);
						})
						.catch((err) => console.log(err));
				if (data.type === "store")
					Store.findById(decoded.id)
						.then((store) => {
							socket.join(store._id);
							console.log(
								`join store socket to room ${store._id}`
							);
						})
						.catch((err) => console.log(err));
			}
		});
	});

	setTimeout(function () {
		//sau 1s mà client vẫn chưa dc auth, lúc đấy disconnect.
		if (!socket.auth) {
			console.log(
				"Authenticated failed disconnecting socket ",
				socket.id
			);
			socket.disconnect("unauthorized");
		}
	}, 5000);
	// end authenticating for socket.io
	socket.on("customer_send_msg", async (data) => {
		console.log("Customer send message");
		const store_id = data.to;
		const { body } = data;
		try {
			await Message.create({
				store_id,
				customer_id:
					socket.user_type === "user" ? socket.user_id : null,
				is_store: false,
				body,
			})
				.then(() => console.log("saved message"))
				.catch((err) => console.log(err));
			const result = await Store.findById(store_id);
			console.log(`customer send message to room (${result._id})`);
			socket
				.to(result._id)
				.emit("customer_send_msg_to_you", { from_id: socket.user_id });
		} catch (exception) {
			console.log(exception);
		}
	});

	socket.on("store_send_msg", async (data) => {
		const customer_id = data.to;
		const { body } = data;
		try {
			await Message.create({
				store_id: socket.user_type === "store" ? socket.user_id : null,
				customer_id,
				is_store: true,
				body,
			}).then(() => {
				console.log("saved message");
			});
			const result = await Customer.findById(customer_id);
			console.log(`store send message to room (${result._id})`);
			socket
				.to(result._id)
				.emit("store_send_msg_to_you", { from_id: socket.user_id });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on("read_message", async function ({ message_id, is_store }) {
		try {
			const msg = await Message.findById(message_id);
			if (msg.is_store !== is_store) {
				msg.is_read = true;
				msg.save(() => {
					socket.emit("refresh_message");
				});
			}
		} catch (err) {
			console.log(err);
		}
	});

	socket.on("hello_server", function () {
		socket.emit("hello_server", "welcome");
	});
});

server.listen(port, () => console.log(`server is running on ${port}`));
