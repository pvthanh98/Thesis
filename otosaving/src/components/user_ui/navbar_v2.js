import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import {Badge} from 'reactstrap'
const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    height:window.innerHeight,
    backgroundImage: "url('/images/background_1920_blur.jpg')",
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat: 'no-repeat'
  },
  navbarContainer: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:"24px",
    paddingRight:"24px",
    height:"100px"
  },
  logo:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  rightSide: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
  },
  intro: {
    marginLeft:"80px",
    marginTop:"90px",
    backgroundColor:"#ffffff4d",
    padding:"24px",
    borderRadius:"12px",
    width:"40%"
  }
});

function MyNavbar (props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
        <div className={classes.navbarContainer}>
          <div className={classes.logo}>
              <img src="/images/logo2.png" height="100px" />
              <div>
                <div>
                  <b style={{color:"#f7f7f7"}}>THANH PHAN</b>  
                </div>
                <div> 
                  <b style={{color:"#f7f7f7"}}>OTO RESCUING</b>
                </div>
              </div>

          </div>
          <div className={classes.rightSide}>
              <Button variant="text" style={{marginRight:"32px"}}>
                CỨU HỘ
              </Button>
              <Button style={{marginRight:"32px"}}>
                CỬA HÀNH
              </Button>
              <Button style={{marginRight:"48px"}}>
                GIỚI THIỆU
              </Button>
              <div>
                <Button variant="contained" color="primary" >ĐĂNG NHẬP</Button>
                <Button  style={{marginLeft:"4px"}} >ĐĂNG KÝ</Button>
              </div>
          </div>
        </div>

        <div className={classes.intro}>
            <Typography variant="h4" >
              Chào mừng bạn đến với hệ thống <Badge color="success">Cứu Hộ OTO</Badge> lớn nhất Việt Nam!
            </Typography>
            <Typography variant="body1" style={{marginTop:"16px"}}>
                Xe của bạn đang gặp một vài sự cố trên đường? Hãy đến với chúng tôi, Liên hệ với chúng tôi, nơi tập hợp nhiều cửa hàng cứu
                hộ đạt chất lượng với sự đánh giá của khách hàng. Phân bố khắp cả nước
            </Typography>
        </div>
    </div>
  );
}

export default MyNavbar;