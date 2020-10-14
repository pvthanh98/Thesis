import React from "react";
import { Row, Col } from "reactstrap";
import CardItem from './card_store';
import Icon from "./icon";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function (props) {
  const stores = useSelector(state => state.stores)
  const storeToCard = () => {
    return stores && stores.map(store=>{
      return <Col md="3" className="mt-3" key={store._id}>
                <Link to={"/store/id/"+store._id} style={{ color: "black", textDecoration: "none" }}>
                  <CardItem 
                    name={store.name}
                    description={store.description}
                    image={store.image}
                    address={store.address}
                    star={store.rating.total}
                  />
                </Link>
              </Col>     
    })
  }
  return (
    <Row className="mt-2">
      <Col md="12" style={{textAlign:"center"}}>
        <h3 className="sansserif mt-2">
          <Icon name="car-service.svg" /> 
          <div className="mt-2">
            CỬA HÀNG
          </div>
        </h3>
      </Col>
      <Col md="12" className="mt-3">
        <Row className="pb-5">
          {storeToCard()}
        </Row>
      </Col>
    </Row>
  );
}
