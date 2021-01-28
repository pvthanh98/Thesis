import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Badge } from 'reactstrap';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link, Redirect } from 'react-router-dom';
import ProfileMenu from '../../components/user_ui/profileMenu';
import {socket} from '../../views/users_ui/index';
const useStyles = makeStyles({
  root: {
    height: window.innerHeight,
    backgroundImage: "url('/images/background_1920_blur.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat'
  },
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "24px",
    paddingRight: "24px",
    height: "100px"
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  rightSide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  intro: {
    marginLeft: "80px",
    marginTop: "90px",
    backgroundColor: "#ffffff4d",
    padding: "24px",
    borderRadius: "12px",
    width: "40%"
  }
});

function MyNavbar(props) {
  const classes = useStyles(props);
  const [redirect, setRedirect] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(()=>{
    if (localStorage.getItem("user_token")) setIsLogin(true);
  },[]);

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_avt');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    setIsLogin(false);
    socket.disconnect(true);
  }

  if(redirect) return <Redirect push to={redirect} />
  return (
    <div className={classes.root}>
      <div className={classes.navbarContainer}>
        <Link className={classes.logo} to="/">
          <img src="/images/logo2.png" height="100px" />
          <div>
            <div>
              <b style={{ color: "#f7f7f7", fontFamily: "Arial sans-serif" }}>OTO RESCUING</b>
            </div>
          </div>
        </Link>
        <div className={classes.rightSide}>
          <Link style={{ marginRight: "24px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/cuuho">CỨU HỘ</Link>
          <Link style={{ marginRight: "24px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/store">CỬA HÀNH</Link>
          <Link style={{ marginRight: "48px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/about">GIỚI THIỆU</Link>
          {!isLogin? 
          <div>
            <Button onClick={()=>setRedirect('/login')}  variant="contained" color="primary" >ĐĂNG NHẬP</Button>
            <Button onClick={()=>setRedirect('/user/register')} style={{ marginLeft: "4px" }} >ĐĂNG KÝ</Button>
          </div>
          : <ProfileMenu logout={logout} />
          }
        </div>
      </div>

      <div className={classes.intro}>
        <Typography variant="h4" style={{ fontFamily: "Arial sans-serif" }} >
          Chào mừng bạn đến với hệ thống <Badge color="success">Cứu Hộ OTO</Badge> lớn nhất Việt Nam!
            </Typography>
        <Typography variant="body1" style={{ marginTop: "16px", fontFamily: "Arial sans-serif" }}>
          Xe của bạn đang gặp một vài sự cố trên đường? Liên hệ với chúng tôi, nơi tập hợp nhiều cửa hàng cứu
          hộ đạt chất lượng với sự đánh giá của khách hàng. Phân bố khắp cả nước
            </Typography>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <Button variant="contained" onClick={()=>setRedirect("/about")}>
            TÌM HIỂU WEBSITE
            <ArrowDropDownIcon />
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginLeft: "4px" }}
            onClick={()=>setRedirect("/cuuho")}
          >
            LIÊN HỆ CỨU HỘ
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyNavbar;