import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PrivateRoute from "../../components/PrivateRoute/sys_privateroute";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import ReportIcon from "@material-ui/icons/Report";
import CommentIcon from "@material-ui/icons/Comment";
import Home from "./home";
import Profile from "./profile";
import About from "./about";
import City from "./city";
import Comment from "./comment";
import Report from "./report";
const useStyle = makeStyles({
  root: {
    backgroundColor: "#000000d1",
    minHeight: window.innerHeight,
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
  const [isLogin, setIsLogin] = React.useState(true);
  const logout = () => {
    localStorage.removeItem("sys_token");
    localStorage.removeItem("sys_id");
    localStorage.removeItem("sys_avt");
    localStorage.removeItem("sys_name");
    setIsLogin(false);
  };

  if (!isLogin) return <Redirect to="/sys/login" />;
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
          path="/sys/report"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/report"
            >
              <ReportIcon className={classes.icon} /> Báo cáo vi phạm
            </Link>
          )}
        />

        <Route
          exact
          path="/sys/comment"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/comment"
            >
              <CommentIcon className={classes.icon} /> Quản lí bình luận
            </Link>
          )}
        />

        <Route
          exact
          path="/sys/profile"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/profile"
            >
              <PermIdentityIcon className={classes.icon} /> Quản lí tài khoản
            </Link>
          )}
        />
        <Route
          exact
          path="/sys/city"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/city"
            >
              <EditLocationIcon className={classes.icon} /> Quản lí thành phố
            </Link>
          )}
        />
        <Route
          exact
          path="/sys/about"
          children={({ match }) => (
            <Link
              className={match ? classes.menuItemActive : classes.menuItem}
              to="/sys/about"
            >
              <ArtTrackIcon className={classes.icon} /> Trang giới thiệu
            </Link>
          )}
        />
        <div className={classes.menuItem} onClick={logout}>
          <ExitToAppIcon className={classes.icon} /> Đăng xuất
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={10} className={classes.main}>
        <Switch>
          <PrivateRoute exact path="/sys/profile" component={Profile} />
          <PrivateRoute exact path="/sys/city" component={City} />
          <PrivateRoute exact path="/sys/report" component={Report} />
          <PrivateRoute exact path="/sys/comment" component={Comment} />
          <PrivateRoute exact path="/sys/about" component={About} />
          <PrivateRoute exact path="/sys" component={Home} />
        </Switch>
      </Grid>
    </Grid>
  );
};
