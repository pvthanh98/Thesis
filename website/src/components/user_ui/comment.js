import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from 'material-ui-rating';
import formatDate from '../../service/formatDate';
import {server} from '../../constant'
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
export default function (props) {
    const classes = useStyles();
    return (
        <Grid item md={12} className="mt-2">
            <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                <Avatar size="large" src={`${server}/images/${props.customer_id ? props.customer_id.image: ""}`}/>
                <div style={{display:"flex",justifyContent:"center", flexDirection:"column"}}>
                    <div style={{marginLeft:"8px", fontWeight:"bold"}}>{props.customer_id ? props.customer_id.name :  "Ẩn danh"}</div>
                    <div style={{fontSize:"12px",marginLeft:"8px"}}>{formatDate(props.timestamp)}</div>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <Rating style={{marginLeft:"0px"}} value={props.rating} size="small"/>
            </div>
            <Typography align="justify" style={{backgroundColor:"#d6d6d6", padding:"8px", borderRadius:"12px", marginTop:"8px"}}>
                {props.content}
            </Typography>
        </Grid>
    )
}