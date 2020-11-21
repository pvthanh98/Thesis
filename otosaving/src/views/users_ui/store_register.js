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
import LocationCityIcon from '@material-ui/icons/LocationCity'

const useStyles = makeStyles({
    root: {
        backgroundColor: 'red',
        color: props => props.color,
    },
    inputItem: { padding: "8px", marginTop: "8px", display: "flex", flexDirection: "row" },
    formContainer: { backgroundColor: "#fff", marginTop: "24px", padding: "8px", border: "2px solid #dfdfdf", paddingTop: "24px", paddingBottom: "24px", borderRadius: "12px" }
});
const StoreRegister = (props) => {
    const classes = useStyles(props);
    const [check, setCheck] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);
    React.useEffect(() => {
        console.log(window.innerHeight);
    }, [])
    return (
        <div style={{ backgroundColor: "#e7e7e7", height: window.innerHeight }}>
            <Container>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item md={6} className={classes.formContainer} >
                        <Typography variant="h4" style={{ textAlign: "center" }}>
                            Đăng Ký Tài khoảng Cửa Hàng
                    </Typography>
                        <div className={classes.inputItem}>
                            <EmailIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Email"
                            />
                        </div>
                        <div className={classes.inputItem}>
                            <LockIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                            />
                            <IconButton onClick={() => setShowPass(!showPass)} style={{ width: "24px" }}>
                                {!showPass ? <VisibilityIcon color="#ddd" /> : <VisibilityOffIcon color="#ddd" />}
                            </IconButton>
                        </div>
                        <div className={classes.inputItem}>
                            <EnhancedEncryptionIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                type={showPass ? "text" : "password"}
                                placeholder="Nhập lại password"
                            />
                            <IconButton style={{ width: "24px" }} onClick={() => setShowPass(!showPass)} >
                                {!showPass ? <VisibilityIcon color="#ddd" /> : <VisibilityOffIcon color="#ddd" />}
                            </IconButton>
                        </div>
                        <div className={classes.inputItem}>
                            <PinDropIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Address"
                            />
                        </div>
                        <div className={classes.inputItem}>
                            <PersonPinIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Tên cửa hàng"
                            />
                        </div>
                        <div className={classes.inputItem}>
                            <DescriptionIcon style={{ width: "24px" }} />
                            <Input
                                style={{ width: "100%", marginLeft: "4px" }}
                                placeholder="Mô tả cửa hàng (khuyến mại...)"
                            />
                        </div>
                        <div className={classes.inputItem}>
                            <LocationCityIcon style={{ width: "24px" }} />
                            <Select
                                value=""
                                displayEmpty
                                style={{ width: "100%", marginLeft: "4px" }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" disabled>
                                    Thành phố
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                        <div className={classes.inputItem} style={{ justifyContent: "flex-end", alignItems: "center" }}>
                            Đồng ý với điều khoản
                        <Checkbox
                                color="primary"
                                checked={check}
                                onChange={e => setCheck(e.target.checked)}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Button variant="contained" color="primary" style={{ marginLeft: "8px", width: "40%" }}>ĐĂNG KÝ</Button>
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
