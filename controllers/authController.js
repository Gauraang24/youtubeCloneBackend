const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();
    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({
      message: "Error registering user.",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentails." });
    }

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

    res.status(200).json({
      status: true,
      token,
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({
      message: "Error Login user.",
    });
  }
};
