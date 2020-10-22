import React,{useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { Input, FormHelperText, Grid, Button, Icon} from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from '@material-ui/core/CircularProgress';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import axios from '../../service/axios';
import FormData from 'form-data';
import { Alert } from 'reactstrap';
import Create from '@material-ui/icons/Create';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
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
}

const useStyles = makeStyles(styles);

export default function ServiceModify(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [file, setFile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [caterorySelected, setCategorySelected] = React.useState("");
  const handleFormInput = e => {
    const {value} = e.target;
    switch(e.target.name){ 
      case "name" : {
        setName(value)
        return;
      }
      case "description" : {
        setDescription(value);
        return;
      }
      case "file" : {
        setFile(e.target.files[0])
        return;
      }
    }
  }
  const loadCategories = () =>{
    axios().get("/api/category")
    .then(({data})=> {setCategories(data);setCategorySelected(data[0]._id)})
    .catch(err=>console.log(err))
  }

  const onFormSubmit = () => {
    setLoading(true);
    let data = new FormData();
    data.append('id',props.match.params.id);
    data.append('name',name);
    data.append('description', description);
    data.append('quantity', quantity);
    data.append('price', price);
    data.append('file', file);
    data.append('detail', detail);
    data.append("category", caterorySelected);
    axios()
    .put('/api/service',data)
    .then(res => {
      setLoading(false);
      setIsSuccess(true);
      setErr("")
    })
    .catch(err => {
      console.log('err')
      setLoading(false);
      setIsSuccess(false);
      setErr("Thất bại");
    })
  }

  useEffect(()=>{
    loadCategories();
    loadServiceToModify()
    return ()=>{
      setLoading(false);
      setIsSuccess(false);
      setErr("");
    }
  },[])

  const loadServiceToModify = () => {
      if(props.match.params && props.match.params.id){
        axios().get(`/api/service/id/${props.match.params.id}`)
        .then(({data})=>{
          console.log(data)
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setQuantity(data.quantity);
          setDetail(data.detail);
          setCategorySelected(data.category._id);
        })
        .catch(err=>console.log(err))
      }
  }



  const resetInput = () => {
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setDetail("");
  }
  const renderCategories = () => categories.map(category => <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb">
          <Link to="/admin/service/" style={{color:"black"}}>
            <ListIcon />
            List
          </Link>
          <Link
            to="/admin/service/add"
            style={{color:"black"}}
          >
            <AddIcon className={classes.icon} />
            Add
          </Link>
          <Typography color="textPrimary" className={classes.linkCustom}>
            <Create className={classes.icon} />
              Modify
          </Typography>
        </Breadcrumbs>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>  
              <Grid container>
                <Grid item md={4} className={classes.root}>
                  <div>Name</div>
                  <Input fullWidth value={name} aria-describedby="my-helper-text" name="name" onChange={handleFormInput} />
                  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </Grid>
                <Grid item md={8} className={classes.root}>
                  <div >Description</div>
                  <Input fullWidth={true} value={description} name="description" onChange={handleFormInput} />
                </Grid>
                <Grid item md={4} className={classes.root}>
                  <div >Price</div>
                  <CurrencyTextField
                      fullWidth
                      variant="standard"
                      value={price}
                      currencySymbol="VNĐ"
                      outputFormat="string"
                      onChange={(event, value)=> setPrice(value)}
                  />
                  {/* <Input type="number" name="price" onChange={handleFormInput} fullWidth={true} /> */}
                </Grid>
                <Grid item md={4} className={classes.root}>
                  <div>Quantity</div>
                  <CurrencyTextField
                      fullWidth
                      variant="standard"
                      value={quantity}
                      currencySymbol=""
                      outputFormat="string"
                      onChange={(event, value)=> setQuantity(value)}
                  />
                </Grid>
                <Grid item md={4} className={classes.root}>
                  <div>Ảnh đại diện</div>
                  <Input type="file" name="file" onChange={handleFormInput} />
                </Grid>
                <Grid item md={4} className={classes.root}>
                  <div>Categories</div>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    onChange={(e)=>setCategorySelected(e.target.value)}
                    value={caterorySelected}
                    fullWidth
                    name="category"
                  >
                    {renderCategories()}
                  </Select>
                </Grid>
                <Grid item md={12} className={classes.root}>
                  <div className="mb-3">Detail</div>
                  <CKEditor
                    editor={ ClassicEditor }
                    data={detail}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDetail(data);
                    } }
                  />
                </Grid>
                <Grid item md={12} className={classes.controllButton}>
                   { isSuccess && <Alert color="success" style={{textAlign:"center"}}>Thành công</Alert>}
                    { err!=="" && <Alert color="danger" style={{textAlign:"center"}}>{err}</Alert>}
                   {loading && <Loading className="mr-4" />}
                    <Button onClick={onFormSubmit} variant="contained" className="mr-2" color="primary">
                      <Icon>save</Icon>
                      {" "} Save
                    </Button>
                    <Button onClick={resetInput} type="submit" variant="contained">
                      <Icon>cancel</Icon>
                      Reset
                    </Button>
                </Grid>
              </Grid>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
