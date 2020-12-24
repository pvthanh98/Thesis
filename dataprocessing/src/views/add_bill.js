import React from "react";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Select from "@material-ui/core/Select";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinearProgress from "@material-ui/core/LinearProgress";
import NumberFormat from 'react-number-format';
const emailList = [
  "cuahang01@gmail.com",
  "cuahang02@gmail.com",
  "cuahang03@gmail.com",
  "cuahang04@gmail.com",
  "cuahang05@gmail.com",
  "cuahang06@gmail.com",
  "cuahang07@gmail.com",
  "cuahang08@gmail.com",
  "cuahang09@gmail.com",
  "cuahang10@gmail.com",
  "cuahang11@gmail.com",
  "cuahang12@gmail.com",
  "cuahang13@gmail.com",
  "cuahang14@gmail.com",
  "cuahang20@gmail.com",
  "cuahang21@gmail.com",
  "cuahang22@gmail.com",
  "cuahang23@gmail.com",
  "cuahang24@gmail.com",
  "cuahang30@gmail.com",
  "cuahang31@gmail.com",
  "cuahang32@gmail.com",
  "cuahang33@gmail.com",
  "cuahang34@gmail.com",
];
function AddBill() {
  const [token, setToken] = React.useState("");
  const [email, setEmail] = React.useState(emailList[0]);
  const [password, setPassword] = React.useState("123456789");
  const [customerID, setCustomerID] = React.useState(null);
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [customer, setCustomer] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [selectedService, setSelectedService] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [listServices, setListServices] = React.useState([]);
  const [date, setDate] = React.useState(new Date().getDate())
  const [coordinateText, setCoordinateText] = React.useState("");
  const [total_cost, setTotal_cost] = React.useState(0);
  const login = () => {
    setLoading(true);
    axios
      .post("http://34.72.53.26:8080/api/store/login", {
        email,
        password,
      })
      .then((res) => {
        loadServices(res.data.admin_id);
        loadBill(res.data.admin_id)
        setLoading(false);
        setName(res.data.admin_name);
        setToken(res.data.admin_token);
        setCustomerID(res.data.admin_id);
      })
      .catch((err) => {
        alert("Đăng nhập thất bại");
        setName(null);
        setLoading(false);
      });
  };


  React.useEffect(() => {
    loadCustomer();
  }, []);

  const loadBill = (store_id) => {
      axios.get(`http://34.72.53.26:8080/api/data/bill/${store_id}`)
      .then(resp=>console.log(resp.data))
  }

  const loadCustomer = () => {
    setLoading(true);
    axios
      .get("http://34.72.53.26:8080/api/data/users")
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const loadServices = (store_id) => {
    if (store_id) {
      axios
        .get("http://34.72.53.26:8080/api/service/store/" + store_id)
        .then((resp) => {
          setServices(resp.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const randomDate = () => {
    setDate(Math.floor(Math.random() * Math.floor(7))+ new Date().getDate())
  }

  const makeBill = () => {
  //  setLoadingPage(true);
    let services_temp = [];
    let total_cost =0;
    for(let i=0;i<listServices.length;i++){
      total_cost += listServices[i].price * listServices[i].quantity;
      services_temp.push({
        service_id: listServices[i].service_id,
        quantity: listServices[i].quantity
      })
    }
    let newDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${date}`
    newDate = new Date(newDate).toISOString();

    const bill ={
      customer_id: selectedCustomer._id,
      total_cost,
      services:services_temp,
      timestamp: newDate,
      coordinate: {
        lat: parseFloat(coordinateText.split(",")[0]),
        lng: parseFloat(coordinateText.split(",")[1])
      }
    }
    axios.post('http://34.72.53.26:8080/api/bill',bill,{
        headers: {
            "authorization":`Bearer ${token}`
        }
    })
    .then(reslt=> {
        alert("ok")
        loadBill(customerID) //customerID la store_id lam bieng sua=))
    })
    .catch(err=>console.log(err));
    console.log(bill)
  };

  const handleSelectService = (e) => {
    setSelectedService(e);
    let newArray = [...listServices];
    let index = newArray.findIndex((element) => {
      return element.service_id === e._id;
    });
    if (index >= 0) {
      newArray[index].quantity += 1;
    } else {
      newArray.push({
        service_id: e._id,
        quantity: 1,
        name: e.name,
        price: e.price
      });
    }
    let total=0;
    for (const e of newArray){
      total+= (e.price * e.quantity)
    }
    setTotal_cost(total)
    setListServices(newArray);
  };

  const handleClickDelete = (service_id) => {
    let newArray = [...listServices];
    let index = newArray.findIndex((element) => {
      return element.service_id === service_id;
    });
    newArray.splice(index, 1);
    let total=0;
    for (const e of newArray){
      total+= (e.price * e.quantity)
    }
    setTotal_cost(total)
    setListServices(newArray);
  }

  return (
    <div className="App">
      {loading && <LinearProgress color="secondary" />}
      <Grid container>
        <Grid item md={3}>
          <div style={{ height: "900px", overflow: "scroll" }}>
            <h3>Danh sách khách hàng</h3>
            <List component="nav" aria-label="main mailbox folders">
              {customer.map((e) => {
                return (
                  <ListItem
                    style={{
                      backgroundColor:
                        selectedCustomer && selectedCustomer._id === e._id
                          ? "green"
                          : "#ddd",
                      marginTop: "4px",
                    }}
                    key={e._id}
                    button
                    onClick={() => setSelectedCustomer({ ...e })}
                  >
                    <ListItemText
                      style={{
                        color:
                          selectedCustomer && selectedCustomer._id === e._id
                            ? "white"
                            : "black",
                      }}
                      primary={e.name}
                      secondary={e.address}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>
        <Grid item md={3}>
          <h3>Danh sách dịch vụ</h3>
          <List component="nav" aria-label="main mailbox folders">
            {services.map((e) => {
              return (
                <ListItem
                  style={{
                    backgroundColor:
                      selectedService && selectedService._id === e._id
                        ? "green"
                        : "#ddd",
                    marginTop: "4px",
                  }}
                  key={e._id}
                  button
                  onClick={() => handleSelectService({ ...e })}
                >
                  <ListItemText
                    style={{
                      color:
                        selectedService && selectedService._id === e._id
                          ? "white"
                          : "black",
                    }}
                    primary={e.name}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={5} style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "8px",
              marginLeft: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "300px", height: "100%" }}
              >
                {emailList.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginLeft: "8px" }}
                label="Password"
              />
              <Button variant="contained" color="primary" onClick={login}>
                Đăng nhập
              </Button>
            </div>
        
            <div style={{ marginTop: "8px" }}>
              <h3>Thông tin cửa hàng</h3>
              Tên: {name && name} - {customerID}
            </div>
            <div style={{ marginTop: "8px" }}>
              <h3>Thông tin khách hàng</h3>
              Tên: {selectedCustomer && selectedCustomer.name}
            </div>
            <div style={{ marginTop: "8px" }}>
              <h3>Tọa độ</h3>
              <TextField value={coordinateText} onChange={e=>setCoordinateText(e.target.value)} />
            </div>
          
            <div style={{ marginTop: "8px" }}>
              Ngày: {`${date}-${new Date().getMonth()+1}-${new Date().getFullYear()}`} 
            </div>
            <div style={{ marginTop: "8px" }}>
                <Button variant="contained" onClick={randomDate}>Random</Button>{" "}
                {" "}<Button variant="contained" color="primary" onClick={makeBill}>ADD</Button>
            </div>
            <div style={{ marginTop: "8px" }}>
              <h3>Thông tin Dịch vụ</h3>
              <ul>
                {listServices.map((e) => (
                  <li style={{listStyleType:"none"}} key={e.service_id}>
                    <IconButton onClick={()=>handleClickDelete(e.service_id)}>
                        <CancelIcon />
                    </IconButton>{" "}
                    {e.name + " - số lượng: " + e.quantity + " " + " - giá: "+ e.price}{" "}
                  </li>
                ))}
                <li>
                  <NumberFormat displayType={'text'} value={total_cost} suffix={" đ "} thousandSeparator={true} renderText={value=> <div>Tổng tiền:  <span style={{fontWeight:"bold", color:"red"}}>{value}</span></div>} />
                </li>
              </ul>
            </div>
            <div style={{ marginTop: "8px", height: "200px" }}></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddBill;
