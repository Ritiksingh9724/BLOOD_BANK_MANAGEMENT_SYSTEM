const User =
  require("../models/userModel");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");


// REGISTER

const registerController =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // validation

      if (
        !name ||
        !email ||
        !password ||
        !role
      ) {

        return res.status(400).send({

          success: false,

          message:
            "Please Provide All Fields",

        });
      }

      // existing user

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).send({

          success: false,

          message:
            "User Already Exists",

        });
      }

      // hash password

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // create user

      const user =
        await new User({

          name,

          email,

          password:
            hashedPassword,

          role,

        }).save();

      res.status(201).send({

        success: true,

        message:
          "Registration Successful",

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error In Register API",

        error,

      });

    }
  };


// LOGIN

const loginController =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // validation

      if (
        !email ||
        !password
      ) {

        return res.status(400).send({

          success: false,

          message:
            "Please Provide Email And Password",

        });
      }

      // find user

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).send({

          success: false,

          message:
            "User Not Found",

        });
      }

      // compare password

      const comparePassword =
        await bcrypt.compare(

          password,

          user.password
        );

      if (!comparePassword) {

        return res.status(401).send({

          success: false,

          message:
            "Invalid Credentials",

        });
      }

      // token

      const token = jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({

        success: true,

        message:
          "Login Successful",

        token,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error In Login API",

        error,

      });

    }
  };

module.exports = {

  registerController,

  loginController,

};