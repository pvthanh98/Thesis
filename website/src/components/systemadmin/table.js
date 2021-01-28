import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import Loading from "../../components/user_ui/loading";
import { Button, makeStyles } from "@material-ui/core";
import Rating from "material-ui-rating";
const useStyle = makeStyles({
  card: {
    backgroundColor: "#ffffff5c",
    padding: "8px",
  },
  table: {
    minWidth: 650,
  },
});
function createData(id, name, phone, address, rating, active) {
  return { id, name, phone, address, rating, active };
}
export default (props) => {
  const classes = useStyle();
  const rows = props.stores
    ? props.stores.map((e) =>
        createData(e._id, e.name, e.phone, e.address, e.rating.total, e.active)
      )
    : [];
  
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              ACTIVE
              <TableSortLabel />{" "}
            </TableCell>
            <TableCell align="right">
              TÊN <TableSortLabel />{" "}
            </TableCell>
            <TableCell align="right">
              ĐIỆN THOẠI <TableSortLabel/>{" "}
            </TableCell>
            <TableCell align="right">
              ĐỊA CHỈ <TableSortLabel />{" "}
            </TableCell>
            <TableCell align="right">
              RATING <TableSortLabel direction={props.ratingLabel} onClick={()=>props.sortRating(props.ratingLabel)}  />{" "}
            </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                {row.active ? (
                  <img height="30px" src="/images/check.png" />
                ) : (
                  "Chờ kích hoạt"
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">
                <Rating value={row.rating} />
              </TableCell>
              <TableCell align="right">
                <Button 
                  variant="contained" 
                  color={row.active ?"default": "primary"}
                  onClick={()=>props.activeStore(row.id,!row.active)}
                >
                  {row.active ? "Hủy kích hoạt" : "Kích hoạt"}
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
