const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/* Register User */

exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        const existingUser =
        await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({

                message:
                "User already exists"

            });

        }

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        await User.create({

            username,
            email,

            password:
            hashedPassword

        });

        res.status(201).json({

            message:
            "Registration Successful"

        });

    }
    catch (error) {

        res.status(500).json(error);

    }

};

/* Login User */

exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
        await User.findOne({
            email
        });

        if (!user) {

            return res.status(404).json({

                message:
                "User Not Found"

            });

        }

        const match =
        await bcrypt.compare(

            password,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                message:
                "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({

            token,

            username:
            user.username

        });

    }
    catch (error) {

        res.status(500).json(error);

    }

};