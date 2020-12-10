import React from "react";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "../../service/axios_sys";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateIcon from "@material-ui/icons/Create";
import { Badge } from "reactstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  inputContainer: {
    marginTop: "8px",
    display: "flex",
  },
}));
export default function (props) {
  const classes = useStyles();
  const [cities, setCities] = React.useState(null);
  const [cityName, setCityName] = React.useState("");
  const [cityNameModify, setCityNameModify] = React.useState(null);
  const [selectedID, setSelectedID] = React.useState(null);
  const [isSucces, setIsSuccess] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [isModify, setIsModify] = React.useState(false);
  React.useEffect(() => {
    loadCity();
  }, []);
  const loadCity = () => {
    setIsloading(true);
    axios()
      .get("/api/city")
      .then(({ data }) => {
        setCities(data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const postCity = () => {
    setCityName("");
    axios()
      .post("/api/city", { name: cityName })
      .then(() => {
        setIsSuccess(true);
        loadCity();
      })
      .catch((err) => alert("error"));
  };
  const modifyCity = () => {
    setCityName("");
    axios()
      .put("/api/city", {id:selectedID, name: cityNameModify })
      .then(() => {
        setIsSuccess(true);
        loadCity();
      })
      .catch((err) => alert("error"));
  };

  const handleModifyClick = (id,name) => {
    setIsModify(true);
    setSelectedID(id);
    setCityNameModify(name);
  }
  const deleteCity = (id) => {
    axios()
      .post("/api/city/delete", { id })
      .then(() => {
        loadCity();
      })
      .catch((err) => alert("error"));
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        style={{ margin: "0px", padding: "0px" }}
      >
        {isLoading && <LinearProgress />}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" style={{ padding: "8px" }}>
          Quản lí thành phố
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div
          style={{
            backgroundColor: "#ffffff5c",
            padding: "8px",
          }}
        >
          <Typography
            variant="h7"
            style={{ padding: "8px", fontWeight: "bold" }}
          >
            Thêm thành phố
          </Typography>
          <div className={classes.inputContainer}>
            <TextField
              required
              label="Tên thành phố"
              value={cityName}
              variant="outlined"
              onChange={(e) => setCityName(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              style={{
                marginLeft: "4px",
                width: "100px",
              }}
              color="primary"
              onClick={postCity}
            >
              {"Thêm"}
            </Button>
          </div>
        </div>
        {isModify && (
          <div
            style={{
              backgroundColor: "#ffffff5c",
              padding: "8px",
            }}
          >
            <Typography
              variant="h7"
              style={{ padding: "8px", fontWeight: "bold" }}
            >
              Chỉnh sửa
            </Typography>
            <div>
              <TextField
                required
                value={cityNameModify}
                variant="outlined"
                onChange={(e) => setCityNameModify(e.target.value)}
                fullWidth
              />
              <div style={{ textAlign: "right", marginTop: "4px" }}>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "4px",
                    width: "100px",
                  }}
                  onClick={()=>setIsModify(false)}
                >
                  {"HỦY"}
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "4px",
                    width: "100px",
                  }}
                  color="primary"
                  onClick={modifyCity}
                >
                  {"LƯU"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <div
          style={{
            backgroundColor: "#ffffff5c",
            padding: "8px",
          }}
        >
          <Typography
            variant="h7"
            style={{ padding: "8px", fontWeight: "bold" }}
          >
            Danh sách
          </Typography>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">STT</TableCell>
                  <TableCell align="right">Tên thành phố</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities &&
                  cities.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">
                        <Badge color="success">{row.name}</Badge>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={()=>handleModifyClick(row._id, row.name)}>
                          <CreateIcon style={{ color: "#242471" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <CancelIcon
                            onClick={() => deleteCity(row._id)}
                            style={{ color: "#8a2c2c" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}
