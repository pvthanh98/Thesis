import React, { useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import PaymentIcon from "@material-ui/icons/Payment";
import CheckIcon from "@material-ui/icons/Check";
import EmailIcon from "@material-ui/icons/Email";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { Grid, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "../../service/axios";
import dateFormat from "../../service/formatDate";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import CallIcon from "@material-ui/icons/Call";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from '@material-ui/icons/Search';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Input} from "@material-ui/core"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {server} from '../../constant';
import DatePicker from "react-datepicker";
import ReplayIcon from "@material-ui/icons/Replay";
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-datepicker/dist/react-datepicker.css";

import {
	Search,
	AccountBox as AccountBoxIcon,
	Room as RoomIcon,
	PhoneAndroid,
	ErrorOutlineTwoTone,
} from "@material-ui/icons";
import Pagination from '@material-ui/lab/Pagination';

const { compose, withProps, lifecycle } = require("recompose");
const {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer,
	Marker,
	InfoWindow,
} = require("react-google-maps");

const MyMapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `600px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		test(){
			console.log("HELLO");
		},
		async updateDistance () {
			console.log("update distance",this.props.storeCoordinate.lat,this.props.storeCoordinate.lng)
			const findDistance = (lat, lng) => {
				return new Promise((resolve, reject) => {
					const DirectionsService = new window.google.maps.DirectionsService();
					DirectionsService.route(
						{
							origin: new window.google.maps.LatLng(
								this.props.storeCoordinate.lat,
								this.props.storeCoordinate.lng
							),
							destination: new window.google.maps.LatLng(
								lat,
								lng
							),
							travelMode: window.google.maps.TravelMode.DRIVING,
						},
						(result, status) => {
							if (
								status ===
								window.google.maps.DirectionsStatus.OK
							) {
								resolve(result.routes[0].legs[0].distance);
							} else {
								console.error(
									`error fetching directions ${result}`
								);
								reject(`error fetching directions ${result}`);
							}
						}
					);
				});
			};
			let carRescue = [...this.props.carRescue];
			for (var i = 0; i < carRescue.length; i++) {
				try {
					let distance = await findDistance(
						carRescue[i].customer_id.latitude,
						carRescue[i].customer_id.longtitude
					);
					carRescue[i].distance = { ...distance };
				} catch (e) {
					console.log(e);
				}
			}
			this.props.setCarRescue(carRescue);
		},
		async componentDidMount() {
			console.log("DISDD MOUNT");
			this.updateDistance();
			this.props.callInsideMap(this.test);
		},
		componentWillReceiveProps(nextProps) {
			console.log("RECEIVE PROPS");
			const DirectionsService = new window.google.maps.DirectionsService();
			if((!this.props.selectedCustomer || (this.props.selectedCustomer.customer_id !== nextProps.selectedCustomer.customer_id))
			&& this.props.inputSearchService  === nextProps.inputSearchService){
				console.log("call API");
				DirectionsService.route(
					{
						origin: new window.google.maps.LatLng(
							parseFloat(this.props.storeCoordinate.lat),
							parseFloat(this.props.storeCoordinate.lng)
						),
						destination: new window.google.maps.LatLng(
							nextProps.selectedCustomer
								? parseFloat(nextProps.selectedCustomer.lat)
								: 0,
							nextProps.selectedCustomer
								? parseFloat(nextProps.selectedCustomer.lng)
								: 0
						),
						travelMode: window.google.maps.TravelMode.DRIVING,
					},
					(result, status) => {
						if (status === window.google.maps.DirectionsStatus.OK) {
							this.setState({
								directions: result,
								distance: {...result.routes[0].legs[0].distance},
							});
						} else {
							console.error("error", result);
						}
					}
				);
			}
			if(this.props.carRescue.length>0 && !this.props.carRescue[0].distance) {
				this.updateDistance();
			} else console.log("no need to update distance")
		}
	})
)((props) => (
	<GoogleMap
		defaultZoom={13}
		defaultCenter={{
			lat: props.mapCenter.lat,
			lng: props.mapCenter.lng,
		}}
		center={{
			lat: props.mapCenter.lat,
			lng: props.mapCenter.lng,
		}}
		options={{
			gestureHandling:'greedy',
			scrollwheel:false,
			zoomControlOptions: { position: 9 },
			streetViewControl:false,
			fullscreenControl:false,
		  }}
	>
		<Marker
			position={{
				lat: props.storeCoordinate.lat,
				lng: props.storeCoordinate.lng,
			}}
		>
			<InfoWindow>
				<div>
					<Typography variant="h6">Vị trí cửa hàng</Typography>
				</div>
			</InfoWindow>
		</Marker>

		{props.carRescue &&
			props.carRescue.map((e, index) => {
				return (
					<Marker
						key={index}
						position={{
							lat: e.customer_id.latitude,
							lng: e.customer_id.longtitude,
						}}
						onClick={()=>{
							props.setSelectedCustomer({
								customer_id: e.customer_id._id,
								name: e.customer_id.name,
								phone: e.customer_id.phone,
								lat: e.customer_id.latitude,
								lng: e.customer_id.longtitude,
								distance: e.distance ? e.distance.text :  "Loading...",
							})
							console.log(props.distance)
						}}
					>
						{props.selectedCustomer &&
							e.customer_id._id ==
								props.selectedCustomer.customer_id && (
								<InfoWindow>
									<div>
										<Typography style={{fontWeight:"bold"}} variant="subtitle1">
											{props.selectedCustomer
												? props.selectedCustomer.name
												: e.customer_id.name}
										</Typography>
										{e.is_complete
										&& <Typography style={{color:"green"}} variant="body1">
												Đã hoàn thành
											</Typography>
										}
										<Typography variant="body1">
											<DriveEtaIcon style={{marginRight:"4px", fontSize:"20px"}} />
											{props.selectedCustomer.distance}
										</Typography>
										<Typography variant="body1">
											<CallIcon style={{marginRight:"4px", fontSize:"20px"}} />
											{props.selectedCustomer.phone}
										</Typography>
										<Typography variant="body1">
											<Tooltip title="Nhắn tin">
												<IconButton
													onClick={() => props.handleOpenMessage(e.customer_id._id)}
												>
													<EmailIcon style={{ color: "#115293" }} />
												</IconButton>
											</Tooltip>
											<Tooltip title="Thanh thêm vào hóa đơn">
												<IconButton
													onClick={() => props.handleClickOpen(e.customer_id, e._id)}
												>
													<PaymentIcon style={{ color: "#3b0957" }} />
												</IconButton>
											</Tooltip>
											{!e.is_complete && <Tooltip title="Đánh dấu hoàn tất">
												<IconButton
													onClick={() => props.setComplete(e._id)}
												>
													<CheckIcon style={{ color: "#044711" }} />
												</IconButton>
											</Tooltip>}
											
										</Typography>
										

									</div>
								</InfoWindow>
							)}
					</Marker>
				);
			})}
		{props.directions && (
			<DirectionsRenderer directions={props.directions} />
		)}
	</GoogleMap>
));

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: "400px",
	},
	infoItem: {
		padding: "8px",
	},
	dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
}));

function createData(id, name, price, quantity, total) {
	return { id, name, price, quantity, total };
}
export default function Rescue() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const mystoreInfo = useSelector((state) => state.mystore);
	const [carRescue, setCarRescue] = React.useState([]);
	const [mapCenter, setMapCenter] = React.useState(null);
	const [selectedCustomer, setSelectedCustomer] = React.useState(null);
	const [rows, setRows] = React.useState([])
	const [inputSearchService, setInputNameService] = React.useState("")
	const [resultService, setResultService] = React.useState([])
	const [open, setOpen] = React.useState(false);
	const [billCustomerInfo, setBillCustomerInfo] = React.useState(null);
	const [totalCost, setTotalCost] = React.useState(0);
	const [selectedRescueId, setSelectedRescueId] = React.useState(0);
	const [totalPage, setTotalPage] = React.useState(1);
	const [startDate, setStartDate] = React.useState("");
	const [customerName, setCustomerName] = React.useState("");
	const [loading, setLoading] = React.useState(true);
	const handleClickOpen = (customer , rescue_id) => {
		setOpen(true);
		setBillCustomerInfo(customer);
		setSelectedRescueId(rescue_id)
	};

	const handleClose = () => {
		setRows([]);
		setBillCustomerInfo(null);
		setTotalCost(0);
		setOpen(false);
	};

	useEffect(() => {
		loadOtoRescuing(1);
	}, []);

	const loadOtoRescuing = (page) => {
		setLoading(true);
		axios()
			.get(`/api/rescue/page/${page}`)
			.then(async (resp) => {
				await sleep(1000);
				setCarRescue(resp.data.rescuelist);
				setTotalPage(resp.data.total_page);
				setLoading(false)
			})
			.catch((err) => alert("err"));
	};

	const sleep = (milisecond) => {
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve("ok")
			},milisecond)
		})
	}



	const loadMessages = (customer_id) => {
		axios()
			.get(`/api/messages/store_to/${customer_id}`)
			.then(({ data }) => {
				dispatch({ type: "UPDATE_STORE_MESSAGES", messages: data });
			})
			.catch((err) => console.log(err));
	};

	const handleOpenMessage = (customer_id) => {
		loadMessages(customer_id);
		dispatch({ type: "SET_CHAT_TOGGLE", state: true });
	};

	const setComplete = (rescue_id) => {
		axios()
			.put("/api/rescue", { id: rescue_id })
			.then(() => {
				loadOtoRescuing();
			})
			.catch((err) => console.log(err));
	};


	const renderResultServices = () => {
		return resultService.map(e=>(
			<ListItem key={e._id} style={{borderBottom:"1px solid #f1f1f1",borderRadius:"12px"}}>
				<ListItemAvatar>
					<Avatar src={`${server}/images/${e.image}`} />
				</ListItemAvatar>
				<ListItemText
					primary={e.name}
				/>
				<ListItemSecondaryAction>
					<IconButton edge="start" aria-label="add" onClick={()=>handleAddService(e)}>
						<AddCircleOutlineIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		))
	}
	const makeBill = (rescue_id) => {
		let services = [];
		let total_cost =0;
		for(let i=0;i<rows.length;i++){
		  total_cost += rows[i].price * rows[i].quantity;
		  services.push({
			service_id: rows[i].id,
			quantity: rows[i].quantity
		  })
		}
		const bill ={
		  customer_id: billCustomerInfo._id,
		  total_cost,
		  services,
		}
		
		axios().post('/api/bill',bill)
		.then(reslt=> {
			setComplete(selectedRescueId);
			alert("Thành công!");
		})
		.catch(err=>console.log(err));
		handleClose();
	}

	const handleChangeService = (e) => {
		setInputNameService(e.target.value);
		if(e.target.value!==""){
		  axios().get(`/api/service/search/${e.target.value}`)
		  .then(({data})=>{
			setResultService(data)
		  })
		  .catch(err=>console.log(err))
		} else {
			setResultService([])
		}
	}

	const handleAddService = (service) => {
		const services = [...rows];
		var index = services.findIndex(e=>{
			return e.id === service._id
		});
		if(index<0){
			services.push(createData(service._id, service.name, service.price,1,service.price));
		} else {
			services[index].quantity += 1;
			services[index].total =  services[index].quantity * services[index].price
		}
		let total = 0;
		for(let e of services) {
			total+=e.total;
		}
		setTotalCost(total)
		setRows(services);
	}

	if (!mapCenter && mystoreInfo)
		setMapCenter({
			lat: mystoreInfo.latitude,
			lng: mystoreInfo.longtitude,
		});
	if (!mapCenter && !mystoreInfo)
		setMapCenter({
			lat: 10.0223554,
			lng: 105.77034019999999,
		});


	const renderListItem = () =>
		carRescue.map((e, index) => (
			<ListItem
				key={index}
				style={{
					borderBottom: "1px solid #ddd",
					width: "100%",
					backgroundColor: e.is_complete ? "#ddd" : "#f7f7f7",
					marginTop: "8px",
				}}
			>
				<ListItemIcon>
					<PersonIcon />
				</ListItemIcon>
				<ListItemText
					primary={e.customer_id.name}
					secondary={`${dateFormat(e.timestamp)} - ${e.distance ? e.distance.text : ""}`}
				/>
				<div>{e.problem.name}</div>
				{!e.is_complete && (
					<div>
						<Tooltip title="Chuyển đến thanh toán">
							<IconButton
								aria-label="gps"
								className={classes.margin}
								onClick={() => handleClickOpen(e.customer_id, e._id)}
							>
								<PaymentIcon style={{ color: "#3b0957" }} />
							</IconButton>
						</Tooltip>
					</div>
				)}
				{!e.is_complete && (
					<div>
						<Tooltip title="Đánh dấu hoàn tất">
							<IconButton
								aria-label="gps"
								className={classes.margin}
								onClick={() => setComplete(e._id)}
							>
								<CheckIcon style={{ color: "#044711" }} />
							</IconButton>
						</Tooltip>
					</div>
				)}
				{e.is_complete && (
					<div>
						<Typography style={{ color: "green", marginLeft:"4px" }} variant="body1">
							Đã hoàn thành
						</Typography>
					</div>
				)}
				<div>
					<Tooltip title="Định vị trên bản đồ">
						<IconButton
							aria-label="gps"
							className={classes.margin}
							onClick={() => {
								setMapCenter({
									lat: e.customer_id.latitude,
									lng: e.customer_id.longtitude,
								});
								setSelectedCustomer({
									customer_id: e.customer_id._id,
									name: e.customer_id.name,
									phone: e.customer_id.phone,
									lat: e.customer_id.latitude,
									lng: e.customer_id.longtitude,
									distance: e.distance ? e.distance.text : "",
								});
							}}
						>
							<GpsFixedIcon style={{ color: "#70091c" }} />
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip title="Nhắn tin">
						<IconButton
							className={classes.margin}
							onClick={() => handleOpenMessage(e.customer_id._id)}
						>
							<EmailIcon style={{ color: "#115293" }} />
						</IconButton>
					</Tooltip>
				</div>
			</ListItem>
		));

	const searchRescueByCustomerName = () => {
		if(customerName!==""){
			setLoading(true);
			axios().get(`/api/rescue/search/name/${customerName}`)
			.then(async (res)=>{
				await sleep(1000);
				setCarRescue(res.data.rescuelist)
				setTotalPage(res.data.total_page);
				setLoading(false)
			})
			.catch(err=>{console.log(err); setLoading(false)});
			setCustomerName("");
		} else alert("Nhập tên khách hàng")
		
	}

	const searchRescueByCustomerDate = () => {
		if(startDate!=""){
			setLoading(true);
			axios().get(`/api/rescue/search/date/${startDate}`)
			.then(async res=>{
				await sleep(1000);
				setCarRescue(res.data.rescuelist)
				setTotalPage(res.data.total_page);
				setLoading(false)
			})
			.catch(err=>{console.log(err); setLoading(false)});
			setStartDate("");
		} else alert("Nhập ngày liệt kê")
	}
	
	const callInsideMap = (f) => {
		f();
	}

	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Button on>ok</Button>
				<Typography variant="h5" gutterBottom>
					Bản đồ
				</Typography>
				{
					(carRescue.length > 0) && mystoreInfo
					&& 
					<MyMapComponent
					mapCenter={mapCenter}
					carRescue={carRescue}
					setCarRescue={setCarRescue}
					setMapCenter={setMapCenter}
					storeCoordinate={{
						lat: mystoreInfo ? mystoreInfo.latitude : -1,
						lng: mystoreInfo ? mystoreInfo.longtitude : -1,
					}}
					selectedCustomer={selectedCustomer}
					setSelectedCustomer={setSelectedCustomer}
					handleOpenMessage={handleOpenMessage}
					setComplete={setComplete}
					handleClickOpen={handleClickOpen}
					callInsideMap={callInsideMap}
					inputSearchService={inputSearchService}
				/>
				}
			</GridItem>
			<GridItem xs={12} sm={12} md={12}>
				<Typography variant="h5" className="mt-3" gutterBottom>
					Danh sách
					<IconButton onClick={()=>loadOtoRescuing(1)} >
						<ReplayIcon />
					</IconButton>
				</Typography>
			</GridItem>
			<GridItem xs={12} sm={12} md={8}>
				{loading && <div style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
					<CircularProgress color="secondary" />
				</div>}
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					className={classes.root}
				>	
					{renderListItem(0)}
				</List>
				{totalPage==-1 && carRescue.length<=0 && <div style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
					Không tìm thấy
				</div>}
				{totalPage>=0 && <div style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
					<Pagination count={totalPage} onChange={(e, value)=> loadOtoRescuing(value)} color="primary" />
				</div>}
			</GridItem>
			<GridItem xs={12} sm={12} md={4}>
				<Typography variant="h5" className="mt-3" gutterBottom>
					Bộ lọc
				</Typography>
				<Input
					style={{width:"80%"}}
					placeholder="Tìm tên khách hàng"
					value={customerName}
					onChange={(e)=>setCustomerName(e.target.value)}
				/>
				<IconButton
					onClick={searchRescueByCustomerName}
				>
					<SearchIcon style={{ color: "#115293" }} />
				</IconButton>
				<div style={{position:"relative"}}>
					<DatePicker 
						placeholderText="Tìm theo ngày" 
						selected={startDate} 
						onChange={date => setStartDate(date)} 
						style={{border:"none", borderBottom:"1px solid #ddd"}}
					/>
					<IconButton
						onClick={searchRescueByCustomerDate}
					>
						<SearchIcon style={{ color: "#115293" }} />
					</IconButton>
				</div>
			</GridItem>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth="lg"
				fullWidth
				classes={{ paper: classes.dialogPaper }}
			>
				<DialogTitle id="alert-dialog-title">
					{"Thêm dịch vụ"}
				</DialogTitle>
				<DialogContent>
					<GridContainer>
						<GridItem md={8}>
							<Typography variant="h6">Dịch vụ</Typography>
							<div 
								style={{position:"relative"}}
							>
								<div 
									style={{
										display:"flex", 
										flexDirection:"row-reverse"
									}}
								>
									<div style={{width:"70%", textAlign:"right"}}>
										<SearchIcon/>
										<Input 
											type="text" 
											placeholder="Tên sản phẩm"
											style={{width:"85%"}}
											value={inputSearchService}
                            				onChange={handleChangeService}
										/> 
									</div>
								</div>
								<div 
									style={{
										position:"absolute",
										right:"0px",
										zIndex:1,
										backgroundColor:"#fff",
										width:"65%"
									}}
								>
									<List >
										{renderResultServices()}
									</List>
								</div>
							</div>
							<Table
								className={classes.table}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell>
											ID
										</TableCell>
										<TableCell align="right">
											Name
										</TableCell>
										<TableCell align="right">
											Price
										</TableCell>
										<TableCell align="right">
											Quantity
										</TableCell>
										<TableCell align="right">
											Total
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow key={row.name}>
											<TableCell
												component="th"
												scope="row"
											>
												{row.id}
											</TableCell>
											<TableCell align="right">
												{row.name}
											</TableCell>
											<TableCell align="right">
												{row.price}
											</TableCell>
											<TableCell align="right">
												{row.quantity}
											</TableCell>
											<TableCell align="right">
												{row.total}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<div style={{display:"flex", flexDirection:"row-reverse", marginTop:"8px"}}>
								<div style={{width:"30%", display:"flex", justifyContent:"space-between"}}>
									<div>
										Tổng tiền:
									</div>
									<div style={{color:"red", fontWeight:"bold"}}>
										{totalCost}
									</div>
								</div>
							</div>
						</GridItem>
						<GridItem md={4}>
							<Typography variant="h6">Khách hàng</Typography>
							<Avatar src={`${server}/images/${billCustomerInfo ? billCustomerInfo.image : ""}`} />
							<div className={classes.infoItem}>
								<AccountBoxIcon /> {billCustomerInfo && billCustomerInfo.name}
							</div>
							<div className={classes.infoItem}>
								<RoomIcon /> {billCustomerInfo && billCustomerInfo.address}
							</div>
							<div className={classes.infoItem}>
								<PhoneAndroid /> {billCustomerInfo && billCustomerInfo.phone}
							</div>
						</GridItem>
					</GridContainer>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Hủy
					</Button>
					<Button onClick={makeBill} variant="contained" color="primary" autoFocus>
						Đồng Ý
					</Button>
				</DialogActions>
			</Dialog>
		</GridContainer>
	);
}
