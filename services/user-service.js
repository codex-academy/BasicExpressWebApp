const _lodesh = require('lodash');
const dayjs = require('dayjs');
let localizedFormat = require('dayjs/plugin/localizedFormat');
const userModel = require('../model/user.model.js');
dayjs.extend(localizedFormat)

module.exports = function userService(db) {
    const getUserNames = async () => {
        let user = await db.manyOrNone('select username from users');
        return user ? user : null;
    }

    const getUserName = async username => {
        let getUser = await db.oneOrNone('select username from users where username = $1', [username]);
        return getUser ? getUser : "no user found";
    }

    const getUserPassword = async (username, password) => {
        let userPassword = await db.oneOrNone('select password from users where username = $1', [username]);
        let pass = await userModel().comparePassword(password, userPassword.password);
        return pass ? true : false;
    }

    const signUp = async (username, password) => {
        let hashPassword = await userModel().cryptPassword(password);
        let validUserName = userModel().usernameIsValid(username);

        if (validUserName === username) {
            await db.none('insert into users (username, password, createdAt, active) values ($1, $2, $3, $4)', [validUserName, hashPassword, dayjs().format('llll'), true]);
            return true
        }
        else {
            console.log(validUserName);
            return validUserName
        }
    }

    const login = async (username, password) => {
        let validUserName = userModel().usernameIsValid(username);
        if (validUserName === username) {
            let getUsername = await getUserName(username);
            console.log(getUsername);

            // if (getUsername === ) {

            // }
            // console.log(await getUserPassword(username, password));
            // console.log(getUsername.username === username);
            // if (getUsername.username === username) {

            // } else {

            // }
        } else {
            console.log(validUser);
            return validUserName;
        }

    }

    return {
        getUserNames,
        getUserPassword,
        signUp,
        login,
        getUserName
    }
}