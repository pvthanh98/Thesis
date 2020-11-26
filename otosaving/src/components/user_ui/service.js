import React from "react";
import { Row, Col, Container } from "reactstrap";
import Carousel from "./carousel_for_service";
import Medias from "./media_service";
import Card from "./card";
import { connect } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import Icon from "./icon";
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
      <Col md="12" style={{textAlign:"center"}}>
        <h3 className="sansserif mt-2">
          <Icon name="car-service.svg" /> 
          <div className="mt-2">
            DỊCH VỤ
          </div>
        </h3>
      </Col>
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
            <Row>
              {serviceToItem()}
            </Row>
          </Col>
          <Col md="12">
            <div style={{justifyContent:"center", display:"flex",alignItems:"center"}} >
              <Pagination 
                count={10} 
                color="primary" 
                count={props.total_page} 
                page={props.page} 
                onChange={(e, page)=>props.setPage(page)}
              />
            </div>
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
