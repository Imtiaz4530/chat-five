import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      percipants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        percipants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Socket.IO functionality will go here

    //This will run in parallel
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("Error in sendMessage controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWith } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      percipants: { $all: [senderId, userToChatWith] },
    }).populate("messages"); // Not ref but actual messages

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (e) {
    console.log("Error in get message controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
