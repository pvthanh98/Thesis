import React from "react";
import { Grid, Typography } from "@material-ui/core";
import axios from "../../service/axios_sys";

export default function (props) {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        <Typography variant="h5">GIỚI THIỆU CỬA HÀNG</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        
      </Grid>
    </Grid>
  );
}
