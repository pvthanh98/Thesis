const jwt = require("jsonwebtoken");
const Bill = require("../db/bill");
const paypal = require("paypal-rest-sdk");
module.exports = {
	postBill: (req, res) => {
		let data = { ...req.body };
		data.store_id = req.user.id;
		console.log(data);
		Bill.create(data)
			.then(() => {
				res.sendStatus(200);
			})
			.catch((err) => {
				res.sendStatus(500);
				throw err;
			});
	},
	getBill: (req, res) => {
		Bill.find({ store_id: req.user.id })
			.populate("services.service_id", "name")
			.populate("customer_id", "name")
			.then((bills) => {
				res.send(bills);
			})
			.catch((err) => res.send(err));
	},

	deleteBill: async (req, res) => {
		const { bill_ids } = req.body;
		try {
			for (let i = 0; i < bill_ids.length; i++) {
				await Bill.findByIdAndDelete(bill_ids[i]);
			}
			res.send("ok");
		} catch (e) {
			res.sendStatus(400);
			throw e;
		}
	},
	confirmPayment: async (req, res) => {
		const { bill_ids } = req.body;
		try {
			for (let i = 0; i < bill_ids.length; i++) {
				await Bill.findByIdAndUpdate(bill_ids[i], { paid: true });
			}
			res.send("ok");
		} catch (e) {
			res.sendStatus(400);
			throw e;
		}
	},
	getBillByID: (req, res) => {
		const { id } = req.params;
		Bill.findById(id)
			.populate("customer_id", "name image address phone")
			.populate("services.service_id", "name price total")
			.then((bill) => {
				res.json(bill);
			})
			.catch((err) => {
				if (err) {
					res.sendStatus(400);
					throw err;
				}
			});
	},
	getUserBillByID: (req, res) => {
		const { id } = req.params;
		Bill.findById(id)
			.populate("services.service_id", "name price total")
			.populate("store_id", "name")
			.then((bill) => {
				res.json(bill);
			})
			.catch((err) => {
				if (err) {
					res.sendStatus(400);
					throw err;
				}
			});
	},
	
	modifyBillTemp: (req, res) => {
		const { id } = req.params;
		Bill.findByIdAndUpdate(id, req.body)
			.then(() => res.sendStatus(200))
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	confirmBillFromUser: (req, res) => {
		const { id } = req.params;
		Bill.findByIdAndUpdate(id, {confirm:true})
			.then(() => res.sendStatus(200))
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	getCustomerBill: (req, res) => {
		const customer_id = req.user.id;
		Bill.find({ customer_id })
			.populate("services.service_id", "name price")
			.populate("store_id", "name")
			.then((bills) => {
				res.json(bills);
			})
			.catch((err) => {
				res.sendStatus(400);
				throw err;
			});
	},
	payment: (req, res) => {
        paypal.configure({
            mode: "sandbox", //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_CLIENT_SECRET,
        });
		const { cost, bill_id } = req.params;
		var create_payment_json = {
			intent: "sale",
			payer: {
				payment_method: "paypal",
			},
			redirect_urls: {
				return_url: "http://192.168.1.19:8080/api/pay/success",
				cancel_url: "http://192.168.1.19:8080/api/pay/cancel",
			},
			transactions: [
				{
					item_list: {
						items: [
							{
								name: "Hóa đơn sửa chữa và thay phụ tùng",
								sku: "item",
								price: cost,
								currency: "USD",
								quantity: 1,
							},
						],
					},
					amount: {
						currency: "USD",
						total: cost,
					},
                    description: bill_id,
				},
			],
		};

		paypal.payment.create(create_payment_json, function (error, payment) {
			if (error) {
				throw error;
			} else {
				console.log("Create Payment Response");
				res.redirect(payment.links[1].href);
			}
		});
	},

	handlePay: (req, res) => {
        paypal.configure({
            mode: "sandbox", //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID,
            client_secret: process.env.PAYPAL_CLIENT_SECRET,
        });
		const { paymentId, PayerID } = req.query;
		var execute_payment_json = {
			payer_id: PayerID,
		};

		paypal.payment.execute(paymentId, execute_payment_json, function (
			error,
			payment
		) {
			if (error) {
				console.log(error.response);
				throw error; 
			} else {
				console.log("Get Payment Response");
                const bill_id = payment.transactions[0].description;
                Bill.findByIdAndUpdate(bill_id,{paid:true, confirm:true})
                .then(()=>{
                    res.write(
                        `<html><head><title>success</title></head><body>success</body></html>`
                    );
                    res.end();
                })
                .catch(err=> {
                    throw err;
                })
			
			}
		});
	},
};
