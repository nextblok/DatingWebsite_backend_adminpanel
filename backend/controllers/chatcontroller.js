const User = require("../models/user.js");
const Chat = require("../models/chat.js");

exports.createChat = async (sender, receiver, message) => {
  try {
    await Chat.create({ sender: sender, receiver: receiver, message: message });

    return true;
  } catch (error) {
    return false;
  }
};

exports.getChats = async (req, res) => {
  try {
    let { user1_id, user2_id } = req.body;
    const user1 = await User.findById(user1_id);
    const user2 = await User.findById(user2_id);
    let data = [];
    if (user1_id && user2_id) {
      data = await Chat.find(
        {
          $or: [
            { sender: user1_id, receiver: user2_id },
            { sender: user2_id, receiver: user1_id },
          ],
        },
        {},
        { sort: { createdAt: 1 } }
      );
    }
    // Check if either user has blocked the other
    const isBlocked = user1.blockedUsers.includes(user2._id) || user2.blockedUsers.includes(user1._id);
    res.json({ success: true, data: data, user1: user1, user2: user2, isBlocked: isBlocked });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get user chat list
exports.getChatList = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Find all chats where user is sender or receiver
    const chats = await Chat.find({
      $or: [{ sender: user_id }, { receiver: user_id }],
    }).sort({ createdAt: -1 });

    // Get unique users chatted with
    const chatUsers = new Set();
    const chatList = [];

    for (const chat of chats) {
      const otherUserId = chat.sender.equals(user_id)
        ? chat.receiver
        : chat.sender;

      if (!chatUsers.has(otherUserId.toString())) {
        chatUsers.add(otherUserId.toString());

        const otherUser = await User.findById(otherUserId);

        // Count unread messages from this user
        const unreadCount = await Chat.countDocuments({
          sender: otherUserId,
          receiver: user_id,
          read: false,
        });

        chatList.push({
          user: otherUser,
          lastMessage: chat.message,
          lastMessageTime: chat.createdAt,
          unreadCount: unreadCount,
        });
      }
    }

    res.json({ success: true, data: chatList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { user_id, opponent_id } = req.body;
    console.log(user_id, opponent_id);
    // Add opponent to user's blocked list if not already blocked
    await User.findByIdAndUpdate(user_id, {
      $addToSet: { blockedUsers: opponent_id },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeChatBetweenUsers = async (req, res) => {
  try {
    const { user_id, opponent_id } = req.body;
    await Chat.deleteMany({
      $or: [
        { sender: user_id, receiver: opponent_id },
        { sender: opponent_id, receiver: user_id },
      ],
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
