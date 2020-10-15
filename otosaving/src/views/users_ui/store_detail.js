import React, { useEffect } from "react";
import Navbar from "../../components/user_ui/navbar";
import Footer from "../../components/user_ui/footer";
import { Grid, Container } from "@material-ui/core";
import axios from "../../service/axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { server } from "../../constant";
import Icon from "@material-ui/core/Icon";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import { EditLocation, DriveEta } from "@material-ui/icons";
//tabbar
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from '../../components/user_ui/rating';
import Card from '../../components/user_ui/card_material';
import Chat from '../../components/user_ui/chat/container';
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
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			console.log(this.props.store_coordinate);
		},
	})
)((props) => (
	<GoogleMap
		defaultZoom={14}
		defaultCenter={{
			lat: props.store_coordinate
				? props.store_coordinate.lat
				: 10.0223554,
			lng: props.store_coordinate
				? props.store_coordinate.lng
				: 105.77034019999999,
		}}
		options={{
			gestureHandling: "greedy",
		}}
	>
		{props.store_coordinate && (
			<Marker
				position={{
					lat: props.store_coordinate.lat,
					lng: props.store_coordinate.lng,
				}}
			>
				<InfoWindow>
					<div>Vị trí của bạn</div>
				</InfoWindow>
			</Marker>
		)}
	</GoogleMap>
));

const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
	},
	avataContainer: {
		textAlign: "center",
		padding: "8px",
	},
	customButton: {
		width: "60%",
		margin: "8px",
	},
	optionInfo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		position:"relative"
	},
	customAppBar: {
		backgroundColor: "#ffffff",
		boxShadow: "none"
	},
	infoHeader: {
		padding: "8px",
		border: "1px solid red"
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const RenderService = (props) => {
	return props.services.map(service => (<Grid item md={3}>
		<Card
			service={service}
		/>
	</Grid>))
}

export default (props) => {
	const classes = useStyle();
	const [services, setServices] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const theme = useTheme();
	const dispatch = useDispatch();
	const store_detail = useSelector((state) => state.store_detail);
	const chat_toggle = useSelector(state=> state.chat_toggle)
	useEffect(() => {
		loadStore();
		loadServices();
	}, [props.match.params.id]);

	const loadStore = async () => {
		try {
			const { data } = await axios().get(
				"/api/store/id/" + props.match.params.id
			);
			dispatch({ type: "GET_STORE_DETAIL", store_detail: data });
		} catch (err) {
			console.log(err);
		}
	};

	const loadServices = () => {
		axios().get(`/api/service/store/${props.match.params.id}`)
			.then(res => {
				setServices(res.data);
				setLoading(false)
			})
			.catch(err => {
				console.log(err);
				setLoading(false)
			})
	}

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<div>
			<Navbar />
			<Container>
				<Grid container>
					<Grid className="mt-1" item md={12} sm={12} xs={12}>
						<MyMapComponent
							store_coordinate={{
								lat: store_detail ? store_detail.latitude : -1,
								lng: store_detail
									? store_detail.longtitude
									: -1,
							}}
						/>
					</Grid>
					<Grid
						className={classes.avataContainer}
						item
						md={6}
						sm={12}
						xs={12}
					>
						{store_detail ? (
							<div className="mt-3">
								<img
									style={{ borderRadius: "50%", border: "1px solid #e4e4e4" }}
									src={
										server + "images/" + store_detail.image
									}
									width="180px"
								/>
								<h4 className="mt-3">{store_detail.name}</h4>
								<div>{store_detail.description}</div>
								<div><Rating star={4} /></div>
							</div>
						) : (
								<div>Loading...</div>
							)}
					</Grid>
					<Grid
						className={classes.optionInfo}
						item
						md={6}
						sm={12}
						xs={12}
					>
						<Button
							variant="contained"
							className={classes.customButton}
							color="primary"
							endIcon={<Icon>send</Icon>}
							onClick={()=>dispatch({ type: "SET_CHAT_TOGGLE", state: true })}
						>
							Nhắn Tin
						</Button>
						<Button
							variant="contained"
							className={classes.customButton}
							endIcon={<KeyboardVoiceIcon />}
						>
							Gọi
						</Button>

						<div className={classes.customButton} style={{ textAlign: "center" }}>
							<hr />
							<div><EditLocation /> {store_detail && store_detail.address}  </div>
							<div><DriveEta /> Cách bạn 12 km</div>
						</div>
						{chat_toggle && <Chat/>}
					</Grid>
					<Grid item md={6} sm={12} xs={12}>
						<hr />
						<AppBar className={classes.customAppBar} position="static" color="default">
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
								aria-label="full width tabs example"
							>
								<Tab label="Dịch vụ mới" {...a11yProps(0)} />
								<Tab label="Dịch vụ chuyên" {...a11yProps(1)} />
							</Tabs>
						</AppBar>
					</Grid>
					<Grid item md={12} sm={12} xs={12}>
						<SwipeableViews
							className="mt-3"
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={value}
							onChangeIndex={handleChangeIndex}
						>
							<div
								value={value}
								index={0}
								dir={theme.direction}
								style={{ overflow: "hidden" }}
							>
								<Grid container spacing={2}>
									<RenderService services={services} />
								</Grid>
							</div>
							<div
								value={value}
								index={1}
								dir={theme.direction}
								style={{ overflow: "hidden" }}
							>
								Item Two
								</div>
						</SwipeableViews>
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</div>
	);
};
