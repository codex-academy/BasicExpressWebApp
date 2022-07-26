const bcrypt = require('bcrypt');

module.exports = function userModel() {

    const usernameIsValid = username => {
        let valid = /^[0-9a-zA-Z_.-]+$/.test(username)
        return valid ? username : "invalid format" 
    };

    const cryptPassword = async password => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    }

    const comparePassword = async (password, passwordHash) => {
        // console.log(passwordHash + " " + " hash");
        const match = await bcrypt.compare(password, passwordHash);
        return match ? true : false;
    }

    return {
        usernameIsValid,
        cryptPassword,
        comparePassword
    }

}

// export default [usernameIsValid, cryptPassword]


