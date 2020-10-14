import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import Rating from "./rating";
import {server} from '../../constant';
export default function (props) {
  return (
   
      <Card className="p-2 custom-card mt-3" style={{minHeight:"500px"}}>
        <CardImg
          top
          width="100%"
          src={"http://localhost:8080/images/"+props.image}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>
            <h5>{props.name}</h5>
          </CardTitle>
          <hr />
          {props.store &&  <p><img width="30px" style={{borderRadius:"50%"}} src={server+"images/"+props.store.image} /> {props.store.name}</p>}
          {props.price && <p> Giá: <b style={{color:"red"}}>{props.price}</b></p>}
          {props.description && <p>{props.description}</p>}
          {props.address && <p>{props.address}</p>}
          <Rating star={props.star} />
        </CardBody>
      </Card>
    
  );
}
