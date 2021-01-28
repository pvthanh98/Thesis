import React, {useEffect} from 'react';
import { form_user_register } from '../../service/validate';
import axios from '../../service/axios';
import { Redirect } from 'react-router-dom';
import {Spinner} from 'reactstrap';
const _ = require("underscore");
export default (props) => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password_retype, setPasswordRetype] = React.useState("");
	const [name, setName] = React.useState("");
	const [address, setAdddress] = React.useState("");
	const [error, setError] = React.useState({});
	const [isSuccess, setSuccess] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	let [emailError, setEmailError] = React.useState("");
    let [passwordError, setPasswordError] = React.useState("");
    let [passwordRetypeError, setPasswordRetypeError] = React.useState("");
    let [nameError, setNameError] = React.useState("");
    let [addressError, setAddressError] = React.useState("");
	const onFormSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		let error = form_user_register(email, name ,password, password_retype, address);
		if(_.isEmpty(error)){
			axios().post('/api/user',{
				email,
				password,
				address,
				name
			})
			.then(res => {
				if(res.status===200) alert(res.data);
				setSuccess(true);
				setLoading(false);
				alert("Đăng ký thành công");
			})
			.catch(err => {
				setError({email:"Email đã tồn tại"})
				setLoading(false);
			})
		} else {
			setError(error);
			setLoading(false);
		}
	}

	const onChangeInput = e => {
		const { value } = e.target
		switch(e.target.name){
			case "email":{
				setEmail(value);
				return;
			}
			case "password": {
				setPassword(value);
				return;
			}
			case "password_retype" :{ 
				setPasswordRetype(value)
				return;
			}
			case "address": {
				setAdddress(value);
				return 
			}
			case "name": {
				setName (value);
				return;
			}
		}
	}	
	if(isSuccess) return <Redirect to="/login" /> ;
    return (
        <div className="login-background">
			<div className="container ">
				<div className="row mt-4">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="login-form">
							<h4>Đăng Ký Người Dùng</h4>
							<form onSubmit={onFormSubmit}>
								<div class="form-group">
									<label>
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
									{error.email && <div style={{color:"red", padding:"4px"}}>
										{error.email}
									</div>}
								</div>
								<div className="form-group">
									<label>
										Password
									</label>
									<input
										type="password"
										className="form-control"
										placeholder="Password"
										name="password"
										value={password}
										onChange={onChangeInput}
									/>
									{error.password && <div style={{color:"red", padding:"4px"}}>
										{error.password}
									</div>}
								</div>
								<div className="form-group">
									<label>
										Nhập lại
									</label>
									<input
										type="password"
										className="form-control"
										placeholder="Retype password"
										name="password_retype"
										value={password_retype}
										onChange={onChangeInput}
									/>
									{error.password_retype && <div style={{color:"red", padding:"4px"}}>
										{error.password_retype}
									</div>}
								</div>
								<div className="form-group">
									<label>
										Name
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Name..."
										name="name"
										value={name}
										onChange={onChangeInput}
									/>
									{error.name && <div style={{color:"red", padding:"4px"}}>
										{error.name}
									</div>}
								</div>
								<div className="form-group">
									<label>
										Address
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Address"
										name="address"
										value={address}
										onChange={onChangeInput}
									/>
									{error.address && <div style={{color:"red", padding:"4px"}}>
										{error.address}
									</div>}
								</div>
								<div className="mt-2">
									<button
										type="submit"
										className="btn btn-warning"
									>
										Submit
									</button>
								</div>
								{loading && <div className="form-group" style={{textAlign:"center"}}>
									<Spinner color="light"/>
								</div>}
							</form>
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		</div>
    )
}
