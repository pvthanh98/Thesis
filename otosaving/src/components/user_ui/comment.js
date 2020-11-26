import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from 'material-ui-rating';
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
        <Grid item md={12}>
            <div style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                <Avatar size="large"/>
                <div style={{display:"flex",justifyContent:"center", flexDirection:"column"}}>
                    <div style={{marginLeft:"8px", fontWeight:"bold"}}>Phan Văn Thành</div>
                    <div style={{fontSize:"12px",marginLeft:"8px"}}>22-08-2020</div>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <Rating style={{marginLeft:"0px"}} value={4} size="small"/>
            </div>
            <Typography align="justify" style={{backgroundColor:"#d6d6d6", padding:"8px", borderRadius:"12px", marginTop:"8px"}}>
                Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopenerUsing target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopenerUsing target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopenerUsing target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopenerUsing target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopenerUsing target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener
            </Typography>
        </Grid>
    )
}