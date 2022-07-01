module.exports = function (userService) {

	async function user(req, res) {
		try {
            let id = req.body.id;
			let users = await userService.getUserName();
			res.json({
				status: 'success',
				data: users
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

    const validatePassword = async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let userPassword = await userService.getUserPassword(username);

            /*
                - hash password back to normal
                - use compare method to check if password match

                --- exceptions/ events ---
                - handle wrong password exception
                - handle successfull event;
           */

        } catch (error) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    } 

    const signUp = async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;

            /*
            - set-up salt
            - hash the password
            - call signUp service

            --- exception/ event ---
            - user already exists
            - handle successfull event
            - create a user-token 
            */

        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    return {
        user,
        validatePassword,
        signUp
    }
    
}