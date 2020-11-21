import React from "react";
import axios from '../../service/axios';
import {Redirect} from 'react-router-dom';
import { Spinner } from 'reactstrap';
const StoreRegister = (props) => {
    
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [passwordRetype, setPasswordRetype] = React.useState("");
    let [name, setName] = React.useState("");
    let [description, setDescription] = React.useState("");
    let [address, setAddress] = React.useState("");

    let [emailError, setEmailError] = React.useState("");
    let [passwordError, setPasswordError] = React.useState("");
    let [passwordRetypeError, setPasswordRetypeError] = React.useState("");
    let [nameError, setNameError] = React.useState("");
    let [descriptionError, setDescriptionError] = React.useState("");
    let [addressError, setAddressError] = React.useState("");

    let [isRegisterSuccess, setRegisterSuccess] = React.useState(false);
    let [loading, setLoading] = React.useState(false);

    const handleInput = e => {
        let {name} = e.target;
        let {value} = e.target;
        switch(name){
            case "email": {
                setEmail(value);
                return;
            }
            case "password": {
                setPassword(value);
                return;
            }
            case "retype_password": {
                setPasswordRetype(value);
                return;
            }
            case "name" :{
                setName(value);
                return;
            }
            case "description": {
                setDescription(value);
                return;
            }
            case "address" :{
                setAddress(value);
                return;
            }
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if(validator(email,password,name,description,address)){
            axios().post('/api/store',{
                email,
                password,
                name,
                description,
                address
            })
            .then(()=>{
                alert("Đăng ký thành công");
                setRegisterSuccess(true);
            })
            .catch(err => {
                alert("Có lỗi");
                console.log(err);
            });
        }
    }

    const validator = (email, password, name, description, address) => {
        let isValid = true;
        if(email === "") {
            setEmailError("Email không được phép rỗng");
            isValid=false;
        } else setEmailError("")
        if(password === "") {
            setPasswordError("Password Không được phép rỗng")
            isValid = false
        } else setPasswordError("")
        if(passwordRetype === "") {
            setPasswordRetypeError("Retype password Không được phép rỗng")
            isValid = false
        } else setPasswordError("")

        if(passwordRetype !== password) {
            setPasswordRetypeError("Password không khớp");
            isValid = false
        } else setPasswordRetypeError("");

        if(name === "") {
            setNameError("Tên cửa hàng Không được phép rỗng")
            isValid = false
        } else setNameError("");
        if(description === "") {
            setDescriptionError("Mô tả cửa hàng Không được phép rỗng")
            isValid = false
        } else setDescriptionError("")
        if(address === "") {
            setAddressError("Địa chỉ cửa hàng Không được phép rỗng")
            isValid = false
        } else setAddressError("")

        return isValid;
    }

    if(isRegisterSuccess) return <Redirect to="/admin/login" />
	return (
		<div className="login-background">
			<div className="container ">
				<div className="row mt-4">
					<div className="col-md-12">
						<h3 style={{ color: "#231a1a" }}>Đăng ký cửa hàng</h3>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-12">
						<div className="login-form">
							<form onSubmit={handleFormSubmit}>
								<div className="row">
									<div className="col-md-6">
										<div class="form-group">
											<label
												for="exampleInputEmail1"
												style={{ color: "white" }}
											>
												Email address
											</label>
											<input
												type="email"
												className="form-control"
												id="exampleInputEmail1"
												aria-describedby="emailHelp"
                                                placeholder="Enter email"
                                                name="email"
                                                onChange={handleInput}
                                                value={email}                                             
											/>
                                            {emailError && <div className="alert-custer" style={{color:"red"}}>{emailError}</div>}
										</div>
										<div className="form-group">
											<label
												for="exampleInputPassword1"
												style={{ color: "white" }}
											>
												Password
											</label>
											<input
												type="password"
												className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleInput}
                                                value={password}
											/>
                                            {passwordError && <div className="alert-custer" style={{color:"red"}}>{passwordError}</div>}
										</div>
										<div className="form-group">
											<label
												for="exampleInputPassword1"
												style={{ color: "white" }}
											>
												Nhập lại password
											</label>
											<input
												type="password"
												className="form-control"
                                                placeholder="Retype password"
                                                name="retype_password"
                                                onChange={handleInput}
                                                value={passwordRetype}
											/>
                                            {passwordRetypeError && <div className="alert-custer" style={{color:"red"}}>{passwordRetypeError}</div>}
										</div>
									</div>
                                    {/* on the right hand */}
									<div className="col-md-6">
										<div className="form-group">
											<label
												for="exampleInputPassword1"
												style={{ color: "white" }}
											>
												Name
											</label>
											<input
												type="text"
												className="form-control"
                                                placeholder="store name"
                                                name="name"
                                                onChange={handleInput}
                                                value={name}
											/>
                                            {nameError && <div className="alert-custer" style={{color:"red"}}>{nameError}</div>}
										</div>
                                        <div className="form-group">
											<label
												for="exampleInputPassword1"
												style={{ color: "white" }}
											>
												Description
											</label>
											<input
												type="text"
												className="form-control"
                                                placeholder="Store description"
                                                name="description"
                                                onChange={handleInput}
                                                value={description}
											/>
                                            {descriptionError && <div className="alert-custer" style={{color:"red"}}>{descriptionError}</div>}
										</div>
                                        <div className="form-group">
											<label
												for="exampleInputPassword1"
												style={{ color: "white" }}
											>
												Address
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Address"
                                                name="address"
                                                onChange={handleInput}
                                                value={address}
                                            />
                                            {addressError && <div className="alert-custer" style={{color:"red"}}>{addressError}</div>}
										</div>
                                        <div className="form-group">
                                        {loading && <Spinner color="light"/>}
										</div>
									</div>
								</div>
                                <div className="row mt-3">
                                    <div className="col-12" style={{textAlign:"right"}}>              
                                        <button
                                            type="submit"
                                            className="btn btn-warning"
                                        >
                                            Register now
                                        </button>
                                    </div>
                                </div>
							</form>
						</div>
					</div>
					<div className="col-md-6"></div>
				</div>
			</div>
		</div>
	);
};
export default StoreRegister;
