import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PrivateRoute from '../../components/PrivateRoute/sys_privateroute'
import Home from "./home";
const useStyle = makeStyles({
  root: {
    backgroundColor: "#000000d1",
    height: window.innerHeight,
  },
  main: {
    padding: "8px",
    backgroundImage: "url('/images/background.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  title: {
    fontFamily: "fantasy",
    textAlign: "center",
    color: "#fff",
    padding: "16px",
    borderBottom: "1px solid #676767d9",
  },
  menuItem: {
    color: "#fff",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "sans-serif",
  },
  menuItemActive: {
    color: "black",
    backgroundColor: "#fff",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRight: "2px solid black",
  },
  icon: {
    marginRight: "8px",
  },
});
export default (props) => {
  const classes = useStyle();
  console.log(props.match);
  return (
    <Grid container>
      <Grid item className={classes.root} xs={12} sm={12} md={2}>
        <Typography className={classes.title} variant="h5">
          SYSTEM ADMIN
        </Typography>

        <Route
          exact
          path="/sys"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys"
            >
              <StoreIcon className={classes.icon} /> Quản lí cửa hàng
            </Link>
          )}
        />

        <Route
          exact
          path="/sys/info"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/info"
            >
              <PermIdentityIcon className={classes.icon} /> Thông tin
            </Link>
          )}
        />
        <div className={classes.menuItem}>
          <ExitToAppIcon className={classes.icon} /> Đăng xuất
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={10} className={classes.main}>
        <Switch>
          <PrivateRoute exact path="/sys" component={Home} />
          <PrivateRoute exact path="/sys/info" component={() => <div>Hehe</div>} />
        </Switch>
      </Grid>
    </Grid>
  );
};
