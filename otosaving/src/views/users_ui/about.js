import React from "react";
import Footer from "../../components/user_ui/footer";
import Navbar from "../../components/user_ui/navbar";
import { Badge } from "reactstrap";
import { Grid, Container, Typography } from "@material-ui/core";
import axios from "../../service/axios_user";
export default function (props) {
  const [detail, setDetail] = React.useState("");
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [timestamp, setTimestamp] = React.useState("");
  React.useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    axios()
      .get("/api/sys/about")
      .then((resp) => {
        setName(resp.data.name);
        setId(resp.data._id);
        setDetail(resp.data.about);
        setTimestamp(resp.data.timestamp);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item style={{ minHeight: "500px", padding: "8px" }}>
            <Typography variant="h4" style={{ fontFamily: "cursive" }}>
              {name}
            </Typography>
            <Badge color="primary">{timestamp}</Badge>{" "}
            <Badge color="danger">System Admin</Badge>
            <Typography variant="h6" style={{ marginTop: "4px" }}>
              Trụ sở hệ thống
            </Typography>
            <img src="/images/apple-park.jpg" width="100%" />
            <div
              className="service_detail mt-3 text-justify"
              dangerouslySetInnerHTML={{ __html: detail }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
