import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from '../../service/axios';
import { Spinner } from 'reactstrap';
import {server} from '../../constant';
import {socket} from '../users_ui/index';
// if(localStorage.getItem("user_token")){
//   socket = socketIOClient(server);
//   socket.on('connect', function(){
//       socket.emit("authenticate",{token: localStorage.getItem("user_token"), type: "user"});
//   });
// }

function Login(props) {
	const [email, setEmail] = React.useState("");
	const [isLogin, setLogin] = React.useState(false); 
	const [password, setPassword] = React.useState("");
	const [isFailed, setFailed] = React.useState(false);
	const [loading, setLoading] =React.useState(false);
	const onChangeInput = (e) => {
		switch (e.target.name) {
			case "email": {
                setEmail(e.target.value)
                return;
            }
            case "password": {
                setPassword(e.target.value)
                return;
            }
		}
    };
    const onFormSubmit = e => {
		e.preventDefault();
		setLoading(true)
        axios().post('/api/user/login',{
            email: email,
			password: password
        })
        .then(res => {
			if(res.status===200){
				localStorage.setItem('user_token', res.data.user_token);
				localStorage.setItem('user_name', res.data.name);
				localStorage.setItem('user_id', res.data.id);
				localStorage.setItem('user_avt', res.data.image)
				setLogin(true);
				setLoading(false);
				socket.connect(server);
			}
		})
		.catch(err=> {
			setFailed(true);
			setLoading(false);
		})
	};

	if(isLogin) return <Redirect to="/"/>

	return (
		<div className="login-background">
			<div className="container ">
				<div className="row mt-4">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="login-form">
							<h4 style={{ color: "white" }}>Đăng nhập</h4>
							<form onSubmit={onFormSubmit}>
								<div class="form-group">
									<label style={{ color: "white" }}>
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter email"
										name="email"
										value={email}
										onChange={onChangeInput}
									/>
									<small
										id="emailHelp"
										className="form-text text-muted"
									>
										We'll never share your email with anyone
										else.
									</small>
								</div>
								<div className="form-group">
									<label style={{ color: "white" }}>
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="Password"
										name="password"
										value={password}
										onChange={onChangeInput}
									/>
								</div>
								{isFailed && <div className="form-group" style={{color:"red"}}>
									Tên đăng nhập hoặc mật khẩu sai
								</div>}

								{loading && <div className="form-group" style={{color:"red", textAlign:"center"}}>
									<Spinner color="light"/>
								</div>}

								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="exampleCheck1"
									/>
									<label
										className="form-check-label"
										for="exampleCheck1"
									>
										Check me out
									</label>
								</div>
								<div className="mt-2">
									<button
										type="submit"
										className="btn btn-danger mr-2"
									>
										Login as user
									</button>
								</div>
							</form>
							<Link
								to="/user/register"
								className="mt-2"
								style={{
									color: "white",
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								Đăng ký
							</Link>
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		</div>
	);
}

export default Login;
