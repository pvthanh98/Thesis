export const form_user_register = (email, name, password, password_retype, address) => {
    let error = {};
    if(email === "") error.email = "Email không được rỗng";
    if(name === "") error.name = "Tên không được rỗng";
    if(password === "") error.password = "Password không được rỗng";
    if(password !== password_retype) error.password_retype = "Password không khớp";
    if(password_retype === "") error.password_retype = "Nhập lại password";
    if(address === "") error.address = "Địa chỉ không được rỗng";
    return error;
}
