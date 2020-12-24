import React,{useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {server} from '../../constant';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Input } from "@material-ui/core";
import axios from '../../service/axios';
import Alert from '@material-ui/lab/Alert';
import Table from "components/Table/Table.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Link} from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import {Typography} from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import formatDate from '../../service/formatDate';

import {
    AccountBox as AccountBoxIcon, 
    Room as RoomIcon,
    PhoneAndroid
} from '@material-ui/icons';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  },
  inputSearch : {
    width:"75%",
    marginRight:"4px"
  },
  buttonSearch: {
      borderRadius:"12px",
      width:"15%"
  },
  infoItem: {
      padding: "8px"
  },
  root: {
    padding: "8px"
  },
  controllButton : {
    textAlign:"right",
    padding: "8px"
  },
  input :{
    textAlign:"right"
  },
  linkCustom: {
    borderBottom: "1px solid #d6d6d6",
    marginTop:"4px"
  }
};

const useStyles = makeStyles(styles);

export default function ProvisionalBill(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [err, setErr] =React.useState(false);
  const [inputSearchService, setInputNameService] = React.useState("")
  const [resultService, setResultService] = React.useState([])
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [billTemp, setBillTemp] = React.useState([]);  
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [date, setDate] = React.useState("");
  //////// for submit
  const [customerID, setCustomerID] = React.useState(null);
  useEffect(()=>{
      loadBillByID();
      return function(){
          setErr(false);
      }
  },[])

  const loadBillByID = () => {
    const {id} = props.match.params;
    axios().get(`/api/bill/id/${id}`)
    .then(({data})=>{
      setInputSearch(data._id); 
      setName(data.customer_id.name);
      setAddress(data.customer_id.address);
      setImage(data.customer_id.image)
      setPhone(data.customer_id.phone);
      setCustomerID(data.customer_id._id)
      setDate(formatDate(data.timestamp))

      let bill = [];
      data.services.forEach(service => bill.push({
        id:service.service_id._id,
        name:service.service_id.name,
        price: service.service_id.price,
        quantity:service.quantity
      }));
      setBillTemp(bill);
    })
  }


  const renderBillTemp = () => {
    return billTemp.map((bill, index)=>{
      return [index+1, bill.name, bill.price, bill.quantity, 
        parseFloat(bill.price) * bill.quantity
      ];
    })
  }
  const calculateTotalCost = () => {
    let totalCost = 0;
    billTemp.forEach(bill=>{
      totalCost+= (parseFloat(bill.price) * bill.quantity)
    })
    return totalCost;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/admin/bill/" style={{color:"black"}}>
            <ListIcon />
            Danh sách
          </Link>
          <Link
             to="/admin/bill/add/init/init"
            style={{color:"black"}}
          >
            <AddIcon className={classes.icon} />
            Thêm
          </Link>
          <Typography color="textPrimary" className={classes.linkCustom}>
            <Create className={classes.icon} />
              Chi tiết
          </Typography>
      </Breadcrumbs>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Hóa Đơn</h4>
            <p className={classes.cardCategoryWhite}>
              {date}
            </p>
          </CardHeader>
          <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <div>ID Khách hàng</div>
                        <Input 
                            type="text" 
                            fullWidth
                            disabled
                            value={inputSearch}
                        />
                      {err && <Alert className="mt-3" severity="error">Customer not found</Alert>}
                  </GridItem>
              </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thông tin khách hàng</h4>
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
                  <GridItem style={{textAlign:"center"}} xs={12} sm={12} md={4}>
                      { image && <img src={`${server}/images/${image}`} style={{height:"120px", borderRadius:"50%"}} />}
                  </GridItem>
              </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Chi tiết hóa đơn</h4>
          </CardHeader>
          <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "Tên", "Giá", "Số lượng", "Tổng tiền",""]}
                      tableData={renderBillTemp()}
                    />
                    <div style={{textAlign:"right"}}>Tổng tiền: <b>{calculateTotalCost()}</b></div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} style={{textAlign:"right"}}>
                    {loadingPage &&
                      <div style={{padding:"8px 0px 0px 0px"}}>
                        <LinearProgress color="primary" />
                      </div>
                    }
                    {isSuccess && <Alert className="mt-3" severity="success">success</Alert>}
                  </GridItem>
              </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
