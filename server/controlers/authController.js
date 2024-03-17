const users = require("../models/user.model"); /**/
const bcrypt = require("bcrypt");
const generateTokenAnsSetCookie = require("../utils/generatetToken");

const signup = async (req, res) => {
  try {
    const { fullName, password, confirmPassword, email } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Pasword don't match" });
    }

    const user = await users.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new users({
      fullName,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      generateTokenAnsSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid fullName or password" });
    }

    generateTokenAnsSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, oldPassword, newPassword } = req.body;

    const user = await users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "users not found" });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res
      .status(200)
      .json({ message: "Username and password updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signup, logout, update };
