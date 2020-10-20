import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from "components/Grid/GridItem.js";
import {Link} from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
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
export default (props) => {
    const classes = useStyles();
    console.log(props.match)
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link 
                    to="/admin/provisional_bill/" 
                        style={{color:"black"}}
                        className={props.match.url==="/admin/provisional_bill/" ? classes.linkCustom : ""}
                    >
                        <ListIcon />
                        List
                    </Link>
                    <Link
                        to="/admin/provisional_bill/add"
                        style={{color:"black"}}
                        className={props.match.url==="/admin/provisional_bill/add" ? classes.linkCustom : ""}
                    >
                    <AddIcon className={classes.icon} />
                    Add
                    </Link>
                </Breadcrumbs>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            
            </GridItem>
        </GridContainer>
    )
}
