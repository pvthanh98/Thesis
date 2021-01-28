const helper = {
    auth: function checkLogin() {
        if (localStorage.hasOwnProperty('sys_token')) {
            return true;
        }
        return false;
    }
}
export default helper;