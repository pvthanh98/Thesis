import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {server} from '../../constant';
import {Redirect, Link} from 'react-router-dom';
import Rating from 'material-ui-rating'
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
export default (props) => {
    const classes = useStyles();
    const [makeRedirectTo, setMakeRedirectTo] = React.useState(null);
    if(makeRedirectTo) return <Redirect to={`/service/${props.service._id}/${props.service.name}`} />
    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={server+"images/"+props.service.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.service.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Giá <b style={{color:"red"}}>{props.service.price}</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.service.description}
              </Typography>
           
              <Rating value={props.service.rating.total} align="center" />
            
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link className="ml-2" to= {`/service/${props.service._id}/${props.service.name}`}>Learn more</Link>
          </CardActions>
        </Card>
      );
}

