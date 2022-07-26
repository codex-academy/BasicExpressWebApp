const { as } = require("pg-promise");

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
            let storeData = await userService.signUp(username, password);
            if (storeData == true) {
                res.json({
                    status: 'success',
                    data: "user sign-up," + username
                });
            }
            res.json({
                status: "error",
                data: "invalid username or password fomat"
            })
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

    const login = async (req, res) => {
      try {
        let username = req.body.username;
        let password = req.body.password;
        let user = await userService.login(username, password);
        res.json({
            status: "sucess",
            data: user
        })
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
        signUp,
        login
    }

}