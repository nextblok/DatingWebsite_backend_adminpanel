const User = require("../models/user");
const Like = require("../models/like.js");
const Feature = require("../models/feature.js");
const Criteria = require("../models/criteria.js");
const Chat = require("../models/chat.js");
const Official = require("../models/official.js");
const Story = require("../models/story.js");


const { body, check, validationResult } = require("express-validator");
const { hashPassword } = require("../utils/authentication");
const { questionsSeed, usersSeed, criteriaSeed } = require("./seedData");
const {
  emitNotificationForChat,
  emitNotificationForLike,
} = require("./socketController");
const { signupEmail } = require("./mailcontroller");

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
    const result = await signupEmail('illradoicic@gmail.com');
    res.json(result);
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

    await Criteria.deleteMany({});
    await Criteria.insertMany(criteriaSeed);

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

    let usersSeedClone = [...usersSeed];
    usersSeedClone = usersSeedClone.map((user) => ({
      ...user,
      password: hashedPassword,
    }));

    await User.deleteMany({ role: "user" });
    await User.insertMany(usersSeedClone);

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

    // Generate some chat messages between first 2 users
    const firstTwoUsers = allUsers.slice(0, 2);
    const chatMessages = [
      {
        sender: firstTwoUsers[0]._id,
        receiver: firstTwoUsers[1]._id,
        message: "Hey, how are you?",
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        sender: firstTwoUsers[1]._id,
        receiver: firstTwoUsers[0]._id,
        message: "I'm good thanks! How about you?",
        createdAt: new Date(Date.now() - 3000000), // 50 mins ago
      },
      {
        sender: firstTwoUsers[0]._id,
        receiver: firstTwoUsers[1]._id,
        message: "Doing great! Would you like to grab coffee sometime?",
        createdAt: new Date(Date.now() - 2400000), // 40 mins ago
      },
      {
        sender: firstTwoUsers[1]._id,
        receiver: firstTwoUsers[0]._id,
        message: "Sure, that sounds lovely!",
        createdAt: new Date(Date.now() - 1800000), // 30 mins ago
      },
    ];

    await Chat.deleteMany({}); // Clear existing chats
    await Chat.insertMany(chatMessages);

    res.json({
      success: true,
      message:
        "1) admin account created (admin@gmail.com, 12345) and 2) seed for users , features, likes, criteria, chat messages",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createLike = async (req, res) => {
  try {
    const { liker_id, likee_id } = req.body;

    // Check if like already exists
    const existingLike = await Like.findOne({
      liker: liker_id,
      likee: likee_id,
    });
    if (existingLike) {
      return res.json({ result: false, message: "Like already exists" });
    }

    // Check if users exist
    const liker = await User.findById(liker_id);
    const likee = await User.findById(likee_id);
    console.log(liker, likee);
    if (!liker || !likee) {
      return res.json({ result: false, message: "User not found" });
    }

    await Like.create({ liker: liker_id, likee: likee_id });

    res.json({ result: true, message: "done" });

    await emitNotificationForLike(liker_id, likee_id);
  } catch (error) {
    res.status(400).json({ result: false, message: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { liker_id, likee_id } = req.body;

    await Like.deleteMany({ liker: liker_id, likee: likee_id });

    res.json({ result: true, message: "done" });
  } catch (error) {
    res.status(400).json({ result: false, message: error.message });
  }
};

exports.getLikers = async (req, res) => {
  try {
    let { likee_id } = req.body;
    let data = [];
    if (likee_id)
      data = await Like.find(
        { likee: likee_id },
        {},
        { sort: { createdAt: -1 } }
      )
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
    if (liker_id) {
      data = await Like.find(
        { liker: liker_id },
        {},
        { sort: { createdAt: -1 } }
      )
        .populate("likee")
        .exec();
      // Map data and add mutual like status for each likee
      data = await Promise.all(data.map(async (like) => {
        const mutualLike = await Like.findOne({ liker: like.likee._id, likee: liker_id });
        like = like.toObject(); // Convert to plain object to add new field
        like.mutual = mutualLike ? true : false;
        return like;
      }));


    }

    res.json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { user_id, watcher_id } = req.body;

    const user = await User.findOne({ _id: user_id }).lean(); // lean() for converting mongoose model to plain object to assign "matchingscore" field
    const watcher = await User.findOne({ _id: watcher_id });
    if (watcher_id && !watcher) {
      return res.json({ success: false, message: "Watcher not found" });
    }
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (watcher_id)
      user.matchingscore = await getMatchingScore(watcher_id, user_id);

    user.likeStatus = await getLikeStatus(watcher_id, user_id);

    return res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getLikeStatus = async (liker_id, likee_id) => {
  try {
    const like = await Like.findOne({ liker: liker_id, likee: likee_id });
    const mutualLike = await Like.findOne({ liker: likee_id, likee: liker_id });
    return {
      liked: like ? true : false,
      mutual: like && mutualLike ? true : false,
    };
  } catch (error) {
    return {
      liked: false,
      mutual: false,
    };
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id, fullName, gender, bio, criteria, preference, birthdate, zipcode, lat, lng } =
      req.body;

    const age = birthdate
      ? Math.floor(
        (new Date() - new Date(birthdate)) / (365.25 * 24 * 60 * 60 * 1000)
      )
      : null;

    // Remove null values from the update fields
    const updateFields = {
      fullName,
      birthdate,
      age,
      gender,
      bio,
      criteria,
      preference,
      zipcode,
      lat,
      lng
    };

    // Filter out null/undefined values
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] == null || updateFields[key] === undefined) &&
        delete updateFields[key]
    );
    await User.updateOne(
      { _id: user_id },
      {
        fullName,
        birthdate,
        age,
        gender,
        bio,
        criteria,
        preference,
        zipcode,
        lat,
        lng,
        // preference: {
        //     "675642fbf9873c01577f0c56": 0,
        //     "675642fbf9873c01577f0c57": 1,
        //     "675642fbf9873c01577f0c83": 2,
        //     "675642fbf9873c01577f0c84": 2,
        //     "675642fbf9873c01577f0c87": 3
        // }
      },
      { upsert: true, runValidators: true }
    );

    res.json({ success: true, message: "done" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { gender, age, criteria } = req.body;
    let query = {
      $and: [{ role: "user" }],
    };

    // Gender filter
    if (gender && Array.isArray(gender) && gender.length > 0) {
      query.$and.push({ gender: { $in: gender } });
    }

    // Age filter with multiple ranges
    if (age && Array.isArray(age) && age.length > 0) {
      query.$and.push({
        $or: age.map((range) => ({
          age: { $gte: range.min, $lte: range.max },
        })),
      });
    }
    // Criteria filter
    let users = await User.find(query);
    console.log(users);

    if (criteria && typeof criteria === "object") {
      users = users.filter((user) => {
        // Check each criteria
        return Object.entries(criteria).every(([criteriaId, allowedValues]) => {
          if (allowedValues.length === 0) return true;
          // Get user's value for this criteria
          const userValue = user.criteria ? user.criteria[criteriaId] : null;
          // Check if user's value is in allowed values
          return allowedValues.includes(userValue);
        });
      });
    }

    return res.json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.searchByDistance = async (req, res) => {
  try {
    const { userId, distance } = req.body;

    if (!userId || !distance) {
      return res.status(400).json({ success: false, message: "User ID and distance are required." });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser || !currentUser.lat || !currentUser.lng) {
      return res.status(404).json({ success: false, message: "Current user's location not found." });
    }

    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const users = await User.find({
      role: "user",
      lat: { $exists: true },
      lng: { $exists: true },
      _id: { $ne: userId }, // Exclude the current user
    }).then(users => {
      return users.filter(user => {
        const userLatRad = toRadians(user.lat);
        const userLngRad = toRadians(user.lng);
        const currentUserLatRad = toRadians(currentUser.lat);
        const currentUserLngRad = toRadians(currentUser.lng);

        const distanceInMiles = 3959 * Math.acos(
          Math.sin(userLatRad) * Math.sin(currentUserLatRad) +
          Math.cos(userLatRad) * Math.cos(currentUserLatRad) *
          Math.cos(currentUserLngRad - userLngRad)
        );

        return distanceInMiles <= distance;
      });
    });
 
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

exports.uploadProfilePictures = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const profilePhotos = req.files;

    if (!userId || !profilePhotos || profilePhotos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User ID and profile photos are required.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let serverURL = req.protocol + '://' + req.get('host');

    // Save the profile photo links to the user's profilePhotos field
    const profilePhotoLinks = profilePhotos.map(file => serverURL + `/${file.filename}`);
    user.profilePhotos = profilePhotoLinks;
    await user.save();

    return res.json({
      success: true,
      message: "Profile photos uploaded successfully.",
      profilePhotos: profilePhotoLinks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the profile photos.",
    });
  }
};




const getMatchingScore = async (from_user_id, to_user_id) => {
  try {
    const from_user = await User.findOne({ _id: from_user_id });
    const to_user = await User.findOne({ _id: to_user_id });

    const features = await Feature.find();
    let matchCount = 0;

    // Get user's preferences
    const fromUserPreference = from_user.preference || {};
    const toUserPreference = to_user.preference || {};

    // Count how many answers match between users
    features.forEach((feature) => {
      const questionId = feature._id.toString();
      if (
        !fromUserPreference.hasOwnProperty(questionId) ||
        !toUserPreference.hasOwnProperty(questionId)
      ) {
        return;
      }
      const fromUserAnswer = fromUserPreference[questionId];
      const toUserAnswer = toUserPreference[questionId];

      if (fromUserAnswer === toUserAnswer) {
        matchCount++;
      }
    });

    // Calculate percentage of matching answers
    const totalQuestions = features.length;
    const matchPercentage = Math.round((matchCount / totalQuestions) * 100);

    return matchPercentage;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

//*** official ***//
exports.createOfficial = async (req, res) => {
  try {
    const { user_id, opponent_id } = req.body;
    const user = await User.findOne({ _id: user_id });
    const opponent = await User.findOne({ _id: opponent_id });
    if (!user || !opponent) {
      return res.json({ success: false, message: "User or opponent not found" });
    }
    const existingOfficial = await Official.findOne({ user: user_id, opponent: opponent_id });
    if (existingOfficial) {
      return res.json({ success: false, message: "Official already exists" });
    }
    await Official.create({ user: user_id, opponent: opponent_id });

    const reverseOfficial = await Official.findOne({ user: opponent_id, opponent: user_id });
    if (reverseOfficial) {
      await Story.create({
        user1_id: user_id,
        user2_id: opponent_id,
        user1_photo: user.profilePhoto,
        user2_photo: opponent.profilePhoto,
        user1_name: user.fullName,
        user2_name: opponent.fullName,
      });
    }
    res.json({ success: true, message: "done" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOfficial = async (req, res) => {
  try {
    const { user_id, opponent_id } = req.body;
    const official = await Official.findOne({ user: user_id, opponent: opponent_id });
    if (!official) {
      return res.json({ success: false, message: "Official not found" });
    }
    res.json({ success: true, data: official });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getStory = async (req, res) => { 
  try {
    const stories = await Story.find({});
    res.json({ success: true, data: stories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

