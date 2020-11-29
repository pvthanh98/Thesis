import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from '../../service/axios';
import { Spinner, Badge } from 'reactstrap';
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
        axios().post('/api/sys/login',{
            email: email,
			password: password
        })
        .then(res => {
			if(res.status===200){
				localStorage.setItem('sys_token', res.data.sys_token);
				localStorage.setItem('sys_name', res.data.sys_name);
				localStorage.setItem('sys_id', res.data.sys_id);
				localStorage.setItem('sys_avt', res.data.sys_avt)
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
							<h4><Badge color="danger">SysAdmin</Badge> Dashboard</h4>
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
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		</div>
	);
}

export default Login;
