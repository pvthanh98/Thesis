import React from "react";
import axios from '../../service/axios';
import { Redirect } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import { Grid, Input, Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PinDropIcon from '@material-ui/icons/PinDrop';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DescriptionIcon from '@material-ui/icons/Description';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../components/user_ui/loading';
import { Badge } from 'reactstrap';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'red',
        color: props => props.color,
    },
    inputItem: { padding: "8px", marginTop: "8px", display: "flex", flexDirection: "row" },
    inputError: { padding: "8px", marginTop: "4px",display: "flex",flexDirection: "row", justifyContent:"flex-end"},
    formContainer: { backgroundColor: "#ffffff5c", marginTop: "24px", padding: "8px", border: "2px solid #dfdfdf", paddingTop: "24px", paddingBottom: "24px", borderRadius: "12px" }
});
const StoreRegister = (props) => {
    const classes = useStyles(props);
    const [check, setCheck] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);

    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [passwordRetype, setPasswordRetype] = React.useState("");
    let [name, setName] = React.useState("");
    let [description, setDescription] = React.useState("");
    let [address, setAddress] = React.useState("");
    let [cityID, setCityID] = React.useState("");

    let [emailError, setEmailError] = React.useState("");
    let [passwordError, setPasswordError] = React.useState("");
    let [passwordRetypeError, setPasswordRetypeError] = React.useState("");
    let [nameError, setNameError] = React.useState("");
    let [descriptionError, setDescriptionError] = React.useState("");
    let [addressError, setAddressError] = React.useState("");
    let [cityIDError, setCityIDError] = React.useState("");

    let [isRegisterSuccess, setRegisterSuccess] = React.useState(false);
    let [loading, setLoading] = React.useState(false);

    const [cities, setCities] = React.useState(null);
    React.useEffect(() => {
        loadCities();
    }, [])

    const loadCities = () => {
        axios().get('/api/city')
        .then(({data})=>setCities(data))
        .catch(err=>console.log(err))
    }
    const renderMenu = () =>{
        return cities && cities.map(e=>(<MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>))
    }

    const onSubmit = () => {
        if(check) {
            if(validator(email,password,name,description,address)) {
                setLoading(true)
                axios().post('/api/store',{
                    email,
                    password,
                    name,
                    description,
                    address,
                    city:cityID
                })
                .then(()=>{
                    alert("Đăng ký thành công");
                    setRegisterSuccess(true);
                    setLoading(false)
                })
                .catch(err => {
                    alert("Có lỗi");
                    console.log(err);
                    setLoading(false)
                });
            }
        }
        else alert("you have to check for the license")
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

        if(cityID === "") {
            setCityIDError("Bạn phải chọn thành phố (quan trọng)")
            isValid = false
        } else setCityIDError("")


        return isValid;
    }
    if(isRegisterSuccess) return <Redirect push to="/admin/login" />
    return (
        <div className="registerContainer" style={{ minHeight: window.innerHeight }}>
            <Container>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item md={6} className={classes.formContainer} >
                        <Typography variant="h4" style={{ textAlign: "center" }}>
                            Đăng Ký Tài khoản 
                        <Badge color="success">Cửa Hàng</Badge>
                    </Typography>
                        <div className={classes.inputItem}>
                            <EmailIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        {
                            emailError && 
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{emailError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <LockIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                            />
                            <IconButton onClick={() => setShowPass(!showPass)} style={{ width: "24px" }}>
                                {!showPass ? <VisibilityIcon style={{color:"#ddd"}} /> : <VisibilityOffIcon  style={{color:"#ddd"}} />}
                            </IconButton>
                        </div>
                        {
                            passwordError &&
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{passwordError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <EnhancedEncryptionIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                type={showPass ? "text" : "password"}
                                placeholder="Nhập lại password"
                                value={passwordRetype}
                                onChange={e=>setPasswordRetype(e.target.value)}
                            />
                            <IconButton style={{ width: "24px" }} onClick={() => setShowPass(!showPass)} >
                                {!showPass ? <VisibilityIcon style={{color:"#ddd"}} /> : <VisibilityOffIcon  style={{color:"#ddd"}} />}
                            </IconButton>
                        </div>
                        {
                            passwordRetypeError && 
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{passwordRetypeError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <PinDropIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Address"
                                value={address}
                                onChange={e=>setAddress(e.target.value)}
                            />
                        </div>
                        {
                            addressError && 
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{addressError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <PersonPinIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Tên cửa hàng"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                        </div>
                        {
                            nameError &&
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{nameError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <DescriptionIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Mô tả cửa hàng (khuyến mại...)"
                                value={description}
                                onChange={e=>setDescription(e.target.value)}
                            />
                        </div>
                        {
                            descriptionError && 
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{descriptionError}</Alert>
                            </div>
                        }
                        <div className={classes.inputItem}>
                            <LocationCityIcon style={{ width: "24px" }} />
                            <Select
                                value={cityID}
                                displayEmpty
                                style={{ width: "100%", marginLeft: "4px" }}
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={e=>{
                                    setCityID(e.target.value);
                                    console.log(e.target.value)
                                }}
                            >    
                                <MenuItem value="" disabled>
                                    Thành phố
                                </MenuItem>
                                {renderMenu()}
                            </Select>
                        </div>
                        {
                            cityIDError &&
                            <div className={classes.inputError}>
                                <Alert severity="error" style={{width:"100%"}}>{cityIDError}</Alert>
                            </div>
                        }

                        <div className={classes.inputItem} style={{ justifyContent: "flex-end", alignItems: "center" }}>
                            Đồng ý với điều khoản
                            <Checkbox
                                color="primary"
                                checked={check}
                                onChange={e => setCheck(e.target.checked)}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Button 
                                variant="contained"
                                color="primary" 
                                style={{ marginLeft: "8px", width: "40%" }}
                                onClick={onSubmit}
                            >
                               {loading ? <Loading /> : " ĐĂNG KÝ "} 
                            </Button>
                            <Button variant="contained" >HỦY BỎ</Button>
                        </div>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </Container>
        </div>

    );
};


export default StoreRegister;
