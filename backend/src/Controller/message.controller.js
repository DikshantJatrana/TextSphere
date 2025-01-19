import User from "../Model/user.model.js";
import Message from "../Model/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(201).json(users);
  } catch (error) {
    console.error("Error in getUserForSidebar", error);
    return res.status(401).json(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: UserChatId } = req.params.id;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: UserChatId },
        { senderId: UserChatId, receiverId: myId },
      ],
    });
    res.status(201).json(messages);
  } catch (error) {
    console.error("Error in getMessage", error);
    return res.status(401).json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params.id;
    const senderId = req.user._id;
    const { text, image } = req.body;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
