const service = require("../db/service");
const path = require("path");
const Jimp = require('jimp');
module.exports = {
    getService : (req, res) =>{
        service.find({}).populate("store_id").limit(16)
        .then(services=>{
            res.json(services)
        })
        .catch(err=>console.log(err))
	},
	getOutStandingService : (req, res) =>{
        service.find({}).populate("store_id").limit(4)
        .then(services=>{
            res.json(services)
        })
        .catch(err=>console.log(err))
    },
    postService: (req, res) =>{
        if(req.user){
        	service.create({
        		store_id: req.user.id,
        		name:req.body.name,
        		description: req.body.description,
        		image: req.file ? req.user.id + "_" + req.file.originalname : "default_service.png",
        		price: req.body.price,
        		quantity:req.body.quantity,
				detail: req.body.detail,
				category: req.body.category
        	}).then(()=>{
				if(req.file){
					const pathName = path.join("./","public","images",req.user.id + "_" + req.file.originalname);
					Jimp.read(pathName, (err, lenna) => {
						if (err) throw err;
						lenna
						  .resize(500, 500) // resize
						  .quality(90) // set JPEG quality
						  .write(pathName); // save
					});
				}
        		res.sendStatus(200);
        	})
        	.catch(err=>{
        		res.sendStatus(400);
        		throw err;
        	})
        }
	},
	getServiceById: (req, res) => {
		service.findById(req.params.id)
		.populate("store_id","name image phone")
		.populate("category")
		.then(service=>{
			if(service) res.json(service)
			else res.sendStatus(400)
		})
		.catch(err=>{
			res.sendStatus(400);
			throw err
		});
	},
	getMyService: (req, res) =>  {
		const { id } = req.params;	//store_ID
		service.find({
			store_id:id
		})
		.then(myServices =>res.status(200).json(myServices))
		.catch(err=> {
			res.sendStatus(403)
			throw err;
		})
	},
	modifyService: (req, res) => {
		let data = {
			name:req.body.name,
			description:req.body.description,
			price: req.body.price,
			quantity: req.body.quantity,
			detail: req.body.detail,
		}
		if(req.file) data.image = req.user.id + "_" + req.file.originalname;
		service.findByIdAndUpdate(req.body.id, data)
		.then(()=>{
			if(req.file){
				const pathName = path.join("./","public","images",req.user.id + "_" + req.file.originalname);
				Jimp.read(pathName, (err, lenna) => {
					if (err) throw err;
					lenna
					  .resize(500, 500) // resize
					  .quality(90) // set JPEG quality
					  .write(pathName); // save
				});
			}
			res.sendStatus(200);
		})
		.catch(err=>{
			res.status(400).json(err);
			throw err;
		});
	},
	deleteServices : async (req, res) =>{
		const { service_id } = req.body;
		try {
			for(let i=0;i<service_id.length;i++){
				await service.findByIdAndDelete(service_id[i])
			}
			res.sendStatus(200);
		} catch(e){
			res.sendStatus(403);
			throw err;
		}
	},
	getServiceByCategoryID: (req, res) => {
		const { id } = req.params;
		service.find({category:id})
		.populate("store_id","name image")
		.then(services=>{res.json(services)})
		.catch(err=>{res.sendStatus(403);throw err})
	}
}