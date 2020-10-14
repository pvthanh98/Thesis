import React from "react";
import { Grid } from "@material-ui/core";
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
         <Grid item md={3}>
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
         </Grid>
        );
      })
    );
  };
  return (
    <Grid item container md={12} sm={12} xs={12} spacing={4} className="mt-1">
        <Grid item md={8} sm={12} xs={12}>
            <Carousel />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
            <h4 className="mb-3">Dịch vụ nỗi bật</h4>
            <hr />
            {serviceToMedia()}
        </Grid>
        <Grid item container md={12} sm={12} xs={12} spacing={4}>
          {serviceToItem()}
        </Grid>
    </Grid>
  );
};
const mapProp = (state) => ({
  services: state.services,
});

const mapDispatch = (dispatch) => ({});

export default connect(mapProp, mapDispatch)(Service);
