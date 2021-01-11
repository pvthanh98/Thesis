import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { server } from "../../constant";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Input, Button } from "@material-ui/core";
import axios from "../../service/axios";
import Alert from "@material-ui/lab/Alert";
import Table from "components/Table/Table.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import NumberFormat from "react-number-format";
import {
  Search,
  AccountBox as AccountBoxIcon,
  Room as RoomIcon,
  PhoneAndroid,
} from "@material-ui/icons";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  inputSearch: {
    width: "75%",
    marginRight: "4px",
  },
  buttonSearch: {
    borderRadius: "12px",
    width: "15%",
  },
  infoItem: {
    padding: "8px",
  },
  root: {
    padding: "8px",
  },
  controllButton: {
    textAlign: "right",
    padding: "8px",
  },
  input: {
    textAlign: "right",
  },
  linkCustom: {
    borderBottom: "1px solid #d6d6d6",
    marginTop: "4px",
  },
};

const useStyles = makeStyles(styles);

export default function ProvisionalBill(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [isMadeBill, setIsMadeBill] = React.useState(false);
  const [inputSearchService, setInputNameService] = React.useState("");
  const [resultService, setResultService] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [billTemp, setBillTemp] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [coordinate, setCoordinate] = React.useState("");
  const [rescue_idState, setRescue_idState] = React.useState("");
  //////// for submit
  const [customerID, setCustomerID] = React.useState(null);
  useEffect(() => {
    const { customer_id, coordinate, rescue_id } = props.match.params;
    console.log(rescue_id);
    if (customer_id !== "init") setInputSearch(customer_id);
    if (coordinate !== "init") setCoordinate(coordinate);
    if (rescue_id !== "init") setRescue_idState(rescue_id);
    return function () {
      setErr(false);
    };
  }, []);

  const searchCustomer = () => {
    setCustomerID(inputSearch);
    axios()
      .get(`/api/store/search_customer/${inputSearch}`)
      .then(({ data }) => {
        setName(data.name);
        setImage(data.image);
        setAddress(data.address);
        setPhone(data.phone);
        setErr(false);
      })
      .catch((err) => setErr(true));
  };

  const handleChangeService = (e) => {
    setLoading(true);
    setInputNameService(e.target.value);
    if (e.target.value != "") {
      axios()
        .get(`/api/service/search/${e.target.value}`)
        .then(({ data }) => {
          setResultService(data);
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    }
  };

  const addToBill = (id, name, price) => {
    let bills = [...billTemp];
    let index = bills.findIndex((bill) => bill.id === id);
    if (index >= 0) {
      bills[index].quantity += 1;
    } else
      bills.push({
        id,
        name,
        price,
        quantity: 1,
      });
    setBillTemp(bills);
  };
  const deleteItem = (index) => {
    let bills = [...billTemp];
    bills.splice(index, 1);
    setBillTemp(bills);
  };

  const renderIconButton = (index) => {
    return (
      <IconButton
        onClick={() => deleteItem(index)}
        aria-label="delete"
        color="primary"
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const renderList = () => {
    return resultService.map((service) => {
      return (
        <ListItem key={service._id}>
          <ListItemAvatar>
            <Avatar src={`${server}/images/${service.image}`}>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={service.name}
            secondary={`${service.price} VND`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() =>
                addToBill(service._id, service.name, service.price)
              }
            >
              <AddCircle />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  const renderBillTemp = () => {
    return billTemp.map((bill, index) => {
      return [
        index + 1,
        bill.name,
        bill.price,
        bill.quantity,
        parseFloat(bill.price) * bill.quantity,
        renderIconButton(index),
      ];
    });
  };

  const calculateTotalCost = () => {
    let total = 0;
    billTemp.forEach((bill) => {
      total += parseFloat(bill.price) * bill.quantity;
    });
    return total;
  };

  const makeBill = () => {
    setLoadingPage(true);
    let services = [];
    let total_cost = 0;
    for (let i = 0; i < billTemp.length; i++) {
      total_cost += billTemp[i].price * billTemp[i].quantity;
      services.push({
        service_id: billTemp[i].id,
        quantity: billTemp[i].quantity,
      });
    }
    const bill = {
      customer_id: customerID,
      total_cost,
      services,
    };
    console.log(bill)
    if(rescue_idState!="init") bill.rescue_id = rescue_idState;

    if (coordinate !== "") {
      bill.coordinate = {
        lat: JSON.parse(coordinate.split(",")[0]),
        lng: JSON.parse(coordinate.split(",")[1]),
      };
    }

    axios()
      .post("/api/bill", bill)
      .then((reslt) => {
        setAndDelayLoading();
      })
      .catch((err) => console.log(err));
  };

  const resetData = () => {
    setName("");
    setImage("");
    setAddress("");
    setPhone("");
    setInputNameService("");
    setInputSearch("");
    setBillTemp([]);
    setIsMadeBill(false);
  };
  const setAndDelayLoading = (data) => {
    var timeout = setTimeout(function () {
      setLoadingPage(false);
      setIsSuccess(true);
      resetData();
      clearTimeout(timeout);
    }, 1000);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/admin/bill/" style={{ color: "black" }}>
            <ListIcon />
            Danh Sách
          </Link>
          <Link
            to="/admin/bill/add/init/init/init"
            style={{ color: "black" }}
            className={classes.linkCustom}
          >
            <AddIcon className={classes.icon} />
            Thêm
          </Link>
        </Breadcrumbs>
      </GridItem>
      {loadingPage && (
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ padding: "8px 0px 0px 0px" }}>
            <LinearProgress color="primary" />
          </div>
        </GridItem>
      )}
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Hóa Đơn</h4>
            {/* <p className={classes.cardCategoryWhite}>
              
            </p> */}
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div>ID Khách hàng</div>
                <Input
                  type="text"
                  className={classes.inputSearch}
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <Button
                  onClick={searchCustomer}
                  className={classes.buttonSearch}
                  color="primary"
                >
                  <Search />
                </Button>
                {err && (
                  <Alert className="mt-3" severity="error">
                    Customer not found
                  </Alert>
                )}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thông Tin Khách Hàng</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.infoItem}>
                  <AccountBoxIcon /> {name}
                </div>
                <div className={classes.infoItem}>
                  <RoomIcon /> {address}
                </div>
                <div className={classes.infoItem}>
                  <PhoneAndroid /> {phone}
                </div>
              </GridItem>
              <GridItem style={{ textAlign: "center" }} xs={12} sm={12} md={4}>
                {image && (
                  <img
                    src={`${server}/images/${image}`}
                    style={{ height: "120px", borderRadius: "50%" }}
                  />
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <Button
                    color={!isMadeBill ? "primary" : "secondary"}
                    fullWidth
                    disabled={name === "" ? true : false}
                    variant="contained"
                    onClick={() => setIsMadeBill(!isMadeBill)}
                  >
                    {!isMadeBill ? "Lập hóa đơn " : "Hủy"}
                  </Button>
                </div>
                {isSuccess && (
                  <Alert className="mt-3" severity="success">
                    Thành công
                  </Alert>
                )}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      {isMadeBill && (
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Chi Tiết Hóa Đơn</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["ID", "Tên", "Giá", "Số lượng", "Tổng tiền", ""]}
                    tableData={renderBillTemp()}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "right" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <NumberFormat
                      value={calculateTotalCost()}
                      displayType="text"
                      thousandSeparator
                      suffix={" đ "}
                      renderText={(value) => (
                        <div>
                          Tổng Tiền: <b style={{ color: "red" }}>{value}</b>
                        </div>
                      )}
                    />

                    <Button
                      disabled={billTemp.length <= 0 ? true : false}
                      className="mt-3"
                      variant="contained"
                      color="primary"
                      onClick={makeBill}
                    >
                      Yêu Cầu Xác Nhận
                    </Button>
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      )}
      {isMadeBill && (
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thêm mới</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div>Nhập tên sản phẩm</div>
                  <Input
                    type="text"
                    fullWidth
                    placeholder="Tên sản phẩm"
                    value={inputSearchService}
                    onChange={handleChangeService}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <List>
                {loading && <LinearProgress color="secondary" />}
                {renderList()}
              </List>
            </CardBody>
          </Card>
        </GridItem>
      )}
    </GridContainer>
  );
}
