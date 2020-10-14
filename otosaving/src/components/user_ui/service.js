import React from "react";
import { Row, Col, Container } from "reactstrap";
import Carousel from "./carousel_for_service";
import Medias from "./media_service";
import Card from "./card";
import { connect } from "react-redux";
const Service = (props) => {
  const serviceToMedia = () => {
    return (
      props.outStandingService &&
      props.outStandingService.map((service) => {
        return (
          <Medias
            key={service._id}
            name={service.name}
            description={service.description}
            image={service.image}
            price={service.price}
            id={service._id}
            store_name={service.store_id.name}
          />
        );
      })
    );
  };

  const serviceToItem = () => {
    return (
      props.services &&
      props.services.map((service) => {
        console.log(service.rating.total)
        return (
          <Col md="3" className="pading-custom-8 mt-3" key={service._id}>
            <Card
              id={service._id}
              name={service.name}
              description={service.description}
              image={service.image}
              store={service.store_id}
              star={service.rating.total}
              price={service.price}
              timestamp={service.timestamp}
            />
          </Col>
        );
      })
    );
  };
  return (
    <Row className="mt-2">
      <Col md="12" className="mt-3">
        <Row className="pb-5">
          <Col md="8">
            <Carousel />
          </Col>
          <Col md="4">
            <h4 className="mb-3">Dịch vụ nỗi bật</h4>
            <hr />
            {serviceToMedia()}
          </Col>
          <Col md="12">
            <h3>Service</h3>
            <Row>
              {serviceToItem()}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const mapProp = (state) => ({
  services: state.services,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapProp, mapDispatch)(Service);
