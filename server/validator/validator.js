const { body } = require('express-validator');
module.exports = {
    createStore : ()  => [
        body("email").isEmail(),
        body("password").exists(),
        body("name").exists(),
        body("address").exists()
    ]
}