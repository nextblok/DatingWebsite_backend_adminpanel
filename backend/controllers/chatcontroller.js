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
      data = await Chat.find({
        $or: [
          { sender: user1_id, receiver: user2_id },
          { sender: user2_id, receiver: user1_id }
        ]
      }, {}, { sort: { createdAt: 1 } });
       
    }
    res.json({ success: true, data: data, user1: user1, user2: user2 });
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
      $or: [
        { sender: user_id },
        { receiver: user_id }
      ]
    }).sort({ createdAt: -1 });

    // Get unique users chatted with
    const chatUsers = new Set();
    const chatList = [];

    for (const chat of chats) {
      const otherUserId = chat.sender.equals(user_id) ? chat.receiver : chat.sender;
      
      if (!chatUsers.has(otherUserId.toString())) {
        chatUsers.add(otherUserId.toString());
        
        const otherUser = await User.findById(otherUserId);
        
        // Count unread messages from this user
        const unreadCount = await Chat.countDocuments({
          sender: otherUserId,
          receiver: user_id,
          read: false
        });

        chatList.push({
          user: otherUser,
          lastMessage: chat.message,
          lastMessageTime: chat.createdAt,
          unreadCount: unreadCount
        });
      }
    }

    res.json({ success: true, data: chatList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

