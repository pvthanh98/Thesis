import React, { useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import IconButton from '@material-ui/core/IconButton';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import { Tooltip } from '@material-ui/core';
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
	lifecycle({})
)((props) => (
	<GoogleMap
		defaultZoom={13}
		defaultCenter={{
			lat: 10.0223554,
			lng: 105.77034019999999,
		}}
	></GoogleMap>
));

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function Service() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={4}>
				<Typography variant="h5" gutterBottom>
					Danh sách
				</Typography>
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					className={classes.root}
				>
					<ListItem>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Nguyễn Văn A" />
            <div>
              <Tooltip title="Định vị trên bản đồ">
                <IconButton aria-label="gps" className={classes.margin}>
                  <GpsFixedIcon fontSize="medium" />
                </IconButton>
              </Tooltip>

            </div>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Nguyễn Văn C" />
					</ListItem>
				</List>
			</GridItem>
			<GridItem xs={12} sm={12} md={8}>
				<Typography variant="h5" gutterBottom>
					Bản đồ
				</Typography>
				<MyMapComponent />
			</GridItem>
		</GridContainer>
	);
}
