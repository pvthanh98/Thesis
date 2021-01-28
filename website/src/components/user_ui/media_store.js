import React from "react";
import { Media } from "reactstrap";
import Loading from "../../components/user_ui/loading";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { animateScroll as scroll } from "react-scroll";
import axios from "../../service/axios_user";
import { useDispatch } from "react-redux";
import { server } from "../../constant";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {socket} from '../../views/users_ui/index';
import Select from '@material-ui/core/Select';
import Rating from 'material-ui-rating';
export default (props) => {
	const [requestComplete, setRequestComplete] = React.useState(false);
	const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [problemID, setProblemID] = React.useState('');
  const handleChange = (event) => {
    console.log(event.target.value)
    setProblemID(event.target.value);
  };
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const scrollToTop = () => {
		scroll.scrollToTop();
	};
	const setSelectedWindow = () => {
		props.setSelectedWindow({
			id: props.store._id,
			name: props.store.name,
			phone: props.store.phone,
			description: props.store.description,
			image:props.store.image,
			lat: props.store.latitude,
			lng: props.store.longtitude,
			distance: props.store.distance.distance,
			rating: props.store.rating.total,
		});
		scrollToTop();
	};

	const handleButtonClick = () => {
		console.log(localStorage.getItem('admin_token'))
		props.chatToggle();
		loadMessages();
	};
	const loadMessages = () => {
		axios()
			.get(`/api/messages/customer_to/${props.store._id}`)
			.then(({ data }) => {
				dispatch({ type: "UPDATE_MESSAGES", messages: data });
			})
			.catch((err) => console.log(err));
	};

	const requestRescue = () => {
    if(problemID!=""){
      axios()
			.post("/api/rescue", { store_id: props.store._id, problem: problemID, coordinate: props.myposition })
			.then((resl) => {
				alert("Yều cầu của bạn đã được gửi");
				socket.emit('new_rescue', {to: props.store._id});
				setRequestComplete(true);
			})
			.catch((err) => {
				if (err.response.status === 401)
					alert("Bạn cần đăng nhập để thực hiện chức năng này");
			});
    } else alert("Bạn phải chọn vấn đề")
    handleClose();
	};

	return (
		<Media className="mb-3">
			<Media left href="#" className="mr-3">
				<img
					src={`${server}/images/${props.store.image}`}
					style={{ borderRadius: "12px" }}
					height="80px"
				/>
			</Media>
			<Media body>
				<Media heading>{props.store.name}</Media>
				{props.description}
			</Media>
			<Media className="mr-5">
				<Rating 
					value={props.store.rating.total} 
				/>
			</Media>
			<Media className="mr-5">
				Cách bạn{" "}
				{props.store.distance ? (
					props.store.distance.distance.text
				) : (
					<Loading />
				)}
			</Media>
			<Media>
				<Button
					onClick={handleButtonClick}
					variant="contained"
					color="primary"
					endIcon={<Icon>send</Icon>}
				>
					Nhắn Tin
				</Button>
				<Button
					onClick={handleClickOpen}
					variant="contained"
					className="ml-2"
					disabled={requestComplete}
					endIcon={<Icon>perm_phone_msg</Icon>}
				>
					{requestComplete ? "Đã gửi yêu cầu" : "Yêu cầu cứu hộ"}
				</Button>
				<Button
					variant="contained"
					className="ml-2"
					endIcon={<Icon>alt_route</Icon>}
					onClick={setSelectedWindow}
				>
					Xem đường
				</Button>
			</Media>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{props.store.name} - Vấn đề của bạn là gì ?
				</DialogTitle>
          
				<DialogContent>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            value={problemID}
            onChange={handleChange}
          >
            {props.problems.map(e=><MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>)}
          </Select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Hủy
					</Button>
					<Button onClick={requestRescue} color="primary" autoFocus>
						Đồng Ý
					</Button>
				</DialogActions>
			</Dialog>
		</Media>
	);
};
