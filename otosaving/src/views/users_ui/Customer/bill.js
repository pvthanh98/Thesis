import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PaymentIcon from "@material-ui/icons/Payment";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useSelector} from 'react-redux';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	displayFlex: {
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
	}
}));
function createData(name, calories, fat, carbs) {
	return { name, calories, fat, carbs };
}

const RenderBillItem = (props) => { 
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const {bills} = props;

	

	return bills.map((bill,index) => {
		const rows = bill.services.map(service=>{
			return createData(
				service.service_id.name, service.service_id.price,
				service.quantity, service.service_id.price * service.quantity);
		})

		return <Accordion
			style={{marginTop:"8px"}}
			expanded={expanded === "panel"+index}
			onChange={handleChange("panel"+index)}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
				style={{display:"flex",
				justifyContent:"space-between"}}
			>
				<Typography className={classes.heading}>
					{bill.timestamp}
				</Typography>
				<Typography className={classes.heading}>
					<AttachMoneyIcon /> <b style={{color:"red"}}>{bill.total_cost}</b> VND
				</Typography>
				<Typography style={{marginLeft:"24px"}}>
					{!bill.confirm ? <div style={{color:"red"}}>Chờ xác nhận từ bạn</div>
					: <div style={{color:"green"}}>Đã xác nhận</div>}
				</Typography>
				<Typography style={{marginLeft:"24px"}}>
					{!bill.paid ? <div style={{color:"red"}}>Chưa thanh toán</div>
					: <div style={{color:"green"}}>Đã thanh toán</div>}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>	
				<Grid container>
					<Grid item xs={12} sm={12} md={12}>
						<Typography variant="h6">
							Dịch vụ
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={8}>
						<Table className={classes.table} aria-label="simple table">	
							<TableBody>
							{rows.map((row) => (
								<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.calories}</TableCell>
								<TableCell align="right">{row.fat}</TableCell>
								<TableCell align="right">{row.carbs}</TableCell>
								</TableRow>
							))}
							</TableBody>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Total</TableCell>
								</TableRow>
							</TableHead>
						</Table>	
					</Grid>
					<Grid item xs={12} sm={12} md={4} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
						<Button variant="contained" color="primary">Xác nhận</Button>
						<Button variant="contained" className="ml-3" color="secondary">Xác nhận và thanh toán</Button>
					</Grid>
				</Grid>	
			</AccordionDetails>
		</Accordion>
	}
		
	)
}

export default function Bill(props) {
	const classes = useStyles();
	const bills = useSelector(state => state.customer_bills);
	return (
		<Container>
			<Grid container>
				<Grid item xs={12} sm={12} md={12}>
					<Typography
						style={{ marginTop: "12px", color:"#1ba6c6" }}
						variant="h4"
					>
						CUSTOMER PAYMENT <PaymentIcon />
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					style={{ minHeight: "600px", marginTop: "12px" }}
				>
					<RenderBillItem bills={bills} />
				</Grid>
			</Grid>
		</Container>
	);
}
