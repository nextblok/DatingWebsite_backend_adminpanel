const User = require("../models/user");
const jwtDecode = require("jwt-decode");
const { body, check, validationResult } = require("express-validator");

const {
  createToken,
  hashPassword,
  verifyPassword,
} = require("../utils/authentication");

exports.register = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    // check if username and email already exist
    const { username, email, password, passwordConfirmation } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      role: req.body.role,
      profilePhoto: req.file?.filename,
    };

    const existingUsername = await User.findOne({
      username: userData.username.toLowerCase(),
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }

    const existingEmail = await User.findOne({
      email: userData.email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    // check if password and confirm password match
    if (password !== passwordConfirmation) {
      return res
        .status(422)
        .json({ message: "Password and confirm password must be same" });
    }

    // save
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      // set userInfo and return within response
      const { username, email, role, id, created, profilePhoto } = savedUser;
      const userInfo = {
        username,
        email,
        role,
        id,
        created,
        profilePhoto,
      };

      return res.json({
        message: "User created!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(400).json({
        message: "There was a problem creating your account.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "There was a problem creating your account.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Wrong email",
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { fullName, role, id, created, profilePhoto, email } = user;
      const userInfo = { fullName, role, id, created, profilePhoto, email };

      res.json({
        success: true,
        message: "Authentication successful!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Wrong email or password.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { sortType = "-created" } = req.body;
    const users = await User.find().sort(sortType);
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const users = await User.find({
      username: { $regex: req.params.search, $options: "i" },
    });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const users = await User.findOne({ username: req.params.username });
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateNewUser = [
  check("email", "Email is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  body("username")
    .exists()
    .trim()
    .withMessage("is required")

    .notEmpty()
    .withMessage("cannot be blank")

    .isLength({ max: 16 })
    .withMessage("must be at most 16 characters long")

    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("contains invalid characters"),

  body("password")
    .exists()
    .trim()
    .withMessage("is required")

    .notEmpty()
    .withMessage("cannot be blank")

    .isLength({ min: 6 })
    .withMessage("must be at least 6 characters long")

    .isLength({ max: 50 })
    .withMessage("must be at most 50 characters long"),

  body("passwordConfirmation")
    .exists()
    .trim()
    .withMessage("is required")

    .notEmpty()
    .withMessage("cannot be blank")

    .isLength({ min: 6 })
    .withMessage("must be at least 6 characters long")

    .isLength({ max: 50 })
    .withMessage("must be at most 50 characters long"),
];

exports.validateUser = [
  check("email", "Email is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),

  body("password")
    .exists()
    .trim()
    .withMessage("is required")

    .notEmpty()
    .withMessage("cannot be blank")

    .isLength({ min: 6 })
    .withMessage("must be at least 6 characters long")

    .isLength({ max: 50 })
    .withMessage("must be at most 50 characters long"),
];
