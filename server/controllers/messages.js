const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

const getChats = async (req, res) => {
  try {
    const { userId } = req;
    const user = await ChatModel.findOne({ user: userId }).populate(
      "chats.messagesWith"
    );
    let chatsToBeSent = [];
    if (user.chats.length > 0) {
      chatsToBeSent = await user.chats.map((chat) => ({
        messagesWith: chat.messagesWith._id,
        name: chat.messagesWith.name,
        profilePicUrl: chat.messagesWith.profilePicUrl,
        lastMessage: chat.messages[chat.messages.length - 1].msg,
        date: chat.messages[chat.messages.length - 1].date,
      }));
    }
    return res.status(200).json(chatsToBeSent);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error @ getchats");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await UsetModel.findById(req.params.userToFindId);
    if (!user) return res.status(404).send("user not found");
    return res
      .status(200)
      .json({ name: user.name, profilePicUrl: user.profilePicUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error @ getuserinfo");
  }
};

const deleteChat = async (req, res) => {
  try {
    const { userId } = req;
    const { messagesWith } = req.params;
    const user = await ChatModel.findOne({ user: userId });
    const chatToDelete = user.chats.find(
      (chat) => chat.messagesWith.toString() === messagesWith
    );

    if (!chatToDelete) return res.status(404).send("chat not found");
    const indexOf = user.chats.findIndex(
      (chat) => chat.messagesWith.toString() === messagesWith
    );
    await user.chats.splice(indexOf, 1);
    await user.save();
    return res.status(200).send('chat deleted')
  } catch (error) {
    console.log(error);
    return res.status(500).send("error @ delete chat");
  }
};

module.exports = { getChats, getUserInfo, deleteChat };
