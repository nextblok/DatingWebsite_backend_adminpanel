const User = require("../models/user");
const Like = require("../models/like");
const Feature = require("../models/feature");
const { body, check, validationResult } = require("express-validator");
const {
  createToken,
  hashPassword,
  verifyPassword,
} = require("../utils/authentication");
const { validateBalances } = require("../middlewares/validateBalances.js");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const mongoose = require("mongoose");
mongoose.set("debug", true);

exports.login = async (req, res) => {
  try {
    res.json({ type: "pong" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Something went wrong in account controller." });
  }
};

exports.appuser_get = async (req, res) => {
  try {
    var { _id } = req.body;
    // Helper function to count likes
    const getLikeCounts = (userId, likes) => {
      const likers = likes.filter(like => like.likee.toString() === userId.toString()).length;
      const likees = likes.filter(like => like.liker.toString() === userId.toString()).length;
      return { likers, likees };
    };

    const likes = await Like.find({}).lean();
    if (_id) {
      var user = await User.findOne({ _id });      
      
      // Add followers and following counts to user object
      user = {
        ...user.toObject(),
        ...getLikeCounts(_id, likes)
      };
      
      return res.json({ result: true, data: user });
    } else {
      var users = await User.find({ role: { $ne: "admin" } }).lean(); //except admin
      
      // Add followers and following counts for each user
      users = users.map(user => ({
        ...user,
        ...getLikeCounts(user._id, likes)
      }));

      return res.json({ result: true, data: users });
    }
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.appuser_upsert = async (req, res) => {
  try {
    var input = req.body;
    var { _id } = req.body;
    if (_id) {
      //update
      await User.updateOne({ _id }, input, { upsert: true });
      return res.json({ result: true, data: "success" });
    } else {
      //add
      var existing = await User.findOne({ email: input.email });
      if (existing)
        return res.json({ result: false, data: "Email already existed." });

      var hashedPassword = await hashPassword("123456");
      input.password = hashedPassword;
    
      await new User(input).save();
      return res.json({ result: true, data: "success" });
    }
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.appuser_delete = async (req, res) => {
  try {
    var { _id } = req.body;
    await User.findOneAndDelete({ _id: _id });
    return res.json({ result: true, data: "success" });
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.appuser_updateAvatar = async (req, res) => {
  try {
    var { user_id } = req.body;
    let serverURL = req.protocol + '://' + req.get('host');
    await User.updateOne(
      { _id: user_id },
      { profilePhoto: serverURL + '/' + req.file?.filename },
      { upsert: true }
    );
    return res.json({ result: true, data: "success" });
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.appuser_changePassword = async (req, res) => {
  try {
    const { user_id, new_password } = req.body;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.json({ result: false, data: "User not found" });
    }

    const hashedPassword = await hashPassword(new_password);
    await User.updateOne(
      { _id: user_id },
      { password: hashedPassword },
      { upsert: true }
    );

    return res.json({ result: true, data: "success" });
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.appuser_export = async (req, res) => {
  try {
    var filename = "out.csv";
    const csvWriter = createCsvWriter({
      path: "output/" + filename,
      header: [
        { id: "fullName", title: "Full Name" },
        { id: "email", title: "Email" },
        { id: "age", title: "Age" },
        { id: "gender", title: "Gender" },
        { id: "profilePhoto", title: "Profile Photo" },
        { id: "role", title: "Role" },
      ],
    });

    // get all users except admin
    const data = await User.find({ role: { $ne: 'admin' } });
    data.map((item) => {
      item.role = 'App User';
    });

    csvWriter.writeRecords(data).then(() => {
      console.log("The CSV file was written successfully");
      return res.json({ result: true, data: filename });
    });
  } catch (err) {
    return res.json({ result: false, data: err.message });
  }
};

exports.feature_get = async (req, res) => {
  try {
    var { _id } = req.body;
    if (_id) {
      const feature = await Feature.findOne({ _id });
      return res.json({ result: true, data: feature });
    } else {
      const features = await Feature.find();
      return res.json({ result: true, data: features });
    }
  } catch (error) {
    return res.json({ result: false, data: error.message });
  }
};

exports.feature_upsert = async (req, res) => {
  try {
    const { _id, question, answers, weight } = req.body;
    if (_id) {
      await Feature.updateOne(
        { _id },
        { question, answers, weight },
        { upsert: true }
      );
      return res.json({ result: true, data: "success" });
    } else {
      await new Feature({ question, answers, weight }).save();
      return res.json({ result: true, data: "success" });
    }
  } catch (error) {
    return res.json({ result: false, data: error.message });
  }
};
