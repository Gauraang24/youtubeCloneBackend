const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const channel = require("../models/channelModal");

//Api to register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists." });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();
    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: `Error ${error.message}`,
    });
  }
};

//Api to Log user in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Checking if user exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    //Checking is password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentails." });
    }

    const channelId = (await channel.findOne({ userId: user._id })) || {};

    //Signing jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const data = channelId
      ? { userId: user._id, channelId: channelId._id }
      : {
          userId: user._id,
        };
    res.status(200).json({
      status: true,
      token,
      data: data,
      message: "Logged In",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error ${error.message}`,
    });
  }
};
