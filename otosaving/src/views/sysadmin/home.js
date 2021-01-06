import React from "react";
import { Grid, makeStyles, Typography, IconButton } from "@material-ui/core";
import Table from "../../components/systemadmin/table";
import axios from "../../service/axios_sys";
import MenuItem from "@material-ui/core/MenuItem";
import { Badge } from "reactstrap";
import Select from "@material-ui/core/Select";
import Pagination from "@material-ui/lab/Pagination";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
const useStyle = makeStyles({
  card: {
    backgroundColor: "#ffffff5c",
    padding: "8px",
  },
  table: {
    minWidth: 650,
  },
});
export default (props) => {
  const classes = useStyle();
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [total_page, setTotal_Page] = React.useState(1);
  const [stores, setStores] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [ratingLabel, setRatingLabel] = React.useState("asc");
  const [sortRatingValue, setSortRatingValue] = React.useState(0);
  const [sortActive, setSortActive] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(0);
  };

  React.useEffect(() => {
    loadStores(page, sortActive, sortRatingValue);
  }, [page]);

  const handleRefresh = () => {
    loadStores(1,0,0);
    setPage(1);
    setSortActive(0);
    setSortRatingValue(0)
  }

  const sortRating = (label) => {
    const newstores = [...stores];
    if (label === "desc") {
      newstores.sort((a, b) => a.rating.total - b.rating.total);
      setRatingLabel("asc");
    } else {
      newstores.sort((a, b) => b.rating.total - a.rating.total);
      setRatingLabel("desc");
    }

    setStores(newstores);
  };

  const handleChangeSelect = (e) => {
    switch (e.target.name) {
      case "status": {
        setSortActive(e.target.value);
        setSortRatingValue(0);
        loadStores(page, e.target.value, 0);
        return;
      }
      case "rating": {
        setSortRatingValue(e.target.value);
        setSortActive(0);
        loadStores(page, 0, e.target.value);
        return;
      }
    }
  };

  const loadStores = (page, active, rating) => {
    setLoading(true);
    axios()
      .get(`/api/sys/stores/page/${page}/${active}/${rating}`)
      .then(({ data }) => {
        console.log(data);
        setStores(data.stores);
        setTotal_Page(data.total_page);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  ///api/store/search/:name
  const handleClickSearch = () => {
    setLoading(true);
    axios()
      .get(`api/store/search/${searchValue}`)
      .then(({ data }) => {
        console.log(data);
        setStores(data);
        setTotal_Page(1);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const activeStore = (store_id, actions) => {
    console.log(store_id, actions);
    axios()
      .put(`/api/sys/store`, {
        store_id,
        actions,
      })
      .then(() => {
        loadStores(page);
      })
      .catch((err) => console.log("err"));
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "8px" }}>
        {loading && <LinearProgress style={{ marginBottom: "8px" }} />}
        <Typography variant="h5">QUẢN LÍ CỬA HÀNG</Typography>
      </Grid>
      <Grid item className={classes.root} xs={12} sm={12} md={12}>
        <div className={classes.card}>
          <div style={{ display: "flex" }}>
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
            <div>
              <Badge color="success">Trạng thái</Badge>{" "}
            </div>
            <Select
              name="status"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sortActive}
              onChange={handleChangeSelect}
              style={{ marginRight: "36px", width: "200px" }}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={-1}>Kích hoạt</MenuItem>
              <MenuItem value={1}>Chờ kích hoạt</MenuItem>
            </Select>
            <div>
              <Badge color="primary">Đánh giá</Badge>{" "}
            </div>
            <Select
              name="rating"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sortRatingValue}
              onChange={handleChangeSelect}
              style={{ width: "200px" }}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={1}>Đánh giá tăng dần</MenuItem>
              <MenuItem value={-1}>Đánh giá giảm dần</MenuItem>
            </Select>
            <div style={{ marginLeft: "8px" }}>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm cửa hàng...."
                style={{ backgroundColor: "transparent", border: "none" }}
              />
              <IconButton onClick={handleClickSearch}>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <Table
            stores={stores}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            total_page={total_page}
            loading={loading}
            sortRating={sortRating}
            ratingLabel={ratingLabel}
            activeStore={activeStore}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              onChange={(e, value) => setPage(value)}
              count={total_page}
              page={page}
              color="primary"
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
