const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    create,
    login,
};

async function create(req, res) {
    try {
        //add user to the database
        const user = await User.create(req.body);
        //create a token with the helperr function
        //token will be a string
        const token = createJWT(user);
        //yes we can use res.json to send back just a string
        //the client code takes this into consideration
        res.json(token);
    } catch (err) {
        //Client will check for non-2xx status code
        //400 = Bad Request
        res.status(400).json(err);
    }
}

//helper functions

function createJWT(user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        { expiresIn: "24h" }
    );
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = createJWT(user);
        }
        res.json(token);
    } catch {
        res.status(400).json("Bad Credentials");
    }
}
