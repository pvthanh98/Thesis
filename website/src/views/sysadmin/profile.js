import React from "react";
import system_axios from "../../service/axios_sys";
import { Button, Grid, TextField, Typography, Input, LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FormData from "form-data";
import {server} from '../../constant';
export default function (props) {
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);
  const [imageInput, setImageInput] = React.useState("");
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [newPassRetype, setNewPassRetype] = React.useState("");
  const [isChangePass, setIsChangePass] = React.useState(false);
  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    setIsloading(true);
    system_axios()
      .get("/api/store/profile")
      .then(({ data }) => {
        setEmail(data.email);
        setImage(data.image);
        setName(data.name);
        setPhone(data.phone);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err)
        setIsloading(false);
      });
  };

  const onChangePass = () => {
    setIsChangePass(!isChangePass);
    setCurrentPass("");
    setNewPass("");
    setNewPassRetype("");
  };

  const submitForm = () => {
    let data = new FormData();
    data.append("file", imageInput);
    data.append("name", name);
    data.append("phone", phone);
    if(currentPass!="") data.append("currentPass", currentPass);
    if(newPass!="") data.append("password", newPass);
    if(newPass!="" && newPass !== newPassRetype) {
      alert("Password không khớp");
      return;
    }
    setIsloading(true)
    system_axios().post("/api/sys/profile/modify",data)
    .then(()=>{
      loadProfile();
    })
    .catch(err=> {
      setIsloading(false)
      if(err.response){
        alert(err.response.data.err)
      }
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        {isLoading && <LinearProgress />}
        <Typography variant="h5" style={{ padding: "8px" }}>
          Thông tin tài khoản
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <div
          style={{
            marginTop: "4px",
            backgroundColor: "#ffffff61",
            padding: "8px",
          }}
        >
          <TextField
            style={{ marginTop: "8px" }}
            required
            id="outlined-required"
            label="Email"
            variant="outlined"
            fullWidth
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            style={{ marginTop: "8px" }}
            id="outlined-required"
            label="Tên"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            style={{ marginTop: "8px" }}
            id="outlined-required"
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {isChangePass && (
            <div>
              <TextField
                style={{ marginTop: "8px" }}
                id="outlined-required"
                label="Mật khẩu hiện tại"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setCurrentPass(e.target.value)}
              />
              <TextField
                style={{ marginTop: "8px" }}
                id="outlined-required"
                label="Mật khẩu mới"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setNewPass(e.target.value)}
              />
              <TextField
                style={{ marginTop: "8px" }}
                id="outlined-required"
                label="Nhập lại mật khẩu mới"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setNewPassRetype(e.target.value)}
              />
            </div>
          )}
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {" "}
              <Button
                onClick={onChangePass}
                variant="outlined"
                style={{ marginRight: "4px" }}
              >
                {!isChangePass ? "Đổi mật khẩu?" : "Hủy"}
              </Button>
            </div>
            <div>
              <Button variant="outlined" style={{ marginRight: "4px" }}>
                HỦY
              </Button>
              <Button
                variant="contained"
                style={{ width: "100px" }}
                color="primary"
                onClick={submitForm}
              >
                LƯU
              </Button>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <div
          style={{
            marginTop: "4px",
            backgroundColor: "#ffffff61",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={`${server}/images/${image}`}
            style={{ height: "250px", width: "250px" }}
          />
           <Input type="file" name="image" onChange={e=>setImageInput(e.target.files[0])} />
          <Typography variant="h4" style={{ marginTop: "8px" }}>
            OTO RESCUING
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
