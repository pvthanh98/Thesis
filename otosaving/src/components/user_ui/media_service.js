import React from "react";
import { Media } from "reactstrap";
import {server} from '../../constant';
import { Link } from "react-router-dom";
import { Badge } from 'reactstrap';
export default (props) => {
  return (
    <Link className="link-media-service" to={"/service/"+props.id+"/"+props.name} style={{color:"black", textDecoration:"none"}}>
      <Media className="mb-3">
        <Media left href="#" className="mr-3">
          <img
            src={server + "images/" + props.image}
            style={{ borderRadius: "12px" }}
            height={props.imageSize ? props.imageSize : "80px"}
          />
        </Media>
        <Media body>
          <Media heading>
            {props.name}
            <Badge color="success" style={{fontSize:"0.8rem"}}> new</Badge>
          </Media>
          <div>Giá tham khảo: <b style={{color:"red"}}>{props.price}</b> VND </div>
          {props.description}
          <div style={{color:"#9a9a9a", fontStyle:"italic"}}>
            - by {props.store_name}
          </div>
        </Media>
      </Media>
    </Link>
  );
};
