const helper = {
    auth: function checkLogin() {
        if (localStorage.hasOwnProperty('admin_token')) {
            return true;
        }
        return false;
    }
}
export default helper;