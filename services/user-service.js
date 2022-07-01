module.exports = function userService(db) {
    const getUserName = async () => {
        let user = await db.any('select username from users');
        const userData = user.length > 0 ? user : null;
        return userData;
    }

    const getUserPassword = async username => {
        let userPassword = await db.any('select password from users where username = $1', [username]);
        const results = userPassword.length > 0 ? userPassword : null;
        return results;
    }

    const signUp = async (username, password) => {

    }

    return {
        getUserName,
        getUserPassword
    }
}