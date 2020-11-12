import React, { useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
//for table
import PropTypes from "prop-types";
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
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Redirect } from "react-router-dom";
import axios from "../../service/axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReplayIcon from "@material-ui/icons/Replay";
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {Input} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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
	{ id: "id", numeric: false, disablePadding: true, label: "ID" },
	{ id: "name", numeric: true, disablePadding: false, label: "Name" },
	{
		id: "description",
		numeric: true,
		disablePadding: false,
		label: "Description",
	},
	{ id: "price", numeric: true, disablePadding: false, label: "Price" },
	{ id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
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
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
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
									{order === "desc"
										? "sorted descending"
										: "sorted ascending"}
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
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(
						theme.palette.secondary.light,
						0.85
					),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected, selected, loadServices, setSelected } = props;

	const handleModify = () => {
		props.setRedirectToModify(selected[0]);
	};

	const handleDelete = () => {
		if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
			console.log(selected);
			axios()
				.post("/api/service/delete", {
					service_id: selected,
				})
				.then(() => {
					loadServices();
					setSelected([]);
				})
				.catch((err) => alert(err));
		}
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
					Service{" "}
					<IconButton onClick={props.loadServices}>
						<ReplayIcon />
					</IconButton>
				</Typography>
			)}

			{numSelected === 1 && (
				<Tooltip title="Modify">
					<IconButton aria-label="modify" onClick={handleModify}>
						<BorderColorIcon />
					</IconButton>
				</Tooltip>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete" onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton aria-label="filter list">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
		marginTop: "24px",
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
	marginTop10px: {
		marginTop: "10px",
	},
	linkCustom: {
		borderBottom: "1px solid #d6d6d6",
		marginTop: "4px",
	},
}));

export default function Service() {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [services, setServices] = React.useState([]);
	const [redirectToModify, setRedirectToModify] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		loadServices();
	}, []);

	const loadServices = () => {
		setLoading(true);
		var timeout = setTimeout(function () {
			axios()
				.get(`/api/service/store/${localStorage.getItem("admin_id")}`)
				.then((res) => {
					setServices(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
			clearTimeout(timeout);
		}, 1000);
	};

	let priceOver500 = 0;
	let priceBelow500 =0;
	let quantityBelow50 = 0;
	let serviceCount = 0;
	const rows = services.map((service) => {
		if(service.price>500) priceOver500++; else priceBelow500++;
		if(service.quantity<50) quantityBelow50++;
		serviceCount++;
		return {
			id: service._id,
			name: service.name,
			description: service.description,
			price: service.price,
			quantity: service.quantity,
		}
	});

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
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

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	if (redirectToModify)
		return <Redirect to={"/admin/service/modify/" + redirectToModify} />;
	return (
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link
						to="/admin/service/"
						style={{ color: "black" }}
						className={classes.linkCustom}
					>
						<ListIcon />
						List
					</Link>
					<Link to="/admin/service/add" style={{ color: "black" }}>
						<AddIcon />
						Add
					</Link>
				</Breadcrumbs>
			</GridItem>
			{loading && (
				<GridItem xs={12} sm={12} md={12}>
					<div
						style={{
							textAlign: "center",
							padding: "8px 0px 8px 0px",
						}}
					>
						<LinearProgress color="primary" />
					</div>
				</GridItem>
			)}
      <GridItem xs={12} sm={6} md={3} className="mt-2">
        <div>
          <div>
            <AttachMoneyIcon /> Giá dưới 500 $
          </div>
          <div style={{fontWeight:"bold", color:"#24aeb5",fontSize:"50px", textAlign:"center"}}>
            {priceBelow500}
          </div>
        </div>
      </GridItem>  
      <GridItem xs={12} sm={6} md={3} className="mt-2">
        <div>
          <div>
            <AttachMoneyIcon /> Giá trên 500 $
          </div>
          <div style={{fontWeight:"bold", color:"#471b77",fontSize:"50px", textAlign:"center"}}>
            {priceOver500}
          </div>
        </div>
      </GridItem> 
      <GridItem xs={12} sm={6} md={3} className="mt-2">
        <div>
          <div>
            <BusinessCenterIcon /> Số lượng ít hơn 50
          </div>
          <div style={{fontWeight:"bold", color:"red",fontSize:"50px", textAlign:"center"}}>
            {quantityBelow50}
          </div>
        </div>
      </GridItem> 
      <GridItem xs={12} sm={6} md={3} className="mt-2">
        <div>
          <div>
            <BusinessCenterIcon /> Tổng số dịch vụ
          </div>
          <div style={{fontWeight:"bold", fontSize:"50px", color:"green", textAlign:"center"}}>
            {serviceCount}
          </div>
        </div>
      </GridItem>  
      <GridItem xs={12} sm={12} md={12}>
          <SearchIcon />
          <Input 
            placeholder="Tìm thông tin dịch vụ..."
          />
      </GridItem>
			<GridItem xs={12} sm={12} md={12}>
				<Paper className={classes.paper}>
					<EnhancedTableToolbar
						setRedirectToModify={setRedirectToModify}
						numSelected={selected.length}
						selected={selected}
						loadServices={loadServices}
						setSelected={setSelected}
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
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row, index) => {
										const isItemSelected = isSelected(
											row.id
										);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) =>
													handleClick(event, row.id)
												}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.id}
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
													{row.id}
												</TableCell>
												<TableCell align="right">
													{row.name}
												</TableCell>
												<TableCell align="right">
													{row.description}
												</TableCell>
												<TableCell align="right">
													{row.price}
												</TableCell>
												<TableCell align="right">
													{row.quantity}
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height:
												(dense ? 33 : 53) * emptyRows,
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
}
