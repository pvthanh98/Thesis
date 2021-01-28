import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from '../../service/axios';
import { Spinner } from 'reactstrap';
import {socket} from '../../layouts/Admin';
import {server} from '../../constant';
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
        axios().post('/api/store/login',{
            email: email,
			password: password
        })
        .then(res => {
			if(res.status===200){
				localStorage.setItem('admin_token', res.data.admin_token);
				localStorage.setItem('admin_name', res.data.admin_name);
				localStorage.setItem('admin_id', res.data.admin_id);
				localStorage.setItem('admin_avt', res.data.admin_avt)
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

	if(isLogin) return <Redirect to="/admin"/>

	return (
		<div className="login-background">
			<div className="container ">
				<div className="row mt-4">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="login-form">
							<div style={{textAlign:"center", marginBottom:"16px"}}>
							<h4>Admin Dashboard</h4>
							</div>
							<form onSubmit={onFormSubmit}>
								<div class="form-group">
									<div>
										Email address
									</div>
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
										Đừng bao giờ để người khác biết email của bạn
									</small>
								</div>
								<div className="form-group">
									<div>
										Password
									</div>
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

								<div className="mt-2" style={{textAlign:"right"}}>
									<button
										type="submit"
										className="btn btn-danger mr-2"
									>
										Đăng nhập
									</button>
								</div>
							</form>
							<Link
								to="/store/register"
								className="mt-2"
								style={{
									color: "red",
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
