const User = require("../models/user");
const Like = require("../models/like.js");
const Feature = require("../models/feature.js");

const { body, check, validationResult } = require("express-validator");
const { hashPassword } = require("../utils/authentication");
const questionsSeed = require("./seedData");

const mongoose = require("mongoose");
mongoose.set("debug", true);

exports.ping = async (req, res) => {
  try {
    res.json({
      type: "pong",
      message: "MateMatch API 1.0",
      data: "if success, return res.json({result: true, data: mydata, message:'this is optional'}). if fail, return res.json({result: false, message: error.message})",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Something went wrong in account controller." });
  }
};

exports.test = async (req, res) => {
  try {
    let result = await getMatchingScore(
      "673e0c0ee958ad6bb46b7afa",
      "673d5fb2c53e0412c4098216"
    );
    res.json({ success: true, message: result });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Something went wrong in account controller." });
  }
};

exports.initialize = async (req, res) => {
  try {
    await Feature.deleteMany({});
    await Feature.insertMany(questionsSeed);

    await User.deleteMany({ role: "admin" });

    const hashedPassword = await hashPassword("12345");
    const adminData = {
      email: "admin@gmail.com",
      password: hashedPassword,
      fullName: "Admin",
      role: "admin",
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (!existingAdmin) {
      await User.create(adminData);
    }

    const users = [
      {
        email: "sarah@gmail.com",
        password: hashedPassword,
        fullName: "Sarah Johnson",
        age: 28,
        gender: "female",
        profilePhoto: "https://randomuser.me/api/portraits/women/31.jpg",
        role: "user",
      },
      {
        email: "emma@gmail.com",
        password: hashedPassword,
        fullName: "Emma Wilson",
        age: 24,
        gender: "female",
        profilePhoto: "https://randomuser.me/api/portraits/women/35.jpg",
        role: "user",
      },
      {
        email: "olivia@gmail.com",
        password: hashedPassword,
        fullName: "Olivia Davis",
        age: 26,
        gender: "female",
        profilePhoto: "https://randomuser.me/api/portraits/women/42.jpg",
        role: "user",
      },
      {
        email: "sophia@gmail.com",
        password: hashedPassword,
        fullName: "Sophia Miller",
        age: 29,
        gender: "female",
        profilePhoto: "https://randomuser.me/api/portraits/women/57.jpg",
        role: "user",
      },
      {
        email: "james@gmail.com",
        password: hashedPassword,
        fullName: "James Smith",
        age: 30,
        gender: "male",
        profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg",
        role: "user",
      },
      {
        email: "michael@gmail.com",
        password: hashedPassword,
        fullName: "Michael Brown",
        age: 27,
        gender: "male",
        profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
        role: "user",
      },
      {
        email: "william@gmail.com",
        password: hashedPassword,
        fullName: "William Taylor",
        age: 32,
        gender: "male",
        profilePhoto: "https://randomuser.me/api/portraits/men/22.jpg",
        role: "user",
      },
      {
        email: "daniel@gmail.com",
        password: hashedPassword,
        fullName: "Daniel Anderson",
        age: 29,
        gender: "male",
        profilePhoto: "https://randomuser.me/api/portraits/men/15.jpg",
        role: "user",
      },
    ];

    await User.deleteMany({ role: "user" });
    await User.insertMany(users);

    // Generate 10 random likes between users
    const allUsers = await User.find({ role: "user" });
    const likes = [];
    for (let i = 0; i < 15; i++) {
      // Get two random users
      const liker = allUsers[Math.floor(Math.random() * allUsers.length)];
      let likee = allUsers[Math.floor(Math.random() * allUsers.length)];

      // Make sure liker and liked are different users
      while (liker._id.toString() === likee._id.toString()) {
        likee = allUsers[Math.floor(Math.random() * allUsers.length)];
      }

      likes.push({
        liker: liker._id,
        likee: likee._id,
      });
    }

    await Like.deleteMany({}); // Clear existing likes
    await Like.insertMany(likes);

    res.json({
      success: true,
      message:
        "1) admin account created (admin@gmail.com, 12345) and 2) seed for users , features, likes",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createLike = async (req, res) => {
  try {
    const { liker_id, likee_id } = req.body;

    await Like.create({ liker: liker_id, likee: likee_id });

    res.json({ success: true, message: "done" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getLikers = async (req, res) => {
  try {
    let { likee_id } = req.body;
    let data = [];
    if (likee_id)
      data = await Like.find({ likee: likee_id }, {}, { sort: { createdAt: -1 } })
        .populate("liker")
        .exec();

    res.json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.getLikees = async (req, res) => {
  try {
    let { liker_id } = req.body;
    let data = [];
    if (liker_id)
      data = await Like.find({ liker: liker_id }, {}, { sort: { createdAt: -1 } })
        .populate("likee")
        .exec();

    res.json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { user_id, watcher_id } = req.body;

    const user = await User.findOne({ _id: user_id }).lean(); // lean() for converting mongoose model to plain object to assign "matchingscore" field

    if (watcher_id)
      user.matchingscore = await getMatchingScore(watcher_id, user_id);

    return res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id, fullName, age, gender, bio, self, preference } = req.body;

    await User.updateOne(
      { _id: user_id },
      {
        fullName,
        age,
        gender,
        bio,
        self: JSON.parse(self),
        preference: JSON.parse(preference),
        // preference: { "abc": [0, 1], "456": [2] }
      },
      { upsert: true, runValidators: true }
    );

    res.json({ success: true, message: "done" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMatchingScore = async (from_user_id, to_user_id) => {
  try {
    const from_user = await User.findOne({ _id: from_user_id });
    const to_user = await User.findOne({ _id: to_user_id });

    //get total weight of features
    const result = await Feature.aggregate([
      { $group: { _id: null, total: { $sum: `$weight` } } },
    ]);
    const totalWeight = result.length > 0 ? result[0].total : 0;

    const features = await Feature.find();

    let weightSum = 0;
    features.map((feature) => {
      let from_user_preference = from_user.preference[feature.name];
      let to_user_self = to_user.self[feature.name];

      //formula for calculating matching score
      if (from_user_preference.includes(to_user_self))
        weightSum += feature.weight;
    });

    return Math.round((weightSum / totalWeight) * 100);
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

