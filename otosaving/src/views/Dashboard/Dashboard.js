import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";

import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from '../../service/axios';
import formatDate from '../../service/formatDate';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Typography from '@material-ui/core/Typography';
import Linechart from '../../components/Charts/line';
import LineCharCost from '../../components/Charts/lineCost';
const useStyles = makeStyles(styles);

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
    
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() { }
  })
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{
      lat: props.store_coordinate.lat,
      lng: props.store_coordinate.lng
    }}
    center={{
      lat: props.store_coordinate.lat,
      lng: props.store_coordinate.lng
    }}
    options={{
      gestureHandling:'greedy',
      scrollwheel:false,

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

    {props.rescueLocation && props.rescueLocation.map(rescue=>(
      <Marker
        key={rescue._id}
        position={{
          lat: rescue.coordinate.lat,
          lng: rescue.coordinate.lng
        }}
      >
        <InfoWindow>
          <div>
            <div> 
              <AccountCircleIcon />
              {rescue.customer_id.name}
            </div>
            <div>
              <AttachMoneyIcon />
              {rescue.total_cost} VND
            </div>
            <div>
              <CalendarTodayIcon />
              {formatDate(rescue.timestamp)}
            </div>
          </div>
        </InfoWindow>
      </Marker>
    ))}
  </GoogleMap>
));



export default function Dashboard() {
  const classes = useStyles();
  const [myStore_Lat, setMystore_Lat] = React.useState(-1);
  const [myStore_Lng, setMystore_Lng] = React.useState(-1);
  const [rescueLocation, setRescueLocation] = React.useState([]);
  const [customerToday, setCustomerToday] = React.useState("");
  const [customerWeek, setCustomerWeek] = React.useState("");
  const [costToday, setCostToday] = React.useState("");
  const [costWeek, setCostWeek] = React.useState("");
  const [chartCountWeek, setChartCountWeek] = React.useState(null);
  const [chartCostWeek, setChartCostWeek] = React.useState(null)

  React.useEffect(()=>{
    loadStore();
    loadRescueLocation();
    loadStatisticMiddle();
    loadChartData();
  },[])

  const loadStore = () => {
    axios().post('/api/store/me', { id: localStorage.getItem('admin_id') })
    .then(res => {
      setMystore_Lat(parseFloat(res.data.latitude));
      setMystore_Lng(parseFloat(res.data.longtitude));
    })
    .catch(err => {
      console.log(err);
    })
  }

  const loadStatisticMiddle = () => {
    axios().get('/api/bill/count/today')
    .then(res => {
      setCustomerToday(res.data.count)
    })
    .catch(err => {
      console.log(err);
    })
    axios().get('/api/bill/count/week')
    .then(res => {
      setCustomerWeek(res.data.count)
    })
    .catch(err => {
      console.log(err);
    })
    axios().get('/api/bill/cost/today')
    .then(res => {
      setCostToday(res.data.cost)
    })
    .catch(err => {
      console.log(err);
    })
    axios().get('/api/bill/cost/week')
    .then(res => {
      
      setCostWeek(res.data.cost)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const loadChartData = () => {
    axios().get('/api/bill/chart/count/week')
    .then(resl=> setChartCountWeek(resl.data))
    .catch(err=>console.log(err));
    // const
    axios().get('/api/bill/chart/cost/week')
    .then(resl=> setChartCostWeek(resl.data))
    .catch(err=>console.log(err));
  }

  const loadRescueLocation = () => {
    axios().get('/api/store/rescue_location')
    .then(res => {
      setRescueLocation(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

	return (
		<div>
			<GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Typography style={{marginBottom:"8px"}} variant="h5" gutterBottom>
            Vị trí cứu hộ
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
            <MyMapComponent
              store_coordinate={{lat:myStore_Lat,lng:myStore_Lng}}
              rescueLocation={rescueLocation}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Typography style={{marginBottom:"8px",marginTop:"8px"}} variant="h5" gutterBottom>
           Thống kê
          </Typography>
        </GridItem>
				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="warning" stats icon>
							<CardIcon color="warning">
								<Icon>content_copy</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Khách hàng</p>
							<h3 className={classes.cardTitle}>
								{customerToday}
							</h3>
						</CardHeader>
						<CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Hôm nay
              </div>
            </CardFooter>
					</Card>
				</GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Khách hàng</p>
              <h3 className={classes.cardTitle}>{customerWeek}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Trong 7 ngày qua
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Doanh Thu</p>
              <h3 className={classes.cardTitle}>{costToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Hôm nay
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Doanh Thu</p>
              <h3 className={classes.cardTitle}>{costWeek}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Trong tuần
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {chartCountWeek && <Linechart data={chartCountWeek} />}
        </GridItem>
        
        <GridItem xs={12} sm={12} md={12}>
          {chartCostWeek && <LineCharCost data={chartCostWeek} />}
        </GridItem>
			</GridContainer>
		</div>
	);
}
