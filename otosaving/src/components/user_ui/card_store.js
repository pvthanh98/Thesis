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
import Rating from '../../components/user_ui/rating';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 200,
    },
  });
export default (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={server+"images/"+props.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               {props.address}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Rating star={props.star} align="center" />
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link className="ml-2" to= {`/store/id/${props._id}`}>Learn more</Link>
          </CardActions>
        </Card>
      );
}

