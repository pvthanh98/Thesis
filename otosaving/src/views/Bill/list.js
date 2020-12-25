import React, { useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import axios from "service/axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReplayIcon from "@material-ui/icons/Replay";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutline";
import formatDate from "../../service/formatDate";
import NumberFormat from "react-number-format";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Badge} from 'reactstrap';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  { id: "Date", numeric: true, disablePadding: false, label: "Date" },
  { id: "Customer", numeric: true, disablePadding: false, label: "Customer" },
  { id: "Total", numeric: true, disablePadding: false, label: "Total" },
  { id: "Quantity", numeric: true, disablePadding: false, label: "Quantity" },
  { id: "Paid", numeric: true, disablePadding: false, label: "Paid" },
  { id: "Confirm", numeric: true, disablePadding: false, label: "Confirm" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  linkCustom: {
    borderBottom: "1px solid #d6d6d6",
    marginTop: "4px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const checkConfirm = () => {
    let confirm = true;
    let billFilter = props.bills.filter(
      (item) => item._id === props.selected[props.selected.length - 1]
    );

    billFilter.forEach((item) => {
      console.log("Giá trị của confirm ITEM ", item.confirm);
      if (!item.confirm) confirm = false;
      return;
    });
    console.log("Giá trị của confirm ", confirm);
    return confirm;
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Hóa Đơn{" "}
          <IconButton onClick={props.reloadBill}>
            <ReplayIcon />
          </IconButton>
        </Typography>
      )}

      {numSelected >= 1 && checkConfirm() && (
        <Tooltip title="confirm payment">
          <IconButton
            onClick={props.confirmPayment}
            aria-label="confirm payment"
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected === 1 && (
        <Tooltip title="modify">
          <IconButton
            onClick={() => props.setToModifyPage(true)}
            aria-label="modify"
          >
            <BorderColorIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={props.deleteBill} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div style={{display:"flex", flexDirection:"row"}}>
          <div style={{width:"80px",display:"flex", alignItems:"center"}}>
            <Badge color="primary">Thanh toán</Badge>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.paidState}
            onChange={e=>{
              props.setPaidState(e.target.value);
              props.setConfirmState(2);
              props.reloadBill(2,e.target.value);
            }}
            style={{width:"200px"}}
          >
            <MenuItem value={2}>Tất cả</MenuItem>
            <MenuItem value={0}>Chưa thanh toán</MenuItem>
            <MenuItem value={1}>Đã thanh toán</MenuItem>
          </Select>
          <div style={{width:"80px",display:"flex", alignItems:"center"}}>
            <Badge color="success">Xác nhận</Badge>
          </div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={e=>{
              props.setConfirmState(e.target.value);
              props.setPaidState(2)
              props.reloadBill(e.target.value,2);
            }}
            value={props.confirmState}
            style={{width:"200px"}}
          >
            <MenuItem value={2}>Tất cả</MenuItem>
            <MenuItem value={0}>Chưa xác nhận</MenuItem>
            <MenuItem value={1}>Đã xác nhận</MenuItem>
          </Select>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  backgroundNone: { backgroundColor: "none" },
}));

const CustomAlert = (props) => {
  const classes = useStyles();
  return (
    <Alert className={classes.backgroundNone} severity={props.color}>
      {props.message}
    </Alert>
  );
};

const ProvisionalBillList = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [toModifyPage, setToModifyPage] = React.useState(false);
  const [paidState, setPaidState] = React.useState(2) // 2 means all, 0 no payment, 1 payment
  const [confirmState, setConfirmState] = React.useState(2) //2 means all,...
  const dispatch = useDispatch();

  const bills = useSelector((state) => state.bills);
  {
    /* <CustomAlert color="success" message="Đã thanh toán" /> */
  }
  const rows = bills.map((bill) => ({
    ID: bill._id,
    Date: formatDate(bill.timestamp),
    Customer: bill.customer_id.name,
    Total: bill.total_cost,
    Quantity: bill.services.length,
    paid: bill.paid,
    confirm: bill.confirm,
  }));

  useEffect(() => {
    reloadBill(confirmState,paidState);
  }, []);

  const reloadBill = (confirmState,paidState) => {
    setLoading(true);
    axios()
      .get(`/api/bill/${confirmState}/${paidState}`)
      .then(({ data }) => {
        setAndDelayLoading(data);
      })
      .catch((err) => {
        console.log(err);
        setAndDelayLoading();
      });
  };

  const setAndDelayLoading = (data) => {
    var timeout = setTimeout(function () {
      setLoading(false);
      if (data) dispatch({ type: "UPDATE_BILLS", bills: data });
      clearTimeout(timeout);
    }, 1000);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteBill = () => {
    axios()
      .post("/api/bill/delete", {
        bill_ids: selected,
      })
      .then(() => {
        reloadBill(confirmState,paidState);
      })
      .catch((err) => console.log(err));
  };

  const confirmPayment = () => {
    axios()
      .post("/api/bill/payment", {
        bill_ids: selected,
      })
      .then(() => {
        reloadBill(confirmState,paidState);
      })
      .catch((err) => console.log(err));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if (toModifyPage)
    return <Redirect to={"/admin/bill/modify/" + selected[0]} />;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/admin/bill/"
            style={{
              color: "black",
              borderBottom: "1px solid #d6d6d6",
              marginTop: "8px",
            }}
            className={classes.linkCustom}
          >
            <ListIcon />
            Danh sách
          </Link>
          <Link
            to="/admin/bill/add/init/init"
            style={{ color: "black" }}
            className={
              props.match.url === "/admin/bill/add" ? classes.linkCustom : ""
            }
          >
            <AddIcon className={classes.icon} />
            Thêm
          </Link>
        </Breadcrumbs>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ marginTop: "12px" }}>
        <Paper className={classes.paper}>
          {loading && <LinearProgress />}
          <EnhancedTableToolbar
            reloadBill={reloadBill}
            setToModifyPage={setToModifyPage}
            numSelected={selected.length}
            deleteBill={deleteBill}
            selected={selected}
            bills={bills}
            confirmPayment={confirmPayment}
            paidState={paidState}
            setPaidState={setPaidState}
            confirmState={confirmState}
            setConfirmState={setConfirmState}
            reloadBill={reloadBill}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.ID);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.ID)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.ID}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="right">{row.Date}</TableCell>
                        <TableCell align="right">{row.Customer}</TableCell>
                        <TableCell align="right">
                          <NumberFormat
                            value={row.Total}
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value) => (
                              <div
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {value}
                              </div>
                            )}
                            suffix={" đ "}
                          />
                        </TableCell>
                        <TableCell align="right">{row.Quantity}</TableCell>
                        <TableCell align="right">
                          {row.paid ? (
                            <CustomAlert
                              color="success"
                              message="Đã thanh toán"
                            />
                          ) : (
                            <CustomAlert
                              color="error"
                              message="Chờ thanh toán"
                            />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.confirm ? (
                            <CustomAlert
                              color="success"
                              message="Đã xác nhận"
                            />
                          ) : (
                            <CustomAlert color="error" message="Chờ xác nhận" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </GridItem>
    </GridContainer>
  );
};

export default ProvisionalBillList;
