import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import axios from "../../service/axios_sys";
import ListReport from "../../components/systemadmin/list_report";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { Badge } from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";
const useStyle = makeStyles({
  card: {
    backgroundColor: "#ffffff5c",
    padding: "8px",
  },
  listItem: {
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  listItemActive: {
    border: "2px solid #fff",
    paddingBottom: "16px",
    paddingTop: "16px",
    backgroundColor: "#ffffffbd",
    borderRadius: "12px",
    fontWeight: "bold",
  },
});
function Report(props) {
  const classes = useStyle();
  const [reports, setReports] = React.useState(null);
  const [stores, setStores] = React.useState(null);
  const [total_page, setTotal_Page] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [storeSelected, setStoreSelected] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("all"); // o means ALL,
  React.useEffect(() => {
    loadStore();
  }, []);

  React.useEffect(() => {
    loadReport(filter);
  }, [filter]);

  const loadReport = (state) => {
    axios()
      .get("/api/report/by/" + state)
      .then((resp) => {
        setReports(resp.data);
        console.log(resp.data);
      })
      .catch((err) => alert(err));
  };

  const handleClickAndLoad = (store) => {
    setStoreSelected(store);
    if(store) setFilter(store._id);
    else setFilter("all")
  };

  const loadStore = () => {
    axios()
      .get("/api/report/store")
      .then((resp) => {
        setStores(resp.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        <Typography variant="h5">BÁO CÁO VI PHẠM</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <div className={classes.card}>
          <Badge color="success">
            {storeSelected === null
              ? "Danh sách - Tất cả"
              : "Danh sách - " + storeSelected.name}
          </Badge>
          <ListReport reports={reports} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div className={classes.card}>
          <Typography variant="h5">CỬA HÀNG BÁO CÁO</Typography>
          <Badge color="success">danh sách</Badge>
          {loading && (
            <div style={{ textAlign: "center", marginTop: "4px" }}>
              <CircularProgress size={24} />
            </div>
          )}
          <div>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                onClick={() => handleClickAndLoad(null)}
                button
                className={
                  storeSelected  === null
                    ? classes.listItemActive
                    : classes.listItem
                }
              >
                <ListItemIcon>
                  <AssignmentIndIcon
                    style={{
                      color:
                        storeSelected === null
                          ? "black"
                          : "black",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color:
                      storeSelected === null
                        ? "black"
                        : "black",
                  }}
                  primary={"Tất cả"}
                />
                <ListItemIcon>
                  <Badge color={"danger"}>{"unknow"}</Badge>
                </ListItemIcon>
              </ListItem>
              {stores &&
                stores.map((e) => (
                  <ListItem
                    onClick={() => handleClickAndLoad(e)}
                    key={e._id}
                    button
                    className={
                      storeSelected && storeSelected._id === e._id
                        ? classes.listItemActive
                        : classes.listItem
                    }
                  >
                    <ListItemIcon>
                      <AssignmentIndIcon
                        style={{
                          color:
                            storeSelected && storeSelected._id === e._id
                              ? "black"
                              : "black",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{
                        color:
                          storeSelected && storeSelected._id === e._id
                            ? "black"
                            : "black",
                      }}
                      primary={e.name}
                    />
                    <ListItemIcon>
                      <Badge color={"danger"}>{e.report_count}</Badge>
                    </ListItemIcon>
                  </ListItem>
                ))}
            </List>
            <Pagination
              page={currentPage}
              onChange={(e, page) => {
                setCurrentPage(page);
              }}
              count={total_page}
              color="primary"
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Report;
