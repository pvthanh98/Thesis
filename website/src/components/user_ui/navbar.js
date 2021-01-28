import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ProfileMenu from '../../components/user_ui/profileMenu';
import {socket} from '../../views/users_ui/index';
import {Button} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
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
    height: "100px",
    boxShadow: "0 2px 2px 0 rgba(61, 45, 45, 0.16),0 2px 10px 0 rgba(0,0,0,0.12)"
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
  const [isLogin, setIsLogin] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);
  React.useEffect(()=>{
    if (localStorage.getItem("user_token")) setIsLogin(true);
  },[])

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
      <div className={classes.navbarContainer}>
        <Link className={classes.logo} to="/">
          <img src="/images/logo2.png" height="100px" />
          <div>
            {/* <div>
              <b style={{ color: "#922b2b", fontFamily: "Arial sans-serif" }}>THANH PHAN</b>
            </div> */}
            <div>
              <b style={{ color: "#922b2b", fontFamily: "Arial sans-serif" }}>OTO RESCUING</b>
            </div>
          </div>
        </Link>
        <div className={classes.rightSide}>
          <Link style={{ marginRight: "24px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/cuuho">CỨU HỘ</Link>
          <Link style={{ marginRight: "24px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/store">CỬA HÀNH</Link>
          <Link style={{ marginRight: "48px", fontFamily: "Arial sans-serif", fontWeight: "bold" }} className="custom-link nav-link" to="/about">GIỚI THIỆU</Link>
          {
          !isLogin 
          ? <div>
                <Button onClick={()=>setRedirect('/login')} variant="contained" color="primary" >ĐĂNG NHẬP</Button>
                <Button onClick={()=>setRedirect('/user/register')} style={{ marginLeft: "4px" }} >ĐĂNG KÝ</Button>
            </div> 
          : <ProfileMenu logout={logout} />}
        </div>
      </div>
  );
}

export default MyNavbar;