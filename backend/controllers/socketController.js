const User = require("../models/user");

const emitNotificationForChat = async (receiver_id, sender_id, message) => {
  const sender = await User.findById(sender_id);
  const senderName = sender ? sender.fullName : sender_id;
  io.to(receiver_id).emit("notification", {
    type: "chat",
    message: "You have a new message from " + senderName,
  });
};

const emitNotificationForLike = async (liker_id, likee_id) => {
  const liker = await User.findById(liker_id);
  const likerName = liker ? liker.fullName : liker_id;
  io.to(likee_id).emit("notification", {
    type: "like",
    message: likerName + " liked your profile",
  });
};


module.exports = {
  emitNotificationForChat,
  emitNotificationForLike,
};
