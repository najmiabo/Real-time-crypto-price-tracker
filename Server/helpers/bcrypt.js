const bcrypt = require('bcrypt');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword(password, hashedPassword) {
    const sync = bcrypt.compareSync(password, hashedPassword)
    return sync
}


module.exports = { hashPassword, comparePassword }