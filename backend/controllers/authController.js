const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || "secret_key", {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key",
    {
      expiresIn: "7d",
    },
  );
  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      isAdmin: email === "admin@libraff.az" || email === "mervanm@gmail.com",
    });

    if (user) {
      const { accessToken, refreshToken } = generateToken(user._id);
      res.status(201).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      res.json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key",
    );
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const tokens = generateToken(user._id);
    res.json(tokens);
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = { registerUser, loginUser, refreshToken };
