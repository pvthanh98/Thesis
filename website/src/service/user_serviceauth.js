const helper = {
    auth: function checkLogin() {
        if (localStorage.hasOwnProperty('user_token')) {
            return true;
        }
        return false;
    }
}
export default helper;