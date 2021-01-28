import React, { useEffect } from "react";
import Navbar from "../../components/user_ui/navbar";
import Footer from "../../components/user_ui/footer";
import { Grid, Container } from "@material-ui/core";
import axios from "../../service/axios_user";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { server } from "../../constant";
import Icon from "@material-ui/core/Icon";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import { EditLocation, DriveEta } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
//tabbar
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "../../components/user_ui/card_material";
import Chat from "../../components/user_ui/chat/container";
import Loading from "../../components/user_ui/loading";
import Comment from "../../components/user_ui/comment";
import TextField from "@material-ui/core/TextField";
import Rating from "material-ui-rating";
import ReportIcon from "@material-ui/icons/Report";
import PhoneIcon from "@material-ui/icons/Phone";
import ReportDialog from "../../components/store_detail/report_dealog";
const labels = ["", "Poor", "Ok", "Good", "Good+", "Excellent"];
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
      lat: props.store_coordinate ? props.store_coordinate.lat : 10.0223554,
      lng: props.store_coordinate
        ? props.store_coordinate.lng
        : 105.77034019999999,
    }}
    center={{
      lat: props.store_coordinate.lat,
      lng: props.store_coordinate.lng,
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
          <div>Vị trí cửa hàng</div>
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
    position: "relative",
  },
  customAppBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
  },
  infoHeader: {
    padding: "8px",
    border: "1px solid red",
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
  return (
    props.services &&
    props.services.map((service) => {
      if (service.category !== "5fbdc0f297f583672286ec4b") {
        return (
          <Grid key={service._id} item md={3}>
            <Card service={service} />
          </Grid>
        );
      }
    })
  );
};

export default (props) => {
  const classes = useStyle();
  const [reportDialogOpen, setReportDialogOpen] = React.useState(false);
  const [services, setServices] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState(null);
  const [ratingValue, setRatingValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [textFieldValue, setTextFieldValue] = React.useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const store_detail = useSelector((state) => state.store_detail);
  const chat_toggle = useSelector((state) => state.chat_toggle);
  useEffect(() => {
    loadStore();
    loadServices();
    loadComment();
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

  const loadMessages = () => {
    console.log("press me");
    dispatch({ type: "SET_CHAT_TOGGLE", state: true });
    axios()
      .get(`/api/messages/customer_to/${store_detail._id}`)
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: "UPDATE_MESSAGES", messages: data });
      })
      .catch((err) => console.log(err));
  };

  const loadServices = () => {
    axios()
      .get(`/api/service/store/${props.match.params.id}`)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const loadComment = () => {
    axios()
      .get(`/api/rating/store_id/${props.match.params.id}`)
      .then(({ data }) => setComments(data))
      .catch((err) => console.log(err));
  };

  const renderComments = () =>
    comments && comments.map((e) => <Comment key={e._id} {...e} />);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onSubmitRating = () => {
    if (textFieldValue != "") {
      let data = {
        content: textFieldValue,
        rating: ratingValue,
        store_id: props.match.params.id,
      };
      axios()
        .post("/api/rating", data)
        .then(() => alert("Đánh giá của bạn đã được gửi đi"))
        .catch((err) => alert(err));
      setTextFieldValue("");
    }
  };

  const onSubmitReport = (content) => {
    setReportDialogOpen(false)
    axios()
      .post("/api/report", {
        content,
        store_id: props.match.params.id,
      })
      .then(() => alert("Ý kiến của bạn được được gửi đi"))
      .catch((err) => console.log(err));
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
                lng: store_detail ? store_detail.longtitude : -1,
              }}
            />
          </Grid>
          <Grid className={classes.avataContainer} item md={6} sm={12} xs={12}>
            {store_detail ? (
              <div className="mt-3">
                <img
                  style={{ borderRadius: "50%", border: "1px solid #e4e4e4" }}
                  src={server + "images/" + store_detail.image}
                  width="180px"
                />
                <h4 className="mt-3">{store_detail.name}</h4>
                <div>{store_detail.description}</div>
                <div>
                  <Rating value={store_detail.rating.total} />
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
          <Grid className={classes.optionInfo} item md={6} sm={12} xs={12}>
            <Button
              variant="contained"
              className={classes.customButton}
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={loadMessages}
            >
              Nhắn Tin
            </Button>
            <Button
              variant="contained"
              className={classes.customButton}
              endIcon={<ReportIcon />}
              onClick={() => setReportDialogOpen(true)}
            >
              Báo cáo vi phạm
            </Button>

            <div
              className={classes.customButton}
              style={{ textAlign: "center" }}
            >
              <hr />
              <div>
                <EditLocation /> {store_detail && store_detail.address}{" "}
              </div>
              <div>
                <DriveEta /> Cách bạn 12 km
              </div>
              <div>
                <PhoneIcon /> {store_detail && store_detail.phone}
              </div>
            </div>
            {chat_toggle && <Chat where="customer" />}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <hr />
            <AppBar
              className={classes.customAppBar}
              position="static"
              color="default"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Dịch vụ" {...a11yProps(0)} />
                <Tab label="Bình luận" {...a11yProps(1)} />
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
                  {loading ? (
                    <Grid item md={12}>
                      <Loading />
                    </Grid>
                  ) : (
                    <RenderService services={services} />
                  )}
                </Grid>
              </div>
              <div
                value={value}
                index={1}
                dir={theme.direction}
                style={{ overflow: "hidden" }}
              >
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <TextField
                      style={{ marginTop: "8px" }}
                      required
                      onChange={(e) => setTextFieldValue(e.target.value)}
                      value={textFieldValue}
                      id="outlined-required"
                      label="ĐÁNH GIÁ CỦA BẠN VỀ CỬA HÀNG"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                    />
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="hover-feedback"
                          value={ratingValue}
                          size="large"
                          onChange={(newValue) => {
                            setRatingValue(newValue);
                          }}
                        />
                        {ratingValue !== null && (
                          <Box ml={2}>{labels[ratingValue]}</Box>
                        )}
                      </div>
                      <Button
                        style={{ marginTop: "4px" }}
                        variant="contained"
                        onClick={onSubmitRating}
                        color="secondary"
                      >
                        GỬI ĐÁNH GIÁ
                      </Button>
                    </div>
                  </Grid>
                  {renderComments()}
                  <Grid item md={12} style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Pagination count={10} color="primary" />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <ReportDialog
                onSubmitReport={onSubmitReport}
                open={reportDialogOpen}
                setOpen={setReportDialogOpen}
              />
            </SwipeableViews>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
